-- graficasnasve.art — Esquema inicial
-- © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
--
-- Fuente de verdad: src/types/supabase.ts
-- Aplicar con la CLI de Supabase (`supabase db push`) o pegando en el SQL Editor.
-- RLS activado en todas las tablas.

-- ───────────────────────────────────────────────────────────────────────────
-- Tabla: presupuestos  (solicitudes entrantes del formulario público)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.presupuestos (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  nombre         text not null,
  empresa        text,
  email          text not null,
  telefono       text,
  producto       text not null
                 check (producto in ('papeleria','catalogo','libro','carpeteria','otro')),
  tirada         text,
  detalles       text,
  acabados       text,
  entrega        date,
  archivo_url    text,
  archivo_nombre text,
  estado         text not null default 'nuevo'
                 check (estado in ('nuevo','en_revision','presupuestado','aceptado','rechazado','completado')),
  notas_admin    text,
  updated_at     timestamptz
);

-- ───────────────────────────────────────────────────────────────────────────
-- Tabla: pedidos  (pipeline de producción; puede nacer de un presupuesto)
-- Nota: NO es una tabla de pedidos de pasarela de pago. La integración de
-- pagos (Stripe/Redsys/Bizum) se decide en la Fase 4 del ROADMAP.
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.pedidos (
  id                      uuid primary key default gen_random_uuid(),
  created_at              timestamptz not null default now(),
  presupuesto_id          uuid references public.presupuestos (id) on delete set null,
  nombre_cliente          text not null,
  empresa                 text,
  email                   text not null,
  telefono                text,
  producto                text not null,
  descripcion             text,
  cantidad                integer,
  precio_total            numeric(10,2),
  estado                  text not null default 'pendiente'
                          check (estado in ('pendiente','en_produccion','acabados','enviado','entregado','cancelado')),
  fecha_entrega_estimada  date,
  fecha_entrega_real      date,
  notas                   text,
  updated_at              timestamptz
);

create index if not exists pedidos_presupuesto_id_idx on public.pedidos (presupuesto_id);

-- ───────────────────────────────────────────────────────────────────────────
-- Tabla: portfolio  (galería pública editable por admin)
-- ───────────────────────────────────────────────────────────────────────────
create table if not exists public.portfolio (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  titulo      text not null,
  descripcion text,
  categoria   text not null
              check (categoria in ('offset','digital','encuadernacion','acabados','madera','personalizacion')),
  imagen_url  text not null,
  imagen_alt  text,
  cliente     text,
  destacado   boolean not null default false,
  orden       integer,
  publicado   boolean not null default false
);

create index if not exists portfolio_publicado_orden_idx on public.portfolio (publicado, orden);

-- ───────────────────────────────────────────────────────────────────────────
-- Row Level Security
-- ───────────────────────────────────────────────────────────────────────────
alter table public.presupuestos enable row level security;
alter table public.pedidos      enable row level security;
alter table public.portfolio    enable row level security;

-- presupuestos: el público puede CREAR (formulario); admin gestiona todo.
create policy "presupuestos_insert_anon"
  on public.presupuestos for insert to anon, authenticated with check (true);
create policy "presupuestos_admin_all"
  on public.presupuestos for all to authenticated using (true) with check (true);

-- pedidos: solo administración (autenticados).
create policy "pedidos_admin_all"
  on public.pedidos for all to authenticated using (true) with check (true);

-- portfolio: lectura pública solo de lo publicado; admin gestiona todo.
create policy "portfolio_select_publicado"
  on public.portfolio for select to anon, authenticated using (publicado = true);
create policy "portfolio_admin_all"
  on public.portfolio for all to authenticated using (true) with check (true);

-- ───────────────────────────────────────────────────────────────────────────
-- Storage: bucket privado para archivos de arte subidos por el cliente.
-- El acceso de lectura debe hacerse mediante signed URLs (TTL corto).
-- ───────────────────────────────────────────────────────────────────────────
insert into storage.buckets (id, name, public)
values ('arte-files', 'arte-files', false)
on conflict (id) do nothing;

-- Solo el service role (usado por la API server-side) escribe en el bucket.
create policy "arte_files_service_write"
  on storage.objects for insert to service_role with check (bucket_id = 'arte-files');
create policy "arte_files_service_read"
  on storage.objects for select to service_role using (bucket_id = 'arte-files');

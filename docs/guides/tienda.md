# Guía: catálogo y precio

### Propósito de este documento

- **Objetivos:** Explicar que la tienda es SSG con catálogo y motor de precio **en código**, no en Supabase.
- **Estructura:** Dónde vive el catálogo → cómo se estima el precio → qué no tocar sin ADR.
- **Contenido a integrar según contexto:** Adapta slugs y coeficientes de NASVE. No copies un catálogo CMS. Los precios actuales son orientativos.

## Catálogo

Fuente: [`src/lib/catalogoTienda.ts`](../../src/lib/catalogoTienda.ts). Rutas `/tienda` y `/tienda/[slug]` se generan en build. Tests: `src/lib/catalogoTienda.test.ts`.

No hay tabla de productos en Supabase. Un producto nuevo es un cambio de código + tests + (si cambia el contrato) ADR.

## Precio

Fuente: [`src/lib/precioTienda.ts`](../../src/lib/precioTienda.ts). La ficha muestra un **estimado orientativo** (base, volumen, gramaje, acabado). Sustituir coeficientes por la tarifa real de NASVE es trabajo de producto (Fase 2), no de alineación de repo.

## Relación con presupuesto

El formulario `/presupuesto` y `/api/presupuesto` persisten el encargo (Supabase + Storage + Resend). No leen el catálogo de la base de datos. Ver [runbooks/presupuesto.md](../runbooks/presupuesto.md).

# Runbook: alta de presupuesto

### Propósito de este documento

- **Objetivos:** Diagnosticar un POST a `/api/presupuesto` que no persiste o no envía email.
- **Estructura:** Flujo → dependencias → fallos frecuentes → qué no hacer.
- **Contenido a integrar según contexto:** Adapta variables Resend/Supabase de este repo. No copies un runbook de Stripe Checkout: el webhook de pagos es stub 501.

## Flujo

1. Cliente envía el formulario (`/presupuesto` o el flujo de encargo).
2. Route Handler valida con Zod (esquema compartido).
3. Sube arte al bucket privado `arte-files`.
4. Inserta fila (RLS + service role en servidor).
5. Resend: acuse al cliente + aviso interno.

## Dependencias

- `.env.local` / env de Vercel: `NEXT_PUBLIC_SUPABASE_*`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_*`.
- Migración [`supabase/migrations/0001_init.sql`](../../supabase/migrations/0001_init.sql).
- E2E de validación: `e2e/presupuesto.spec.ts` (no requiere secretos).

## Fallos frecuentes

| Síntoma              | Qué mirar                                                                     |
| -------------------- | ----------------------------------------------------------------------------- |
| 400 de validación    | Esquema Zod en `src/lib/validaciones/`                                        |
| 500 al subir archivo | Bucket `arte-files`, service role, tamaño                                     |
| Email no llega       | `RESEND_API_KEY`, dominio verificado, `RESEND_FROM` / `RESEND_PRESUPUESTO_TO` |
| Admin vacío          | Usuario admin en Supabase Auth; guard `src/proxy.ts`                          |

No abras un issue público con el PDF del cliente. Seguridad: [SECURITY.md](../../SECURITY.md).

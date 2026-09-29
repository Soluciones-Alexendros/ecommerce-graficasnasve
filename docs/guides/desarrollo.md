# Guía: desarrollo local

### Propósito de este documento

- **Objetivos:** Arrancar el e-commerce en local y preparar un PR sin romper catálogo ni deploy.
- **Estructura:** Requisitos → setup → comandos Makefile/pnpm → flujo de PR.
- **Contenido a integrar según contexto:** Adapta pnpm 11 y Next 16 de este repo. No copies un setup npm/CLI. El catálogo no se siembra en Supabase.

## Requisitos

- Node 22 (`.nvmrc`) y pnpm 11.5.2 (`corepack enable`)
- Copia de `.env.example` → `.env.local` (Supabase/Resend solo si ejercitas presupuesto de verdad)

## Setup

```bash
corepack enable
pnpm install
cp .env.example .env.local
pnpm dev
```

La home, la tienda y el estimador de precio son SSG y **no requieren** Supabase. El formulario de presupuesto y `/admin` sí.

## Comandos

| Make            | pnpm                                  | Qué hace                                     |
| --------------- | ------------------------------------- | -------------------------------------------- |
| `make lint`     | `typecheck` + `lint` + `format:check` | Job `quality`                                |
| `make test`     | `pnpm test`                           | Job `test` (Vitest)                          |
| `make smoke`    | `pnpm test:e2e`                       | Job `smoke` (Playwright; en local construye) |
| `make validate` | lint + test + meta-secciones          | Gate local                                   |

`pnpm build` / `pnpm start` equivalen al job `build` + servidor de smoke.

## PR

Rama corta → checklist de [`.github/PULL_REQUEST_TEMPLATE.md`](../../.github/PULL_REQUEST_TEMPLATE.md) → CI `quality` / `test` / `build` / `smoke` verde. Detalle en [CONTRIBUTING.md](../../CONTRIBUTING.md).

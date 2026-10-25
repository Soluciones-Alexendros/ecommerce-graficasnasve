# Runbook: CI y deploy

### Propósito de este documento

- **Objetivos:** Diagnosticar un CI rojo o un Production que no responde, sin tocar branch protection ni org.
- **Estructura:** Jobs del CI → vía única de Production (Git) → smoke HTTP → fallos frecuentes.
- **Contenido a integrar según contexto:** Adapta runners `ubuntu-latest` (canon) y la URL de Production de este repo. No copies semantic-release de una CLI.

## Pipeline

1. **CI/CD** (`.github/workflows/ci.yml`): `quality` → `test` → `build` (artefacto `.next`) → `smoke` (Playwright).
2. **Production:** integración Git de Vercel (merge a `main`). Una sola vía; no hay deploy por CLI.
3. **Deploy → Producción** (`.github/workflows/deploy.yml`): solo si CI/CD en `main` concluye `success`. Job `smoke-prod`: `curl` con reintentos a `https://ecommerce-graficasnasve.vercel.app` hasta HTTP 200. No usa secretos Vercel.

El `name:` del workflow de CI debe seguir siendo **CI/CD**. Si lo cambias, el `workflow_run` de smoke deja de dispararse.

## Fallos frecuentes

| Síntoma               | Qué mirar                                                         |
| --------------------- | ----------------------------------------------------------------- |
| `quality` rojo        | `pnpm typecheck` / `lint` / `format:check` / `make validate-docs` |
| `test` rojo           | Vitest en `src/**/*.test.*`                                       |
| `build` rojo          | `pnpm build` (Next 16; ver `node_modules/next/dist/docs/`)        |
| `smoke` rojo          | Playwright; artefactos `playwright-report`                        |
| `smoke-prod` rojo     | ¿Git desplegó Production? ¿URL 200? Instant Rollback en Vercel    |
| Production sin deploy | ¿Integración Git activa en el proyecto Vercel? ¿rama `main`?      |

Runners del CI: `ubuntu-latest` (GitHub-hosted). `deploy.yml` permanece aparte (solo smoke).

> Nota (2026-10-25): se retiró el deploy por Vercel CLI para evitar dos Production por merge.
> Rollback de emergencia: Instant Rollback al deployment `fc0cfce` (o el anterior estable).

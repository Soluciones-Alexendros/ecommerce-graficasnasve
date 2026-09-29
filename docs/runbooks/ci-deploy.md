# Runbook: CI y deploy

### Propósito de este documento

- **Objetivos:** Diagnosticar un CI rojo o un deploy a Vercel que no salta, sin tocar branch protection ni org.
- **Estructura:** Jobs del CI → deploy por `workflow_run` → fallos frecuentes.
- **Contenido a integrar según contexto:** Adapta runners `ubuntu-latest` (canon) y secrets Vercel de este repo. No copies semantic-release de una CLI.

## Pipeline

1. **CI/CD** (`.github/workflows/ci.yml`): `quality` → `test` → `build` (artefacto `.next`) → `smoke` (Playwright).
2. **Deploy → Producción** (`.github/workflows/deploy.yml`): solo si CI/CD en `main` concluye `success`. Usa `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`. Si falta el token, el job avisa y sale 0 (no rompe el workflow).

El `name:` del workflow de CI debe seguir siendo **CI/CD**. Si lo cambias, el `workflow_run` de deploy deja de dispararse.

## Fallos frecuentes

| Síntoma         | Qué mirar                                                         |
| --------------- | ----------------------------------------------------------------- |
| `quality` rojo  | `pnpm typecheck` / `lint` / `format:check` / `make validate-docs` |
| `test` rojo     | Vitest en `src/**/*.test.*`                                       |
| `build` rojo    | `pnpm build` (Next 16; ver `node_modules/next/dist/docs/`)        |
| `smoke` rojo    | Playwright; artefactos `playwright-report`                        |
| Deploy no corre | ¿CI/CD en `main` verde? ¿nombre del workflow intacto?             |
| Deploy sin URL  | Secretos Vercel ausentes — no es un fallo de producto             |

Runners del CI: `ubuntu-latest` (GitHub-hosted). `deploy.yml` permanece aparte.

> Nota (2026-09-26): el job Deploy usa `runs-on: ubuntu-latest` (el runner self-hosted `ts` no tenía workers y cancelaba a las 24h).
> Nota (2026-09-26b): si `VERCEL_TOKEN` es inválido, Deploy sale 0 con warning (alineado a token ausente; Vercel no es required check en privados org).

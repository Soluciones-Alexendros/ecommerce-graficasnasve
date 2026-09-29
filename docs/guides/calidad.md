# Guía: calidad y cobertura

### Propósito de este documento

- **Objetivos:** Fijar el umbral de cobertura de flota y el significado de los jobs `quality` / `test` / `build` / `smoke`.
- **Estructura:** Gate de cobertura → superficie de tests → tabla de jobs (deploy queda aparte).
- **Contenido a integrar según contexto:** Adapta umbrales y scripts pnpm de este repo. Mínimo de flota ≥ 70 %. No copies gates de una CLI ni fixtures golden ajenas.

## Gate de cobertura

Vitest (`vitest.config.mts`) recorre `src/lib/**`, `src/components/**` y `src/proxy.ts`. El mínimo de **flota es ≥ 70 %** (statements / branches / functions / lines). Este repo documenta el gate; no se baja por debajo del 70 % si se activa umbral en Vitest.

Los Server Components async se cubren con Playwright (`e2e/`), no con Vitest.

## Superficie de tests

- Unit: `src/**/*.test.{ts,tsx}` (catálogo, precio, validaciones Zod, UI, proxy).
- E2E: `e2e/` — home, tienda, presupuesto (validación), guard `/admin`, encargo, tour.

## Jobs del pipeline principal

| Job       | Qué hace                                                       |
| --------- | -------------------------------------------------------------- |
| `quality` | typecheck, lint, format, meta-secciones (`make validate-docs`) |
| `test`    | Vitest                                                         |
| `build`   | `pnpm build` y artefacto `.next` (sin caché)                   |
| `smoke`   | Playwright/Chromium contra `pnpm start`                        |

`deploy.yml` se dispara por `workflow_run` del workflow **CI/CD** en `main` y no se renombra.

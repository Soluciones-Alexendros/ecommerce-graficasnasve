<!-- canon-managed: true -->

### Propósito de este documento

- **Objetivos:** Plantilla de PR para describir el cambio y exigir las comprobaciones `quality` / `test` / `build` / `smoke`.
- **Estructura:** Qué cambia → checklist (typecheck/lint, tests, build, e2e, docs, secretos, CI).
- **Contenido a integrar según contexto:** Adapta el checklist a pnpm + Next.js de este repo. No copies plantillas de CLI. No subas `.env.local` ni artefactos `.next/`.

## Qué cambia

<!-- feat/fix/docs + alcance en una o dos frases -->

## Checklist

- [ ] `make lint` (`pnpm typecheck && pnpm lint && pnpm format:check`)
- [ ] `make test` (Vitest)
- [ ] `pnpm build` si toca App Router, catálogo o `next.config.ts`
- [ ] Docs actualizadas (`README.md`, `ARCHITECTURE.md` o ADR si cambia un contrato)
- [ ] Sin secretos, `.env.local` ni artefactos (`.next/`, `coverage/`, `playwright-report/`)
- [ ] CI `quality` / `test` / `build` / `smoke` en verde

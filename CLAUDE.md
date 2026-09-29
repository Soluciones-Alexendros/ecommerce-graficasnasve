# CLAUDE.md — ecom-graficasnasve

@AGENTS.md

<proyecto>
Web e-commerce de **Gráficas NASVE** (imprenta offset/digital, Torrent, Valencia, desde 1982).
Dominio objetivo: `graficasnasve.art` (DNS pendiente). Deploy temporal: `ecom-graficasnasve.vercel.app`.
Stack: marketing + tienda/preformatos + presupuesto + panel admin. Empresa: Soluciones Alexendros S.L.U.
Versión 0.2.0 (release v0.2.0, 2026-06-10).
</proyecto>

<stack>
- **Next.js 16.2.7** (App Router) · **React 19.2** · **TypeScript 5** · **Tailwind v4**.
- **Supabase** (`@supabase/ssr`, `@supabase/supabase-js`) — datos presupuestos/pedidos/portfolio + bucket privado `arte-files` + RLS. Migración única: `supabase/migrations/0001_init.sql`.
- **Resend** (`react-email`) — emails de presupuesto. **Zod 4** + **react-hook-form** (formularios). **driver.js** (visita guiada). **next-themes**, **lucide-react**.
- Gestor: **pnpm@11.5.2** (corepack). Node **22.x** (engines). Deploy: **Vercel** (región `cdg1`, `vercel.json`).
- Comandos REALES (package.json): `pnpm dev` · `pnpm build` · `pnpm start` · `pnpm lint` (eslint) · `pnpm typecheck` (tsc --noEmit) · `pnpm test` (vitest run) · `pnpm test:watch` · `pnpm test:e2e` (playwright).
- CI/CD: GitHub Actions en cada PR/push (`typecheck·lint·test·e2e`); autodeploy a Vercel solo con CI verde en `main` (protegida, PR obligatorio).
</stack>

<estado>
- **Madurez: pre-producción**, base reconciliada con el código (no es esqueleto). 30 commits.
- **Última actividad: 2026-06-11** (último commit; release 0.2.0 el 2026-06-10). Aparentemente **pausado** desde entonces (inferido). El último commit fue un revert de la rama plantilla white-label.
- **Funcional (inferido, sin ejecutar):** núcleo operativo — marketing, tienda con estimador de precio, formulario de presupuesto (Supabase + Resend), panel admin con login y gestión de estados. Tests declarados verdes en CHANGELOG: Vitest 54/54, Playwright E2E 11/11. Requiere `.env.local` (ver `.env.local.example`) y proyecto Supabase aplicado para arrancar de verdad.
- Roadmap: Fases 0, 1, 1.5 ✅ · Fase 2 (tienda) ✅ casi · Fases 3-6 ⏳ pendientes.
</estado>

<arquitectura>
- `src/app/` App Router. Grupo `(marketing)`: home + `contacto`, `encargo`, `historia`, `portfolio`, `presupuesto`, `servicios/[slug]`, `sostenibilidad`, `tienda/[slug]`. Páginas legales: `aviso-legal`, `cookies`, `privacidad`. SEO: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx` (Satori), `not-found.tsx`, `error.tsx`.
- `src/app/admin/`: `login` + grupo `(panel)` (incl. `presupuestos`). Guard de auth en `src/proxy.ts` (excluye `/admin/login`).
- `src/app/api/`: `presupuesto` (alta) y `webhooks/stripe` (**STUB que devuelve 501**, sin implementar).
- `src/lib/`: `catalogoTienda.ts` + `precioTienda.ts` (catálogo y motor de precio **estáticos en código**, no en Supabase), `catalogoServicios.ts`, `resend.ts`, `supabase/{cliente,servidor}.ts`, `validaciones/` (Zod). `src/types/supabase.ts` (tipos generados). `src/components/{ui,marketing,formularios}`.
- Tests: unit Vitest (`*.test.ts` junto al código) + E2E Playwright en `e2e/`.
- Docs raíz (fuente de verdad): `ARCHITECTURE.md`, `ROADMAP.md`, `DEPLOYMENT.md`, `CHECKLIST-PROD.md`, `COSTES.md`, `AUDITORIA-SEM-SEO.md`, `CHANGELOG.md`.
</arquitectura>

<pendiente>
- **Pagos (Fase 5):** webhook `api/webhooks/stripe` es stub 501; falta elegir proveedor (Redsys+Bizum / Stripe / Mollie) e integrar pipeline `pedidos`.
- **Precios reales (Fase 2):** sustituir coeficientes orientativos de `precioTienda.ts` por tarifa real de NASVE.
- Fase 3: encargo asistido de 4 pasos + preflight de archivos (formato/sangre/resolución/CMYK/tipografías). Fase 4: chatbot flotante de cualificación. Fase 6: GA4 + Consent Mode v2 + banner cookies, Core Web Vitals/Lighthouse, Search Console, UAT.
- DNS de `graficasnasve.art` pendiente de apuntar.
</pendiente>

<notas>
- `@AGENTS.md` avisa: **este Next.js (16) tiene breaking changes** respecto al conocido; consultar `node_modules/next/dist/docs/` antes de escribir código y respetar deprecaciones.
- El catálogo de tienda es **estático en código** (curado, SSG total, tests deterministas), NO una tabla Supabase — no buscar productos en la BD.
- Secretos en `.env.local` (Supabase, Resend, Stripe, APP_URL). El cliente final aporta claves Stripe. No subir `.env.local`.
- Trabajo gestionado por PRs sobre `main` protegida; cualquier cambio necesita CI verde para desplegar.
</notas>

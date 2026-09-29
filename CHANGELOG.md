# Changelog

Formato basado en [Keep a Changelog](https://keepachangelog.com/es/1.1.0/)
y [Versionado Semántico](https://semver.org/lang/es/).

## [Unreleased]

### Cambiado

- Alineación al canon de flota **P1+P2** (público, e-commerce): jobs CI
  `quality` / `test` / `build` / `smoke`, Makefile, contratos
  (SECURITY, CONTRIBUTING, CODEOWNERS, plantillas, docs/architecture+guides+runbooks).
  Producto, `deploy.yml` y contenido de marketing se conservan. Renovate
  sigue; no hay Dependabot version-updates.

## [0.3.0] — 2026-07-10

### Añadido

- **README profesional** con badges, plantilla de uso y checklist de versión
  (se convirtió en template para clone)
- **Configuración multi-región en Vercel** (cdg1+fra1)
- **Flujo CI/CD moderno** con steps separados, skips para dependabot, reportes consolidados
- **Estructuras de archivos coherentes**:
  - `docs/config/` — vercel.json + .vercel/
  - `docs/scripts/` — package.json + README
  - `docs/templates/` — plantillas del proyecto (por implementar)
- **Placeholder de despliegue STG & PROD** (`workflow_run` con validación)
- **Estricto checklist de secrets** en CI/CD (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- **Tokens wildcard** `(**SHARE**)` para secrets en workflowLogs (como nxw alternativo)
- **Deploy real a Vercel** via `vercel build --prod` + `vercel deploy --prebuilt --prod`
- **Secret VERCEL_TOKEN renovado** con token vivo de sesión OIDC

### Corregido

- **`vercel.json`:** — `productionUrl` eliminado (no es propiedad válida)
- **`vercel.json`:** — `regions` reducido a `["fra1"]` (Hobby plan no soporta multi-región)

### Cambiado

- **`README.md`:** → plantillas reutilizable, badges profesionales, checklist
  guiado
- **vercel.json:** → configuración completa de producción con headers y rewrites
- **`.github/workflows/ci.yml`:** → nombre: CI/CD, estructura de etapas multijob, validadores
- **`.github/workflows/deploy.yml`:** → nombre: Deploy → production, validaciones mejoradas
- **`vercel.json`:** → configuración multi-región y producción canónica
- **`vercel.json`:** → milisegundos cambio: modificación de producción desde prebuilt con LEGADO
- **`vercel.json`:** → capa de encabezados e rewrites agregados
- **`README.md`:** → agregados formatos de badges (enlace wikis para badges)
- **`README.md`:** → importante histórico reemplazado por checklists de despliegue

### Corrigió

- **`README.md`:** → URLs rotas en badges (`.github.com/.../releases`)
- **`README.md`:** → Títulos reemplazados por enlaces combinados de badges
- **`README.md`:** → requisitos del proyecto `README.md` formatados mejorados

### Deprecado

- **`vercel.json`:** → El antiguo deploy de un solo job en `vercel.com` reemplazado por la integración nativa de Vercel + Vercel CLI
- **`.github/workflows/ci.yml`:** → workflow reducido para deployments más rápidos
- **`.github/workflows/deploy.yml`:** → Capa separada `pipeline de despliegue`
- **`vercel.json`:** → documentación de “forms” obsoleta, etiquetas consistentes con 🔐 emojis

---

## [0.2.0] — 2026-06-10

### Añadido

- **Visita guiada de bienvenida** (`driver.js`): onboarding de primera visita
  (recordado en `localStorage`) que recorre Logo → Tienda → Encargo → CTA →
  Asistente. Accesible (respeta `prefers-reduced-motion`, navegable por teclado),
  popovers tematizados con el Design System NASVE y botón flotante para relanzarlo.
- **`e2e/tour.spec.ts`**: cobertura E2E del tour (autolanzado, no-repetición, relanzar).
- **`e2e/fixtures.ts`**: fixture que neutraliza el tour en el resto de la suite.
- **`CHECKLIST-PROD.md`**: checklist reutilizable web→producción (11 bloques).
- **`COSTES.md`**: coste interno real + propuesta de venta (precios verificados jun-2026).

### Cambiado

- `ROADMAP.md`: registra la visita guiada como UX transversal.
- `DEPLOYMENT.md`: corrige desfase — pagos son Fase 5 (Fase 4 = chatbot).
- `main` protegida: PR obligatorio, 2 status checks CI (strict), historia lineal,
  sin force-push/deletes, resolución de conversaciones obligatoria.

### Tests

- Unit (Vitest): 54/54 · E2E (Playwright): 11/11 · CI en verde.

[0.3.0]: https://github.com/Soluciones-Alexendros/ecom-graficasnasve/releases
[0.2.0]: https://github.com/Soluciones-Alexendros/ecom-graficasnasve/releases

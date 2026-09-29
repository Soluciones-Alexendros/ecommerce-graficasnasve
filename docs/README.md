# Documentación de ecommerce-graficasnasve

### Propósito de este documento

- **Objetivos:** Indexar la documentación de producto (ADRs, guías y runbooks) y apuntar a los contratos de la raíz.
- **Estructura:** Tabla de rutas `docs/` → enlaces a README, AGENTS, ARCHITECTURE, CONTRIBUTING y SECURITY.
- **Contenido a integrar según contexto:** Adapta el índice al árbol de este repo. Conserva `docs/config/` y `docs/scripts/` (deploy). No copies guías de CLI.

| Ruta                                                 | Para qué                                |
| ---------------------------------------------------- | --------------------------------------- |
| [architecture/decisions/](./architecture/decisions/) | ADRs                                    |
| [guides/desarrollo.md](./guides/desarrollo.md)       | Arranque local y PR                     |
| [guides/calidad.md](./guides/calidad.md)             | Coverage y jobs de CI                   |
| [guides/tienda.md](./guides/tienda.md)               | Catálogo estático y estimador de precio |
| [runbooks/ci-deploy.md](./runbooks/ci-deploy.md)     | Fallos de CI y deploy Vercel            |
| [runbooks/presupuesto.md](./runbooks/presupuesto.md) | Diagnosticar alta de presupuesto        |
| [config/](./config/)                                 | Copia de `vercel.json` de referencia    |
| [scripts/](./scripts/)                               | Copias de workflows de CI/deploy        |

En la raíz: [README.md](../README.md), [AGENTS.md](../AGENTS.md), [ARCHITECTURE.md](../ARCHITECTURE.md), [CONTRIBUTING.md](../CONTRIBUTING.md), [SECURITY.md](../SECURITY.md), [DEPLOYMENT.md](../DEPLOYMENT.md).

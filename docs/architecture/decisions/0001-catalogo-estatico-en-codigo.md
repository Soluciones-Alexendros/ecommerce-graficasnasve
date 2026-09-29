# ADR 0001 — Catálogo y precio estáticos en código

### Propósito de este documento

- **Objetivos:** Registrar por qué la tienda no usa una tabla Supabase para productos ni tarifas.
- **Estructura:** Contexto → decisión → consecuencias.
- **Contenido a integrar según contexto:** Esta decisión es de NASVE. No la sustituyas por un CMS ni por el catálogo de otro e-commerce.

## Contexto

La tienda de preformatos debe ser SSG total, con tests deterministas y sin dependencia de red en el build. El taller aún no ha cerrado una tarifa canónica en base de datos.

## Decisión

- Productos y slugs viven en `src/lib/catalogoTienda.ts`.
- El estimador vive en `src/lib/precioTienda.ts` (coeficientes orientativos).
- Supabase se reserva para presupuestos, pedidos, portfolio y Storage `arte-files`.

## Consecuencias

- Un SKU nuevo es un cambio de código + tests, no un `INSERT`.
- Los precios en ficha son orientativos hasta sustituir coeficientes por la tarifa real.
- La alineación al canon de repo **no** mueve el catálogo a Supabase.

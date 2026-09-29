/**
 * graficasnasve.art — Serialización segura de JSON-LD para `<script type="application/ld+json">`.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

/**
 * Serializa un objeto JSON-LD a cadena de texto, escapando los caracteres que
 * podrían romper el cierre de la etiqueta `<script>` o permitir inyección.
 *
 * - `<` → `\u003c`
 * - `>` → `\u003e`
 * - `&` → `\u0026`
 *
 * No utiliza `dangerouslySetInnerHTML`, por lo que React puede escapar el
 * contenido como texto seguro dentro del `<script>`.
 */
export function serializeJsonLd<T>(data: T): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026')
}

/**
 * graficasnasve.art — Marca de registro (crosshair de imprenta)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsMarcaRegistro {
  size?: number
  className?: string
}

export function MarcaRegistro({ size = 16, className = 'text-ambar' }: PropsMarcaRegistro) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="6" />
      <line x1="12" y1="0" x2="12" y2="24" />
      <line x1="0" y1="12" x2="24" y2="12" />
    </svg>
  )
}

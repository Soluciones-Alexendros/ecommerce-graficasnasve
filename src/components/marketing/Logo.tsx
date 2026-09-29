/**
 * graficasnasve.art — Logo (marca cuarto-de-círculo CMYK + wordmark «nasve.»)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsLogo {
  /** color del wordmark según la superficie */
  variant?: 'light' | 'dark'
  /** lado en px de la marca */
  size?: number
  className?: string
  /** oculta el wordmark, deja solo la marca */
  soloMarca?: boolean
}

/** Marca: círculo dividido en cuatro cuartos de color (evocación CMYK). */
function Marca({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M12 12 V2 A10 10 0 0 1 22 12 Z" fill="var(--ambar)" />
      <path d="M12 12 H22 A10 10 0 0 1 12 22 Z" fill="var(--cyan)" />
      <path d="M12 12 V22 A10 10 0 0 1 2 12 Z" fill="var(--coral)" />
      <path d="M12 12 H2 A10 10 0 0 1 12 2 Z" fill="var(--key)" />
    </svg>
  )
}

export function Logo({ variant = 'light', size = 28, className = '', soloMarca = false }: PropsLogo) {
  const colorTexto = variant === 'dark' ? 'text-paper-0' : 'text-key'
  return (
    <span className={['inline-flex items-center gap-2', className].filter(Boolean).join(' ')}>
      <Marca size={size} />
      {!soloMarca && (
        <span className={['font-display font-extrabold text-2xl tracking-tight lowercase', colorTexto].join(' ')}>
          nasve<span className="text-coral">.</span>
        </span>
      )}
    </span>
  )
}

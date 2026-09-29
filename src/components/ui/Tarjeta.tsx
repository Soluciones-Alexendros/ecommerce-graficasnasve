/**
 * graficasnasve.art — Tarjeta (superficie papel con sombra dura offset)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsTarjeta {
  children: React.ReactNode
  /** muestra la barra CMYK como cabecera de la tarjeta */
  barraCMYK?: boolean
  className?: string
}

export function Tarjeta({ children, barraCMYK = false, className = '' }: PropsTarjeta) {
  return (
    <div
      className={['bg-paper-0 rounded-card border border-key/10 shadow-duro overflow-hidden', className]
        .filter(Boolean)
        .join(' ')}
    >
      {barraCMYK && (
        <div className="flex h-1.5 w-full" aria-hidden="true">
          <span className="flex-1 bg-cyan" />
          <span className="flex-1 bg-coral" />
          <span className="flex-1 bg-ambar" />
          <span className="flex-1 bg-key" />
        </div>
      )}
      {children}
    </div>
  )
}

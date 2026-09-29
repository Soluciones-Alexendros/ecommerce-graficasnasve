/**
 * graficasnasve.art — Barra CMYK (motivo recurrente del DS)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsBarraCMYK {
  className?: string
  /** altura en px (por defecto 4) */
  height?: number
}

export function BarraCMYK({ className = '', height = 4 }: PropsBarraCMYK) {
  return (
    <div
      className={['flex w-full overflow-hidden', className].filter(Boolean).join(' ')}
      style={{ height }}
      aria-hidden="true"
    >
      <span className="flex-1 bg-cyan" />
      <span className="flex-1 bg-coral" />
      <span className="flex-1 bg-ambar" />
      <span className="flex-1 bg-key" />
    </div>
  )
}

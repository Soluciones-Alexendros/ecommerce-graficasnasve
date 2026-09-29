/**
 * graficasnasve.art — Crop marks (marcas de corte decorativas)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsCropMarks {
  children: React.ReactNode
  className?: string
}

const esquina = 'absolute w-3 h-3 border-key/40 pointer-events-none'

export function CropMarks({ children, className = '' }: PropsCropMarks) {
  return (
    <div className={['relative', className].filter(Boolean).join(' ')}>
      <span className={[esquina, '-top-1 -left-1 border-t border-l'].join(' ')} aria-hidden="true" />
      <span className={[esquina, '-top-1 -right-1 border-t border-r'].join(' ')} aria-hidden="true" />
      <span className={[esquina, '-bottom-1 -left-1 border-b border-l'].join(' ')} aria-hidden="true" />
      <span className={[esquina, '-bottom-1 -right-1 border-b border-r'].join(' ')} aria-hidden="true" />
      {children}
    </div>
  )
}

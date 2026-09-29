/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropiedadesBadge {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, className = '' }: PropiedadesBadge) {
  return (
    <span
      className={[
        'inline-block text-xs font-mono font-medium uppercase tracking-widest text-gris border-b border-borde pb-0.5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

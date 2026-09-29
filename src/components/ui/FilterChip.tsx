/**
 * graficasnasve.art — FilterChip (pill de filtro interactivo)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import React from 'react'

interface PropsFilterChip extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
  children: React.ReactNode
}

export function FilterChip({ active = false, children, className = '', ...props }: PropsFilterChip) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={[
        'rounded-pill px-4 py-1.5 font-sans text-sm font-medium transition-colors duration-150 cursor-pointer',
        active
          ? 'bg-key text-paper-0 border border-key'
          : 'bg-transparent text-key border border-taupe hover:border-key',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}

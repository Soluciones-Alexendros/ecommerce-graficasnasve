/**
 * graficasnasve.art — Stepper (indicador de pasos del encargo asistido)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { Check } from 'lucide-react'

interface PropsStepper {
  pasos: string[]
  /** índice del paso actual (0-based) */
  actual: number
  className?: string
}

export function Stepper({ pasos, actual, className = '' }: PropsStepper) {
  return (
    <ol
      className={['flex items-center gap-2 w-full', className].filter(Boolean).join(' ')}
      aria-label="Progreso del encargo"
    >
      {pasos.map((paso, i) => {
        const completado = i < actual
        const activo = i === actual
        return (
          <li key={paso} className="flex items-center gap-2 flex-1 last:flex-none">
            <div className="flex items-center gap-2 shrink-0">
              <span
                className={[
                  'flex items-center justify-center w-7 h-7 rounded-pill font-mono text-xs font-semibold shrink-0',
                  completado
                    ? 'bg-cyan text-paper-0'
                    : activo
                      ? 'bg-key text-paper-0'
                      : 'bg-transparent text-gris border border-taupe',
                ].join(' ')}
                aria-current={activo ? 'step' : undefined}
              >
                {completado ? <Check size={14} /> : String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={[
                  'hidden sm:inline font-sans text-sm font-medium',
                  activo ? 'text-key' : completado ? 'text-cyan' : 'text-gris',
                ].join(' ')}
              >
                {paso}
              </span>
            </div>
            {i < pasos.length - 1 && (
              <span
                className={['h-px flex-1 min-w-4', completado ? 'bg-cyan' : 'bg-taupe'].join(' ')}
                aria-hidden="true"
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

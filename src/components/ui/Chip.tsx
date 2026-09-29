/**
 * graficasnasve.art — Chip (etiqueta pill mono uppercase)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

export type TonoChip = 'key' | 'ambar' | 'cyan' | 'sky' | 'coral' | 'spot-blue' | 'lavender' | 'plain'

const tonos: Record<TonoChip, string> = {
  key: 'bg-key text-paper-0',
  ambar: 'bg-ambar/20 text-ambar-700',
  cyan: 'bg-cyan/20 text-cyan',
  sky: 'bg-sky/40 text-key',
  coral: 'bg-coral/15 text-coral',
  'spot-blue': 'bg-spot-blue/15 text-spot-blue',
  lavender: 'bg-lavender/20 text-lavender',
  plain: 'bg-transparent text-key border border-taupe',
}

interface PropsChip {
  children: React.ReactNode
  tono?: TonoChip
  className?: string
}

export function Chip({ children, tono = 'plain', className = '' }: PropsChip) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-pill px-2.5 py-1 font-mono text-xs font-medium uppercase tracking-wider',
        tonos[tono],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

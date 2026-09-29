/**
 * graficasnasve.art — Baldosa (tile de color con icono geométrico)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { IconoGeometrico, type NombreIcono } from './iconosGeometricos'

export type ColorBaldosa = 'ambar' | 'coral' | 'cyan' | 'sky' | 'spot-blue' | 'lavender' | 'key'

const fondo: Record<ColorBaldosa, string> = {
  ambar: 'bg-ambar',
  coral: 'bg-coral',
  cyan: 'bg-cyan',
  sky: 'bg-sky',
  'spot-blue': 'bg-spot-blue',
  lavender: 'bg-lavender',
  key: 'bg-key',
}

// Tinta del icono: claro sobre fondos oscuros, key sobre fondos claros.
const tinta: Record<ColorBaldosa, string> = {
  ambar: 'text-key',
  coral: 'text-paper-0',
  cyan: 'text-paper-0',
  sky: 'text-key',
  'spot-blue': 'text-paper-0',
  lavender: 'text-paper-0',
  key: 'text-paper-0',
}

const radios = {
  baldosa: 'rounded-baldosa',
  top: 'rounded-t-baldosa',
  none: '',
} as const

interface PropsBaldosa {
  color: ColorBaldosa
  /** icono geométrico (ignorado si se pasan children) */
  icono?: NombreIcono
  /** lado en px del icono geométrico */
  iconSize?: number
  /** fuerza proporción cuadrada (por defecto sí) */
  cuadrada?: boolean
  /** redondeo (por defecto baldosa); 'none' para cabeceras de tarjeta */
  radius?: keyof typeof radios
  className?: string
  /** contenido alternativo al icono geométrico (p. ej. un icono lucide) */
  children?: React.ReactNode
}

export function Baldosa({
  color,
  icono,
  iconSize = 48,
  cuadrada = true,
  radius = 'baldosa',
  className = '',
  children,
}: PropsBaldosa) {
  return (
    <div
      className={[
        'flex items-center justify-center',
        radios[radius],
        cuadrada ? 'aspect-square' : '',
        fondo[color],
        tinta[color],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children ?? (icono ? <IconoGeometrico nombre={icono} size={iconSize} /> : null)}
    </div>
  )
}

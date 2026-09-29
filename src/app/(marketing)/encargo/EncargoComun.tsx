/**
 * graficasnasve.art — Componentes compartidos del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { Check, Diamond, Square } from 'lucide-react'

/** Botón de opción seleccionable (chip grande con check). */
export function Opcion({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={[
        'flex items-center justify-between gap-2 rounded-card border px-4 py-3 font-sans text-sm font-medium transition-colors text-left',
        selected ? 'border-ambar bg-ambar/10 text-key' : 'border-taupe text-key hover:border-key',
      ].join(' ')}
    >
      <span>{children}</span>
      {selected && <Check size={16} className="text-ambar-700 shrink-0" />}
    </button>
  )
}

export const PREFLIGHT = [
  { estado: 'ok', titulo: 'Formato y sangre', detalle: '210×297 mm + 3 mm de sangre detectados' },
  { estado: 'ok', titulo: 'Resolución', detalle: 'Imágenes a 312 ppp · óptimo para offset' },
  { estado: 'aviso', titulo: 'Modo de color', detalle: 'Archivo en RGB → lo convertimos a CMYK ISO Coated v2' },
  { estado: 'ok', titulo: 'Tipografías', detalle: 'Incrustadas o trazadas · correcto' },
  { estado: 'info', titulo: 'Marcas de corte', detalle: 'No incluidas · las añadimos nosotros' },
] as const

export function IconoEstado({ estado }: { estado: 'ok' | 'aviso' | 'info' }) {
  if (estado === 'ok') return <Check size={16} className="text-cyan shrink-0 mt-0.5" />
  if (estado === 'aviso') return <Diamond size={14} className="text-ambar fill-ambar shrink-0 mt-1" />
  return <Square size={13} className="text-spot-blue fill-spot-blue shrink-0 mt-1" />
}

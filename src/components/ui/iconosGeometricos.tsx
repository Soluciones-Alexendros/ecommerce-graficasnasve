/**
 * graficasnasve.art — Iconos geométricos del DS (motivo «baldosa»)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 *
 * SVGs monocromos (currentColor) que visten las baldosas de color: el
 * vocabulario de imprenta del deck (barras de tinta, cuarto CMYK, etc.).
 */

import React from 'react'

export type NombreIcono = 'barras' | 'cuarto' | 'mediaLuna' | 'estrella' | 'anillo' | 'puntos' | 'gota'

interface PropsIcono {
  size?: number
  className?: string
}

function svg(children: React.ReactNode) {
  return function Icono({ size = 24, className = '' }: PropsIcono) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        {children}
      </svg>
    )
  }
}

const Barras = svg(
  <>
    <rect x="4" y="6" width="16" height="3" rx="1.5" />
    <rect x="4" y="10.5" width="16" height="3" rx="1.5" />
    <rect x="4" y="15" width="16" height="3" rx="1.5" />
  </>,
)

const Cuarto = svg(
  <>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 12 L12 3 A9 9 0 0 1 21 12 Z" />
    <path d="M12 12 L12 21 A9 9 0 0 1 3 12 Z" />
  </>,
)

const MediaLuna = svg(
  <>
    <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 3 a9 9 0 0 0 0 18 Z" />
  </>,
)

const Estrella = svg(<path d="M12 2 C12 7 17 12 22 12 C17 12 12 17 12 22 C12 17 7 12 2 12 C7 12 12 7 12 2 Z" />)

const Anillo = svg(<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="4" />)

const Puntos = svg(
  <>
    <circle cx="8.5" cy="8.5" r="2.6" />
    <circle cx="15.5" cy="8.5" r="2.6" />
    <circle cx="8.5" cy="15.5" r="2.6" />
    <circle cx="15.5" cy="15.5" r="2.6" />
  </>,
)

const Gota = svg(<path d="M12 3 C12 3 5 11 5 15 a7 7 0 0 0 14 0 C19 11 12 3 12 3 Z" />)

export const ICONOS: Record<NombreIcono, React.FC<PropsIcono>> = {
  barras: Barras,
  cuarto: Cuarto,
  mediaLuna: MediaLuna,
  estrella: Estrella,
  anillo: Anillo,
  puntos: Puntos,
  gota: Gota,
}

export function IconoGeometrico({ nombre, size, className }: { nombre: NombreIcono } & PropsIcono) {
  const Cmp = ICONOS[nombre]
  return <Cmp size={size} className={className} />
}

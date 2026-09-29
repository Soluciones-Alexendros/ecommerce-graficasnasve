/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import React from 'react'

type VarianteBoton = 'primary' | 'secondary' | 'ghost' | 'dark'
type TamanoBoton = 'sm' | 'md' | 'lg'

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: VarianteBoton
  size?: TamanoBoton
  asChild?: boolean
  className?: string
}

const clasesTamano: Record<TamanoBoton, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-md',
}

const clasesVariante: Record<VarianteBoton, string> = {
  // Ámbar con sombra dura offset que se «hunde» al pulsar (motivo imprenta).
  primary:
    'bg-ambar text-key border border-key shadow-duro-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none focus-visible:translate-x-[2px] focus-visible:translate-y-[2px] focus-visible:shadow-none',
  // Contorno key sobre papel.
  secondary:
    'bg-transparent text-key border border-key hover:bg-key hover:text-paper-0 focus-visible:bg-key focus-visible:text-paper-0',
  // Para superficies oscuras (key): contorno papel.
  ghost:
    'bg-transparent text-paper-0 border border-paper-0 hover:bg-paper-0 hover:text-key focus-visible:bg-paper-0 focus-visible:text-key',
  // Relleno key (submit del formulario).
  dark: 'bg-key text-paper-0 border border-key hover:bg-ambar hover:text-key hover:border-key focus-visible:bg-ambar focus-visible:text-key',
}

const clasesBase =
  'inline-flex items-center justify-center gap-2 rounded-pill font-sans font-semibold tracking-wide transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ambar'

export function Boton({
  variant = 'primary',
  size = 'md',
  asChild = false,
  className = '',
  children,
  ...props
}: PropiedadesBoton) {
  const clases = [clasesBase, clasesVariante[variant], clasesTamano[size], className].filter(Boolean).join(' ')

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<{ className?: string }>, {
      className: [clases, (children as React.ReactElement<{ className?: string }>).props.className ?? '']
        .filter(Boolean)
        .join(' '),
    })
  }

  return (
    <button className={clases} {...props}>
      {children}
    </button>
  )
}

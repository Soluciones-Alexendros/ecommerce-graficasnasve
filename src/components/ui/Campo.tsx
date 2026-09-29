/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import React from 'react'

type PropiedadesCampoBase = {
  label: string
  error?: string
  className?: string
}

type PropiedadesInput = PropiedadesCampoBase &
  React.InputHTMLAttributes<HTMLInputElement> & {
    as?: 'input'
  }

type PropiedadesTextarea = PropiedadesCampoBase &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: 'textarea'
  }

type PropiedadesCampo = PropiedadesInput | PropiedadesTextarea

const clasesControl =
  'w-full rounded-card border border-taupe bg-paper-0 text-key font-sans text-base px-4 py-3 placeholder:text-gris transition-colors duration-150 focus:outline-none focus:border-ambar focus:ring-2 focus:ring-ambar/25 disabled:opacity-50 disabled:cursor-not-allowed'

export const Campo = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, PropiedadesCampo>(function Campo(
  { label, error, className = '', as, ...props },
  ref,
) {
  const id = (props as { id?: string }).id ?? label.toLowerCase().replace(/\s+/g, '-')
  const clases = [clasesControl, error ? 'border-coral focus:border-coral focus:ring-coral/20' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-mono text-xs font-medium uppercase tracking-widest text-gris">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          className={clases}
          rows={(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>).rows ?? 4}
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          id={id}
          className={clases}
          ref={ref as React.ForwardedRef<HTMLInputElement>}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      {error && (
        <p className="text-xs font-sans text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

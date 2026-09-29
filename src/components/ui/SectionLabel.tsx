/**
 * graficasnasve.art — SectionLabel (nº de lámina + marca de registro + rótulo)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { MarcaRegistro } from './MarcaRegistro'

interface PropsSectionLabel {
  /** número de lámina, p.ej. "01" */
  numero?: string
  children: React.ReactNode
  /** 'dark' invierte colores para superficies key */
  tono?: 'light' | 'dark'
  className?: string
}

export function SectionLabel({ numero, children, tono = 'light', className = '' }: PropsSectionLabel) {
  const oscuro = tono === 'dark'
  return (
    <div
      className={['flex items-center gap-3 font-mono text-xs uppercase tracking-widest', className]
        .filter(Boolean)
        .join(' ')}
    >
      {numero && (
        <span
          className={[
            'inline-flex items-center justify-center px-2 py-1 font-semibold',
            oscuro ? 'bg-paper-0 text-key' : 'bg-key text-paper-0',
          ].join(' ')}
        >
          {numero}
        </span>
      )}
      <MarcaRegistro size={12} className="text-ambar shrink-0" />
      <span className={oscuro ? 'text-paper-100/60' : 'text-gris'}>{children}</span>
    </div>
  )
}

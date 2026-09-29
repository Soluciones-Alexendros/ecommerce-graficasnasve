/**
 * graficasnasve.art — SpecTable (tabla de specs con filas alternas)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

export interface FilaSpec {
  label: string
  valor: React.ReactNode
}

interface PropsSpecTable {
  filas: FilaSpec[]
  className?: string
}

export function SpecTable({ filas, className = '' }: PropsSpecTable) {
  return (
    <dl className={['rounded-card overflow-hidden border border-key/10', className].filter(Boolean).join(' ')}>
      {filas.map(({ label, valor }) => (
        <div key={label} className="flex items-start justify-between gap-4 px-4 py-3 odd:bg-paper-50 even:bg-paper-0">
          <dt className="font-mono text-xs uppercase tracking-widest text-gris pt-0.5">{label}</dt>
          <dd className="font-sans text-sm font-medium text-key text-right">{valor}</dd>
        </div>
      ))}
    </dl>
  )
}

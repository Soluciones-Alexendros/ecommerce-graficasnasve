/**
 * graficasnasve.art — Stat (cifra grande Archivo + caption mono)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

interface PropsStat {
  valor: string
  caption: string
  className?: string
}

export function Stat({ valor, caption, className = '' }: PropsStat) {
  return (
    <div className={['flex flex-col', className].filter(Boolean).join(' ')}>
      <span className="font-display font-extrabold text-3xl text-key leading-none">{valor}</span>
      <span className="mt-1 font-mono text-xs uppercase tracking-widest text-gris">{caption}</span>
    </div>
  )
}

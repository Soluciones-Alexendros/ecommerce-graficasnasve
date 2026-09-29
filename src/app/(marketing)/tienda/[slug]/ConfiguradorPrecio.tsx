/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Boton } from '@/components/ui/Boton'
import { type ProductoTienda, tipoPresupuestoDe } from '@/lib/catalogoTienda'
import { estimarPrecioUnitario, estimarTotal, formatearEuros, formatearPrecioUnidad } from '@/lib/precioTienda'

const CLASES_SELECT =
  'w-full rounded-card border border-taupe bg-paper-0 text-key font-sans text-base px-4 py-3 transition-colors duration-150 focus:outline-none focus:border-ambar focus:ring-2 focus:ring-ambar/25'
const CLASES_LABEL = 'font-mono text-xs font-medium uppercase tracking-widest text-gris'

interface PropiedadesConfigurador {
  producto: ProductoTienda
}

export function ConfiguradorPrecio({ producto }: PropiedadesConfigurador) {
  const [gramajeId, setGramajeId] = useState(producto.gramajes[0].id)
  const [acabadoId, setAcabadoId] = useState(producto.acabados[0].id)
  const [cantidad, setCantidad] = useState(producto.cantidades[0])

  const gramaje = producto.gramajes.find((g) => g.id === gramajeId) ?? producto.gramajes[0]
  const acabado = producto.acabados.find((a) => a.id === acabadoId) ?? producto.acabados[0]

  const parametros = {
    precioBase: producto.precioBase,
    cantidad,
    factorGramaje: gramaje.factor,
    factorAcabado: acabado.factor,
  }
  const precioUnidad = estimarPrecioUnitario(parametros)
  const total = estimarTotal(parametros)

  const etiquetaGramaje = producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte'

  const detalle = `${producto.nombre} · ${producto.formato} · ${gramaje.etiqueta} · ${acabado.etiqueta} · ${cantidad} ud (estimación orientativa ${formatearEuros(total)})`
  const hrefPresupuesto = `/presupuesto?producto=${tipoPresupuestoDe(producto)}&detalle=${encodeURIComponent(detalle)}`

  const idBase = `cfg-${producto.slug}`

  return (
    <div className="rounded-card border border-taupe bg-paper-50 p-6">
      <h2 className="font-display text-xl font-bold text-key mb-5">Configura tu pedido</h2>

      <div className="flex flex-col gap-5">
        {producto.gramajes.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${idBase}-gramaje`} className={CLASES_LABEL}>
              {etiquetaGramaje}
            </label>
            <select
              id={`${idBase}-gramaje`}
              value={gramajeId}
              onChange={(e) => setGramajeId(e.target.value)}
              className={CLASES_SELECT}
            >
              {producto.gramajes.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.etiqueta}
                </option>
              ))}
            </select>
          </div>
        )}

        {producto.acabados.length > 1 && (
          <div className="flex flex-col gap-1.5">
            <label htmlFor={`${idBase}-acabado`} className={CLASES_LABEL}>
              Acabado
            </label>
            <select
              id={`${idBase}-acabado`}
              value={acabadoId}
              onChange={(e) => setAcabadoId(e.target.value)}
              className={CLASES_SELECT}
            >
              {producto.acabados.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.etiqueta}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${idBase}-cantidad`} className={CLASES_LABEL}>
            Cantidad
          </label>
          <select
            id={`${idBase}-cantidad`}
            value={cantidad}
            onChange={(e) => setCantidad(Number(e.target.value))}
            className={CLASES_SELECT}
          >
            {producto.cantidades.map((c) => (
              <option key={c} value={c}>
                {c.toLocaleString('es-ES')} ud
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Estimación */}
      <div className="mt-6 pt-5 border-t border-taupe" aria-live="polite">
        <div className="flex items-baseline justify-between">
          <span className="font-sans text-sm text-gris">Precio por unidad</span>
          <span className="font-display text-xl font-bold text-key" data-testid="precio-unidad">
            {formatearPrecioUnidad(precioUnidad)}
          </span>
        </div>
        <div className="flex items-baseline justify-between mt-2">
          <span className="font-sans text-sm text-gris">Total estimado · {cantidad.toLocaleString('es-ES')} ud</span>
          <span className="font-display text-2xl font-bold text-ambar-700" data-testid="precio-total">
            {formatearEuros(total)}
          </span>
        </div>
        <p className="font-mono text-xs text-gris mt-3 leading-relaxed">
          Estimación orientativa (IVA no incluido). El precio definitivo se confirma en el presupuesto según archivo y
          acabados.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-6">
        <Boton variant="primary" size="lg" asChild className="w-full">
          <Link href={hrefPresupuesto}>Pedir presupuesto de este producto</Link>
        </Boton>
      </div>
    </div>
  )
}

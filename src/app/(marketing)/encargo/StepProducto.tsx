/**
 * graficasnasve.art — Paso 0: elección de producto del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { catalogoTienda, ESTILO_CATEGORIA, type ProductoTienda } from '@/lib/catalogoTienda'
import { Baldosa } from '@/components/ui/Baldosa'

interface PropsStepProducto {
  onElegir: (producto: ProductoTienda) => void
}

export function StepProducto({ onElegir }: PropsStepProducto) {
  return (
    <div>
      <h2 className="font-display font-bold text-2xl text-key mb-6">Elige tu producto</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {catalogoTienda.map((p) => {
          const est = ESTILO_CATEGORIA[p.categoria]
          return (
            <button
              key={p.slug}
              type="button"
              onClick={() => onElegir(p)}
              className="group text-left rounded-card border border-taupe bg-paper-0 overflow-hidden hover:border-key transition-colors"
            >
              <Baldosa
                color={est.color}
                icono={est.icono}
                cuadrada={false}
                radius="none"
                iconSize={40}
                className="w-full aspect-[3/2]"
              />
              <span className="block p-3 font-sans text-sm font-medium text-key">{p.nombre}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

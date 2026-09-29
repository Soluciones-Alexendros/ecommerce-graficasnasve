/**
 * graficasnasve.art — Paso 1: especificaciones del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import type { ProductoTienda } from '@/lib/catalogoTienda'
import { Opcion } from './EncargoComun'

interface PropsStepEspecificaciones {
  producto: ProductoTienda
  gramajeId: string
  acabadoId: string
  cantidad: number
  onGramaje: (id: string) => void
  onAcabado: (id: string) => void
  onCantidad: (cantidad: number) => void
}

export function StepEspecificaciones({
  producto,
  gramajeId,
  acabadoId,
  cantidad,
  onGramaje,
  onAcabado,
  onCantidad,
}: PropsStepEspecificaciones) {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-display font-bold text-2xl text-key">Configura tu {producto.nombre.toLowerCase()}</h2>

      {producto.gramajes.length > 1 && (
        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">
            {producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte'}
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {producto.gramajes.map((g) => (
              <Opcion key={g.id} selected={g.id === gramajeId} onClick={() => onGramaje(g.id)}>
                {g.etiqueta}
              </Opcion>
            ))}
          </div>
          <p className="mt-3 rounded-card bg-paper-50 border border-taupe px-4 py-2 font-sans text-sm text-gris">
            Grosor del papel. Más alto = más rígido y premium.
          </p>
        </fieldset>
      )}

      {producto.acabados.length > 1 && (
        <fieldset>
          <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">Acabado</legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {producto.acabados.map((a) => (
              <Opcion key={a.id} selected={a.id === acabadoId} onClick={() => onAcabado(a.id)}>
                {a.etiqueta}
              </Opcion>
            ))}
          </div>
        </fieldset>
      )}

      <fieldset>
        <legend className="font-mono text-xs uppercase tracking-widest text-gris mb-3">Cantidad</legend>
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
          {producto.cantidades.map((c) => (
            <Opcion key={c} selected={c === cantidad} onClick={() => onCantidad(c)}>
              {c.toLocaleString('es-ES')} ud
            </Opcion>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

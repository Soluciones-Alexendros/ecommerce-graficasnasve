/**
 * graficasnasve.art — Encargo asistido (orquestador de 4 pasos).
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { Loader2 } from 'lucide-react'
import { formatearPrecioUnidad, formatearEuros } from '@/lib/precioTienda'
import { etiquetaCategoria } from '@/lib/catalogoTienda'
import { Stepper } from '@/components/ui/Stepper'
import { Boton } from '@/components/ui/Boton'
import { Baldosa } from '@/components/ui/Baldosa'
import { BarraCMYK } from '@/components/ui/BarraCMYK'
import { Chip } from '@/components/ui/Chip'
import { useEncargo } from './useEncargo'
import { StepProducto } from './StepProducto'
import { StepEspecificaciones } from './StepEspecificaciones'
import { StepArchivo } from './StepArchivo'
import { StepPresupuesto } from './StepPresupuesto'

const PASOS = ['Producto', 'Especificaciones', 'Tu archivo', 'Presupuesto']

interface PropsEncargoFlow {
  productoSlugInicial?: string
}

export function EncargoFlow({ productoSlugInicial }: PropsEncargoFlow) {
  const e = useEncargo(productoSlugInicial)

  if (e.estado === 'success') {
    return (
      <div className="rounded-card border border-key/10 bg-paper-0 shadow-duro p-10 text-center max-w-xl mx-auto">
        <Baldosa color="cyan" icono="anillo" cuadrada={false} className="w-16 h-16 mx-auto mb-6" iconSize={36} />
        <h2 className="font-display font-extrabold text-2xl text-key mb-2">Encargo recibido</h2>
        <p className="font-sans text-sm text-gris mb-6">
          Te enviaremos el presupuesto cerrado y una prueba de color en menos de 24 h laborables.
        </p>
        <div className="inline-flex flex-col items-center gap-1 rounded-card border border-taupe bg-paper-50 px-6 py-4">
          <span className="font-mono text-xs uppercase tracking-widest text-gris">Tu referencia</span>
          <span className="font-mono text-lg font-semibold text-key">{e.referencia}</span>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-10">
        <Stepper pasos={PASOS} actual={e.paso} />
      </div>

      <div className="grid lg:grid-cols-[1fr_20rem] gap-10 items-start">
        {/* Contenido del paso */}
        <div className="min-w-0">
          {e.paso === 0 && <StepProducto onElegir={e.elegirProducto} />}

          {e.paso === 1 && e.producto && (
            <StepEspecificaciones
              producto={e.producto}
              gramajeId={e.gramajeId}
              acabadoId={e.acabadoId}
              cantidad={e.cantidad}
              onGramaje={e.setGramajeId}
              onAcabado={e.setAcabadoId}
              onCantidad={e.setCantidad}
            />
          )}

          {e.paso === 2 && e.producto && (
            <StepArchivo
              archivoNombre={e.archivoNombre}
              sinArte={e.sinArte}
              onArchivo={e.setArchivoNombre}
              onSinArte={e.setSinArte}
            />
          )}

          {e.paso === 3 && e.producto && (
            <StepPresupuesto
              nombre={e.nombre}
              setNombre={e.setNombre}
              empresa={e.empresa}
              setEmpresa={e.setEmpresa}
              email={e.email}
              setEmail={e.setEmail}
              telefono={e.telefono}
              setTelefono={e.setTelefono}
              rgpd={e.rgpd}
              setRgpd={e.setRgpd}
              errorMsg={e.errorMsg}
            />
          )}

          {/* Navegación */}
          <div className="mt-10 flex items-center justify-between gap-4">
            {e.paso > 0 ? (
              <Boton variant="secondary" size="md" onClick={() => e.setPaso(e.paso - 1)}>
                Atrás
              </Boton>
            ) : (
              <span />
            )}
            {e.paso > 0 && e.paso < 3 && (
              <Boton variant="primary" size="md" onClick={() => e.setPaso(e.paso + 1)}>
                Continuar
              </Boton>
            )}
            {e.paso === 3 && (
              <Boton variant="dark" size="md" onClick={e.enviar} disabled={e.estado === 'loading'} className="min-w-52">
                {e.estado === 'loading' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  'Enviar y pedir presupuesto'
                )}
              </Boton>
            )}
          </div>
        </div>

        {/* Aside resumen (sticky, oscuro) */}
        {e.producto && (
          <aside className="lg:sticky lg:top-24 rounded-card bg-key text-paper-100 overflow-hidden">
            <BarraCMYK height={6} />
            <div className="p-6">
              <p className="font-display font-bold text-lg text-paper-0">{e.producto.nombre}</p>
              <p className="font-mono text-xs uppercase tracking-widest text-paper-100/50 mb-5">
                {etiquetaCategoria(e.producto.categoria)}
              </p>
              <dl className="flex flex-col gap-2.5 font-mono text-xs">
                {[
                  ['Cantidad', `${e.cantidad.toLocaleString('es-ES')} ud`],
                  ['Formato', e.producto.formato],
                  [
                    e.producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte',
                    e.gramaje?.etiqueta ?? '—',
                  ],
                  ['Acabado', e.acabado?.etiqueta ?? '—'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="uppercase tracking-widest text-paper-100/50">{k}</dt>
                    <dd className="text-right text-paper-0">{v}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 pt-5 border-t border-paper-100/15">
                <p className="font-mono text-xs uppercase tracking-widest text-paper-100/50">Estimado</p>
                <p className="font-display font-extrabold text-3xl text-ambar leading-tight">
                  {formatearPrecioUnidad(e.precioUnidad)}{' '}
                  <span className="text-base font-semibold text-paper-100/70">/ud</span>
                </p>
                <p className="font-mono text-xs text-paper-100/50 mt-1">
                  ≈ {formatearEuros(e.total)} total · orientativo
                </p>
              </div>
              <div className="mt-4">
                <Chip tono="ambar">Respuesta &lt; 24 h</Chip>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}

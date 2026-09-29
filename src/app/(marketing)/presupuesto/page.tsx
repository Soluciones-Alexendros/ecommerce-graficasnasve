/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { FormularioPresupuesto } from '@/components/formularios/FormularioPresupuesto'
import type { ProductoPresupuesto } from '@/types/supabase'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Tarjeta } from '@/components/ui/Tarjeta'

export const metadata: Metadata = {
  title: 'Solicitar Presupuesto — Gráficas NASVE',
  description:
    'Solicita presupuesto sin compromiso para tu proyecto de impresión. Respondemos en menos de 24 horas laborables.',
}

const PRODUCTOS_VALIDOS: ProductoPresupuesto[] = ['papeleria', 'catalogo', 'libro', 'carpeteria', 'otro']

interface PropiedadesPagina {
  // La tienda enlaza aquí con ?producto=<tipo>&detalle=<resumen> para prefijar el formulario.
  searchParams: Promise<{ producto?: string; detalle?: string }>
}

export default async function PaginaPresupuesto({ searchParams }: PropiedadesPagina) {
  const sp = await searchParams
  const productoInicial = PRODUCTOS_VALIDOS.includes(sp.producto as ProductoPresupuesto)
    ? (sp.producto as ProductoPresupuesto)
    : undefined
  const detallesInicial =
    typeof sp.detalle === 'string' && sp.detalle.length > 0 ? sp.detalle.slice(0, 2000) : undefined

  return (
    <div className="py-24">
      <div className="contenedor">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info lateral */}
          <div className="lg:col-span-4">
            <SectionLabel>Sin compromiso</SectionLabel>
            <h1 className="mt-4 font-display font-extrabold text-4xl text-key mb-5">Solicita un presupuesto</h1>
            <p className="relato text-lg text-key/80 leading-snug mb-8">
              Cuéntanos qué necesitas. Revisamos tu solicitud y respondemos con un presupuesto detallado en menos de
              24–48 horas laborables.
            </p>

            <div className="space-y-6 border-t border-taupe pt-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gris mb-1">Teléfono</p>
                <a
                  href="tel:+34961553409"
                  className="font-sans text-sm text-key hover:text-ambar-700 transition-colors"
                >
                  961 55 34 09
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gris mb-1">Email</p>
                <a
                  href="mailto:nasve@nasve.com"
                  className="font-sans text-sm text-key hover:text-ambar-700 transition-colors"
                >
                  nasve@nasve.com
                </a>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gris mb-1">Horario</p>
                <p className="font-sans text-sm text-key/80">L–J 8:00–18:00 · V 8:00–19:00</p>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-8">
            <Tarjeta barraCMYK className="p-8 md:p-10">
              <FormularioPresupuesto productoInicial={productoInicial} detallesInicial={detallesInicial} />
            </Tarjeta>
          </div>
        </div>
      </div>
    </div>
  )
}

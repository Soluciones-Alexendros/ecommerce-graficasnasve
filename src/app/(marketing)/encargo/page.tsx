/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { obtenerProductoTienda } from '@/lib/catalogoTienda'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { EncargoFlow } from './EncargoFlow'

export const metadata: Metadata = {
  title: 'Encargo asistido — Gráficas NASVE',
  description:
    'Configura tu encargo de imprenta paso a paso: producto, especificaciones, archivo con preflight automático y presupuesto en menos de 24 h.',
}

interface PropiedadesPagina {
  searchParams: Promise<{ producto?: string }>
}

export default async function PaginaEncargo({ searchParams }: PropiedadesPagina) {
  const sp = await searchParams
  const slug = sp.producto && obtenerProductoTienda(sp.producto) ? sp.producto : undefined

  return (
    <div className="py-24">
      <div className="contenedor">
        <header className="max-w-2xl mb-12">
          <SectionLabel>Encargo asistido</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">Configura tu encargo</h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            Cuatro pasos guiados — del producto al presupuesto, sin perderte. Te decimos al instante si tu archivo está
            listo para máquina.
          </p>
        </header>

        <EncargoFlow productoSlugInicial={slug} />
      </div>
    </div>
  )
}

/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { catalogoTienda } from '@/lib/catalogoTienda'
import { TiendaGrid } from './TiendaGrid'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Tienda — Gráficas NASVE',
  description:
    'Productos de imprenta listos para encargar: flyers, catálogos, tarjetas de visita, cartas de menú, gran formato y más. Estimación de precio por unidad al instante.',
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Tienda — Gráficas NASVE',
  description: 'Catálogo de productos de imprenta listos para configurar y encargar.',
  url: 'https://graficasnasve.art/tienda',
}

export default function PaginaTienda() {
  return (
    <div className="py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-12">
          <SectionLabel>Tienda online</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">Encarga tu impresión</h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            Elige un producto y te llevamos paso a paso para que tu archivo llegue perfecto a máquina. Estimación de
            precio por unidad al instante, sin compromiso.
          </p>
        </div>

        {/* Grid con filtros (client component) */}
        <TiendaGrid productos={catalogoTienda} />
      </div>
    </div>
  )
}

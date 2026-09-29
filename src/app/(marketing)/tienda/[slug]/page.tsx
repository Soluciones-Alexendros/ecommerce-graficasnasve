/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  catalogoTienda,
  obtenerProductoTienda,
  etiquetaCategoria,
  precioDesdeUnidad,
  ESTILO_CATEGORIA,
} from '@/lib/catalogoTienda'
import { formatearPrecioUnidad } from '@/lib/precioTienda'
import { serializeJsonLd } from '@/lib/jsonld'
import { ConfiguradorPrecio } from './ConfiguradorPrecio'
import { Baldosa } from '@/components/ui/Baldosa'
import { SpecTable } from '@/components/ui/SpecTable'
import { Chip } from '@/components/ui/Chip'

const BASE_URL = 'https://graficasnasve.art'

interface PropiedadesSlug {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return catalogoTienda.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: PropiedadesSlug): Promise<Metadata> {
  const { slug } = await params
  const producto = obtenerProductoTienda(slug)

  if (!producto) {
    return { title: 'Producto no encontrado' }
  }

  return {
    title: `${producto.nombre} — Tienda Gráficas NASVE`,
    description: producto.descripcionCorta,
  }
}

export default async function PaginaProducto({ params }: PropiedadesSlug) {
  const { slug } = await params
  const producto = obtenerProductoTienda(slug)

  if (!producto) {
    notFound()
  }

  const desde = precioDesdeUnidad(producto)

  const productoLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: producto.nombre,
    description: producto.descripcion,
    category: etiquetaCategoria(producto.categoria),
    brand: { '@type': 'Brand', name: 'Gráficas NASVE' },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: desde,
      offerCount: producto.cantidades.length,
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Gráficas NASVE, S.L.' },
    },
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Tienda', item: `${BASE_URL}/tienda` },
      {
        '@type': 'ListItem',
        position: 3,
        name: producto.nombre,
        item: `${BASE_URL}/tienda/${producto.slug}`,
      },
    ],
  }

  return (
    <div className="py-24">
      <script type="application/ld+json">{serializeJsonLd(productoLd)}</script>
      <script type="application/ld+json">{serializeJsonLd(breadcrumbLd)}</script>

      <div className="contenedor max-w-5xl">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-xs text-gris">
            <li>
              <Link href="/tienda" className="hover:text-key transition-colors">
                Tienda
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-key">{producto.nombre}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Visual + especificaciones */}
          <div>
            <Baldosa
              color={ESTILO_CATEGORIA[producto.categoria].color}
              icono={ESTILO_CATEGORIA[producto.categoria].icono}
              cuadrada={false}
              iconSize={88}
              className="w-full aspect-[4/3]"
            />
            <div className="mt-3 grid grid-cols-4 gap-3" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="aspect-square rounded-card bg-paper-50 border border-taupe" />
              ))}
            </div>
            <SpecTable
              className="mt-6"
              filas={[
                { label: 'Formato', valor: producto.formato },
                { label: 'Material', valor: producto.material },
                {
                  label: producto.gramajes.some((g) => g.etiqueta.includes('g/m²')) ? 'Gramaje' : 'Soporte',
                  valor: producto.gramajes.map((g) => g.etiqueta).join(' · '),
                },
                { label: 'Acabados', valor: producto.acabados.map((a) => a.etiqueta).join(' · ') },
                { label: 'Desde', valor: `${formatearPrecioUnidad(desde)} /ud` },
              ]}
            />
          </div>

          {/* Descripción + configurador */}
          <div>
            <p className="font-mono text-xs text-gris uppercase tracking-widest mb-3">
              {etiquetaCategoria(producto.categoria)}
            </p>
            <h1 className="font-display font-extrabold text-3xl md:text-4xl text-key mb-4">{producto.nombre}</h1>
            <p className="font-sans text-base text-gris leading-relaxed mb-5">{producto.descripcion}</p>
            <div className="flex flex-wrap gap-2 mb-8">
              <Chip
                tono={
                  ESTILO_CATEGORIA[producto.categoria].color === 'key'
                    ? 'plain'
                    : ESTILO_CATEGORIA[producto.categoria].color
                }
              >
                {etiquetaCategoria(producto.categoria)}
              </Chip>
              <Chip tono="plain">48 H · Taller</Chip>
            </div>

            <ConfiguradorPrecio producto={producto} />
          </div>
        </div>
      </div>
    </div>
  )
}

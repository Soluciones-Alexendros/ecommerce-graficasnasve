/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  CATEGORIAS_TIENDA,
  ESTILO_CATEGORIA,
  precioDesdeUnidad,
  etiquetaCategoria,
  type ProductoTienda,
  type CategoriaTienda,
} from '@/lib/catalogoTienda'
import { formatearPrecioUnidad } from '@/lib/precioTienda'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { Baldosa } from '@/components/ui/Baldosa'
import { Chip } from '@/components/ui/Chip'
import { FilterChip } from '@/components/ui/FilterChip'

type FiltroTienda = 'todos' | CategoriaTienda

const FILTROS: { valor: FiltroTienda; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todos' },
  ...CATEGORIAS_TIENDA.map((c) => ({ valor: c.valor, etiqueta: c.etiqueta })),
]

interface PropiedadesTiendaGrid {
  productos: ProductoTienda[]
}

export function TiendaGrid({ productos }: PropiedadesTiendaGrid) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroTienda>('todos')

  const productosFiltrados =
    filtroActivo === 'todos' ? productos : productos.filter((p) => p.categoria === filtroActivo)

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap items-center gap-2 mb-10" role="group" aria-label="Filtrar por categoría">
        <span className="font-mono text-xs uppercase tracking-widest text-gris mr-2">Filtrar</span>
        {FILTROS.map((filtro) => (
          <FilterChip
            key={filtro.valor}
            active={filtroActivo === filtro.valor}
            onClick={() => setFiltroActivo(filtro.valor)}
          >
            {filtro.etiqueta}
          </FilterChip>
        ))}
      </div>

      {/* Grid */}
      {productosFiltrados.length === 0 ? (
        <p className="font-sans text-gris text-center py-20">No hay productos en esta categoría aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {productosFiltrados.map((producto) => {
            const estilo = ESTILO_CATEGORIA[producto.categoria]
            return (
              <Link key={producto.slug} href={`/tienda/${producto.slug}`} className="group">
                <Tarjeta className="h-full flex flex-col transition-transform duration-200 group-hover:-translate-y-1">
                  {/* Visual baldosa */}
                  <div className="relative">
                    <Baldosa
                      color={estilo.color}
                      icono={estilo.icono}
                      cuadrada={false}
                      radius="none"
                      iconSize={56}
                      className="w-full aspect-[4/3]"
                    />
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      <Chip tono="key">48 H</Chip>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col flex-1 p-5">
                    <p className="font-mono text-xs text-gris uppercase tracking-wide mb-1">
                      {etiquetaCategoria(producto.categoria)}
                    </p>
                    <h3 className="font-display text-lg font-bold text-key">{producto.nombre}</h3>
                    <p className="font-sans text-sm text-gris mt-1 line-clamp-2">{producto.descripcionCorta}</p>
                    <div className="mt-4 pt-3 flex items-baseline justify-between border-t border-taupe">
                      <span className="font-sans text-sm text-key">
                        <span className="text-gris text-xs">desde </span>
                        <span className="font-semibold">{formatearPrecioUnidad(precioDesdeUnidad(producto))}</span>
                        <span className="text-gris text-xs"> /ud</span>
                      </span>
                      <span className="font-mono text-xs text-ambar-700 group-hover:translate-x-0.5 transition-transform">
                        Configurar →
                      </span>
                    </div>
                  </div>
                </Tarjeta>
              </Link>
            )
          })}
        </div>
      )}
    </>
  )
}

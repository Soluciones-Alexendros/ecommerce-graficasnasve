/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'
import type { PortfolioItem, CategoriaPortfolio } from '@/types/supabase'
import { FilterChip } from '@/components/ui/FilterChip'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import type { NombreIcono } from '@/components/ui/iconosGeometricos'

type FiltroPortfolio = 'todos' | CategoriaPortfolio

const FILTROS: { valor: FiltroPortfolio; etiqueta: string }[] = [
  { valor: 'todos', etiqueta: 'Todos' },
  { valor: 'offset', etiqueta: 'Offset' },
  { valor: 'digital', etiqueta: 'Digital' },
  { valor: 'encuadernacion', etiqueta: 'Encuadernación' },
  { valor: 'acabados', etiqueta: 'Acabados' },
  { valor: 'madera', etiqueta: 'Madera' },
  { valor: 'personalizacion', etiqueta: 'Personalización' },
]

const ESTILO: Record<CategoriaPortfolio, { color: ColorBaldosa; icono: NombreIcono }> = {
  offset: { color: 'ambar', icono: 'barras' },
  digital: { color: 'cyan', icono: 'anillo' },
  encuadernacion: { color: 'spot-blue', icono: 'mediaLuna' },
  acabados: { color: 'lavender', icono: 'estrella' },
  madera: { color: 'coral', icono: 'puntos' },
  personalizacion: { color: 'sky', icono: 'gota' },
}

const PLACEHOLDERS: PortfolioItem[] = Array.from({ length: 6 }, (_, i) => ({
  id: `placeholder-${i}`,
  created_at: '',
  titulo: `Proyecto ${i + 1}`,
  descripcion: 'Próximamente',
  categoria: (['offset', 'digital', 'encuadernacion', 'acabados', 'madera', 'personalizacion'][i] ??
    'offset') as CategoriaPortfolio,
  imagen_url: '',
  imagen_alt: null,
  cliente: null,
  destacado: false,
  orden: i,
  publicado: true,
}))

interface PropiedadesPortfolioGrid {
  items: PortfolioItem[]
}

export function PortfolioGrid({ items }: PropiedadesPortfolioGrid) {
  const [filtroActivo, setFiltroActivo] = useState<FiltroPortfolio>('todos')
  const [itemSeleccionado, setItemSeleccionado] = useState<PortfolioItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const datos = items.length > 0 ? items : PLACEHOLDERS
  const esPlaceholder = items.length === 0

  const itemsFiltrados = filtroActivo === 'todos' ? datos : datos.filter((item) => item.categoria === filtroActivo)

  function abrirLightbox(item: PortfolioItem) {
    if (esPlaceholder) return
    setItemSeleccionado(item)
    dialogRef.current?.showModal()
  }

  function cerrarLightbox() {
    dialogRef.current?.close()
    setItemSeleccionado(null)
  }

  return (
    <>
      {/* Filtros */}
      <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filtrar por categoría">
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
      {itemsFiltrados.length === 0 ? (
        <p className="font-sans text-gris text-center py-20">No hay trabajos en esta categoría aún.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {itemsFiltrados.map((item) => (
            <button
              key={item.id}
              onClick={() => abrirLightbox(item)}
              className="group text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-ambar focus-visible:outline-offset-2"
              aria-label={`Ver ${item.titulo}`}
              disabled={esPlaceholder}
            >
              {/* Imagen o baldosa */}
              <div className="relative w-full aspect-[4/3] rounded-card overflow-hidden border border-taupe">
                {item.imagen_url ? (
                  <Image
                    src={item.imagen_url}
                    alt={item.imagen_alt ?? item.titulo}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                ) : (
                  <Baldosa
                    color={ESTILO[item.categoria].color}
                    icono={ESTILO[item.categoria].icono}
                    cuadrada={false}
                    radius="none"
                    iconSize={56}
                    className="w-full h-full"
                  />
                )}
              </div>

              {/* Info */}
              <div className="pt-4 pb-2">
                <p className="font-mono text-xs text-gris uppercase tracking-wide mb-1">{item.categoria}</p>
                <h3 className="font-display text-lg font-bold text-key group-hover:text-ambar-700 transition-colors duration-150">
                  {item.titulo}
                </h3>
                {item.cliente && <p className="font-sans text-xs text-gris mt-1">{item.cliente}</p>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <dialog
        ref={dialogRef}
        className="fixed inset-0 m-auto max-w-4xl w-full bg-key p-0 border-0 rounded-card backdrop:bg-key/80"
        onClick={(e) => {
          if (e.target === dialogRef.current) cerrarLightbox()
        }}
        onKeyDown={(e) => {
          if (e.key === 'Escape') cerrarLightbox()
        }}
        aria-label={itemSeleccionado?.titulo ?? 'Imagen ampliada'}
      >
        {itemSeleccionado && (
          <div className="relative">
            <button
              onClick={cerrarLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-pill bg-key/60 text-paper-0 hover:bg-key transition-colors"
              aria-label="Cerrar imagen"
            >
              <X size={20} />
            </button>

            {itemSeleccionado.imagen_url ? (
              <div className="relative w-full aspect-video">
                <Image
                  src={itemSeleccionado.imagen_url}
                  alt={itemSeleccionado.imagen_alt ?? itemSeleccionado.titulo}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
            ) : (
              <div className="w-full aspect-video bg-paper-50 flex items-center justify-center">
                <span className="font-mono text-xs text-gris">[imagen]</span>
              </div>
            )}

            <div className="p-6">
              <p className="font-mono text-xs text-paper-100/50 uppercase tracking-wide mb-2">
                {itemSeleccionado.categoria}
              </p>
              <h2 className="font-display text-2xl font-bold text-paper-0">{itemSeleccionado.titulo}</h2>
              {itemSeleccionado.descripcion && (
                <p className="font-sans text-sm text-paper-100/70 mt-2">{itemSeleccionado.descripcion}</p>
              )}
              {itemSeleccionado.cliente && (
                <p className="font-sans text-xs text-paper-100/50 mt-1">Cliente: {itemSeleccionado.cliente}</p>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}

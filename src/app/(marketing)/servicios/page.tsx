/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, Printer, Zap, BookOpen, Sparkles, QrCode, TreePine } from 'lucide-react'
import { catalogoServicios } from '@/lib/catalogoServicios'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Servicios de Impresión y Acabado — Gráficas NASVE',
  description:
    'Impresión offset, digital, encuadernación artesanal, acabados premium, personalización con dato variable e impresión sobre madera. Todo en un mismo taller en Torrent.',
}

const ICONOS_SERVICIO: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
}

const COLORES: ColorBaldosa[] = ['ambar', 'cyan', 'coral', 'lavender', 'spot-blue', 'sky']

export default function PaginaServicios() {
  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-16">
          <SectionLabel>Qué hacemos</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
            Servicios de impresión y acabado
          </h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            De la plancha offset al barniz UVI selectivo, de la encuadernación artesanal a la impresión directa sobre
            madera. Un taller completo para proyectos completos.
          </p>
        </div>

        {/* Grid de servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {catalogoServicios.map((servicio, i) => {
            const Icono = ICONOS_SERVICIO[servicio.icono]
            return (
              <Link key={servicio.slug} href={`/servicios/${servicio.slug}`} className="group">
                <Tarjeta className="h-full p-8 flex flex-col gap-5 transition-transform duration-200 group-hover:-translate-y-1">
                  {Icono && (
                    <Baldosa color={COLORES[i % COLORES.length]} cuadrada={false} className="w-14 h-14">
                      <Icono size={28} />
                    </Baldosa>
                  )}
                  <div className="flex-1">
                    <h2 className="font-display text-xl font-bold text-key mb-3">{servicio.titulo}</h2>
                    <p className="font-sans text-sm text-gris leading-relaxed">{servicio.descripcionCorta}</p>
                  </div>
                  <ul className="space-y-1.5 border-t border-taupe pt-4">
                    {servicio.beneficios.slice(0, 3).map((b) => (
                      <li key={b} className="font-sans text-xs text-gris flex items-start gap-2">
                        <Check size={14} className="text-cyan mt-0.5 shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <span className="font-mono text-xs text-ambar-700 uppercase tracking-wide">Ver detalles →</span>
                </Tarjeta>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

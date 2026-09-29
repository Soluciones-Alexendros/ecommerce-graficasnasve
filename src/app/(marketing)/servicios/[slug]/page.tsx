/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Check, Printer, Zap, BookOpen, Sparkles, QrCode, TreePine } from 'lucide-react'
import { catalogoServicios } from '@/lib/catalogoServicios'
import { Boton } from '@/components/ui/Boton'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import { SectionLabel } from '@/components/ui/SectionLabel'

const ICONOS_SERVICIO: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Printer,
  Zap,
  BookOpen,
  Sparkles,
  QrCode,
  TreePine,
}
const COLORES: ColorBaldosa[] = ['ambar', 'cyan', 'coral', 'lavender', 'spot-blue', 'sky']

interface PropiedadesSlug {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return catalogoServicios.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PropiedadesSlug): Promise<Metadata> {
  const { slug } = await params
  const servicio = catalogoServicios.find((s) => s.slug === slug)
  if (!servicio) return { title: 'Servicio no encontrado' }
  return { title: `${servicio.titulo} — Gráficas NASVE`, description: servicio.descripcionCorta }
}

export default async function PaginaFichaServicio({ params }: PropiedadesSlug) {
  const { slug } = await params
  const indice = catalogoServicios.findIndex((s) => s.slug === slug)
  const servicio = catalogoServicios[indice]

  if (!servicio) {
    notFound()
  }

  const Icono = ICONOS_SERVICIO[servicio.icono]

  return (
    <div className="py-24">
      <div className="contenedor max-w-4xl">
        {/* Migas de pan */}
        <nav aria-label="Migas de pan" className="mb-10">
          <ol className="flex items-center gap-2 font-mono text-xs text-gris">
            <li>
              <Link href="/servicios" className="hover:text-key transition-colors">
                Servicios
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li className="text-key">{servicio.titulo}</li>
          </ol>
        </nav>

        {/* Cabecera */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-start gap-6">
          {Icono && (
            <Baldosa color={COLORES[indice % COLORES.length]} cuadrada={false} className="w-16 h-16 shrink-0">
              <Icono size={32} />
            </Baldosa>
          )}
          <div>
            <SectionLabel>Servicio</SectionLabel>
            <h1 className="mt-3 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">{servicio.titulo}</h1>
            <p className="font-sans text-base md:text-md text-gris leading-relaxed max-w-2xl">{servicio.descripcion}</p>
          </div>
        </div>

        {/* Beneficios */}
        <div className="mb-16 rounded-card border border-taupe bg-paper-50 p-8">
          <h2 className="font-display text-xl font-bold text-key mb-6">¿Qué incluye?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {servicio.beneficios.map((beneficio) => (
              <li key={beneficio} className="flex items-start gap-3">
                <Check size={18} className="text-cyan shrink-0 mt-0.5" />
                <span className="font-sans text-sm text-key leading-relaxed">{beneficio}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div className="border-t border-taupe pt-12">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Boton variant="primary" size="lg" asChild>
              <Link href="/encargo">{servicio.ctaTexto}</Link>
            </Boton>
            <p className="font-sans text-sm text-gris">Respondemos en menos de 24 horas laborables.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Historia — Gráficas NASVE',
  description:
    'Más de 40 años de historia gráfica en Valencia. Desde el barrio de Serrería en 1982 hasta el Polígono Industrial Masía del Juez en Torrent hoy.',
}

const hitos = [
  {
    año: '1982',
    titulo: 'El principio',
    descripcion:
      'Antonio Arnás funda el taller en el barrio de Serrería, Valencia. Lo que empieza como una pequeña imprenta de barrio con una sola prensa offset se convierte, desde el primer día, en un proyecto de calidad artesanal comprometido con el cliente.',
  },
  {
    año: '1993',
    titulo: 'Traslado a Torrent',
    descripcion:
      'El crecimiento sostenido obliga a buscar un espacio mayor. El taller se traslada al Polígono Industrial Masía del Juez en Torrent (Valencia), donde dispone de instalaciones modernas que permiten ampliar la gama de servicios y afrontar tiradas más exigentes.',
  },
  {
    año: '2000s',
    titulo: 'La segunda generación',
    descripcion:
      'Los hijos de Antonio toman el relevo. Con ellos llega una fuerte inversión en tecnología: CTP (Computer-to-Plate), equipos de encuadernación automatizada y las primeras máquinas de acabados premium. El espíritu artesanal se mantiene intacto; la capacidad productiva, multiplicada.',
  },
  {
    año: '2026',
    titulo: 'Cuatro décadas, mismo compromiso',
    descripcion:
      'Hoy Gráficas NASVE combina la calidez del trato personal con las técnicas más avanzadas del sector: impresión digital de alto formato, dato variable, impresión directa sobre madera, stamping y UVI selectivo. El mismo compromiso artesanal con el que nació en 1982, adaptado al presente.',
  },
]

export default function PaginaHistoria() {
  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-20">
          <SectionLabel>Quiénes somos</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
            Más de cuatro décadas de oficio gráfico
          </h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            La historia de Gráficas NASVE es la de una familia valenciana que apostó por la calidad cuando la calidad
            aún requería esfuerzo. Un compromiso que no ha cambiado en 40 años.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Línea vertical */}
          <div className="absolute left-16 md:left-24 top-0 bottom-0 w-px bg-borde" aria-hidden="true" />

          <ol className="relative space-y-16">
            {hitos.map((hito, i) => (
              <li key={hito.año} className="relative flex gap-12 md:gap-16">
                {/* Año y punto */}
                <div className="relative flex flex-col items-end w-14 md:w-22 shrink-0 pt-1">
                  <span className="font-mono text-sm font-medium text-gris">{hito.año}</span>
                  {/* Punto dorado */}
                  <div
                    className="absolute right-0 translate-x-[calc(100%+1px)] top-2 w-3 h-3 rounded-full bg-ambar border-2 border-papel"
                    aria-hidden="true"
                    style={{ transform: 'translateX(calc(50% + 1px))' }}
                  />
                </div>

                {/* Contenido */}
                <div className={`pb-8 ${i < hitos.length - 1 ? 'border-b border-borde' : ''}`}>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-negro mb-3">{hito.titulo}</h2>
                  <p className="font-sans text-base text-gris leading-relaxed max-w-xl">{hito.descripcion}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  )
}

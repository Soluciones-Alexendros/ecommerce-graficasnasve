/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { Leaf, Droplets, Recycle, Trash2 } from 'lucide-react'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'

export const metadata: Metadata = {
  title: 'Sostenibilidad — Gráficas NASVE',
  description:
    'Nuestro compromiso con el medioambiente: papeles certificados FSC/PEFC, tintas vegetales, materiales bio/reciclados y gestión responsable de residuos.',
}

const COLORES_PILAR: ColorBaldosa[] = ['cyan', 'sky', 'lavender', 'spot-blue']

const pilares = [
  {
    icono: Leaf,
    titulo: 'Papeles certificados FSC y PEFC',
    texto: `Trabajamos exclusivamente con proveedores de papel que cuentan con las certificaciones Forest Stewardship Council (FSC) y Programme for the Endorsement of Forest Certification (PEFC). Estas certificaciones garantizan que la madera utilizada en la producción del papel procede de bosques gestionados de manera responsable, donde por cada árbol talado se plantan varios más.

La cadena de custodia certificada nos permite ofrecer a nuestros clientes impresión con sello FSC/PEFC en sus productos, algo cada vez más valorado por consumidores y distribuidores comprometidos con la sostenibilidad.`,
  },
  {
    icono: Droplets,
    titulo: 'Tintas vegetales y de base acuosa',
    texto: `Las tintas convencionales basadas en aceites minerales y disolventes petroquímicos son una de las fuentes de contaminación más significativas en la industria gráfica. En NASVE hemos transitado progresivamente hacia tintas de base vegetal —fundamentalmente aceite de soja y linaza— y tintas de base acuosa para la impresión digital.

Las tintas vegetales ofrecen colores más vivos, son más fáciles de destiñar en el proceso de reciclaje del papel y emiten menos compuestos orgánicos volátiles (COV) durante la impresión. Un beneficio doble: para el planeta y para la calidad final del impreso.`,
  },
  {
    icono: Recycle,
    titulo: 'Materiales reciclados y biodegradables',
    texto: `Parte de nuestra gama de papeles incluye opciones fabricadas con fibra reciclada al 100%, sin sacrificar un ápice de calidad. También trabajamos con papeles de materiales alternativos: piedra mineral, gramíneas de crecimiento rápido y fibras naturales sin blanqueo con cloro (TCF o ECF).

Para proyectos de packaging, ofrecemos alternativas al plástico: laminados biodegradables, barnices a base de agua y cartones reciclados con certificación FSC. El objetivo es que el ciclo de vida del impreso sea lo más circular posible.`,
  },
  {
    icono: Trash2,
    titulo: 'Gestión responsable de residuos',
    texto: `Un taller de impresión genera residuos específicos: recortes de papel y cartón, planchas de aluminio, cartuchos de tinta y, en ocasiones, productos químicos de limpieza. En NASVE hemos implementado un sistema interno de separación y gestión de residuos conforme a la normativa vigente.

Los recortes de papel y cartón se destinan íntegramente a reciclaje. Las planchas de aluminio offset se reciclan a través de gestores autorizados. Los residuos químicos se gestionan con empresas especializadas en tratamiento de residuos peligrosos. Y optimizamos constantemente los formatos de impresión para minimizar el papel sobrante en cada trabajo.`,
  },
]

export default function PaginaSostenibilidad() {
  return (
    <div className="py-24">
      <div className="contenedor">
        {/* Cabecera */}
        <div className="max-w-2xl mb-20">
          <SectionLabel>Compromiso medioambiental</SectionLabel>
          <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
            Imprimir bien,
            <br />
            <span className="text-cyan">imprimir limpio</span>
          </h1>
          <p className="relato text-lg md:text-xl text-key/80 leading-snug">
            La industria gráfica tiene una responsabilidad medioambiental real. En NASVE llevamos años reduciendo
            nuestro impacto: materiales certificados, tintas más limpias, gestión rigurosa de residuos. No como
            marketing, sino como práctica cotidiana.
          </p>
        </div>

        {/* Pilares */}
        <div className="space-y-16">
          {pilares.map(({ icono: Icono, titulo, texto }, i) => (
            <article
              key={titulo}
              className={`grid grid-cols-1 md:grid-cols-12 gap-8 pb-16 ${
                i < pilares.length - 1 ? 'border-b border-borde' : ''
              }`}
            >
              {/* Icono y número */}
              <div className="md:col-span-3 flex flex-col gap-4">
                <Baldosa color={COLORES_PILAR[i % COLORES_PILAR.length]} cuadrada={false} className="w-16 h-16">
                  <Icono size={32} />
                </Baldosa>
                <span className="font-mono text-xs text-gris uppercase tracking-widest">0{i + 1} / 04</span>
              </div>

              {/* Texto */}
              <div className="md:col-span-9">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-key mb-6">{titulo}</h2>
                {texto.split('\n\n').map((parrafo, j) => (
                  <p key={j} className="font-sans text-base text-gris leading-relaxed mb-4 last:mb-0">
                    {parrafo}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Aviso Legal — Gráficas NASVE',
  description: 'Aviso legal y condiciones de uso del sitio web de Gráficas NASVE, S.L.',
  robots: { index: false, follow: false },
}

export default function PaginaAvisoLegal() {
  return (
    <div className="py-24">
      <div className="contenedor max-w-3xl">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-4 font-display font-extrabold text-4xl text-key mb-8">Aviso Legal</h1>
        <p className="font-mono text-xs text-gris mb-12">Última actualización: enero de 2026</p>

        <div className="prose-legal">
          {/* 1. Datos identificativos */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">1. Datos identificativos del titular</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              En cumplimiento de lo establecido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la
              Sociedad de la Información y del Comercio Electrónico (LSSI-CE), se ponen a disposición del usuario los
              datos identificativos del titular del sitio web:
            </p>
            <table className="w-full border-collapse border border-borde text-sm mb-4">
              <tbody>
                {[
                  ['Denominación social', 'GRÁFICAS NASVE, S.L.'],
                  ['CIF', 'B46261210'],
                  ['Domicilio social', 'Ctra. Mas del Jutge, 53 · 46900 Torrent (Valencia)'],
                  ['Teléfono', '961 55 34 09'],
                  ['Email', 'nasve@nasve.com'],
                  [
                    'Registro Mercantil',
                    'Registro Mercantil de Valencia · Tomo 4683 · Libro 1993 · Folio 137 · Sección 8ª · Hoja V-30079',
                  ],
                ].map(([campo, valor]) => (
                  <tr key={campo} className="border-b border-borde">
                    <td className="py-2.5 px-4 font-medium text-negro bg-fondo-alt w-1/3">{campo}</td>
                    <td className="py-2.5 px-4 text-gris">{valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* 2. Objeto y ámbito de aplicación */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">2. Objeto y ámbito de aplicación</h2>
            <p className="font-sans text-base text-gris leading-relaxed">
              El presente aviso legal regula el acceso y uso del sitio web{' '}
              <strong className="text-negro">graficasnasve.art</strong> (en adelante, &ldquo;el Sitio&rdquo;), propiedad
              de GRÁFICAS NASVE, S.L. El acceso al Sitio y la utilización de su contenido implica la aceptación expresa
              de las condiciones establecidas en este aviso legal. Si el usuario no está de acuerdo con las presentes
              condiciones, deberá abstenerse de utilizar el Sitio.
            </p>
          </section>

          {/* 3. Propiedad intelectual */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">3. Propiedad intelectual e industrial</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              Todos los contenidos del Sitio —incluyendo, sin carácter limitativo, textos, fotografías, gráficos,
              imágenes, iconos, tecnología, software, vínculos y demás contenidos audiovisuales y sonoros— son propiedad
              de GRÁFICAS NASVE, S.L. o de terceros que han autorizado su uso, y están protegidos por los derechos de
              propiedad intelectual e industrial.
            </p>
            <p className="font-sans text-base text-gris leading-relaxed">
              Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o
              cualquier otra forma de explotación, total o parcial, de los contenidos del Sitio sin la autorización
              previa y escrita de GRÁFICAS NASVE, S.L.
            </p>
          </section>

          {/* 4. Responsabilidad */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">4. Responsabilidad y exoneración</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              GRÁFICAS NASVE, S.L. no garantiza la ausencia de virus u otros elementos en los contenidos que puedan
              producir alteraciones en el sistema informático del usuario. La empresa no se hace responsable de los
              daños y perjuicios de cualquier naturaleza que pudieran derivarse del acceso, uso o imposibilidad de uso
              del Sitio.
            </p>
            <p className="font-sans text-base text-gris leading-relaxed">
              El Sitio puede contener enlaces a sitios web de terceros. GRÁFICAS NASVE, S.L. no se responsabiliza del
              contenido, información o servicios que aparezcan en dichos sitios, que son responsabilidad exclusiva de
              sus titulares.
            </p>
          </section>

          {/* 5. Protección de datos */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">5. Protección de datos personales</h2>
            <p className="font-sans text-base text-gris leading-relaxed">
              El tratamiento de los datos personales recabados a través del Sitio se regula por la{' '}
              <Link href="/privacidad" className="text-negro underline hover:text-ambar transition-colors">
                Política de Privacidad
              </Link>{' '}
              de GRÁFICAS NASVE, S.L., de conformidad con el Reglamento (UE) 2016/679 del Parlamento Europeo y del
              Consejo (RGPD) y la Ley Orgánica 3/2018, de 5 de diciembre (LOPDGDD).
            </p>
          </section>

          {/* 6. Ley aplicable */}
          <section className="mb-10">
            <h2 className="font-display text-2xl font-bold text-negro mb-4">6. Ley aplicable y jurisdicción</h2>
            <p className="font-sans text-base text-gris leading-relaxed">
              Las presentes condiciones se rigen e interpretan conforme a la legislación española. Para la resolución de
              cualquier controversia derivada del acceso o uso del Sitio, GRÁFICAS NASVE, S.L. y el usuario se someten,
              con renuncia expresa a cualquier otro fuero, a la jurisdicción de los Juzgados y Tribunales de Valencia
              (España).
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

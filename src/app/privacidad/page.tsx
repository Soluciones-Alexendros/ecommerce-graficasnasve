/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { SectionLabel } from '@/components/ui/SectionLabel'

export const metadata: Metadata = {
  title: 'Política de Privacidad — Gráficas NASVE',
  description: 'Política de privacidad y protección de datos de Gráficas NASVE, S.L.',
  robots: { index: false, follow: false },
}

export default function PaginaPrivacidad() {
  return (
    <div className="py-24">
      <div className="contenedor max-w-3xl">
        <SectionLabel>Legal</SectionLabel>
        <h1 className="mt-4 font-display font-extrabold text-4xl text-key mb-8">Política de Privacidad</h1>
        <p className="font-mono text-xs text-gris mb-12">Última actualización: enero de 2026</p>

        <div className="space-y-10">
          {/* 1. Responsable */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">1. Responsable del tratamiento</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              El responsable del tratamiento de los datos personales recabados a través de este sitio web es:
            </p>
            <div className="bg-fondo-alt border border-borde p-6 font-sans text-sm text-gris space-y-1">
              <p>
                <strong className="text-negro">Denominación:</strong> GRÁFICAS NASVE, S.L.
              </p>
              <p>
                <strong className="text-negro">CIF:</strong> B46261210
              </p>
              <p>
                <strong className="text-negro">Domicilio:</strong> Ctra. Mas del Jutge, 53 · 46900 Torrent (Valencia)
              </p>
              <p>
                <strong className="text-negro">Delegada de Protección de Datos:</strong> Alicia Armas ·{' '}
                <a href="mailto:alicia@nasve.com" className="text-negro hover:text-ambar transition-colors">
                  alicia@nasve.com
                </a>
              </p>
            </div>
          </section>

          {/* 2. Datos recabados */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">2. Datos personales recabados</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              A través del formulario de solicitud de presupuesto recabamos los siguientes datos:
            </p>
            <ul className="font-sans text-sm text-gris space-y-2 list-disc list-inside">
              <li>Nombre y apellidos</li>
              <li>Nombre de la empresa (opcional)</li>
              <li>Dirección de correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Información sobre el proyecto de impresión solicitado</li>
              <li>Archivos adjuntos de arte (opcional)</li>
            </ul>
          </section>

          {/* 3. Finalidad y base jurídica */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">
              3. Finalidad del tratamiento y base jurídica
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-borde text-sm">
                <thead>
                  <tr className="bg-fondo-alt">
                    <th className="text-left py-3 px-4 font-medium text-negro border-b border-borde">Finalidad</th>
                    <th className="text-left py-3 px-4 font-medium text-negro border-b border-borde">Base jurídica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-borde">
                  <tr>
                    <td className="py-3 px-4 text-gris">Gestión de solicitudes de presupuesto</td>
                    <td className="py-3 px-4 text-gris">Art. 6.1.b RGPD — ejecución de medidas precontractuales</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gris">Comunicaciones relacionadas con el presupuesto solicitado</td>
                    <td className="py-3 px-4 text-gris">Art. 6.1.b RGPD — interés legítimo</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gris">Cumplimiento de obligaciones legales y contables</td>
                    <td className="py-3 px-4 text-gris">Art. 6.1.c RGPD — obligación legal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* 4. Destinatarios */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">
              4. Destinatarios y encargados del tratamiento
            </h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              Los datos personales no serán cedidos a terceros salvo obligación legal. No obstante, para la prestación
              del servicio utilizamos los siguientes encargados del tratamiento con los que hemos suscrito los
              correspondientes contratos de encargo:
            </p>
            <ul className="font-sans text-sm text-gris space-y-3">
              <li>
                <strong className="text-negro">Supabase, Inc.</strong> — Infraestructura de base de datos y
                almacenamiento. Servidores en la Unión Europea (Frankfurt).
              </li>
              <li>
                <strong className="text-negro">Resend, Inc.</strong> — Servicio de envío de correo electrónico
                transaccional.
              </li>
              <li>
                <strong className="text-negro">Vercel, Inc.</strong> — Infraestructura de alojamiento web. Servidores en
                la Unión Europea.
              </li>
              <li>
                <strong className="text-negro">Stripe, Inc.</strong> — Plataforma de pagos (aplicable únicamente si se
                realizan pedidos online). Certificado PCI DSS.
              </li>
            </ul>
          </section>

          {/* 5. Conservación */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">5. Plazo de conservación</h2>
            <p className="font-sans text-base text-gris leading-relaxed">
              Los datos se conservarán durante el tiempo necesario para la gestión del presupuesto y el eventual
              contrato. En caso de no resultar en un contrato, los datos se eliminarán a los 2 años desde la recepción
              de la solicitud. Para las relaciones contractuales, los datos se conservarán durante los plazos legalmente
              establecidos (mínimo 5 años según normativa mercantil y fiscal).
            </p>
          </section>

          {/* 6. Derechos ARSUPO */}
          <section>
            <h2 className="font-display text-2xl font-bold text-negro mb-4">6. Derechos del interesado</h2>
            <p className="font-sans text-base text-gris leading-relaxed mb-4">
              El interesado puede ejercer los siguientes derechos ante GRÁFICAS NASVE, S.L.:
            </p>
            <ul className="font-sans text-sm text-gris space-y-2 list-disc list-inside mb-4">
              <li>
                <strong className="text-negro">Acceso:</strong> conocer qué datos personales tratamos
              </li>
              <li>
                <strong className="text-negro">Rectificación:</strong> corregir datos inexactos o incompletos
              </li>
              <li>
                <strong className="text-negro">Supresión:</strong> solicitar la eliminación de los datos
              </li>
              <li>
                <strong className="text-negro">Oposición:</strong> oponerse al tratamiento por motivos particulares
              </li>
              <li>
                <strong className="text-negro">Portabilidad:</strong> recibir los datos en formato estructurado
              </li>
              <li>
                <strong className="text-negro">Limitación:</strong> solicitar la restricción del tratamiento
              </li>
            </ul>
            <p className="font-sans text-sm text-gris leading-relaxed">
              Para ejercer estos derechos, puede dirigirse a:{' '}
              <a href="mailto:alicia@nasve.com" className="text-negro underline hover:text-ambar transition-colors">
                alicia@nasve.com
              </a>{' '}
              o mediante escrito postal a Ctra. Mas del Jutge, 53 · 46900 Torrent (Valencia). Asimismo, tiene derecho a
              presentar reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

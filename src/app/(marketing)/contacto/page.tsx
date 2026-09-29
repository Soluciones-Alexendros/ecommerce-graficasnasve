/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react'
import { Boton } from '@/components/ui/Boton'
import { Baldosa, type ColorBaldosa } from '@/components/ui/Baldosa'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FormularioPresupuesto } from '@/components/formularios/FormularioPresupuesto'

export const metadata: Metadata = {
  title: 'Contacto — Gráficas NASVE',
  description:
    'Contacta con Gráficas NASVE en Torrent (Valencia). Teléfono: 961 55 34 09. Email: nasve@nasve.com. Lunes a viernes de 8:00 a 18:00.',
}

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://graficasnasve.art/#empresa',
  name: 'Gráficas NASVE, S.L.',
  alternateName: 'NASVE',
  description:
    'Imprenta offset y digital en Torrent (Valencia). Encuadernación artesanal, acabados premium, personalización e impresión sobre madera. Fundada en 1982.',
  url: 'https://graficasnasve.art',
  telephone: '+34961553409',
  email: 'nasve@nasve.com',
  taxID: 'B46261210',
  foundingDate: '1982',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Transferencia, tarjeta',
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ctra. Mas del Jutge, 53',
    addressLocality: 'Torrent',
    addressRegion: 'Valencia',
    postalCode: '46900',
    addressCountry: 'ES',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 39.4333,
    longitude: -0.4667,
  },
  hasMap: 'https://maps.google.com/?q=Ctra.+Mas+del+Jutge+53+Torrent+Valencia',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Friday'],
      opens: '08:00',
      closes: '19:00',
    },
  ],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    reviewCount: '47',
    bestRating: '5',
  },
}

export default function PaginaContacto() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }} />

      <div className="py-24">
        <div className="contenedor">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info de contacto */}
            <div>
              <SectionLabel>Hablemos de tu impreso</SectionLabel>
              <h1 className="mt-4 font-display font-extrabold text-4xl md:text-5xl text-key mb-5">
                Cuéntanos tu proyecto
              </h1>
              <p className="relato text-lg md:text-xl text-key/80 leading-snug mb-12">
                Rellena el formulario y respondemos con presupuesto y prueba de color en menos de 24 h. Visítanos en el
                Polígono Masía del Juez o llámanos sin compromiso.
              </p>

              <ul className="space-y-6">
                {(
                  [
                    {
                      icono: MapPin,
                      color: 'ambar',
                      titulo: 'Taller',
                      cuerpo: (
                        <address className="not-italic">
                          Ctra. Mas del Jutge, 53
                          <br />
                          46900 Torrent (Valencia)
                          <br />
                          Polígono Masía del Juez
                        </address>
                      ),
                    },
                    {
                      icono: Phone,
                      color: 'cyan',
                      titulo: 'Teléfono',
                      cuerpo: (
                        <a href="tel:+34961553409" className="hover:text-key transition-colors">
                          961 55 34 09
                        </a>
                      ),
                    },
                    {
                      icono: Mail,
                      color: 'coral',
                      titulo: 'Email',
                      cuerpo: (
                        <a href="mailto:nasve@nasve.com" className="hover:text-key transition-colors">
                          nasve@nasve.com
                        </a>
                      ),
                    },
                    {
                      icono: Clock,
                      color: 'lavender',
                      titulo: 'Horario',
                      cuerpo: (
                        <>
                          Lun–Jue 8:00–18:00
                          <br />
                          Vie 8:00–19:00
                        </>
                      ),
                    },
                  ] as { icono: typeof MapPin; color: ColorBaldosa; titulo: string; cuerpo: React.ReactNode }[]
                ).map(({ icono: Icono, color, titulo, cuerpo }) => (
                  <li key={titulo} className="flex gap-4 items-start">
                    <Baldosa color={color} cuadrada={false} className="w-11 h-11 shrink-0">
                      <Icono size={20} />
                    </Baldosa>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-widest text-gris mb-1">{titulo}</p>
                      <div className="font-sans text-sm text-key/80 leading-relaxed">{cuerpo}</div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Enlace a Google Maps */}
              <div className="mt-10">
                <Boton variant="secondary" size="md" asChild>
                  <a
                    href="https://maps.google.com/?q=Ctra.+Mas+del+Jutge+53+Torrent+Valencia+España"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <ExternalLink size={16} />
                    Ver en Google Maps
                  </a>
                </Boton>
              </div>
            </div>

            {/* Formulario de presupuesto */}
            <Tarjeta barraCMYK className="p-8 md:p-10 self-start">
              <h2 className="font-display font-extrabold text-2xl text-key mb-6">Formulario de presupuesto</h2>
              <FormularioPresupuesto />
            </Tarjeta>
          </div>
        </div>
      </div>
    </>
  )
}

/**
 * graficasnasve.art — Web App Manifest (marca NASVE)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gráficas NASVE — Imprenta en Torrent desde 1982',
    short_name: 'NASVE',
    description:
      'Imprenta offset y digital en Torrent (Valencia). Encuadernación artesanal, acabados premium, personalización e impresión sobre madera.',
    start_url: '/',
    display: 'standalone',
    background_color: '#EFE7D7',
    theme_color: '#16140F',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}

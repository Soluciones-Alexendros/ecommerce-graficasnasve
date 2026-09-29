/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 * Desarrollado para Gráficas NASVE, S.L. (CIF B46261210)
 */
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          {
            // AVISO DE SEGURIDAD (MEDIO-1): 'unsafe-inline' en script-src y style-src
            // debilita la protección contra XSS. Se mantiene como riesgo aceptado porque
            // el sitio usa JSON-LD inline (src/app/(marketing)/tienda/[slug]/page.tsx)
            // y estilos inline de componentes; Stripe solo requiere https://js.stripe.com.
            // Para eliminar 'unsafe-inline' haría falta implementar nonces o migrar esos
            // scripts/estilos a archivos externos, lo que queda fuera de esta fase.
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://js.stripe.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
              "img-src 'self' data: https://*.supabase.co https://maps.googleapis.com https://maps.gstatic.com",
              "connect-src 'self' https://*.supabase.co https://api.stripe.com",
              'frame-src https://js.stripe.com https://hooks.stripe.com https://www.google.com',
            ].join('; '),
          },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.graficasnasve.com' }],
        destination: 'https://graficasnasve.art/:path*',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'graficasnasve.com' }],
        destination: 'https://graficasnasve.art/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig

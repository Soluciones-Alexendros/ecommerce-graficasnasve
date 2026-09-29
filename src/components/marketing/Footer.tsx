/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import Link from 'next/link'
import { Logo } from '@/components/marketing/Logo'
import { BarraCMYK } from '@/components/ui/BarraCMYK'

const serviciosLinks = [
  { href: '/servicios/impresion-offset', label: 'Impresión Offset' },
  { href: '/servicios/impresion-digital', label: 'Impresión Digital' },
  { href: '/servicios/encuadernacion', label: 'Encuadernación' },
  { href: '/servicios/acabados-premium', label: 'Acabados Premium' },
  { href: '/servicios/personalizacion', label: 'Personalización' },
  { href: '/servicios/madera', label: 'Impresión sobre Madera' },
]

const empresaLinks = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/historia', label: 'Historia' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/sostenibilidad', label: 'Sostenibilidad' },
]

const legalLinks = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
]

export function Footer() {
  return (
    <footer className="bg-key text-paper-100">
      <BarraCMYK height={6} />
      <div className="contenedor py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo e info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-80"
              aria-label="Gráficas NASVE — ir a inicio"
            >
              <Logo variant="dark" />
            </Link>
            <p className="mt-4 text-sm text-gris leading-relaxed">
              Imprenta offset y digital en Torrent (Valencia) desde 1982. Calidad que se toca.
            </p>
            <address className="mt-6 not-italic text-sm text-gris leading-loose">
              <p>Ctra. Mas del Jutge, 53</p>
              <p>46900 Torrent (Valencia)</p>
              <p className="mt-2">
                <a href="tel:+34961553409" className="hover:text-ambar transition-colors duration-150">
                  961 55 34 09
                </a>
              </p>
              <p>
                <a href="mailto:nasve@nasve.com" className="hover:text-ambar transition-colors duration-150">
                  nasve@nasve.com
                </a>
              </p>
            </address>
            <p className="mt-4 text-xs text-gris">L–J 8:00–18:00 · V 8:00–19:00</p>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gris mb-4">Servicios</h3>
            <ul className="space-y-2.5">
              {serviciosLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-papel/80 hover:text-ambar transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gris mb-4">Empresa</h3>
            <ul className="space-y-2.5">
              {empresaLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-papel/80 hover:text-ambar transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-gris mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {legalLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-papel/80 hover:text-ambar transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pie */}
        <div className="mt-16 pt-8 border-t border-papel/10 flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <p className="text-xs text-gris">© 2026 Gráficas NASVE, S.L. · CIF B46261210</p>
          <p className="text-xs text-gris">
            Desarrollado por <span className="text-papel/60">Soluciones Alexendros S.L.U.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

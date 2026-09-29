/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Boton } from '@/components/ui/Boton'
import { Logo } from '@/components/marketing/Logo'

const enlaces = [
  { href: '/', label: 'Inicio' },
  { href: '/tienda', label: 'Tienda' },
  { href: '/encargo', label: 'Encargo' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' },
]

function esActivo(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')
}

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-paper-100/90 backdrop-blur border-b border-taupe">
      <nav className="contenedor flex items-center justify-between h-16" aria-label="Navegación principal">
        <Link
          href="/"
          aria-label="Gráficas NASVE — ir a inicio"
          className="transition-opacity hover:opacity-80"
          data-tour="logo"
        >
          <Logo />
        </Link>

        {/* Links escritorio */}
        <ul className="hidden md:flex items-center gap-7" role="list">
          {enlaces.map(({ href, label }) => {
            const activo = esActivo(pathname, href)
            return (
              <li key={href}>
                <Link
                  href={href}
                  data-tour={href === '/tienda' ? 'tienda' : href === '/encargo' ? 'encargo' : undefined}
                  className={[
                    'font-sans text-sm font-medium transition-colors duration-150 pb-1',
                    activo
                      ? 'text-key border-b-2 border-ambar'
                      : 'text-gris hover:text-key border-b-2 border-transparent',
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Lado derecho escritorio */}
        <div className="hidden md:flex items-center gap-4">
          <span className="hidden lg:inline-flex items-center gap-2 rounded-pill border border-taupe px-3 py-1 font-mono text-xs uppercase tracking-widest text-gris">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" aria-hidden="true" />
            48 H · Taller
          </span>
          <Boton variant="primary" size="sm" asChild>
            <Link href="/encargo" data-tour="cta">
              Pedir presupuesto
            </Link>
          </Boton>
        </div>

        {/* Botón hamburguesa móvil */}
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 text-key"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
        >
          {menuAbierto ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Menú móvil */}
      {menuAbierto && (
        <div className="md:hidden bg-paper-100 border-t border-taupe">
          <ul className="contenedor flex flex-col py-4 gap-1" role="list">
            {enlaces.map(({ href, label }) => {
              const activo = esActivo(pathname, href)
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={[
                      'block py-3 font-sans text-base font-medium transition-colors duration-150',
                      activo ? 'text-key' : 'text-gris hover:text-key',
                    ].join(' ')}
                    onClick={() => setMenuAbierto(false)}
                  >
                    {label}
                  </Link>
                </li>
              )
            })}
            <li className="pt-3 border-t border-taupe mt-2">
              <Boton variant="primary" size="sm" className="w-full" asChild>
                <Link href="/encargo" onClick={() => setMenuAbierto(false)}>
                  Pedir presupuesto
                </Link>
              </Boton>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

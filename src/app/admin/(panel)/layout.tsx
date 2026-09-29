/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServidorSupabase } from '@/lib/supabase/servidor'
import { BarraCMYK } from '@/components/ui/BarraCMYK'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createServidorSupabase()

  if (!supabase) {
    redirect('/admin/login')
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-fondo-alt">
      {/* Barra de administración */}
      <header className="bg-negro border-b border-papel/10">
        <nav className="contenedor flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="font-display font-bold text-xl text-papel hover:text-ambar transition-colors"
            >
              nasve admin
            </Link>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/admin" className="font-sans text-sm text-gris hover:text-papel transition-colors">
                Presupuestos
              </Link>
              <Link
                href="/"
                className="font-sans text-sm text-gris hover:text-papel transition-colors"
                target="_blank"
                rel="noopener"
              >
                Ver web ↗
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-gris hidden md:block">{user.email}</span>
            <form action="/api/auth/signout" method="post">
              <button type="submit" className="font-sans text-xs text-gris hover:text-papel transition-colors">
                Cerrar sesión
              </button>
            </form>
          </div>
        </nav>
        <BarraCMYK height={3} />
      </header>

      {/* Contenido */}
      <main className="contenedor py-10">{children}</main>
    </div>
  )
}

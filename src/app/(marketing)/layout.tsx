/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { Navbar } from '@/components/marketing/Navbar'
import { Footer } from '@/components/marketing/Footer'
import { Chatbot } from '@/components/marketing/Chatbot'
import { TourBienvenida } from '@/components/marketing/TourBienvenida'

export default function LayoutMarketing({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-full bg-paper-100">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <Chatbot />
      <TourBienvenida />
    </div>
  )
}

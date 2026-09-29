/**
 * graficasnasve.art — 404 con identidad NASVE
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import Link from 'next/link'
import { Boton } from '@/components/ui/Boton'
import { Logo } from '@/components/marketing/Logo'
import { Baldosa } from '@/components/ui/Baldosa'
import { CropMarks } from '@/components/ui/CropMarks'
import { BarraCMYK } from '@/components/ui/BarraCMYK'

export default function NoEncontrado() {
  return (
    <div className="min-h-screen flex flex-col bg-paper-100">
      <header className="border-b border-taupe">
        <div className="contenedor h-16 flex items-center">
          <Link href="/" aria-label="Gráficas NASVE — inicio" className="transition-opacity hover:opacity-80">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center">
        <div className="contenedor grid md:grid-cols-2 gap-12 items-center py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-gris mb-4">Error 404</p>
            <h1 className="font-display font-extrabold text-key text-5xl md:text-6xl leading-[1.02] mb-5">
              Página
              <br />
              no encontrada
            </h1>
            <p className="relato text-lg text-key/80 leading-snug mb-8 max-w-md">
              Esta página se fue a máquina y no volvió. Comprueba la dirección o vuelve al taller.
            </p>
            <div className="flex flex-wrap gap-4">
              <Boton variant="primary" size="md" asChild>
                <Link href="/">Volver al inicio</Link>
              </Boton>
              <Boton variant="secondary" size="md" asChild>
                <Link href="/tienda">Ir a la tienda</Link>
              </Boton>
            </div>
          </div>

          <CropMarks className="max-w-sm mx-auto w-full p-3">
            <div className="grid grid-cols-2 gap-4">
              <Baldosa color="coral" icono="puntos" iconSize={56} />
              <Baldosa color="ambar" icono="barras" iconSize={56} />
              <Baldosa color="cyan" icono="anillo" iconSize={56} />
              <Baldosa color="key" icono="cuarto" iconSize={56} />
            </div>
          </CropMarks>
        </div>
      </main>

      <BarraCMYK height={6} />
    </div>
  )
}

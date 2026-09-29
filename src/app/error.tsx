/**
 * graficasnasve.art — Error boundary con identidad NASVE
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useEffect } from 'react'
import { Boton } from '@/components/ui/Boton'
import { BarraCMYK } from '@/components/ui/BarraCMYK'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col bg-paper-100">
      <main className="flex-1 flex items-center">
        <div className="contenedor text-center max-w-xl mx-auto py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-gris mb-4">Error</p>
          <h1 className="font-display font-extrabold text-key text-4xl md:text-5xl mb-5">Algo salió de registro</h1>
          <p className="relato text-lg text-key/80 leading-snug mb-8">
            Ha ocurrido un error inesperado. Prueba de nuevo; si el problema persiste, escríbenos y lo revisamos en el
            taller.
          </p>
          <Boton variant="primary" size="md" onClick={reset}>
            Reintentar
          </Boton>
        </div>
      </main>
      <BarraCMYK height={6} />
    </div>
  )
}

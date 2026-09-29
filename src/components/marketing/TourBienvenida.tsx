/**
 * graficasnasve.art — Visita guiada de bienvenida (onboarding)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 *
 * Tour de primera visita con driver.js: presenta el taller y la ruta
 * Tienda → Encargo → Presupuesto → Asistente. Se lanza solo una vez
 * (recordado en localStorage) y puede relanzarse con el evento
 * `nasve:tour` o el botón flotante. Respeta `prefers-reduced-motion`.
 */

'use client'

import { useCallback, useEffect, useRef } from 'react'
import { driver, type Driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { Compass } from 'lucide-react'

const CLAVE_VISTO = 'nasve:tour-visto:v1'

const PASOS = [
  {
    element: '[data-tour="logo"]',
    popover: {
      title: 'Bienvenida a Gráficas NASVE',
      description:
        'Imprenta de Torrent desde 1982. Te enseño el sitio en 30 segundos: cómo pedir, qué ofrecemos y dónde resolver dudas.',
    },
  },
  {
    element: '[data-tour="tienda"]',
    popover: {
      title: 'Tienda',
      description:
        'Productos listos para encargar (flyers, carteles, catálogos…) con precio «desde» y estimación por unidad en vivo.',
    },
  },
  {
    element: '[data-tour="encargo"]',
    popover: {
      title: 'Encargo asistido',
      description:
        'Configura tu trabajo paso a paso: producto, especificaciones y archivo. Respuesta en menos de 24 h.',
    },
  },
  {
    element: '[data-tour="cta"]',
    popover: {
      title: 'Pide presupuesto',
      description: 'Sin compromiso. Cuéntanos qué necesitas y te enviamos una estimación clara con plazos.',
    },
  },
  {
    element: '[data-tour="asistente"]',
    popover: {
      title: '¿Dudas? Pregunta al taller',
      description:
        'El asistente te cualifica el encargo en 4 preguntas y deja el resumen listo. Siempre disponible aquí abajo.',
    },
  },
]

function crearDriver(): Driver {
  const reduce = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  return driver({
    showProgress: true,
    animate: !reduce,
    overlayOpacity: 0.6,
    stagePadding: 6,
    stageRadius: 8,
    nextBtnText: 'Siguiente',
    prevBtnText: 'Atrás',
    doneBtnText: 'Empezar',
    progressText: '{{current}} de {{total}}',
    // Salta cualquier paso cuyo ancla no esté en el DOM (p. ej. móvil sin CTA visible).
    steps: PASOS.filter((p) => (typeof document !== 'undefined' ? document.querySelector(p.element) !== null : true)),
  })
}

export function TourBienvenida() {
  const driverRef = useRef<Driver | null>(null)

  const lanzar = useCallback(() => {
    driverRef.current?.destroy()
    const d = crearDriver()
    driverRef.current = d
    d.drive()
  }, [])

  useEffect(() => {
    // Primera visita: arranca solo una vez.
    let visto = false
    try {
      visto = window.localStorage.getItem(CLAVE_VISTO) === '1'
    } catch {
      visto = false
    }
    if (!visto) {
      // Espera a que navbar y asistente estén pintados.
      const t = window.setTimeout(() => {
        lanzar()
        try {
          window.localStorage.setItem(CLAVE_VISTO, '1')
        } catch {
          /* almacenamiento no disponible: no bloquea */
        }
      }, 600)
      return () => window.clearTimeout(t)
    }
  }, [lanzar])

  // Permite relanzar desde cualquier sitio: window.dispatchEvent(new Event('nasve:tour'))
  useEffect(() => {
    const handler = () => lanzar()
    window.addEventListener('nasve:tour', handler)
    return () => window.removeEventListener('nasve:tour', handler)
  }, [lanzar])

  useEffect(() => () => driverRef.current?.destroy(), [])

  return (
    <button
      type="button"
      onClick={lanzar}
      aria-label="Ver la visita guiada"
      data-tour-trigger
      className="fixed bottom-6 right-24 z-40 hidden md:flex items-center gap-2 rounded-pill border border-key bg-paper-0 px-4 h-14 font-sans text-sm font-semibold text-key shadow-duro-sm hover:translate-y-0.5 hover:shadow-none transition-all"
    >
      <Compass size={18} aria-hidden="true" />
      Visita guiada
    </button>
  )
}

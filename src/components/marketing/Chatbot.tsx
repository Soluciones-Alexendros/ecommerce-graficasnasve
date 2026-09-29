/**
 * graficasnasve.art — Asistente flotante (maqueta guiada, sin IA)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 *
 * Cualifica el encargo en 4 preguntas amables y pasa el resumen al flujo /encargo.
 */

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X, ArrowRight } from 'lucide-react'

type De = 'bot' | 'user'
interface Mensaje {
  de: De
  texto: string
}

const SALUDO = '¡Hola! Soy del taller. ¿Qué te gustaría imprimir?'
const RESPUESTAS_RAPIDAS = ['Catálogo', 'Cartas', 'Flyers', 'Otro']

export function Chatbot() {
  const [abierto, setAbierto] = useState(false)
  const [paso, setPaso] = useState(0)
  const [mensajes, setMensajes] = useState<Mensaje[]>([{ de: 'bot', texto: SALUDO }])
  const [input, setInput] = useState('')
  const finRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensajes, abierto])

  function responderBot(texto: string) {
    setMensajes((m) => [...m, { de: 'bot', texto }])
  }

  function avanzar(respuestaUsuario: string) {
    setMensajes((m) => [...m, { de: 'user', texto: respuestaUsuario }])
    setInput('')
    // Encadena la siguiente pregunta del guion
    setTimeout(() => {
      if (paso === 0) {
        responderBot('¡Genial! ¿Tamaño y nº de páginas aprox.?')
        setPaso(1)
      } else if (paso === 1) {
        responderBot('Anotado. Para enviarte el presupuesto cerrado, ¿me dejas tu email?')
        setPaso(2)
      } else if (paso === 2) {
        responderBot('¡Perfecto! Te escribimos en menos de 24 h. ¿Afinamos el encargo ahora?')
        setPaso(3)
      }
    }, 350)
  }

  function enviarTexto(e: React.FormEvent) {
    e.preventDefault()
    const valor = input.trim()
    if (!valor) return
    avanzar(valor)
  }

  return (
    <>
      {/* Botón flotante */}
      {!abierto && (
        <button
          type="button"
          onClick={() => setAbierto(true)}
          aria-label="Abrir asistente"
          data-tour="asistente"
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-pill bg-ambar text-key border border-key shadow-duro-sm hover:translate-y-0.5 hover:shadow-none transition-all"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Panel */}
      {abierto && (
        <div className="fixed bottom-6 right-6 z-50 w-[min(22rem,calc(100vw-3rem))] rounded-card overflow-hidden border border-key/10 shadow-duro bg-paper-0 flex flex-col max-h-[min(32rem,calc(100vh-3rem))]">
          {/* Cabecera */}
          <div className="bg-key text-paper-100 px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-display font-bold text-sm text-paper-0">Asistente nasve 👋</p>
              <p className="font-mono text-[0.65rem] uppercase tracking-widest text-paper-100/50">En línea · ~30 seg</p>
            </div>
            <button
              type="button"
              onClick={() => setAbierto(false)}
              aria-label="Cerrar asistente"
              className="text-paper-100/70 hover:text-paper-0"
            >
              <X size={18} />
            </button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3 bg-paper-50">
            {mensajes.map((m, i) => (
              <div
                key={i}
                className={[
                  'max-w-[80%] rounded-card px-3 py-2 font-sans text-sm',
                  m.de === 'bot' ? 'self-start bg-paper-0 border border-taupe text-key' : 'self-end bg-ambar text-key',
                ].join(' ')}
              >
                {m.texto}
              </div>
            ))}

            {/* Quick replies (solo paso 0) */}
            {paso === 0 && (
              <div className="flex flex-wrap gap-2 mt-1">
                {RESPUESTAS_RAPIDAS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => avanzar(r)}
                    className="rounded-pill border border-taupe bg-paper-0 px-3 py-1.5 font-sans text-sm text-key hover:border-key transition-colors"
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            {/* Cierre con CTA */}
            {paso === 3 && (
              <Link
                href="/encargo"
                onClick={() => setAbierto(false)}
                className="self-start inline-flex items-center gap-2 rounded-pill bg-key text-paper-0 px-4 py-2 font-sans text-sm font-medium hover:bg-ambar hover:text-key transition-colors"
              >
                Afinar mi encargo <ArrowRight size={15} />
              </Link>
            )}
            <div ref={finRef} />
          </div>

          {/* Entrada (pasos 1 y 2) */}
          {(paso === 1 || paso === 2) && (
            <form onSubmit={enviarTexto} className="flex items-center gap-2 border-t border-taupe bg-paper-0 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                type={paso === 2 ? 'email' : 'text'}
                placeholder={paso === 2 ? 'tu@correo.com' : 'Escribe tu respuesta…'}
                aria-label="Tu respuesta"
                className="flex-1 rounded-pill border border-taupe bg-paper-50 px-4 py-2 font-sans text-sm text-key focus:outline-none focus:border-ambar"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="flex items-center justify-center w-9 h-9 rounded-pill bg-ambar text-key border border-key shrink-0 hover:translate-y-0.5 transition-transform"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      )}
    </>
  )
}

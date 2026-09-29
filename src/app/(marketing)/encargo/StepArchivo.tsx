/**
 * graficasnasve.art — Paso 2: subida de archivo y preflight del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { Check, Upload } from 'lucide-react'
import { Baldosa } from '@/components/ui/Baldosa'
import { IconoEstado, PREFLIGHT } from './EncargoComun'

interface PropsStepArchivo {
  archivoNombre: string
  sinArte: boolean
  onArchivo: (nombre: string) => void
  onSinArte: (sinArte: boolean) => void
}

export function StepArchivo({ archivoNombre, sinArte, onArchivo, onSinArte }: PropsStepArchivo) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-2xl text-key">Sube tu archivo de impresión</h2>
      <p className="font-sans text-sm text-gris -mt-2">
        Lo revisamos al instante y te decimos si necesita ajustes. Si no tienes arte listo, también lo preparamos
        nosotros.
      </p>

      <label className="flex items-center gap-4 rounded-card border border-dashed border-taupe bg-paper-50 px-5 py-6 cursor-pointer hover:border-key transition-colors">
        <Baldosa color="coral" cuadrada={false} className="w-12 h-12 shrink-0">
          <Upload size={22} />
        </Baldosa>
        <div className="min-w-0">
          <span className="block font-sans text-sm font-medium text-key truncate">
            {archivoNombre || 'Selecciona tu archivo (PDF, AI, EPS, ZIP)'}
          </span>
          <span className="block font-mono text-xs text-gris">Máximo 50 MB</span>
        </div>
        <input
          type="file"
          accept=".pdf,.ai,.eps,.zip"
          className="sr-only"
          onChange={(e) => {
            onArchivo(e.target.files?.[0]?.name ?? '')
            onSinArte(false)
          }}
        />
      </label>

      <button
        type="button"
        onClick={() => {
          onSinArte(!sinArte)
          onArchivo('')
        }}
        className={[
          'flex items-center justify-between gap-2 rounded-card border px-4 py-3 font-sans text-sm font-medium text-left transition-colors',
          sinArte ? 'border-ambar bg-ambar/10' : 'border-taupe hover:border-key',
        ].join(' ')}
      >
        <span>
          <span className="font-mono text-xs uppercase tracking-widest text-gris mr-2">¿Sin arte final?</span>
          Que lo diseñe Nasve
        </span>
        {sinArte && <Check size={16} className="text-ambar-700" />}
      </button>

      {archivoNombre && (
        <div className="rounded-card border border-key/10 overflow-hidden">
          <div className="flex items-center gap-2 bg-cyan/15 px-4 py-3">
            <Check size={16} className="text-cyan" />
            <span className="font-sans text-sm font-semibold text-key">
              Listo para imprimir · 1 aviso resuelto por nosotros
            </span>
          </div>
          <ul className="divide-y divide-key/5">
            {PREFLIGHT.map((f) => (
              <li key={f.titulo} className="flex items-start gap-3 px-4 py-3">
                <IconoEstado estado={f.estado} />
                <div>
                  <p className="font-sans text-sm font-semibold text-key">{f.titulo}</p>
                  <p className="font-sans text-xs text-gris">{f.detalle}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

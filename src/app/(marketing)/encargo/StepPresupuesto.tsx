/**
 * graficasnasve.art — Paso 3: datos de contacto del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { Campo } from '@/components/ui/Campo'

interface PropsStepPresupuesto {
  nombre: string
  setNombre: (v: string) => void
  empresa: string
  setEmpresa: (v: string) => void
  email: string
  setEmail: (v: string) => void
  telefono: string
  setTelefono: (v: string) => void
  rgpd: boolean
  setRgpd: (v: boolean) => void
  errorMsg?: string
}

export function StepPresupuesto({
  nombre,
  setNombre,
  empresa,
  setEmpresa,
  email,
  setEmail,
  telefono,
  setTelefono,
  rgpd,
  setRgpd,
  errorMsg,
}: PropsStepPresupuesto) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-display font-bold text-2xl text-key">Tus datos y te enviamos el presupuesto</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Campo
          label="Nombre *"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre y apellidos"
        />
        <Campo label="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} placeholder="Opcional" />
        <Campo
          label="Email *"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
        />
        <Campo
          label="Teléfono"
          type="tel"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="+34 600 000 000"
        />
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={rgpd}
          onChange={(e) => setRgpd(e.target.checked)}
          className="mt-1 w-4 h-4 accent-key"
        />
        <span className="font-sans text-sm text-gris leading-relaxed">
          Acepto la política de privacidad. Mis datos serán tratados por Gráficas NASVE, S.L. para gestionar mi encargo
          (art. 6.1.b RGPD). *
        </span>
      </label>
      {errorMsg && (
        <p className="font-sans text-sm text-coral" role="alert">
          {errorMsg}
        </p>
      )}
    </div>
  )
}

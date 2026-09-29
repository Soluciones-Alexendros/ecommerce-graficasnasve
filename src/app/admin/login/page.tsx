/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, AlertCircle } from 'lucide-react'
import { createClienteSupabase } from '@/lib/supabase/cliente'
import { Campo } from '@/components/ui/Campo'
import { Boton } from '@/components/ui/Boton'
import { Logo } from '@/components/marketing/Logo'

export default function PaginaAdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const supabase = createClienteSupabase()
    if (!supabase) {
      setError('El servicio de autenticación no está disponible. Contacta con el administrador.')
      setCargando(false)
      return
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError) {
      setError('Credenciales incorrectas. Verifica tu email y contraseña.')
      setCargando(false)
      return
    }

    router.push('/admin')
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-fondo-alt flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-10">
          <Logo />
          <p className="mt-2 font-mono text-xs text-gris uppercase tracking-widest">Panel de administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-blanco border border-borde p-8 flex flex-col gap-5"
          aria-label="Formulario de acceso al panel de administración"
        >
          <Campo
            label="Email"
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail((e as React.ChangeEvent<HTMLInputElement>).target.value)}
            required
          />
          <Campo
            label="Contraseña"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword((e as React.ChangeEvent<HTMLInputElement>).target.value)}
            required
          />

          {error && (
            <div className="flex items-start gap-2 p-3 bg-rojo/5 border border-rojo/20">
              <AlertCircle size={16} className="text-rojo shrink-0 mt-0.5" />
              <p className="font-sans text-sm text-rojo">{error}</p>
            </div>
          )}

          <Boton type="submit" variant="primary" size="md" disabled={cargando} className="w-full mt-2">
            {cargando ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Accediendo...
              </>
            ) : (
              'Acceder'
            )}
          </Boton>
        </form>

        <p className="text-center mt-6 font-mono text-xs text-gris">graficasnasve.art © 2026</p>
      </div>
    </div>
  )
}

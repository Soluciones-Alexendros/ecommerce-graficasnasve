/**
 * graficasnasve.art — Cliente administrativo de Supabase (service role).
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { createServerClient } from '@supabase/ssr'
import type { Database } from '@/types/supabase'

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceKey) return null

  return createServerClient<Database>(url, serviceKey, {
    cookies: {
      getAll: () => [],
      setAll: () => {},
    },
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}

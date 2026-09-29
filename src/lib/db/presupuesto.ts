/**
 * graficasnasve.art — Persistencia de presupuestos en Supabase.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { createAdminClient } from '@/lib/supabase/admin'
import type { DatosPresupuesto } from '@/lib/validaciones/presupuesto'

export async function insertarPresupuesto(
  datos: DatosPresupuesto,
  archivoUrl: string | null,
  archivoNombre: string | null,
): Promise<void> {
  const supabaseAdmin = createAdminClient()
  if (!supabaseAdmin) return

  const { error: dbError } = await supabaseAdmin.from('presupuestos').insert({
    nombre: datos.nombre,
    empresa: datos.empresa || null,
    email: datos.email,
    telefono: datos.telefono || null,
    producto: datos.producto,
    tirada: datos.tirada || null,
    detalles: datos.detalles || null,
    acabados: datos.acabados || null,
    entrega: datos.entrega || null,
    archivo_url: archivoUrl,
    archivo_nombre: archivoNombre,
    estado: 'nuevo',
    notas_admin: null,
  })

  if (dbError) {
    console.error('[db/presupuesto] Error insertando en BD:', dbError.message)
  }
}

/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { NextRequest, NextResponse } from 'next/server'
import { schemaPresupuesto } from '@/lib/validaciones/presupuesto'
import { subirArchivoPresupuesto } from '@/lib/storage/presupuesto'
import { insertarPresupuesto } from '@/lib/db/presupuesto'
import { sendEmailPresupuesto } from '@/lib/email/presupuesto'

export async function POST(request: NextRequest) {
  try {
    // 1. Parsear FormData (soporta multipart para archivo adjunto)
    let formData: FormData
    try {
      formData = await request.formData()
    } catch {
      return NextResponse.json({ error: 'No se pudo procesar la solicitud' }, { status: 400 })
    }

    // 2. Extraer campos del formulario
    const campos = {
      nombre: formData.get('nombre'),
      empresa: formData.get('empresa'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      producto: formData.get('producto'),
      tirada: formData.get('tirada'),
      detalles: formData.get('detalles'),
      acabados: formData.get('acabados'),
      entrega: formData.get('entrega'),
      rgpd: formData.get('rgpd'),
    }

    // Convertir rgpd a boolean
    const datosRaw = {
      ...campos,
      rgpd: campos.rgpd === 'true',
    }

    // 3. Validar con zod
    const resultado = schemaPresupuesto.safeParse(datosRaw)
    if (!resultado.success) {
      const errores = resultado.error.flatten().fieldErrors
      return NextResponse.json({ error: 'Datos inválidos', errores }, { status: 422 })
    }

    const datos = resultado.data
    const archivo = formData.get('archivo')
    let archivoUrl: string | null = null
    let archivoNombre: string | null = null

    // 4. Upload de archivo a Supabase Storage (si se adjuntó)
    if (archivo && archivo instanceof File && archivo.size > 0) {
      try {
        const subida = await subirArchivoPresupuesto(archivo)
        archivoUrl = subida.url
        archivoNombre = subida.nombre
      } catch (err) {
        const mensaje = err instanceof Error ? err.message : 'Error al procesar el archivo'
        return NextResponse.json({ error: mensaje }, { status: 422 })
      }
    }

    // 5. INSERT en tabla presupuestos
    await insertarPresupuesto(datos, archivoUrl, archivoNombre)

    // 6. Enviar emails
    await sendEmailPresupuesto(datos, archivoNombre ?? undefined, archivoUrl ?? undefined)

    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (err) {
    console.error('[api/presupuesto] Error inesperado:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}

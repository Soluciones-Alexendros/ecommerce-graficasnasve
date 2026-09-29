/**
 * graficasnasve.art — Subida de archivos de presupuesto a Supabase Storage.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { randomUUID } from 'crypto'
import path from 'path'
import { createAdminClient } from '@/lib/supabase/admin'

export const MAX_ARCHIVO_BYTES = 50 * 1024 * 1024 // 50 MB

export const ALLOWED_EXTENSIONS = ['pdf', 'ai', 'eps', 'zip']

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/postscript',
  'application/illustrator',
  'image/x-eps',
  'application/zip',
  'application/x-zip-compressed',
]

/**
 * Sanea el nombre de archivo original:
 * - elimina cualquier componente de ruta,
 * - conserva solo caracteres seguros,
 * - normaliza a minúsculas.
 */
export function sanitizeFileName(name: string): string {
  const base = path.basename(name)
  return base
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^[._-]+|[._-]+$/g, '')
    .toLowerCase()
}

export function validateFile(archivo: File): { ok: boolean; error?: string } {
  const safeName = sanitizeFileName(archivo.name)
  const ext = safeName.split('.').pop() ?? ''
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { ok: false, error: 'Extensión de archivo no permitida' }
  }
  if (
    archivo.type &&
    !ALLOWED_MIME_TYPES.includes(archivo.type) &&
    !(archivo.type === 'application/octet-stream' && ['ai', 'eps'].includes(ext))
  ) {
    return { ok: false, error: 'Tipo de archivo no permitido' }
  }
  return { ok: true }
}

export interface ResultadoSubida {
  url: string | null
  nombre: string | null
}

/**
 * Sube un archivo al bucket privado `arte-files` y devuelve una signed URL
 * de 1 h. No bloquea el flujo si falla la subida: en ese caso devuelve nulls.
 */
export async function subirArchivoPresupuesto(archivo: File): Promise<ResultadoSubida> {
  if (archivo.size > MAX_ARCHIVO_BYTES) {
    throw new Error('El archivo supera el límite de 50 MB')
  }

  const validacion = validateFile(archivo)
  if (!validacion.ok) {
    throw new Error(validacion.error)
  }

  const supabaseAdmin = createAdminClient()
  if (!supabaseAdmin) {
    return { url: null, nombre: null }
  }

  const uuid = randomUUID()
  const safeName = sanitizeFileName(archivo.name)
  const storagePath = `presupuestos/${uuid}/${safeName}`
  const buffer = await archivo.arrayBuffer()

  const { error: uploadError } = await supabaseAdmin.storage.from('arte-files').upload(storagePath, buffer, {
    contentType: archivo.type || 'application/octet-stream',
    upsert: false,
  })

  if (uploadError) {
    console.error('[storage/presupuesto] Error subiendo archivo:', uploadError.message)
    return { url: null, nombre: null }
  }

  const { data: signedData, error: signedError } = await supabaseAdmin.storage
    .from('arte-files')
    .createSignedUrl(storagePath, 3600)

  if (signedError) {
    console.error('[storage/presupuesto] Error generando signed URL:', signedError.message)
    return { url: null, nombre: null }
  }

  return { url: signedData.signedUrl, nombre: safeName }
}

/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import Link from 'next/link'
import { createServidorSupabase } from '@/lib/supabase/servidor'
import type { Presupuesto } from '@/types/supabase'
import { Tarjeta } from '@/components/ui/Tarjeta'
import { Boton } from '@/components/ui/Boton'
import { Chip, type TonoChip } from '@/components/ui/Chip'

interface PropiedadesId {
  params: Promise<{ id: string }>
}

export const metadata: Metadata = {
  title: 'Detalle de presupuesto — Admin NASVE',
  robots: { index: false, follow: false },
}

const ETIQUETAS_ESTADO: Record<Presupuesto['estado'], string> = {
  nuevo: 'Nuevo',
  en_revision: 'En revisión',
  presupuestado: 'Presupuestado',
  aceptado: 'Aceptado',
  rechazado: 'Rechazado',
  completado: 'Completado',
}

const TONO_ESTADO: Record<Presupuesto['estado'], TonoChip> = {
  nuevo: 'ambar',
  en_revision: 'plain',
  presupuestado: 'spot-blue',
  aceptado: 'cyan',
  rechazado: 'coral',
  completado: 'key',
}

const ETIQUETAS_PRODUCTO: Record<Presupuesto['producto'], string> = {
  papeleria: 'Papelería comercial',
  catalogo: 'Catálogos y revistas',
  libro: 'Libros',
  carpeteria: 'Carpetería',
  otro: 'Personalizados / Otro',
}

async function obtenerPresupuesto(id: string): Promise<Presupuesto | null> {
  const supabase = await createServidorSupabase()
  if (!supabase) return null

  const { data, error } = await supabase.from('presupuestos').select('*').eq('id', id).single()

  if (error || !data) return null
  return data
}

async function actualizarPresupuesto(formData: FormData) {
  'use server'

  const id = formData.get('id') as string
  const estado = formData.get('estado') as Presupuesto['estado']
  const notas_admin = formData.get('notas_admin') as string | null

  const supabase = await createServidorSupabase()
  if (!supabase || !id) return

  await supabase
    .from('presupuestos')
    .update({
      estado,
      notas_admin: notas_admin || null,
    })
    .eq('id', id)

  redirect(`/admin/presupuestos/${id}`)
}

export default async function PaginaDetallePresupuesto({ params }: PropiedadesId) {
  const { id } = await params
  const presupuesto = await obtenerPresupuesto(id)

  if (!presupuesto) {
    notFound()
  }

  const campos: [string, string][] = [
    ['Nombre', presupuesto.nombre],
    ['Empresa', presupuesto.empresa ?? '—'],
    ['Email', presupuesto.email],
    ['Teléfono', presupuesto.telefono ?? '—'],
    ['Producto', ETIQUETAS_PRODUCTO[presupuesto.producto]],
    ['Tirada', presupuesto.tirada ?? '—'],
    ['Fecha de entrega deseada', presupuesto.entrega ?? '—'],
    ['Detalles', presupuesto.detalles ?? '—'],
    ['Acabados', presupuesto.acabados ?? '—'],
  ]

  return (
    <div>
      {/* Migas de pan */}
      <nav aria-label="Migas de pan" className="mb-8">
        <ol className="flex items-center gap-2 font-mono text-xs text-gris">
          <li>
            <Link href="/admin" className="hover:text-key transition-colors">
              Presupuestos
            </Link>
          </li>
          <li aria-hidden="true">›</li>
          <li className="text-key truncate max-w-xs">{presupuesto.nombre}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Detalle */}
        <div className="lg:col-span-2">
          <Tarjeta className="p-8 mb-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="font-display font-extrabold text-2xl text-key">{presupuesto.nombre}</h1>
                  <Chip tono={TONO_ESTADO[presupuesto.estado]}>{ETIQUETAS_ESTADO[presupuesto.estado]}</Chip>
                </div>
                {presupuesto.empresa && <p className="font-sans text-sm text-gris">{presupuesto.empresa}</p>}
              </div>
              <p className="font-mono text-xs text-gris whitespace-nowrap">
                {new Date(presupuesto.created_at).toLocaleDateString('es-ES', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>

            <table className="w-full">
              <tbody>
                {campos.map(([campo, valor]) => (
                  <tr key={campo} className="border-t border-taupe">
                    <td className="py-3 pr-6 font-mono text-xs uppercase tracking-widest text-gris w-1/3 align-top">
                      {campo}
                    </td>
                    <td className="py-3 font-sans text-sm text-key align-top whitespace-pre-wrap">{valor}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {presupuesto.archivo_url && (
              <div className="mt-6 pt-6 border-t border-taupe">
                <p className="font-mono text-xs uppercase tracking-widest text-gris mb-2">Archivo adjunto</p>
                <a
                  href={presupuesto.archivo_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-ambar-700 hover:underline"
                >
                  {presupuesto.archivo_nombre ?? 'Descargar archivo'} ↗
                </a>
              </div>
            )}
          </Tarjeta>
        </div>

        {/* Panel de gestión */}
        <div className="lg:col-span-1">
          <Tarjeta className="p-6">
            <h2 className="font-display text-lg font-bold text-key mb-5">Gestionar solicitud</h2>

            <form action={actualizarPresupuesto} className="flex flex-col gap-4">
              <input type="hidden" name="id" value={presupuesto.id} />

              {/* Estado */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="estado" className="font-mono text-xs font-medium uppercase tracking-widest text-gris">
                  Estado
                </label>
                <select
                  id="estado"
                  name="estado"
                  defaultValue={presupuesto.estado}
                  className="w-full rounded-card border border-taupe bg-paper-0 text-key font-sans text-sm px-3 py-2.5 focus:outline-none focus:border-ambar focus:ring-2 focus:ring-ambar/25"
                >
                  {Object.entries(ETIQUETAS_ESTADO).map(([valor, etiqueta]) => (
                    <option key={valor} value={valor}>
                      {etiqueta}
                    </option>
                  ))}
                </select>
              </div>

              {/* Notas admin */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="notas_admin"
                  className="font-mono text-xs font-medium uppercase tracking-widest text-gris"
                >
                  Notas internas
                </label>
                <textarea
                  id="notas_admin"
                  name="notas_admin"
                  rows={5}
                  defaultValue={presupuesto.notas_admin ?? ''}
                  placeholder="Notas internas sobre este presupuesto..."
                  className="w-full rounded-card border border-taupe bg-paper-0 text-key font-sans text-sm px-3 py-2.5 focus:outline-none focus:border-ambar focus:ring-2 focus:ring-ambar/25 resize-y"
                />
              </div>

              <Boton type="submit" variant="dark" size="md" className="w-full">
                Guardar cambios
              </Boton>
            </form>

            {/* Enlace a email */}
            <div className="mt-6 pt-6 border-t border-taupe">
              <Boton variant="secondary" size="md" asChild className="w-full">
                <a href={`mailto:${presupuesto.email}?subject=Re: Tu solicitud de presupuesto — Gráficas NASVE`}>
                  Responder por email
                </a>
              </Boton>
            </div>
          </Tarjeta>
        </div>
      </div>
    </div>
  )
}

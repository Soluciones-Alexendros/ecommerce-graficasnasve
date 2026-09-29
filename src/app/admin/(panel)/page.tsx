/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { createServidorSupabase } from '@/lib/supabase/servidor'
import type { Presupuesto } from '@/types/supabase'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { Stat } from '@/components/ui/Stat'
import { Tarjeta } from '@/components/ui/Tarjeta'

export const metadata: Metadata = {
  title: 'Dashboard — Admin NASVE',
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

const COLORES_ESTADO: Record<Presupuesto['estado'], string> = {
  nuevo: 'bg-ambar/20 text-ambar-700',
  en_revision: 'bg-paper-50 text-gris border border-taupe',
  presupuestado: 'bg-spot-blue/15 text-spot-blue',
  aceptado: 'bg-cyan/20 text-cyan',
  rechazado: 'bg-coral/15 text-coral',
  completado: 'bg-key/10 text-key',
}

const ETIQUETAS_PRODUCTO: Record<Presupuesto['producto'], string> = {
  papeleria: 'Papelería',
  catalogo: 'Catálogos',
  libro: 'Libros',
  carpeteria: 'Carpetería',
  otro: 'Otro',
}

async function obtenerPresupuestos(): Promise<Presupuesto[]> {
  const supabase = await createServidorSupabase()
  if (!supabase) return []

  const { data, error } = await supabase
    .from('presupuestos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('[admin] Error fetching presupuestos:', error.message)
    return []
  }

  return data ?? []
}

export default async function PaginaAdminDashboard() {
  const presupuestos = await obtenerPresupuestos()

  const stats = {
    total: presupuestos.length,
    nuevos: presupuestos.filter((p) => p.estado === 'nuevo').length,
    enRevision: presupuestos.filter((p) => p.estado === 'en_revision').length,
    completados: presupuestos.filter((p) => p.estado === 'completado').length,
  }

  return (
    <div>
      <div className="mb-10">
        <SectionLabel>Panel · Admin</SectionLabel>
        <h1 className="mt-3 font-display font-extrabold text-3xl text-key mb-1">Presupuestos</h1>
        <p className="font-sans text-sm text-gris">Gestión de solicitudes recibidas a través de graficasnasve.art</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total', valor: stats.total },
          { label: 'Nuevos', valor: stats.nuevos },
          { label: 'En revisión', valor: stats.enRevision },
          { label: 'Completados', valor: stats.completados },
        ].map(({ label, valor }) => (
          <Tarjeta key={label} className="p-5">
            <Stat valor={String(valor)} caption={label} />
          </Tarjeta>
        ))}
      </div>

      {/* Tabla */}
      {presupuestos.length === 0 ? (
        <Tarjeta className="p-12 text-center">
          <p className="font-sans text-gris">No hay solicitudes de presupuesto todavía.</p>
        </Tarjeta>
      ) : (
        <Tarjeta className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-taupe">
                {['Fecha', 'Nombre', 'Empresa', 'Email', 'Producto', 'Estado'].map((col) => (
                  <th key={col} className="text-left font-mono text-xs text-gris uppercase tracking-wide px-5 py-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {presupuestos.map((p, i) => (
                <tr
                  key={p.id}
                  className={`border-b border-taupe last:border-0 hover:bg-paper-50 transition-colors ${
                    i % 2 === 0 ? '' : 'bg-paper-50/40'
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-xs text-gris whitespace-nowrap">
                    <Link href={`/admin/presupuestos/${p.id}`} className="hover:text-key transition-colors">
                      {new Date(p.created_at).toLocaleDateString('es-ES', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                      })}
                    </Link>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-key font-medium">
                    <Link href={`/admin/presupuestos/${p.id}`} className="hover:text-ambar-700 transition-colors">
                      {p.nombre}
                    </Link>
                  </td>
                  <td className="px-5 py-4 font-sans text-sm text-gris">{p.empresa ?? '—'}</td>
                  <td className="px-5 py-4 font-sans text-sm text-gris">
                    <a href={`mailto:${p.email}`} className="hover:text-key transition-colors">
                      {p.email}
                    </a>
                  </td>
                  <td className="px-5 py-4 font-mono text-xs text-gris">{ETIQUETAS_PRODUCTO[p.producto]}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-block rounded-pill font-mono text-xs uppercase tracking-wide px-2.5 py-1 ${COLORES_ESTADO[p.estado]}`}
                    >
                      {ETIQUETAS_ESTADO[p.estado]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Tarjeta>
      )}
    </div>
  )
}

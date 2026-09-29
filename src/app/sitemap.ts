/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { MetadataRoute } from 'next'
import { catalogoServicios } from '@/lib/catalogoServicios'
import { catalogoTienda } from '@/lib/catalogoTienda'

const BASE_URL = 'https://graficasnasve.art'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date()

  // Rutas estáticas
  const rutasEstaticas: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/historia`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/servicios`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...catalogoServicios.map((s) => ({
      url: `${BASE_URL}/servicios/${s.slug}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: `${BASE_URL}/portfolio`,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tienda`,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...catalogoTienda.map((p) => ({
      url: `${BASE_URL}/tienda/${p.slug}`,
      lastModified: ahora,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
    {
      url: `${BASE_URL}/sostenibilidad`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contacto`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/encargo`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/presupuesto`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/aviso-legal`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacidad`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/cookies`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  return rutasEstaticas
}

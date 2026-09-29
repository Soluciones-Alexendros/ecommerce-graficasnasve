/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import type { ProductoPresupuesto } from '@/types/supabase'
import type { ColorBaldosa } from '@/components/ui/Baldosa'
import type { NombreIcono } from '@/components/ui/iconosGeometricos'
import { estimarPrecioUnitario } from './precioTienda'

export type CategoriaTienda = 'publicidad' | 'editorial' | 'hosteleria' | 'identidad' | 'gran-formato' | 'producto'

export interface OpcionConfigurable {
  id: string
  etiqueta: string
  /** Multiplicador sobre el precio base. La opción de referencia es factor 1. */
  factor: number
}

export interface ProductoTienda {
  slug: string
  nombre: string
  categoria: CategoriaTienda
  descripcionCorta: string
  descripcion: string
  /** Formato físico de referencia (p. ej. «A5 · 148 × 210 mm»). */
  formato: string
  /** Material/soporte de referencia. */
  material: string
  /** Opciones de gramaje/soporte (incluye la de referencia, factor 1). */
  gramajes: OpcionConfigurable[]
  /** Opciones de acabado (la 1.ª es la base «Sin acabado», factor 1). */
  acabados: OpcionConfigurable[]
  /** Tramos de cantidad sugeridos (ascendente). */
  cantidades: number[]
  /** Precio por unidad en condiciones de referencia (€). ORIENTATIVO. */
  precioBase: number
  /** Tipo equivalente en el formulario de presupuesto (prefill del CTA). */
  tipoPresupuesto?: ProductoPresupuesto
  destacado?: boolean
}

export interface CategoriaTiendaInfo {
  valor: CategoriaTienda
  etiqueta: string
}

export const CATEGORIAS_TIENDA: CategoriaTiendaInfo[] = [
  { valor: 'publicidad', etiqueta: 'Publicidad' },
  { valor: 'editorial', etiqueta: 'Editorial' },
  { valor: 'hosteleria', etiqueta: 'Hostelería' },
  { valor: 'identidad', etiqueta: 'Identidad' },
  { valor: 'gran-formato', etiqueta: 'Gran formato' },
  { valor: 'producto', etiqueta: 'Producto' },
]

/** Color de baldosa e icono geométrico por categoría (motivo del DS). */
export const ESTILO_CATEGORIA: Record<CategoriaTienda, { color: ColorBaldosa; icono: NombreIcono }> = {
  publicidad: { color: 'ambar', icono: 'barras' },
  editorial: { color: 'spot-blue', icono: 'mediaLuna' },
  hosteleria: { color: 'cyan', icono: 'anillo' },
  identidad: { color: 'lavender', icono: 'estrella' },
  'gran-formato': { color: 'coral', icono: 'puntos' },
  producto: { color: 'key', icono: 'cuarto' },
}

// ── Opciones reutilizables (factores ORIENTATIVOS) ──────────────────────────
const ACAB_NINGUNO: OpcionConfigurable = { id: 'ninguno', etiqueta: 'Sin acabado', factor: 1 }
const ACAB_MATE: OpcionConfigurable = { id: 'laminado-mate', etiqueta: 'Laminado mate', factor: 1.15 }
const ACAB_BRILLO: OpcionConfigurable = { id: 'laminado-brillo', etiqueta: 'Laminado brillo', factor: 1.15 }
const ACAB_UVI: OpcionConfigurable = { id: 'uvi-selectivo', etiqueta: 'UVI selectivo', factor: 1.35 }
const ACAB_STAMPING: OpcionConfigurable = { id: 'stamping', etiqueta: 'Stamping metálico', factor: 1.55 }

const GRAMAJES_FOLLETO: OpcionConfigurable[] = [
  { id: 'g135', etiqueta: '135 g/m²', factor: 1 },
  { id: 'g170', etiqueta: '170 g/m²', factor: 1.12 },
  { id: 'g250', etiqueta: '250 g/m²', factor: 1.3 },
]
const GRAMAJES_CARTULINA: OpcionConfigurable[] = [
  { id: 'g250', etiqueta: '250 g/m²', factor: 1 },
  { id: 'g300', etiqueta: '300 g/m²', factor: 1.12 },
  { id: 'g350', etiqueta: '350 g/m²', factor: 1.25 },
]
const soporteUnico = (etiqueta: string): OpcionConfigurable[] => [{ id: 'estandar', etiqueta, factor: 1 }]

export const catalogoTienda: ProductoTienda[] = [
  // ── Publicidad ──────────────────────────────────────────────────────────
  {
    slug: 'flyers-a5',
    nombre: 'Flyers A5',
    categoria: 'publicidad',
    descripcionCorta: 'Reparto en mano o buzoneo. Color vivo a doble cara.',
    descripcion:
      'Flyers A5 impresos a todo color por ambas caras, ideales para promociones, eventos y buzoneo. Acabado profesional y entrega rápida para campañas que no pueden esperar.',
    formato: 'A5 · 148 × 210 mm',
    material: 'Estucado brillo',
    gramajes: GRAMAJES_FOLLETO,
    acabados: [ACAB_NINGUNO, ACAB_MATE, ACAB_BRILLO],
    cantidades: [100, 250, 500, 1000, 2500],
    precioBase: 0.18,
    tipoPresupuesto: 'otro',
    destacado: true,
  },
  {
    slug: 'carteles-a3',
    nombre: 'Carteles A3',
    categoria: 'publicidad',
    descripcionCorta: 'Para escaparate y cartelería interior. Color de impacto.',
    descripcion:
      'Carteles A3 a todo color sobre papel estucado, perfectos para escaparates, eventos y comunicación en punto de venta. Reproducción cromática nítida y fiable.',
    formato: 'A3 · 297 × 420 mm',
    material: 'Estucado mate',
    gramajes: GRAMAJES_FOLLETO,
    acabados: [ACAB_NINGUNO, ACAB_MATE],
    cantidades: [25, 50, 100, 250, 500],
    precioBase: 0.95,
    tipoPresupuesto: 'otro',
  },
  // ── Editorial ───────────────────────────────────────────────────────────
  {
    slug: 'catalogo-grapado-a4',
    nombre: 'Catálogo grapado A4',
    categoria: 'editorial',
    descripcionCorta: '24 páginas grapadas a caballete. Tu colección, impecable.',
    descripcion:
      'Catálogo A4 de 24 páginas con grapado a caballete, idóneo para colecciones de producto, memorias y dosieres. Interior y portada a todo color con opción de plastificado.',
    formato: 'A4 · 210 × 297 mm · 24 págs.',
    material: 'Estucado mate',
    gramajes: GRAMAJES_FOLLETO,
    acabados: [ACAB_NINGUNO, ACAB_MATE, ACAB_UVI],
    cantidades: [50, 100, 250, 500, 1000],
    precioBase: 1.8,
    tipoPresupuesto: 'catalogo',
  },
  {
    slug: 'libro-rustica',
    nombre: 'Libro en rústica',
    categoria: 'editorial',
    descripcionCorta: '160 páginas cosidas en rústica. Para que dure.',
    descripcion:
      'Libro de 160 páginas con encuadernación en rústica fresada, interior en offset ahuesado y cubierta a color. La solución artesanal de NASVE para autoedición y ediciones de calidad.',
    formato: '15 × 21 cm · 160 págs.',
    material: 'Interior offset ahuesado 90 g',
    gramajes: soporteUnico('Offset ahuesado 90 g/m²'),
    acabados: [ACAB_NINGUNO, ACAB_MATE, ACAB_STAMPING],
    cantidades: [50, 100, 250, 500, 1000],
    precioBase: 6.5,
    tipoPresupuesto: 'libro',
  },
  // ── Hostelería ──────────────────────────────────────────────────────────
  {
    slug: 'carta-menu',
    nombre: 'Carta de menú',
    categoria: 'hosteleria',
    descripcionCorta: 'Resistente y plastificada. Aguanta el día a día del local.',
    descripcion:
      'Carta de menú en cartulina gráfica con plastificado protector, pensada para resistir el uso diario en hostelería. Limpia con un paño y mantiene el color intacto temporada tras temporada.',
    formato: 'A4 · plastificado a doble cara',
    material: 'Cartulina gráfica',
    gramajes: GRAMAJES_CARTULINA,
    acabados: [ACAB_NINGUNO, ACAB_MATE, ACAB_UVI],
    cantidades: [10, 25, 50, 100, 250],
    precioBase: 2.4,
    tipoPresupuesto: 'otro',
  },
  {
    slug: 'manteles-individuales',
    nombre: 'Manteles individuales',
    categoria: 'hosteleria',
    descripcionCorta: 'Papel ecológico personalizado. Tu marca en cada mesa.',
    descripcion:
      'Manteles individuales de papel ecológico impresos con tu identidad, ideales para restaurantes, cafeterías y catering. Un soporte publicitario que el cliente tiene delante durante toda la comida.',
    formato: '30 × 40 cm',
    material: 'Offset ecológico 80 g',
    gramajes: soporteUnico('Offset ecológico 80 g/m²'),
    acabados: [ACAB_NINGUNO],
    cantidades: [250, 500, 1000, 2500, 5000],
    precioBase: 0.09,
    tipoPresupuesto: 'otro',
  },
  // ── Identidad ───────────────────────────────────────────────────────────
  {
    slug: 'tarjetas-de-visita',
    nombre: 'Tarjetas de visita',
    categoria: 'identidad',
    descripcionCorta: 'El primer apretón de manos de tu marca. Acabados premium.',
    descripcion:
      'Tarjetas de visita a doble cara sobre cartulina de calidad, con opción de laminado, UVI selectivo o stamping metálico. El detalle que transmite el cuidado de tu negocio antes de decir una palabra.',
    formato: '85 × 55 mm',
    material: 'Estucado',
    gramajes: GRAMAJES_CARTULINA,
    acabados: [ACAB_NINGUNO, ACAB_MATE, ACAB_UVI, ACAB_STAMPING],
    cantidades: [100, 250, 500, 1000],
    precioBase: 0.06,
    tipoPresupuesto: 'papeleria',
    destacado: true,
  },
  {
    slug: 'papel-de-carta',
    nombre: 'Papel de carta corporativo',
    categoria: 'identidad',
    descripcionCorta: 'Papelería de empresa coherente y profesional.',
    descripcion:
      'Hojas de carta A4 con tu identidad corporativa impresas en offset, para una comunicación escrita coherente y profesional. Combínalas con sobres y tarjetas para una imagen de marca completa.',
    formato: 'A4 · 210 × 297 mm',
    material: 'Offset blanco 90 g',
    gramajes: soporteUnico('Offset blanco 90 g/m²'),
    acabados: [ACAB_NINGUNO],
    cantidades: [250, 500, 1000, 2500],
    precioBase: 0.12,
    tipoPresupuesto: 'papeleria',
  },
  // ── Gran formato ────────────────────────────────────────────────────────
  {
    slug: 'lona-publicitaria',
    nombre: 'Lona publicitaria',
    categoria: 'gran-formato',
    descripcionCorta: 'Resistente a intemperie. Visibilidad a gran escala.',
    descripcion:
      'Lona frontlit de 510 g impresa a gran formato y resistente a la intemperie, con ojales para una instalación sencilla. Para fachadas, obras, ferias y eventos donde hay que verse de lejos.',
    formato: 'Hasta 3 × 2 m · precio por m²',
    material: 'Lona frontlit 510 g',
    gramajes: soporteUnico('Frontlit 510 g'),
    acabados: [
      { id: 'ojales', etiqueta: 'Con ojales', factor: 1 },
      { id: 'ojales-refuerzo', etiqueta: 'Ojales + refuerzo perimetral', factor: 1.2 },
    ],
    cantidades: [1, 2, 5, 10, 25],
    precioBase: 8.5,
    tipoPresupuesto: 'otro',
  },
  {
    slug: 'roll-up',
    nombre: 'Roll-up enrollable',
    categoria: 'gran-formato',
    descripcionCorta: 'Stand portátil listo en segundos. Reutilizable.',
    descripcion:
      'Roll-up de 85 × 200 cm con estructura de aluminio enrollable y bolsa de transporte. Se monta en segundos y acompaña tu marca en ferias, congresos y presentaciones, una y otra vez.',
    formato: '85 × 200 cm · con estructura',
    material: 'Vinilo + estructura de aluminio',
    gramajes: soporteUnico('Vinilo poliéster'),
    acabados: [
      { id: 'estandar', etiqueta: 'Estructura estándar', factor: 1 },
      { id: 'premium', etiqueta: 'Estructura premium', factor: 1.4 },
    ],
    cantidades: [1, 2, 5, 10, 25],
    precioBase: 38,
    tipoPresupuesto: 'otro',
  },
  // ── Producto ────────────────────────────────────────────────────────────
  {
    slug: 'pegatinas-troqueladas',
    nombre: 'Pegatinas troqueladas',
    categoria: 'producto',
    descripcionCorta: 'Forma libre en vinilo adhesivo. Pega tu marca donde quieras.',
    descripcion:
      'Pegatinas en vinilo adhesivo troqueladas con la forma de tu logotipo o diseño, con opción de laminado resistente. Perfectas para packaging, merchandising y campañas que se quedan pegadas.',
    formato: 'Hasta 10 × 10 cm · forma libre',
    material: 'Vinilo adhesivo blanco',
    gramajes: soporteUnico('Vinilo blanco'),
    acabados: [ACAB_NINGUNO, ACAB_BRILLO, { id: 'laminado-resistente', etiqueta: 'Laminado resistente', factor: 1.25 }],
    cantidades: [50, 100, 250, 500, 1000],
    precioBase: 0.22,
    tipoPresupuesto: 'otro',
  },
  {
    slug: 'placa-madera',
    nombre: 'Placa impresa sobre madera',
    categoria: 'producto',
    descripcionCorta: 'Impresión UV directa sobre madera natural. La especialidad NASVE.',
    descripcion:
      'Placa de madera natural con impresión UV directa, donde la veta forma parte del diseño. La especialidad diferencial de NASVE para señalética premium, decoración, regalo de empresa y packaging de lujo.',
    formato: '20 × 30 cm · grosor 6 mm',
    material: 'Madera natural (impresión UV directa)',
    gramajes: [
      { id: 'g6', etiqueta: 'Grosor 6 mm', factor: 1 },
      { id: 'g3', etiqueta: 'Grosor 3 mm', factor: 0.85 },
      { id: 'g10', etiqueta: 'Grosor 10 mm', factor: 1.2 },
    ],
    acabados: [ACAB_NINGUNO, { id: 'barniz', etiqueta: 'Barniz protector', factor: 1.2 }],
    cantidades: [1, 5, 10, 25, 50],
    precioBase: 14,
    tipoPresupuesto: 'otro',
    destacado: true,
  },
]

/**
 * Precio unitario mínimo a mostrar como «desde» en la tarjeta: máximo volumen
 * con las opciones más económicas (gramaje y acabado de menor factor).
 */
export function precioDesdeUnidad(producto: ProductoTienda): number {
  const cantidadMax = Math.max(...producto.cantidades)
  const minGramaje = Math.min(...producto.gramajes.map((g) => g.factor))
  const minAcabado = Math.min(...producto.acabados.map((a) => a.factor))
  return estimarPrecioUnitario({
    precioBase: producto.precioBase,
    cantidad: cantidadMax,
    factorGramaje: minGramaje,
    factorAcabado: minAcabado,
  })
}

/** Devuelve el producto cuyo slug coincide, o `undefined`. */
export function obtenerProductoTienda(slug: string): ProductoTienda | undefined {
  return catalogoTienda.find((p) => p.slug === slug)
}

/** Etiqueta legible de una categoría. */
export function etiquetaCategoria(categoria: CategoriaTienda): string {
  return CATEGORIAS_TIENDA.find((c) => c.valor === categoria)?.etiqueta ?? categoria
}

/** Tipo de producto equivalente en el formulario de presupuesto. */
export function tipoPresupuestoDe(producto: ProductoTienda): ProductoPresupuesto {
  return producto.tipoPresupuesto ?? 'otro'
}

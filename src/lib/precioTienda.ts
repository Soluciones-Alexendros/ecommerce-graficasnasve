/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

/**
 * Motor de estimación de precio de la tienda.
 *
 * ⚠️ ORIENTATIVO: los coeficientes (precio base por producto, tramos de
 * volumen y factores de gramaje/acabado) son provisionales y deben
 * sustituirse por la tarifa real de NASVE. Todo el cálculo está centralizado
 * aquí para que afinar precios sea un único punto de cambio.
 *
 * Norte de producto «precio claro»: el cliente ve una estimación por unidad
 * antes de pedir presupuesto, nunca un precio cerrado.
 */

export interface TramoVolumen {
  /** Cantidad mínima (incluida) a partir de la cual aplica el factor. */
  min: number
  /** Multiplicador sobre el precio unitario base. */
  factor: number
}

/**
 * Descuento por volumen. Ordenado de mayor a menor `min` para que la búsqueda
 * devuelva el primer tramo cuyo mínimo se alcanza.
 */
export const TRAMOS_VOLUMEN: TramoVolumen[] = [
  { min: 1000, factor: 0.55 },
  { min: 500, factor: 0.64 },
  { min: 250, factor: 0.72 },
  { min: 100, factor: 0.82 },
  { min: 50, factor: 0.92 },
  { min: 1, factor: 1.0 },
]

/** Multiplicador de volumen para una cantidad dada (0 si no es válida). */
export function factorVolumen(cantidad: number): number {
  if (!Number.isFinite(cantidad) || cantidad <= 0) return 0
  const tramo = TRAMOS_VOLUMEN.find((t) => cantidad >= t.min)
  return tramo ? tramo.factor : 1
}

export interface ParametrosEstimacion {
  /** Precio por unidad en condiciones de referencia (€). */
  precioBase: number
  cantidad: number
  /** Multiplicador por gramaje/soporte (1 = referencia). */
  factorGramaje?: number
  /** Multiplicador por acabado (1 = sin acabado especial). */
  factorAcabado?: number
}

/** Redondeo a céntimos evitando errores de coma flotante. */
function aCentimos(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100
}

/**
 * Precio estimado por unidad: base × gramaje × acabado × descuento de volumen.
 */
export function estimarPrecioUnitario({
  precioBase,
  cantidad,
  factorGramaje = 1,
  factorAcabado = 1,
}: ParametrosEstimacion): number {
  if (precioBase <= 0 || cantidad <= 0) return 0
  const bruto = precioBase * factorGramaje * factorAcabado * factorVolumen(cantidad)
  return aCentimos(bruto)
}

/** Total estimado de la tirada completa (precio unitario × cantidad). */
export function estimarTotal(parametros: ParametrosEstimacion): number {
  if (parametros.precioBase <= 0 || parametros.cantidad <= 0) return 0
  return aCentimos(estimarPrecioUnitario(parametros) * parametros.cantidad)
}

const EUROS = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
})

const EUROS_UNIDAD = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 3,
})

/** Formatea un importe total en euros (es-ES). */
export function formatearEuros(importe: number): string {
  return EUROS.format(importe)
}

/** Formatea un precio por unidad, admitiendo hasta 3 decimales. */
export function formatearPrecioUnidad(importe: number): string {
  return EUROS_UNIDAD.format(importe)
}

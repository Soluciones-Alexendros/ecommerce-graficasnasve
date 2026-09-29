/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { z } from 'zod'

export const schemaPresupuesto = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres'),

  empresa: z.string().max(150, 'El nombre de empresa no puede superar los 150 caracteres').optional().or(z.literal('')),

  email: z.string().email('Introduce un email válido').max(254, 'El email no puede superar los 254 caracteres'),

  telefono: z
    .string()
    .regex(/^[+\d\s\-().]*$/, 'Introduce un teléfono válido')
    .max(20, 'El teléfono no puede superar los 20 caracteres')
    .optional()
    .or(z.literal('')),

  producto: z.enum(['papeleria', 'catalogo', 'libro', 'carpeteria', 'otro'], {
    error: 'Selecciona un tipo de producto',
  }),

  tirada: z.string().max(100, 'La tirada no puede superar los 100 caracteres').optional().or(z.literal('')),

  detalles: z.string().max(2000, 'Los detalles no pueden superar los 2000 caracteres').optional().or(z.literal('')),

  acabados: z.string().max(1000, 'Los acabados no pueden superar los 1000 caracteres').optional().or(z.literal('')),

  entrega: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato de fecha inválido (AAAA-MM-DD)')
    .optional()
    .or(z.literal('')),

  rgpd: z.literal(true, {
    error: 'Debes aceptar la política de privacidad para continuar',
  }),
})

export type DatosPresupuesto = z.infer<typeof schemaPresupuesto>

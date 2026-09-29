/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { NextResponse } from 'next/server'

/**
 * Webhook de pagos — STUB (no implementado).
 *
 * La pasarela de pago todavía no está activada. La elección de proveedor
 * (Redsys + Bizum vs Stripe vs Mollie) y su integración se planifican en la
 * «Fase 4 — Pagos» de ROADMAP.md. Los pasos de activación (claves, secreto
 * del webhook, flujo de pedidos) se documentan en DEPLOYMENT.md › «Pagos».
 *
 * Hasta entonces el endpoint responde 501 (Not Implemented) de forma
 * explícita para que cualquier integración detecte que no está disponible.
 */
export async function POST() {
  return NextResponse.json(
    { error: 'Pasarela de pago no implementada. Ver ROADMAP.md › Fase 4 — Pagos.' },
    { status: 501 },
  )
}

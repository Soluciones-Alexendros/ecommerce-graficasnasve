import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { DatosPresupuesto } from '@/lib/validaciones/presupuesto'

// Mock del SDK de Resend. `vi.hoisted` permite referenciar el mock dentro de
// la factoría de `vi.mock` (que se eleva por encima de los imports).
const { sendMock } = vi.hoisted(() => ({ sendMock: vi.fn() }))
vi.mock('resend', () => ({
  // Vitest 4 exige `function`/`class` cuando el SUT usa `new Resend(...)`.
  Resend: vi.fn(function Resend() {
    return { emails: { send: sendMock } }
  }),
}))

import { sendEmailPresupuesto } from './presupuesto'

const datos: DatosPresupuesto = {
  nombre: 'María García',
  empresa: 'ACME S.L.',
  email: 'maria@acme.com',
  telefono: '961553409',
  producto: 'catalogo',
  tirada: '500',
  detalles: 'Catálogo A4 de 48 páginas',
  acabados: 'Laminado mate',
  entrega: '2026-07-01',
  rgpd: true,
}

describe('sendEmailPresupuesto', () => {
  beforeEach(() => {
    sendMock.mockReset()
    sendMock.mockResolvedValue({ data: { id: 'email_test' }, error: null })
  })

  afterEach(() => {
    vi.unstubAllEnvs()
  })

  it('devuelve "no configurado" si falta RESEND_API_KEY', async () => {
    vi.stubEnv('RESEND_API_KEY', '')
    const r = await sendEmailPresupuesto(datos, 'arte.pdf')
    expect(r.ok).toBe(false)
    expect(sendMock).not.toHaveBeenCalled()
  })

  it('envía dos emails (interno + acuse) cuando hay API key', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    const r = await sendEmailPresupuesto(datos, 'arte.pdf')
    expect(r.ok).toBe(true)
    expect(sendMock).toHaveBeenCalledTimes(2)
  })

  it('dirige el acuse de recibo al email del cliente', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    await sendEmailPresupuesto(datos, 'arte.pdf')
    const destinatarios = sendMock.mock.calls.map((c) => (c[0] as { to: string }).to)
    expect(destinatarios).toContain(datos.email)
  })

  it('la plantilla incluye nombre, etiqueta de producto y nombre de archivo', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test')
    await sendEmailPresupuesto(datos, 'arte-final.pdf')
    const htmls = sendMock.mock.calls.map((c) => (c[0] as { html: string }).html).join('\n')
    expect(htmls).toContain('María García')
    expect(htmls).toContain('Catálogos y revistas')
    expect(htmls).toContain('arte-final.pdf')
  })
})

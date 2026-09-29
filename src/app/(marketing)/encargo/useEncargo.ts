/**
 * graficasnasve.art — Hook de estado y lógica del encargo asistido.
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

'use client'

import { useState } from 'react'
import { obtenerProductoTienda, tipoPresupuestoDe, type ProductoTienda } from '@/lib/catalogoTienda'
import { estimarPrecioUnitario, estimarTotal, formatearEuros } from '@/lib/precioTienda'

export type EstadoEncargo = 'idle' | 'loading' | 'success' | 'error'

export interface UseEncargoReturn {
  paso: number
  setPaso: (n: number) => void
  producto: ProductoTienda | undefined
  gramajeId: string
  setGramajeId: (id: string) => void
  acabadoId: string
  setAcabadoId: (id: string) => void
  cantidad: number
  setCantidad: (n: number) => void
  archivoNombre: string
  setArchivoNombre: (nombre: string) => void
  sinArte: boolean
  setSinArte: (v: boolean) => void
  nombre: string
  setNombre: (v: string) => void
  empresa: string
  setEmpresa: (v: string) => void
  email: string
  setEmail: (v: string) => void
  telefono: string
  setTelefono: (v: string) => void
  rgpd: boolean
  setRgpd: (v: boolean) => void
  estado: EstadoEncargo
  errorMsg: string
  referencia: string
  gramaje: ProductoTienda['gramajes'][number] | undefined
  acabado: ProductoTienda['acabados'][number] | undefined
  precioUnidad: number
  total: number
  elegirProducto: (p: ProductoTienda) => void
  enviar: () => Promise<void>
}

export function refEncargo(): string {
  const letras = Array.from({ length: 4 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('')
  const num = String(Math.floor(1000 + Math.random() * 9000))
  return `NSV-${letras}-${num}`
}

export function useEncargo(productoSlugInicial?: string): UseEncargoReturn {
  const inicial = productoSlugInicial ? obtenerProductoTienda(productoSlugInicial) : undefined
  const [paso, setPaso] = useState(inicial ? 1 : 0)
  const [producto, setProducto] = useState<ProductoTienda | undefined>(inicial)
  const [gramajeId, setGramajeId] = useState(inicial?.gramajes[0].id ?? '')
  const [acabadoId, setAcabadoId] = useState(inicial?.acabados[0].id ?? '')
  const [cantidad, setCantidad] = useState(inicial?.cantidades[0] ?? 0)
  const [archivoNombre, setArchivoNombre] = useState('')
  const [sinArte, setSinArte] = useState(false)

  const [nombre, setNombre] = useState('')
  const [empresa, setEmpresa] = useState('')
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [rgpd, setRgpd] = useState(false)
  const [estado, setEstado] = useState<EstadoEncargo>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [referencia, setReferencia] = useState('')

  function elegirProducto(p: ProductoTienda) {
    setProducto(p)
    setGramajeId(p.gramajes[0].id)
    setAcabadoId(p.acabados[0].id)
    setCantidad(p.cantidades[0])
    setPaso(1)
  }

  const gramaje = producto?.gramajes.find((g) => g.id === gramajeId) ?? producto?.gramajes[0]
  const acabado = producto?.acabados.find((a) => a.id === acabadoId) ?? producto?.acabados[0]
  const params =
    producto && gramaje && acabado
      ? { precioBase: producto.precioBase, cantidad, factorGramaje: gramaje.factor, factorAcabado: acabado.factor }
      : null
  const precioUnidad = params ? estimarPrecioUnitario(params) : 0
  const total = params ? estimarTotal(params) : 0

  async function enviar() {
    if (!producto) return
    if (nombre.trim().length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !rgpd) {
      setErrorMsg('Revisa nombre, email y la aceptación de privacidad.')
      setEstado('error')
      return
    }
    setEstado('loading')
    setErrorMsg('')
    const detalle = `${producto.nombre} · ${producto.formato} · ${gramaje?.etiqueta} · ${acabado?.etiqueta} · ${cantidad} ud${sinArte ? ' · arte a cargo de Nasve' : archivoNombre ? ` · archivo: ${archivoNombre}` : ''} (estimación orientativa ${formatearEuros(total)})`
    const fd = new FormData()
    fd.append('nombre', nombre)
    fd.append('email', email)
    if (empresa) fd.append('empresa', empresa)
    if (telefono) fd.append('telefono', telefono)
    fd.append('producto', tipoPresupuestoDe(producto))
    fd.append('detalles', detalle)
    fd.append('rgpd', 'true')
    try {
      const res = await fetch('/api/presupuesto', { method: 'POST', body: fd })
      const json = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error ?? 'Error al enviar el encargo')
      setReferencia(refEncargo())
      setEstado('success')
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Error inesperado')
      setEstado('error')
    }
  }

  return {
    paso,
    setPaso,
    producto,
    gramajeId,
    setGramajeId,
    acabadoId,
    setAcabadoId,
    cantidad,
    setCantidad,
    archivoNombre,
    setArchivoNombre,
    sinArte,
    setSinArte,
    nombre,
    setNombre,
    empresa,
    setEmpresa,
    email,
    setEmail,
    telefono,
    setTelefono,
    rgpd,
    setRgpd,
    estado,
    errorMsg,
    referencia,
    gramaje,
    acabado,
    precioUnidad,
    total,
    elegirProducto,
    enviar,
  }
}

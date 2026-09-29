/**
 * graficasnasve.art
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

export type ProductoPresupuesto = 'papeleria' | 'catalogo' | 'libro' | 'carpeteria' | 'otro'

export type EstadoPresupuesto = 'nuevo' | 'en_revision' | 'presupuestado' | 'aceptado' | 'rechazado' | 'completado'

export interface Presupuesto {
  id: string
  created_at: string
  nombre: string
  empresa: string | null
  email: string
  telefono: string | null
  producto: ProductoPresupuesto
  tirada: string | null
  detalles: string | null
  acabados: string | null
  entrega: string | null
  archivo_url: string | null
  archivo_nombre: string | null
  estado: EstadoPresupuesto
  notas_admin: string | null
  updated_at: string | null
}

export type EstadoPedido = 'pendiente' | 'en_produccion' | 'acabados' | 'enviado' | 'entregado' | 'cancelado'

export interface Pedido {
  id: string
  created_at: string
  presupuesto_id: string | null
  nombre_cliente: string
  empresa: string | null
  email: string
  telefono: string | null
  producto: string
  descripcion: string | null
  cantidad: number | null
  precio_total: number | null
  estado: EstadoPedido
  fecha_entrega_estimada: string | null
  fecha_entrega_real: string | null
  notas: string | null
  updated_at: string | null
}

export type CategoriaPortfolio = 'offset' | 'digital' | 'encuadernacion' | 'acabados' | 'madera' | 'personalizacion'

export interface PortfolioItem {
  id: string
  created_at: string
  titulo: string
  descripcion: string | null
  categoria: CategoriaPortfolio
  imagen_url: string
  imagen_alt: string | null
  cliente: string | null
  destacado: boolean
  orden: number | null
  publicado: boolean
}

// Estructura que espera @supabase/supabase-js.
// Las intersecciones con Record<string, unknown> son necesarias para satisfacer
// el check "extends GenericSchema" del cliente de supabase-js.
export type Database = {
  public: {
    Tables: {
      presupuestos: {
        Row: Presupuesto & Record<string, unknown>
        Insert: Omit<Presupuesto, 'id' | 'created_at' | 'updated_at'> & Record<string, unknown>
        Update: Partial<Omit<Presupuesto, 'id' | 'created_at'>> & Record<string, unknown>
        Relationships: []
      }
      pedidos: {
        Row: Pedido & Record<string, unknown>
        Insert: Omit<Pedido, 'id' | 'created_at' | 'updated_at'> & Record<string, unknown>
        Update: Partial<Omit<Pedido, 'id' | 'created_at'>> & Record<string, unknown>
        Relationships: []
      }
      portfolio: {
        Row: PortfolioItem & Record<string, unknown>
        Insert: Omit<PortfolioItem, 'id' | 'created_at'> & Record<string, unknown>
        Update: Partial<Omit<PortfolioItem, 'id' | 'created_at'>> & Record<string, unknown>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

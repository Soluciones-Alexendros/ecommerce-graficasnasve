/**
 * graficasnasve.art — Imagen Open Graph (marca NASVE, generada con Satori)
 * © 2026 Soluciones Alexendros S.L.U. — Todos los derechos reservados.
 */

import { ImageResponse } from 'next/og'

export const alt = 'Gráficas NASVE — Imprenta en Torrent desde 1982'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CMYK = ['#18B2A4', '#E04B35', '#F4A52A', '#16140F']

function Barra() {
  return (
    <div style={{ display: 'flex', height: 20 }}>
      {CMYK.map((c) => (
        <div key={c} style={{ display: 'flex', flex: 1, background: c }} />
      ))}
    </div>
  )
}

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        background: '#EFE7D7',
        fontFamily: 'sans-serif',
      }}
    >
      <Barra />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'center',
          padding: '0 84px',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 30,
            letterSpacing: 8,
            color: '#6B6357',
            textTransform: 'uppercase',
            marginBottom: 24,
          }}
        >
          Imprenta · Torrent · Valencia
        </div>
        <div style={{ display: 'flex', fontSize: 104, fontWeight: 800, color: '#16140F', lineHeight: 1 }}>
          Gráficas NASVE
        </div>
        <div style={{ display: 'flex', fontSize: 46, color: '#16140F', marginTop: 28 }}>
          Impreso preciso desde 1982.
        </div>
      </div>
      <Barra />
    </div>,
    { ...size },
  )
}

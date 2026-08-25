import { useEffect, useRef } from 'react'
import './MyApp.css'

const TEXT = 'musicOs'
const SPLIT = 5
const FONT_STACK = '"Times New Roman", Times, Tinos, serif'
const FONT_WEIGHT = 700
const RESOLUTION = 56
const SQUEEZE = 0.5
const TRACKING = '-1px'
const GRADIENT_MUSIC = ['#ffffff', '#b8b0a4']
const GRADIENT_OS = ['#5b9bd5', '#1e4d8c']

export default function MyApp({ maximized }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let cancelled = false
    const font = `${FONT_WEIGHT} ${RESOLUTION}px ${FONT_STACK}`

    const draw = () => {
      if (cancelled) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const pad = 2
      const setFont = () => {
        ctx.font = font
        ctx.textBaseline = 'alphabetic'
        if ('letterSpacing' in ctx) ctx.letterSpacing = TRACKING
      }

      setFont()
      const m = ctx.measureText(TEXT)
      const ascent = Math.ceil(m.actualBoundingBoxAscent || RESOLUTION * 0.8)
      const descent = Math.ceil(m.actualBoundingBoxDescent || RESOLUTION * 0.2)
      canvas.width = Math.ceil(m.width * SQUEEZE) + pad * 2
      canvas.height = ascent + descent + pad * 2
      setFont()

      const TEXT1 = TEXT.slice(0, SPLIT)
      const TEXT2 = TEXT.slice(SPLIT)
      const m1 = ctx.measureText(TEXT1)
      const splitX = pad + m1.width * SQUEEZE

      const stamp = (dx, dy, style) => {
        ctx.setTransform(SQUEEZE, 0, 0, 1, pad + dx, pad + ascent + dy)
        ctx.fillStyle = style
        ctx.fillText(TEXT, 0, 0)
      }

      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0) continue
          stamp(dx, dy, 'rgba(0,0,0,0.4)')
        }
      }

      const drawPart = (text, x, stops) => {
        ctx.setTransform(SQUEEZE, 0, 0, 1, x, pad + ascent)
        const g = ctx.createLinearGradient(0, -ascent, 0, 0)
        stops.forEach((c, i) => g.addColorStop(i / (stops.length - 1), c))
        ctx.fillStyle = g
        ctx.fillText(text, 0, 0)
      }

      drawPart(TEXT1, pad, GRADIENT_MUSIC)
      drawPart(TEXT2, splitX, GRADIENT_OS)

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      const img = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = img.data
      for (let i = 3; i < data.length; i += 4) {
        data[i] = data[i] > 140 ? 255 : 0
      }
      ctx.putImageData(img, 0, 0)
    }

    if ('fonts' in document) {
      document.fonts.load(font, TEXT).then(draw).catch(draw)
    } else {
      draw()
    }

    return () => { cancelled = true }
  }, [])

  return (
    <main className={`pixel-page${maximized ? ' maximized' : ''}`}>
      <div className="myapp-layout">
        <div className="myapp-left">
          <canvas ref={canvasRef} role="img" aria-label={TEXT} className="pixel-title" />
          <p className="my-app-subtitle">a music recommended page</p>
          <div className="my-app-desc">
            <a className="negrilla">musicOs</a> es una plataforma hecha por mi para los que
            quieran realmente escuchar lo ultimo en musica, estaré semanalmente (o tal vez no)
            actualizando con albumes y/o sencillos de artistas variados!
          </div>
        </div>

        <div className="myapp-right">
          <div className="myapp-card">
            <div className="myapp-card-img">img</div>
            <div className="myapp-card-text">
              <h3 className="myapp-card-title">nombre1</h3>
              <p className="myapp-card-artist">artista(s)</p>
              <p className="myapp-card-desc">Descripcion corta de este album o artista.</p>
            </div>
          </div>

          <div className="myapp-card">
            <div className="myapp-card-img">img</div>
            <div className="myapp-card-text">
              <h3 className="myapp-card-title">nombre2</h3>
              <p className="myapp-card-artist">artista(s)</p>
              <p className="myapp-card-desc">Otra descripcion corta para este segundo item.</p>
            </div>
          </div>

          <div className="myapp-card">
            <div className="myapp-card-img">img</div>
            <div className="myapp-card-text">
              <h3 className="myapp-card-title">nombre3</h3>
              <p className="myapp-card-artist">artista(s)</p>
              <p className="myapp-card-desc">Y una ultima descripcion para completar la fila.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

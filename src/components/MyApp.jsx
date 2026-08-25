import { useEffect, useRef } from 'react'
import './MyApp.css'

const TEXT = 'MusicOs'
const FONT_STACK = '"Times New Roman", Times, Tinos, serif'
const FONT_WEIGHT = 700
const RESOLUTION = 46
const SQUEEZE = 0.5
const TRACKING = '-1px'
const OUTLINE = 2
const GRADIENT = ['#f6d365', '#c8442a']

export default function MyApp() {
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

      const pad = Math.ceil(OUTLINE + 1)
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

      const stamp = (dx, dy, style) => {
        ctx.setTransform(SQUEEZE, 0, 0, 1, pad + dx, pad + ascent + dy)
        ctx.fillStyle = style
        ctx.fillText(TEXT, 0, 0)
      }

      for (let dy = -OUTLINE; dy <= OUTLINE; dy++) {
        for (let dx = -OUTLINE; dx <= OUTLINE; dx++) {
          if (dx === 0 && dy === 0) continue
          if (dx * dx + dy * dy > OUTLINE * OUTLINE + 1) continue
          stamp(dx, dy, '#000000')
        }
      }

      ctx.setTransform(SQUEEZE, 0, 0, 1, pad, pad + ascent)
      const g = ctx.createLinearGradient(0, -ascent, 0, 0)
      GRADIENT.forEach((stop, i) => {
        g.addColorStop(GRADIENT.length === 1 ? 0 : i / (GRADIENT.length - 1), stop)
      })
      stamp(0, 0, g)
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
    <main className="pixel-page">
      <div className="pixel-stack">
        <canvas ref={canvasRef} role="img" aria-label={TEXT} className="pixel-title" />
        <p className="my-app-subtitle">a music recommended page</p>
        <div className="my-app-content">{/* escribe aqui tu contenido */}</div>
      </div>
    </main>
  )
}

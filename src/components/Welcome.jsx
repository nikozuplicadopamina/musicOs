import { useState, useEffect } from 'react'

export default function Welcome() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="welcome-notification" onClick={() => setVisible(false)}>
      <div className="welcome-title">Bienvenido a musicOs</div>
      <div className="welcome-desc">
        Este es mi espacio personal de recomendaciones musicales.
        <br />
        Haz doble clic en el ícono de musicOs para empezar.
      </div>
    </div>
  )
}

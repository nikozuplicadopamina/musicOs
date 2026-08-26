import { useState, useEffect } from 'react'

export default function Welcome() {
  const [visible, setVisible] = useState(false)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const showTimer = setTimeout(() => setVisible(true), 6000)
    return () => clearTimeout(showTimer)
  }, [])

  useEffect(() => {
    if (!visible) return
    const hideTimer = setTimeout(() => {
      setHiding(true)
      setTimeout(() => setVisible(false), 500)
    }, 12000)
    return () => clearTimeout(hideTimer)
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`welcome-notification${hiding ? ' hiding' : ''}`}
      onClick={() => {
        setHiding(true)
        setTimeout(() => setVisible(false), 500)
      }}
    >
      <div className="welcome-icon">
        <img src="/src/assets/icon_Os.png" alt="" />
        <p>Notificación</p>
      </div>
      <div className="welcome-message">
        <p>
          Bienvenido a musicOs
          <br />
          <span>Espero que disfrutes explorando...</span>
        </p>
      </div>
    </div>
  )
}

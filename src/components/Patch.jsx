import bulb from '../assets/bulb.png'
import '../css/Patch.css'

export default function Patch() {
  return (
    <div className="patch-content-area">
      <div className="patch-note">
        <div className="patch-head">
          <img src={bulb} alt="bulb" />
          <h1>Patch Updates...</h1>
        </div>
        <div className="patch-log">
          <div className="patch-entry">
            <p className="patch-entry-head"><strong>Sistema</strong> — 2026-08-26</p>
            <p className="patch-entry-note">- Versión inicial de musicOs</p>
            <p className="patch-entry-note">- Escritorio estilo Windows 95</p>
            <p className="patch-entry-note">- App principal con tarjetas de música</p>
          </div>
        </div>
      </div>
    </div>
  )
}

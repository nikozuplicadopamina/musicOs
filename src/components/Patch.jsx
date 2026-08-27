import { useState } from 'react'
import bulb from '../assets/bulb.png'
import '../css/Patch.css'

const patchNotes = [
  { head: 'Sistema', date: '2026-08-26', notes: ['Versión inicial de musicOs', 'Escritorio estilo Windows 95', 'App principal con tarjetas de música'] },
]

export default function Patch() {
  const [notes] = useState(patchNotes)

  return (
    <div className="patch-content-area">
      <div className="patch-note">
        <div className="patch-head">
          <img src={bulb} alt="bulb" />
          <h1>Patch Updates...</h1>
        </div>
        <div className="patch-log">
          {notes.map((note, index) => (
            <div key={index} className="patch-entry">
              <p className="patch-entry-head"><strong>{note.head}</strong> — {note.date}</p>
              {note.notes.map((line, i) => (
                <p key={i} className="patch-entry-note">- {line}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import '../css/About.css'

export default function About() {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <div className="about-content-area">
      <div className="about-taps">
        <p
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >General</p>
        <p
          className={activeTab === 'music' ? 'active' : ''}
          onClick={() => setActiveTab('music')}
        >Music</p>
      </div>

      <div className="about-content">
        <div className="about-content-inner">
          {activeTab === 'general' ? (
            <div className="about-general">
              <p className="about-text">
                <strong>musicOs</strong> es una plataforma hecha por mí para los que
                quieran realmente escuchar lo último en música.
                <br /><br />
                Estaré semanalmente actualizando con álbumes y/o sencillos
                de artistas variados.
              </p>
            </div>
          ) : (
            <div className="about-music">
              <p className="about-text">
                Cada semana encontrarás nuevas recomendaciones musicales.
                <br /><br />
                Álbumes, sencillos, EPs de diferentes géneros y artistas.
                <br /><br />
                Si tienes alguna sugerencia, ¡házmelo saber!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

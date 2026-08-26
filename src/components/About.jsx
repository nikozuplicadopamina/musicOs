import { useState } from 'react'
import Draggable from 'react-draggable'
import '../css/About.css'

export default function About({ onClose }) {
  const [activeTab, setActiveTab] = useState('general')

  return (
    <Draggable
      handle=".folder_dragbar"
      bounds="parent"
      defaultPosition={{ x: 70, y: 40 }}
    >
      <div className="about-folder">
        <div className="folder_dragbar">
          <div className="about-barname">
            <span>About</span>
          </div>
          <div className="about-barbtn">
            <div className="dash"></div>
            <div className="x" onClick={onClose}>×</div>
          </div>
        </div>

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
          <div className="about-btn-container">
            <div className="about-btn" onClick={onClose}>
              <span>OK</span>
            </div>
            <div className="about-btn" onClick={onClose}>
              <span>Cancel</span>
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  )
}

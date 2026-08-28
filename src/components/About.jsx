import { useState } from 'react'
import bioPC from '../assets/bio_pc.png'
import winampIcon from '../assets/winampIcon.png'
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
          {activeTab === 'general' && (
            <div className="about-tab-content">
              <img src={bioPC} alt="General" className="about-img" />
              <div className="about-text-container">
                <p className="about-text">
                  Soy <strong>Nicolás</strong>, un programador principiante, me especializo en <strong>HTML, CSS, JS (javascript & java) ensamblador, python</strong> y actualmente estoy trabajando en mi videojuego sin nombre aún
                  <br /><br />
                  esta web es para poner un portafolio y un mini proyecto sobre música para tener en mi perfil de instagram e otras redes sociales
                </p>
              </div>
            </div>
          )}
          {activeTab === 'music' && (
            <div className="about-tab-content">
              <img src={winampIcon} alt="Music" className="about-img" />
              <div className="about-text-container">
                <p className="about-text">
                  <strong>MusicOs</strong>
                  <br /><br />
                  se estará actualizando semanalmente (o posiblemente no) con álbumes y/o sencillos de artistas variados de los que yo ya haya escuchado, respecto a la app, esta se estará actualizando a medida que esta web tambien lo hace.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
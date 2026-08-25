import React from 'react'
import Draggable from 'react-draggable'

export default function Window({ win, app, minimized, focused, onFocus, onClose, onMinimize, onMaximize }) {
  const hiddenStyle = { display: minimized ? 'none' : undefined }
  const titlebar = (
    <div className={`titlebar${focused ? '' : ' inactive'}`}>
      <img src={app.icon} alt="" />
      <span className="titlebar-title">{app.title}</span>
      <button type="button" className="tb-control" onClick={onMinimize} aria-label="Minimizar">
        <svg width="9" height="9" viewBox="0 0 9 9">
          <rect x="1" y="6" width="7" height="2" fill="#000" />
        </svg>
      </button>
      {win.maximized ? (
        <button type="button" className="tb-control" onClick={onMaximize} aria-label="Restaurar">
          <svg width="9" height="9" viewBox="0 0 9 9">
            <rect x="2.5" y="0.5" width="6" height="5.5" fill="#c0c0c0" stroke="#000" />
            <rect x="0.5" y="3" width="6" height="5.5" fill="#c0c0c0" stroke="#000" />
            <line x1="0.5" y1="4" x2="6.5" y2="4" stroke="#000" />
          </svg>
        </button>
      ) : (
        <button type="button" className="tb-control" onClick={onMaximize} aria-label="Maximizar">
          <svg width="9" height="9" viewBox="0 0 9 9">
            <rect x="0.5" y="0.5" width="8" height="8" fill="#c0c0c0" stroke="#000" />
            <line x1="0.5" y1="2" x2="8.5" y2="2" stroke="#000" strokeWidth="2" />
          </svg>
        </button>
      )}
      <button type="button" className="tb-control tb-close" onClick={onClose} aria-label="Cerrar">
        <svg width="9" height="9" viewBox="0 0 9 9">
          <path d="M1 1l7 7M8 1L1 8" stroke="#000" strokeWidth="1.4" fill="none" />
        </svg>
      </button>
    </div>
  )

  const body = <div className="window-body">{React.cloneElement(app.component, { maximized: win.maximized })}</div>

  if (win.maximized) {
    return (
      <section
        className="window maximized"
        style={{ zIndex: win.z, ...hiddenStyle }}
        onMouseDown={onFocus}
      >
        {titlebar}
        {body}
      </section>
    )
  }

  return (
    <Draggable
      handle=".titlebar"
      defaultPosition={{ x: win.x, y: win.y }}
      bounds="parent"
      onStart={onFocus}
    >
      <section
        className="window"
        style={{ zIndex: win.z, width: app.width, height: app.height, ...hiddenStyle }}
        onMouseDown={onFocus}
      >
        {titlebar}
        {body}
      </section>
    </Draggable>
  )
}

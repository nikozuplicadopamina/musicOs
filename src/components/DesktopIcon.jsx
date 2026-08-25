import React, { useRef } from 'react'

export default function DesktopIcon({ app, selected, style, onSelect, onOpen }) {
  const lastTapRef = useRef(0)

  function handleTouchEnd() {
    const now = Date.now()
    if (now - lastTapRef.current < 300) onOpen()
    lastTapRef.current = now
  }

  return (
    <button
      type="button"
      className={`desktop-icon${selected ? ' selected' : ''}`}
      style={style}
      onClick={onSelect}
      onDoubleClick={onOpen}
      onTouchEnd={handleTouchEnd}
    >
      <img src={app.icon} alt="" />
      <span>{app.title}</span>
    </button>
  )
}

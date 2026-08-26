import React, { useEffect, useRef, useState } from 'react'
import DesktopIcon from './components/DesktopIcon.jsx'
import Window from './components/Window.jsx'
import MyApp from './components/MyApp.jsx'
import MyFolder from './components/MyFolder.jsx'
import Patch from './components/Patch.jsx'
import About from './components/About.jsx'
import icon from './assets/icon.png'
import iconOs from './assets/icon_Os.png'
import folderIcon from './assets/folder.png'
import './App.css'

const APPS = [
  {
    id: 'myapp',
    title: 'musicOs',
    icon: iconOs,
    taskbarIcon: icon,
    width: 800,
    height: 540,
    component: <MyApp />,
  },
  {
    id: 'portafolio',
    title: 'Portafolio',
    icon: folderIcon,
    width: 520,
    height: 380,
    component: <MyFolder />,
  },
]

export default function App() {
  const [windows, setWindows] = useState([])
  const [selectedIcon, setSelectedIcon] = useState(null)
  const [startOpen, setStartOpen] = useState(false)
  const [showPatch, setShowPatch] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [clock, setClock] = useState('')
  const zCounter = useRef(10)

  useEffect(() => {
    const timer = setTimeout(() => setShowPatch(true), 6000)
    const aboutTimer = setTimeout(() => setShowAbout(true), 6000)
    return () => {
      clearTimeout(timer)
      clearTimeout(aboutTimer)
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      const d = new Date()
      setClock(
        `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
      )
    }
    tick()
    const interval = setInterval(tick, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const closeMenus = (e) => {
      if (!e.target.closest('.start-menu') && !e.target.closest('.start-button')) {
        setStartOpen(false)
      }
    }
    document.addEventListener('mousedown', closeMenus)
    return () => document.removeEventListener('mousedown', closeMenus)
  }, [])

  const visibleWindows = windows.filter((w) => !w.minimized)
  const focusedId = visibleWindows.length
    ? visibleWindows.reduce((a, b) => (a.z > b.z ? a : b)).id
    : null

  function focusWindow(id) {
    if (focusedId === id) return
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z } : w)))
  }

  function openApp(app) {
    setSelectedIcon(null)
    setStartOpen(false)
    zCounter.current += 1
    const z = zCounter.current
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === app.id)
      if (existing) {
        return prev.map((w) =>
          w.id === app.id ? { ...w, z, minimized: false } : w
        )
      }
      const n = prev.length
      return [
        ...prev,
        { id: app.id, x: 70 + n * 26, y: 50 + n * 26, z, minimized: false, maximized: false },
      ]
    })
  }

  function closeWindow(id) {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }

  function toggleMinimize(id) {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w))
    )
  }

  function toggleMaximize(id) {
    setWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w))
    )
  }

  function handleTaskbarClick(win) {
    if (win.minimized) {
      toggleMinimize(win.id)
      focusWindow(win.id)
    } else if (focusedId === win.id) {
      toggleMinimize(win.id)
    } else {
      focusWindow(win.id)
    }
  }

  return (
    <div
      className="desktop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setSelectedIcon(null)
      }}
    >
      {APPS.map((app, i) => (
        <DesktopIcon
          key={app.id}
          app={app}
          selected={selectedIcon === app.id}
          style={{ left: 12 + Math.floor(i / 6) * 96, top: 12 + (i % 6) * 86 }}
          onSelect={() => setSelectedIcon(app.id)}
          onOpen={() => openApp(app)}
        />
      ))}

      {windows.map((win) => {
        const app = APPS.find((a) => a.id === win.id)
        return (
          <Window
            key={win.id}
            win={win}
            app={app}
            minimized={win.minimized}
            focused={focusedId === win.id}
            onFocus={() => focusWindow(win.id)}
            onClose={() => closeWindow(win.id)}
            onMinimize={() => toggleMinimize(win.id)}
            onMaximize={() => toggleMaximize(win.id)}
          />
        )
      })}

      {showPatch && <Patch onClose={() => setShowPatch(false)} />}
      {showAbout && <About onClose={() => setShowAbout(false)} />}

      {startOpen && (
        <div className="start-menu">
          <div className="start-menu-band">musicOs</div>
          <div className="start-menu-list">
            {APPS.map((app) => (
              <button
                key={app.id}
                type="button"
                className="start-menu-item"
                onClick={() => openApp(app)}
              >
                <img src={app.icon} alt="" />
                {app.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <footer className="taskbar">
        <button
          type="button"
          className={`tb-button start-button${startOpen ? ' active' : ''}`}
          onClick={() => setStartOpen((v) => !v)}
        >
          <img src={icon} alt="" />
          Inicio
        </button>

        {windows.map((win) => {
          const app = APPS.find((a) => a.id === win.id)
          return (
            <button
              key={win.id}
              type="button"
              className={`tb-button${focusedId === win.id && !win.minimized ? ' active' : ''}`}
              onClick={() => handleTaskbarClick(win)}
            >
              <img src={app.taskbarIcon || app.icon} alt="" />
              {app.title}
            </button>
          )
        })}

        <div className="tray">{clock}</div>
      </footer>
    </div>
  )
}

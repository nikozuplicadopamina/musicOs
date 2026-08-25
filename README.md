# musicOs

Escritorio estilo Windows 95 hecho en React + Vite, reducido a **una sola app vacía** (`MyApp`) lista para convertir en tu propia página web.

## Qué incluye

- Escritorio con fondo clásico teal
- Ventanas arrastrables, minimizables, maximizables y cerrables
- Menú Inicio y barra de tareas con reloj
- Icono en el escritorio (doble clic o doble toque para abrir)
- Una sola app en blanco: `src/components/MyApp.jsx`

## Correr

```
npm install
npm run dev
```

## Build

```
npm run build
npm run preview
```

## Dónde construir tu página

Todo el contenido va dentro de `src/components/MyApp.jsx`.
Para añadir más apps al escritorio, agrega entradas al arreglo `APPS` en `src/App.jsx`.

---

Basado en [wins95Portfolio](https://github.com/Yuteoctober/wins95Portfolio) de Yuteoctober.

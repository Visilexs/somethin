import { useState } from 'react'
import { useApp } from '../AppContext'

// A tiny, near-invisible sacred mark hidden in the page. Clicking it reveals
// it and records the find. Three exist across the site → 'glyph-hunter'.
export default function HiddenGlyph({ id, style = {} }) {
  const { state, actions } = useApp()
  const found = state.foundGlyphs.includes(id)
  const [pulse, setPulse] = useState(false)

  return (
    <span
      onClick={() => { if (!found) { actions.findGlyph(id); setPulse(true) } }}
      title={found ? 'A glyph you have found.' : undefined}
      style={{
        display: 'inline-block',
        cursor: 'none',
        userSelect: 'none',
        color: found ? 'rgba(200,168,74,.85)' : 'rgba(168,200,74,.08)',
        textShadow: found ? '0 0 10px rgba(200,168,74,.5)' : 'none',
        transition: 'color .5s, text-shadow .5s, transform .3s',
        transform: pulse ? 'scale(1.4)' : 'scale(1)',
        fontSize: '0.9em',
        ...style,
      }}
    >⸸</span>
  )
}

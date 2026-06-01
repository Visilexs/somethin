import { useEffect, useRef, useState, useCallback } from 'react'

// ── IntersectionObserver reveal ─────────────────────────────────────────────
// Shared observer instance — much cheaper than one per element
let sharedObserver = null
const callbacks = new WeakMap()

const getObserver = () => {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target)
            if (cb) { cb(); sharedObserver.unobserve(entry.target) }
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
  }
  return sharedObserver
}

export function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = getObserver()
    callbacks.set(el, () => setVisible(true))
    obs.observe(el)
    return () => { obs.unobserve(el); callbacks.delete(el) }
  }, [])

  return [ref, visible]
}

// ── Scroll spy with shared IntersectionObserver ─────────────────────────────
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    if (!ids.length) return
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-38% 0px -45% 0px', threshold: 0 }
    )
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ids.join(',')])

  return active
}

// ── 3-D card tilt ──────────────────────────────────────────────────────────
export function useTilt() {
  const handleMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top  - rect.height / 2
    const rx = (-y / rect.height * 13).toFixed(2)
    const ry = ( x / rect.width  * 13).toFixed(2)
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
    el.style.boxShadow = `${-ry * 0.4}px ${rx * 0.4}px 28px rgba(0,0,0,0.5), 0 0 18px rgba(168,200,74,0.07)`
  }, [])

  const handleLeave = useCallback((e) => {
    e.currentTarget.style.transform = ''
    e.currentTarget.style.boxShadow = ''
  }, [])

  return { onMouseMove: handleMove, onMouseLeave: handleLeave }
}

// ── Text scramble ──────────────────────────────────────────────────────────
export function useScramble(text, active) {
  const CHARS = '✠✦✧✶ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const [display, setDisplay] = useState(text)
  const timer = useRef()

  useEffect(() => {
    if (!active) return
    let frame = 0, total = 26
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setDisplay(
        text.split('').map((c, i) => {
          if (c === ' ') return ' '
          return frame / total > i / text.length
            ? c
            : CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      if (++frame > total) { clearInterval(timer.current); setDisplay(text) }
    }, 38)
    return () => clearInterval(timer.current)
  }, [active, text])

  return display
}

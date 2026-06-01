import { useEffect, useRef, useState, useCallback } from 'react'

// ── IntersectionObserver reveal ─────────────────────────────────────────────
// Per-element observers (not shared singleton) — avoids stale-ref issues
// after page navigation when React mounts new DOM nodes.
export function useInView(threshold = 0.08) {
  const ref     = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Safety fallback: if observer never fires (some Windows GPU configs
    // suppress it when hardware acceleration is off), reveal after 800ms.
    const fallback = setTimeout(() => setVisible(true), 800)

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          clearTimeout(fallback)
          obs.disconnect()
        }
      },
      {
        threshold,
        // Negative bottom margin ensures elements near viewport bottom still trigger
        rootMargin: '0px 0px -20px 0px',
      }
    )

    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fallback) }
  }, [threshold])

  return [ref, visible]
}

// ── 3D tilt ─────────────────────────────────────────────────────────────────
export function useTilt() {
  const handleMove = useCallback((e) => {
    const el   = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x    = e.clientX - rect.left - rect.width  / 2
    const y    = e.clientY - rect.top  - rect.height / 2
    const rx   = (-y / rect.height * 12).toFixed(2)
    const ry   = ( x / rect.width  * 12).toFixed(2)
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`
    el.style.boxShadow = `${-ry * 0.4}px ${rx * 0.4}px 26px rgba(0,0,0,.5), 0 0 16px rgba(168,200,74,.06)`
  }, [])

  const handleLeave = useCallback((e) => {
    e.currentTarget.style.transform = ''
    e.currentTarget.style.boxShadow = ''
  }, [])

  return { onMouseMove: handleMove, onMouseLeave: handleLeave }
}

// ── Scroll spy ───────────────────────────────────────────────────────────────
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

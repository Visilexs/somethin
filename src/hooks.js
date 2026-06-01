import { useEffect, useRef, useState, useCallback } from 'react'

export function useInView(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(el) } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, visible]
}

export function useScrollSpy(ids, offset = '0px') {
  const [active, setActive] = useState(ids[0] || '')

  useEffect(() => {
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    if (!els.length) return

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: `-40% 0px -45% 0px` }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ids.join(',')])

  return active
}

export function useScramble(text, active) {
  const CHARS = '✠✦✧✶ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const [display, setDisplay] = useState(text)
  const timerRef = useRef()

  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = 28
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setDisplay(
        text.split('').map((c, i) => {
          if (c === ' ') return ' '
          if (frame / total > i / text.length) return c
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        }).join('')
      )
      frame++
      if (frame > total) { clearInterval(timerRef.current); setDisplay(text) }
    }, 38)
    return () => clearInterval(timerRef.current)
  }, [active, text])

  return display
}

export function useCountUp(target, active, duration = 2200) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue((eased * target).toFixed(1))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration])

  return value
}

export function useTilt() {
  const handleMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const rx = (-y / rect.height * 14).toFixed(2)
    const ry = (x / rect.width * 14).toFixed(2)
    el.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`
    el.style.boxShadow = `${-ry * 0.5}px ${rx * 0.5}px 30px rgba(0,0,0,0.5), 0 0 20px rgba(168,200,74,0.08)`
  }, [])

  const handleLeave = useCallback((e) => {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateZ(0)'
    e.currentTarget.style.boxShadow = ''
  }, [])

  return { onMouseMove: handleMove, onMouseLeave: handleLeave }
}

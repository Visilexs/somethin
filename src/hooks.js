import { useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'

// ── IntersectionObserver ─────────────────────────────────────────────────────
export function useInView(threshold = 0.05) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const fb = setTimeout(() => setVisible(true), 700)
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); clearTimeout(fb); obs.disconnect() }
    }, { threshold, rootMargin: '0px' })
    obs.observe(el)
    return () => { obs.disconnect(); clearTimeout(fb) }
  }, [threshold])
  return [ref, visible]
}

// ── Scroll spy ───────────────────────────────────────────────────────────────
export function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0] || '')
  useEffect(() => {
    if (!ids.length) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-38% 0px -45% 0px', threshold: 0 }
    )
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [ids.join(',')])
  return active
}

// ── 3D tilt ──────────────────────────────────────────────────────────────────
export function useTilt() {
  const handleMove = useCallback((e) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    el.style.transform = `perspective(700px) rotateX(${(-y/rect.height*12).toFixed(2)}deg) rotateY(${(x/rect.width*12).toFixed(2)}deg) translateZ(6px)`
  }, [])
  const handleLeave = useCallback((e) => { e.currentTarget.style.transform = '' }, [])
  return { onMouseMove: handleMove, onMouseLeave: handleLeave }
}

// ── ResizeObserver ───────────────────────────────────────────────────────────
export function useResizeObserver(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 })
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setSize({ width: Math.round(width), height: Math.round(height) })
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return size
}

// ── usePrevious ──────────────────────────────────────────────────────────────
export function usePrevious(value) {
  const ref = useRef(undefined)
  useEffect(() => { ref.current = value })
  return ref.current
}

// ── useLocalStorage ──────────────────────────────────────────────────────────
export function useLocalStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try { const item = sessionStorage.getItem(key); return item ? JSON.parse(item) : initialValue }
    catch { return initialValue }
  })
  const setValue = useCallback((value) => {
    const v = value instanceof Function ? value(stored) : value
    setStored(v)
    try { sessionStorage.setItem(key, JSON.stringify(v)) } catch {}
  }, [key, stored])
  return [stored, setValue]
}

// ── usePointerPosition ───────────────────────────────────────────────────────
export function usePointerPosition() {
  const pos = useRef({ x: -1000, y: -1000 })
  useEffect(() => {
    const fn = (e) => { pos.current = { x: e.clientX, y: e.clientY } }
    window.addEventListener('pointermove', fn, { passive: true })
    return () => window.removeEventListener('pointermove', fn)
  }, [])
  return pos
}

// ── useWebAnimations (WAAPI) ─────────────────────────────────────────────────
export function useWAAPI(keyframes, options) {
  const ref = useRef(null)
  const animRef = useRef(null)
  const play = useCallback(() => {
    if (!ref.current) return
    animRef.current?.cancel()
    animRef.current = ref.current.animate(keyframes, {
      easing: 'cubic-bezier(.22,1,.36,1)',
      fill: 'forwards',
      ...options,
    })
    return animRef.current.finished
  }, [JSON.stringify(keyframes), JSON.stringify(options)])
  const reverse = useCallback(() => {
    if (animRef.current) animRef.current.reverse()
  }, [])
  const cancel = useCallback(() => { animRef.current?.cancel() }, [])
  return { ref, play, reverse, cancel, anim: animRef }
}

// ── useMediaQuery ────────────────────────────────────────────────────────────
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false
  )
  useEffect(() => {
    const mq = window.matchMedia(query)
    const fn = (e) => setMatches(e.matches)
    mq.addEventListener('change', fn)
    setMatches(mq.matches)
    return () => mq.removeEventListener('change', fn)
  }, [query])
  return matches
}

// ── useDeferredSearch ────────────────────────────────────────────────────────
// Returns deferred value so filtering doesn't block UI
import { useDeferredValue, useMemo } from 'react'
export function useDeferredSearch(items, query, getKey = (x) => JSON.stringify(x)) {
  const deferred = useDeferredValue(query)
  const filtered = useMemo(() => {
    if (!deferred.trim()) return items
    const q = deferred.toLowerCase()
    return items.filter(item => getKey(item).toLowerCase().includes(q))
  }, [items, deferred])
  const isPending = query !== deferred
  return { filtered, isPending, deferred }
}


// ── useDebouncedValue ────────────────────────────────────────────────────────
export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(t)
  }, [value, delay])
  return debounced
}

// ── useEventListener — declarative listener ──────────────────────────────────
export function useEventListener(event, handler, element = window) {
  const saved = useRef(handler)
  useEffect(() => { saved.current = handler }, [handler])
  useEffect(() => {
    const el = element?.current ?? element
    if (!el?.addEventListener) return
    const listener = (e) => saved.current(e)
    el.addEventListener(event, listener)
    return () => el.removeEventListener(event, listener)
  }, [event, element])
}

// ── useRaf — requestAnimationFrame loop ──────────────────────────────────────
export function useRaf(callback, active = true) {
  const cb = useRef(callback)
  useEffect(() => { cb.current = callback }, [callback])
  useEffect(() => {
    if (!active) return
    let id
    const loop = (t) => { cb.current(t); id = requestAnimationFrame(loop) }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [active])
}

import { useEffect, useRef } from 'react'

// New background: flowing aurora ribbons + drifting embers + slow rotating
// sacred mandala. Calmer and more atmospheric than the particle-network look.

export default function Background({ scrollY }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -1e4, y: -1e4 })
  const scrollRef = useRef(0)
  const velRef    = useRef(0)
  const prevRef   = useRef(0)
  const rafRef    = useRef()
  const hiddenRef = useRef(false)

  useEffect(() => {
    const sc = scrollY ?? 0
    velRef.current = sc - prevRef.current
    prevRef.current = sc
    scrollRef.current = sc
  }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -1e4, y: -1e4 } }
    const onVis   = () => { hiddenRef.current = document.hidden }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    // ── EMBERS — slow drifting motes that rise ──────────────────
    const EMBERS = Math.min(48, Math.floor(window.innerWidth / 28))
    const embers = Array.from({ length: EMBERS }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 0.6 + Math.random() * 1.8,
      vy: -(0.15 + Math.random() * 0.4),
      vx: (Math.random() - 0.5) * 0.25,
      op: 0.1 + Math.random() * 0.4,
      phase: Math.random() * Math.PI * 2,
      ps: 0.006 + Math.random() * 0.01,
      hue: Math.random() < 0.62 ? 'g' : 'a',
    }))

    // ── AURORA RIBBONS — flowing sine bands ─────────────────────
    const ribbons = [
      { amp: 90,  yf: 0.30, speed: 0.18, width: 150, hue: 'g', op: 0.05, phase: 0 },
      { amp: 70,  yf: 0.55, speed: -0.13, width: 120, hue: 'a', op: 0.045, phase: 2 },
      { amp: 110, yf: 0.72, speed: 0.10, width: 180, hue: 'g', op: 0.04, phase: 4 },
    ]

    const col = (hue, a) => hue === 'g' ? `rgba(168,200,74,${a})` : `rgba(200,168,74,${a})`

    const drawRibbon = (rb, t) => {
      const baseY = H * rb.yf - scrollRef.current * 0.04
      const grad = ctx.createLinearGradient(0, baseY - rb.width, 0, baseY + rb.width)
      grad.addColorStop(0, col(rb.hue, 0))
      grad.addColorStop(0.5, col(rb.hue, rb.op))
      grad.addColorStop(1, col(rb.hue, 0))
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(-50, baseY)
      const step = 40
      for (let x = -50; x <= W + 50; x += step) {
        const y = baseY
          + Math.sin(x * 0.004 + t * rb.speed + rb.phase) * rb.amp
          + Math.sin(x * 0.011 - t * rb.speed * 0.6) * (rb.amp * 0.35)
        ctx.lineTo(x, y)
      }
      // close along the bottom band
      for (let x = W + 50; x >= -50; x -= step) {
        const y = baseY
          + Math.sin(x * 0.004 + t * rb.speed + rb.phase) * rb.amp
          + Math.sin(x * 0.011 - t * rb.speed * 0.6) * (rb.amp * 0.35)
          + rb.width
        ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
    }

    // ── MANDALA — slow rotating sacred geometry, centre ─────────
    const drawMandala = (t) => {
      const cx = W / 2, cy = H / 2 - scrollRef.current * 0.06
      const rot = t * 0.02
      ctx.save()
      ctx.translate(cx, cy)

      // concentric polygon rings
      const rings = [
        { r: 90,  sides: 12, rotMul: 1,  op: 0.05 },
        { r: 160, sides: 6,  rotMul: -0.6, op: 0.045 },
        { r: 240, sides: 24, rotMul: 0.4, op: 0.03 },
        { r: 330, sides: 3,  rotMul: -0.3, op: 0.035 },
      ]
      for (const ring of rings) {
        const pr = ring.r + Math.sin(t * 0.25 + ring.r) * 10
        ctx.beginPath()
        for (let i = 0; i <= ring.sides; i++) {
          const a = rot * ring.rotMul + (i / ring.sides) * Math.PI * 2
          const x = Math.cos(a) * pr, y = Math.sin(a) * pr
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(168,200,74,${ring.op})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }

      // radiating spokes
      const spokes = 16
      for (let i = 0; i < spokes; i++) {
        const a = rot * 0.5 + (i / spokes) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * 70, Math.sin(a) * 70)
        ctx.lineTo(Math.cos(a) * 340, Math.sin(a) * 340)
        ctx.strokeStyle = `rgba(168,200,74,${0.015 + (i % 2) * 0.012})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
      ctx.restore()
    }

    const animate = (ts) => {
      if (hiddenRef.current) { rafRef.current = requestAnimationFrame(animate); return }
      const t = ts * 0.001
      const mx = mouseRef.current.x, my = mouseRef.current.y
      ctx.clearRect(0, 0, W, H)

      // 1. base radial glow (top)
      const g1 = ctx.createRadialGradient(W / 2, H * 0.2, 0, W / 2, H * 0.2, H * 0.85)
      g1.addColorStop(0, 'rgba(168,200,74,0.05)')
      g1.addColorStop(0.5, 'rgba(120,150,60,0.02)')
      g1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g1
      ctx.fillRect(0, 0, W, H)

      // 2. mandala (behind ribbons)
      drawMandala(t)

      // 3. aurora ribbons
      for (const rb of ribbons) drawRibbon(rb, t)

      // 4. embers
      for (const e of embers) {
        e.phase += e.ps
        e.y += e.vy
        e.x += e.vx + Math.sin(e.phase) * 0.2
        if (e.y < -10) { e.y = H + 10; e.x = Math.random() * W }
        if (e.x < -10) e.x = W + 10
        if (e.x > W + 10) e.x = -10

        // gentle mouse attraction
        if (mx > 0) {
          const dx = mx - e.x, dy = my - e.y
          const d2 = dx * dx + dy * dy
          if (d2 < 22000) {
            const d = Math.sqrt(d2) || 1
            e.x += (dx / d) * 0.4
            e.y += (dy / d) * 0.4
          }
        }

        const op = e.op * (0.6 + Math.sin(e.phase) * 0.4)
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r, 0, Math.PI * 2)
        ctx.fillStyle = col(e.hue, op)
        ctx.fill()
        // soft halo
        ctx.beginPath()
        ctx.arc(e.x, e.y, e.r * 3.5, 0, Math.PI * 2)
        ctx.fillStyle = col(e.hue, op * 0.06)
        ctx.fill()
      }

      // 5. mouse spotlight
      if (mx > 0) {
        const sp = ctx.createRadialGradient(mx, my, 0, mx, my, 240)
        sp.addColorStop(0, 'rgba(168,200,74,0.05)')
        sp.addColorStop(0.5, 'rgba(168,200,74,0.015)')
        sp.addColorStop(1, 'rgba(168,200,74,0)')
        ctx.fillStyle = sp
        ctx.fillRect(0, 0, W, H)
      }

      // 6. vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.9)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.6)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="bg-layer">
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
      <div className="grain" />
    </div>
  )
}

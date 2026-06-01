import { useEffect, useRef } from 'react'

const GA = (a) => `rgba(168,200,74,${a})`
const AA = (a) => `rgba(200,168,74,${a})`

// Spatial hash grid for O(n) particle connections instead of O(n²)
const CELL = 110
const cellKey = (x, y) => `${Math.floor(x / CELL)},${Math.floor(y / CELL)}`
const neighbors = (cx, cy) => {
  const keys = []
  for (let dx = -1; dx <= 1; dx++)
    for (let dy = -1; dy <= 1; dy++)
      keys.push(`${cx + dx},${cy + dy}`)
  return keys
}

export default function Background({ scrollY }) {
  const canvasRef  = useRef(null)
  const geoRef     = useRef(null)   // offscreen canvas for slow geometry
  const mouseRef   = useRef({ x: -1e4, y: -1e4 })
  const scrollRef  = useRef(0)
  const velRef     = useRef(0)
  const prevScRef  = useRef(0)
  const rafRef     = useRef()
  const hiddenRef  = useRef(false)

  useEffect(() => {
    const sc = scrollY ?? 0
    velRef.current   = sc - prevScRef.current
    prevScRef.current = sc
    scrollRef.current = sc
  }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })

    // Offscreen canvas for geometry layer (updated at ~20fps, not 60)
    const geo  = document.createElement('canvas')
    const gctx = geo.getContext('2d', { alpha: true })
    geoRef.current = geo

    let W = 0, H = 0
    // Cached gradient handles – rebuilt only on resize
    let auroraGrad1 = null, auroraGrad2 = null, vigGrad = null

    const buildCached = () => {
      const cx = W / 2, cy = H / 2
      vigGrad = ctx.createRadialGradient(cx, cy, H * 0.2, cx, cy, H * 0.9)
      vigGrad.addColorStop(0, 'rgba(0,0,0,0)')
      vigGrad.addColorStop(1, 'rgba(0,0,0,0.65)')
    }

    const resize = () => {
      W = canvas.width = geo.width = window.innerWidth
      H = canvas.height = geo.height = window.innerHeight
      buildCached()
    }
    resize()

    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -1e4, y: -1e4 } }
    const onVis   = () => { hiddenRef.current = document.hidden }
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    // ── PARTICLES ──────────────────────────────────
    const COUNT = Math.min(55, Math.floor(window.innerWidth / 22))
    const pts = Array.from({ length: COUNT }, (_, id) => ({
      id, x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      z: Math.random(),
      r: 0.7 + Math.random() * 1.6,
      op: 0.1 + Math.random() * 0.25,
      phase: Math.random() * Math.PI * 2,
      ps: 0.005 + Math.random() * 0.008,
      hue: Math.random() < 0.6 ? 'g' : 'a',
    }))

    // ── SHOOTING STARS ──────────────────────────────
    const stars = []
    let starTimer = 0
    const spawnStar = () => {
      const top = Math.random() < 0.5
      stars.push({
        x: top ? Math.random() * W : -10,
        y: top ? -10 : Math.random() * H * 0.6,
        vx: 3 + Math.random() * 3.5,
        vy: 1.8 + Math.random() * 2.5,
        life: 1, decay: 0.013 + Math.random() * 0.01,
        len: 55 + Math.random() * 90,
        hue: Math.random() < 0.65 ? 'g' : 'a',
      })
    }

    // ── GEOMETRY (slow layer) ───────────────────────
    const RINGS = [
      { r0: 50,  sides: 6, speed: 0.0007, lw: 0.55 },
      { r0: 110, sides: 8, speed: 0.0005, lw: 0.5  },
      { r0: 170, sides: 4, speed: -0.0006, lw: 0.45 },
      { r0: 230, sides: 12, speed: 0.0004, lw: 0.4 },
      { r0: 290, sides: 0, speed: -0.0003, lw: 0.4  }, // circle
    ]
    RINGS.forEach(r => { r.phase = Math.random() * Math.PI * 2 })

    const RAYS = Array.from({ length: 7 }, (_, i) => ({
      angle: (i / 7) * Math.PI * 2,
      width: 0.045 + Math.random() * 0.055,
      op: 0.022 + Math.random() * 0.03,
      speed: (i % 2 === 0 ? 1 : -1) * (0.00025 + Math.random() * 0.00035),
      len: 0.5 + Math.random() * 0.45,
    }))

    const pulses = []
    let pulseTimer = 0
    const spawnPulse = () => pulses.push({
      r: 0,
      maxR: Math.min(W || 800, H || 600) * 0.52,
      op: 0.16,
      hue: Math.random() < 0.6 ? 'g' : 'a',
    })

    const poly = (c, cx, cy, r, sides, rot) => {
      c.beginPath()
      for (let i = 0; i <= sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2
        c[i === 0 ? 'moveTo' : 'lineTo'](cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      }
    }

    // ── SPATIAL HASH ────────────────────────────────
    const grid = new Map()

    // ── FRAME THROTTLE for geometry ─────────────────
    let geoFrame = 0

    const drawGeo = (t) => {
      const cx = W / 2, cy = H / 2
      gctx.clearRect(0, 0, W, H)

      // Rays
      for (const ray of RAYS) {
        ray.angle += ray.speed
        const rLen = Math.min(W, H) * ray.len
        const a1 = ray.angle - ray.width / 2
        const a2 = ray.angle + ray.width / 2
        gctx.beginPath()
        gctx.moveTo(cx, cy)
        for (let i = 0; i <= 12; i++) {
          const a = a1 + (i / 12) * (a2 - a1)
          gctx.lineTo(cx + Math.cos(a) * rLen, cy + Math.sin(a) * rLen)
        }
        gctx.closePath()
        const rg = gctx.createRadialGradient(cx, cy, 0, cx, cy, rLen)
        rg.addColorStop(0, `rgba(168,200,74,${ray.op})`)
        rg.addColorStop(0.45, `rgba(168,200,74,${ray.op * 0.35})`)
        rg.addColorStop(1, 'rgba(168,200,74,0)')
        gctx.fillStyle = rg
        gctx.fill()
      }

      // Sacred rings
      for (const ring of RINGS) {
        ring.phase += ring.speed
        const r = ring.r0 + Math.sin(ring.phase) * 16
        const op = 0.06 + Math.abs(Math.sin(ring.phase * 0.6)) * 0.08
        if (ring.sides >= 3) {
          poly(gctx, cx, cy, r, ring.sides, ring.phase)
          gctx.strokeStyle = GA(op)
          gctx.lineWidth = ring.lw
          gctx.stroke()
          poly(gctx, cx, cy, r * 0.6, ring.sides, ring.phase + Math.PI / ring.sides)
          gctx.strokeStyle = GA(op * 0.45)
          gctx.lineWidth = ring.lw * 0.55
          gctx.stroke()
        } else {
          gctx.beginPath()
          gctx.arc(cx, cy, r, 0, Math.PI * 2)
          gctx.strokeStyle = GA(op)
          gctx.lineWidth = 0.45
          gctx.stroke()
        }
      }

      // Central mandala petals
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 + t * 0.035
        const pr = 85 + Math.sin(t * 0.25) * 7
        gctx.beginPath()
        gctx.moveTo(cx, cy)
        gctx.bezierCurveTo(
          cx + Math.cos(a - 0.48) * pr * 0.68, cy + Math.sin(a - 0.48) * pr * 0.68,
          cx + Math.cos(a + 0.48) * pr * 0.68, cy + Math.sin(a + 0.48) * pr * 0.68,
          cx + Math.cos(a) * pr, cy + Math.sin(a) * pr,
        )
        gctx.closePath()
        gctx.strokeStyle = GA(0.055 + Math.sin(t * 0.18 + i) * 0.02)
        gctx.lineWidth = 0.55
        gctx.stroke()
      }
    }

    const animate = (ts) => {
      if (hiddenRef.current) { rafRef.current = requestAnimationFrame(animate); return }

      const t   = ts * 0.001
      const sc  = scrollRef.current
      const mx  = mouseRef.current.x
      const my  = mouseRef.current.y
      const cx  = W / 2, cy = H / 2

      ctx.clearRect(0, 0, W, H)

      // 1. AURORA (cheap radial gradients, reposition per frame)
      const scrollFrac = Math.min(sc / 3000, 1)
      const ar = (scrollFrac * 20) | 0  // 0-20, used as extra red/amber blend

      const g1 = ctx.createRadialGradient(
        cx + Math.sin(t * 0.11) * W * 0.16,
        cy * 0.55 + Math.cos(t * 0.08) * H * 0.1,
        0, cx, cy * 0.55, H * 0.65
      )
      g1.addColorStop(0, `rgba(${168 - ar},${200 - ar},74,0.08)`)
      g1.addColorStop(0.5, `rgba(168,200,74,0.03)`)
      g1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g1; ctx.fillRect(0, 0, W, H)

      const g2 = ctx.createRadialGradient(
        W * 0.82 + Math.cos(t * 0.07) * W * 0.08,
        H * 0.78 + Math.sin(t * 0.1) * H * 0.07,
        0, W * 0.82, H * 0.78, H * 0.5
      )
      g2.addColorStop(0, AA(0.065))
      g2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H)

      // 2. GEOMETRY layer – redraw every 3rd frame (~20fps)
      geoFrame++
      if (geoFrame % 3 === 0) drawGeo(t)
      ctx.drawImage(geo, 0, 0)

      // 3. PULSE RINGS
      pulseTimer += 16
      if (pulseTimer > 3400) { spawnPulse(); pulseTimer = 0 }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.r += (p.maxR - p.r) * 0.011
        p.op *= 0.9875
        if (p.op < 0.003) { pulses.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = p.hue === 'g' ? GA(p.op) : AA(p.op)
        ctx.lineWidth = 1.1
        ctx.stroke()
      }

      // 4. PARTICLES + SPATIAL HASH CONNECTIONS
      grid.clear()
      for (const p of pts) {
        p.phase += p.ps
        // Scroll parallax drift
        p.y += velRef.current * (0.012 + p.z * 0.03)
        // Mouse repulsion
        if (mx > -1000) {
          const dx = p.x - mx, dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < 12000) {
            const d = Math.sqrt(d2), f = (110 - d) / 110 * 0.42 * (0.5 + p.z * 0.5)
            p.vx += (dx / d) * f; p.vy += (dy / d) * f
          }
        }
        p.vx *= 0.985; p.vy *= 0.985
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > 1.7) { p.vx *= 1.7 / sp; p.vy *= 1.7 / sp }
        p.x += p.vx; p.y += p.vy
        if (p.x < -30) p.x = W + 30; if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30; if (p.y > H + 30) p.y = -30

        const key = cellKey(p.x, p.y)
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key).push(p)
      }

      // Connections via spatial hash — dramatically faster than O(n²)
      const CONN_SQ = CELL * CELL
      const seen = new Set()
      for (const p of pts) {
        const gcx = Math.floor(p.x / CELL), gcy = Math.floor(p.y / CELL)
        for (const nk of neighbors(gcx, gcy)) {
          for (const q of (grid.get(nk) || [])) {
            if (q.id <= p.id) continue
            const pairKey = p.id * 1000 + q.id
            if (seen.has(pairKey)) continue
            seen.add(pairKey)
            const dx = p.x - q.x, dy = p.y - q.y
            const d2 = dx * dx + dy * dy
            if (d2 < CONN_SQ) {
              const a = (1 - Math.sqrt(d2) / CELL) * 0.13
              ctx.strokeStyle = p.hue === 'g' ? GA(a) : AA(a * 0.8)
              ctx.lineWidth = 0.5
              ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke()
            }
          }
        }
      }

      // Draw dots
      for (const p of pts) {
        const op = p.op * (0.82 + Math.sin(p.phase) * 0.18)
        const sz = p.r * (0.5 + p.z * 0.65)
        ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 'g' ? GA(op) : AA(op * 0.9)
        ctx.fill()
        if (sz > 1.3) {
          ctx.beginPath(); ctx.arc(p.x, p.y, sz * 2.8, 0, Math.PI * 2)
          ctx.fillStyle = p.hue === 'g' ? GA(op * 0.04) : AA(op * 0.035)
          ctx.fill()
        }
      }

      // 5. SHOOTING STARS
      starTimer += 16
      if (starTimer > 5000 + Math.random() * 4000) { spawnStar(); starTimer = 0 }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.x += s.vx; s.y += s.vy; s.life -= s.decay
        if (s.life <= 0 || s.x > W + 50 || s.y > H + 50) { stars.splice(i, 1); continue }
        const tailX = s.x - s.vx * (s.len / s.vx)
        const tailY = s.y - s.vy * (s.len / s.vx)
        const col = s.hue === 'g' ? '168,200,74' : '200,168,74'
        const tg = ctx.createLinearGradient(tailX, tailY, s.x, s.y)
        tg.addColorStop(0, `rgba(${col},0)`)
        tg.addColorStop(1, `rgba(${col},${s.life * 0.8})`)
        ctx.beginPath(); ctx.moveTo(tailX, tailY); ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = tg; ctx.lineWidth = 1.4 * s.life; ctx.stroke()
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.2 * s.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col},${s.life * 0.85})`; ctx.fill()
      }

      // 6. MOUSE SPOTLIGHT
      if (mx > -1000) {
        const sg = ctx.createRadialGradient(mx, my, 0, mx, my, 260)
        sg.addColorStop(0, 'rgba(168,200,74,0.05)')
        sg.addColorStop(0.5, 'rgba(168,200,74,0.015)')
        sg.addColorStop(1, 'rgba(168,200,74,0)')
        ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H)
      }

      // 7. VIGNETTE (cached)
      if (vigGrad) { ctx.fillStyle = vigGrad; ctx.fillRect(0, 0, W, H) }

      rafRef.current = requestAnimationFrame(animate)
    }

    spawnPulse()
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
      <canvas
        ref={canvasRef}
        style={{ position:'absolute', inset:0, width:'100%', height:'100%', willChange:'transform' }}
      />
      <div className="grain" />
    </div>
  )
}

import { useEffect, useRef } from 'react'

const G  = [168, 200, 74]
const A  = [200, 168, 74]
const GA = (a) => `rgba(168,200,74,${a})`
const AA = (a) => `rgba(200,168,74,${a})`
const mix = (c1, c2, t) => c1.map((v, i) => Math.round(v + (c2[i] - v) * t))

export default function Background({ scrollY }) {
  const canvasRef = useRef(null)
  const mouseRef  = useRef({ x: -1000, y: -1000 })
  const scrollRef = useRef(0)
  const velRef    = useRef(0)
  const prevScRef = useRef(0)
  const rafRef    = useRef()

  useEffect(() => {
    const sc = scrollY ?? 0
    velRef.current   = sc - prevScRef.current
    prevScRef.current = sc
    scrollRef.current = sc
  }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let W = window.innerWidth, H = window.innerHeight

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: -1000, y: -1000 } }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    // ── SHOOTING STARS ─────────────────────────────
    const stars = []
    const spawnStar = () => {
      const edge = Math.random() < 0.5 ? 'top' : 'left'
      stars.push({
        x: edge === 'top' ? Math.random() * W : -10,
        y: edge === 'top' ? -10 : Math.random() * H * 0.6,
        vx: 3 + Math.random() * 4,
        vy: 2 + Math.random() * 3,
        life: 1, decay: 0.012 + Math.random() * 0.01,
        len: 60 + Math.random() * 100,
        hue: Math.random() < 0.65 ? 'g' : 'a',
      })
    }
    let starTimer = 0

    // ── PARTICLES ──────────────────────────────────
    const COUNT = Math.min(90, Math.floor(W / 16))
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.45, vy: (Math.random() - 0.5) * 0.45,
      z: Math.random(),
      r: 0.6 + Math.random() * 1.8,
      op: 0.08 + Math.random() * 0.28,
      phase: Math.random() * Math.PI * 2,
      ps: 0.005 + Math.random() * 0.009,
      hue: Math.random() < 0.6 ? 'g' : 'a',
    }))

    // ── SACRED GEOMETRY ────────────────────────────
    // Rings that pulse outward
    const rings = Array.from({ length: 6 }, (_, i) => ({
      r0: 40 + i * 60,        // base radius
      phase: (i / 6) * Math.PI * 2,
      speed: 0.0006 + i * 0.0002,
      lineW: 0.6,
      sides: [0, 3, 4, 6, 8, 12][i],
    }))

    // ── PULSE RINGS ────────────────────────────────
    const pulses = []
    let pulseTimer = 0
    const spawnPulse = () => {
      pulses.push({ r: 0, maxR: Math.min(W, H) * 0.55, op: 0.18, hue: Math.random() < 0.6 ? 'g' : 'a' })
    }

    // ── LIGHT RAYS ─────────────────────────────────
    const RAY_COUNT = 9
    const rays = Array.from({ length: RAY_COUNT }, (_, i) => ({
      angle: (i / RAY_COUNT) * Math.PI * 2,
      width: 0.04 + Math.random() * 0.06,  // radians
      op: 0.025 + Math.random() * 0.04,
      speed: (Math.random() < 0.5 ? 1 : -1) * (0.0003 + Math.random() * 0.0004),
      len: 0.5 + Math.random() * 0.5,
    }))

    const drawPolygon = (ctx, cx, cy, r, sides, rot) => {
      if (sides < 3) return
      ctx.beginPath()
      for (let i = 0; i <= sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2
        const fn = i === 0 ? 'moveTo' : 'lineTo'
        ctx[fn](cx + Math.cos(a) * r, cy + Math.sin(a) * r)
      }
    }

    const animate = (ts) => {
      const t   = ts * 0.001
      const sc  = scrollRef.current
      const vel = velRef.current
      const mx  = mouseRef.current.x
      const my  = mouseRef.current.y
      const cx  = W / 2, cy = H / 2

      ctx.clearRect(0, 0, W, H)

      // ── 1. DEEP AURORA GRADIENT ─────────────────
      const scrollFrac = Math.min(sc / (document.documentElement.scrollHeight || 2000), 1)
      const col = mix(G, A, scrollFrac * 0.5)
      const aur1 = ctx.createRadialGradient(cx + Math.sin(t * 0.12) * W * 0.18, cy * 0.6 + Math.cos(t * 0.09) * H * 0.12, 0, cx, cy * 0.6, H * 0.7)
      aur1.addColorStop(0, `rgba(${col},0.09)`)
      aur1.addColorStop(0.45, `rgba(${col},0.04)`)
      aur1.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = aur1
      ctx.fillRect(0, 0, W, H)

      const aur2 = ctx.createRadialGradient(W * 0.8 + Math.cos(t * 0.08) * W * 0.1, H * 0.75 + Math.sin(t * 0.11) * H * 0.08, 0, W * 0.8, H * 0.75, H * 0.55)
      aur2.addColorStop(0, AA(0.07))
      aur2.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = aur2
      ctx.fillRect(0, 0, W, H)

      // ── 2. LIGHT RAYS from center ───────────────
      for (const ray of rays) {
        ray.angle += ray.speed + vel * 0.00006
        const rLen = Math.min(W, H) * ray.len
        const a1 = ray.angle - ray.width / 2
        const a2 = ray.angle + ray.width / 2
        const grad = ctx.createConicalGradient
          ? null   // not in all browsers — use manual approach
          : null

        // Manual ray via triangle
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        const pts2 = 16
        for (let i = 0; i <= pts2; i++) {
          const a = a1 + (i / pts2) * (a2 - a1)
          ctx.lineTo(cx + Math.cos(a) * rLen, cy + Math.sin(a) * rLen)
        }
        ctx.closePath()
        const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rLen)
        radGrad.addColorStop(0, `rgba(168,200,74,${ray.op * 0.9})`)
        radGrad.addColorStop(0.4, `rgba(168,200,74,${ray.op * 0.4})`)
        radGrad.addColorStop(1, 'rgba(168,200,74,0)')
        ctx.fillStyle = radGrad
        ctx.fill()
      }

      // ── 3. SACRED GEOMETRY RINGS ────────────────
      for (const ring of rings) {
        ring.phase += ring.speed
        const r = ring.r0 + Math.sin(ring.phase) * 18 - sc * 0.03
        if (r < 0) continue
        const op = 0.07 + Math.abs(Math.sin(ring.phase * 0.7)) * 0.09
        if (ring.sides >= 3) {
          drawPolygon(ctx, cx, cy, r, ring.sides, ring.phase)
          ctx.strokeStyle = GA(op)
          ctx.lineWidth = ring.lineW
          ctx.stroke()
          // Inner polygon
          drawPolygon(ctx, cx, cy, r * 0.62, ring.sides, ring.phase + Math.PI / ring.sides)
          ctx.strokeStyle = GA(op * 0.5)
          ctx.lineWidth = ring.lineW * 0.6
          ctx.stroke()
        } else {
          // Full circle
          ctx.beginPath()
          ctx.arc(cx, cy, r, 0, Math.PI * 2)
          ctx.strokeStyle = GA(op)
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      // Central star/flower
      const petal = 6
      for (let i = 0; i < petal; i++) {
        const a = (i / petal) * Math.PI * 2 + t * 0.04
        const pr = 90 + Math.sin(t * 0.3) * 8
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.bezierCurveTo(
          cx + Math.cos(a - 0.5) * pr * 0.7, cy + Math.sin(a - 0.5) * pr * 0.7,
          cx + Math.cos(a + 0.5) * pr * 0.7, cy + Math.sin(a + 0.5) * pr * 0.7,
          cx + Math.cos(a) * pr, cy + Math.sin(a) * pr,
        )
        ctx.closePath()
        ctx.strokeStyle = GA(0.06 + Math.sin(t * 0.2 + i) * 0.025)
        ctx.lineWidth = 0.6
        ctx.stroke()
      }

      // ── 4. PULSE RINGS ──────────────────────────
      pulseTimer += 16
      if (pulseTimer > 3200) { spawnPulse(); pulseTimer = 0 }
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i]
        p.r += (p.maxR - p.r) * 0.012
        p.op *= 0.988
        if (p.op < 0.003) { pulses.splice(i, 1); continue }
        ctx.beginPath()
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2)
        const c = p.hue === 'g' ? GA(p.op) : AA(p.op)
        ctx.strokeStyle = c
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // ── 5. PARTICLES ────────────────────────────
      for (const p of pts) {
        p.phase += p.ps
        const sv = vel * (0.015 + p.z * 0.04)
        p.y += sv

        if (mx > 0) {
          const dx = p.x - mx, dy = p.y - my
          const d2 = dx * dx + dy * dy
          if (d2 < 14000) {
            const d = Math.sqrt(d2), f = (118 - d) / 118 * 0.45 * (0.5 + p.z * 0.5)
            p.vx += (dx / d) * f; p.vy += (dy / d) * f
          }
        }
        p.vx += (Math.random() - 0.5) * Math.abs(vel) * 0.002
        p.vx *= 0.984; p.vy *= 0.984
        const sp = Math.hypot(p.vx, p.vy)
        if (sp > 1.8) { p.vx *= 1.8 / sp; p.vy *= 1.8 / sp }
        p.x += p.vx; p.y += p.vy
        if (p.x < -30) p.x = W + 30; if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30; if (p.y > H + 30) p.y = -30
      }

      // Connections
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 11000) {
            const d = Math.sqrt(d2), a = (1 - d / 105) * 0.14
            ctx.strokeStyle = pts[i].hue === 'g' ? GA(a) : AA(a * 0.8)
            ctx.lineWidth = 0.5
            ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke()
          }
        }
      }

      // Draw dots
      for (const p of pts) {
        const op = p.op * (0.8 + Math.sin(p.phase) * 0.2)
        const sz = p.r * (0.5 + p.z * 0.7)
        ctx.beginPath(); ctx.arc(p.x, p.y, sz, 0, Math.PI * 2)
        ctx.fillStyle = p.hue === 'g' ? GA(op) : AA(op * 0.9)
        ctx.fill()
        if (sz > 1.2) {
          ctx.beginPath(); ctx.arc(p.x, p.y, sz * 3, 0, Math.PI * 2)
          ctx.fillStyle = p.hue === 'g' ? GA(op * 0.04) : AA(op * 0.035)
          ctx.fill()
        }
      }

      // ── 6. SHOOTING STARS ───────────────────────
      starTimer += 16
      if (starTimer > 4500 + Math.random() * 5000) { spawnStar(); starTimer = 0 }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.x += s.vx; s.y += s.vy; s.life -= s.decay
        if (s.life <= 0 || s.x > W + 50 || s.y > H + 50) { stars.splice(i, 1); continue }
        const tail = ctx.createLinearGradient(s.x - s.vx * s.len / s.vx, s.y - s.vy * s.len / s.vy, s.x, s.y)
        const col2 = s.hue === 'g' ? '168,200,74' : '200,168,74'
        tail.addColorStop(0, `rgba(${col2},0)`)
        tail.addColorStop(1, `rgba(${col2},${s.life * 0.85})`)
        ctx.beginPath()
        ctx.moveTo(s.x - s.vx * (s.len / s.vx), s.y - s.vy * (s.len / s.vy))
        ctx.lineTo(s.x, s.y)
        ctx.strokeStyle = tail; ctx.lineWidth = 1.5 * s.life; ctx.stroke()
        // Head glow
        ctx.beginPath(); ctx.arc(s.x, s.y, 2.5 * s.life, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${col2},${s.life * 0.9})`; ctx.fill()
      }

      // ── 7. MOUSE SPOTLIGHT ──────────────────────
      if (mx > 0) {
        const spot = ctx.createRadialGradient(mx, my, 0, mx, my, 280)
        spot.addColorStop(0, 'rgba(168,200,74,0.055)')
        spot.addColorStop(0.5, 'rgba(168,200,74,0.018)')
        spot.addColorStop(1, 'rgba(168,200,74,0)')
        ctx.fillStyle = spot
        ctx.fillRect(0, 0, W, H)
      }

      // ── 9. GRAIN ────────────────────────────────
      // (handled by CSS)

      // ── 10. VIGNETTE ────────────────────────────
      const vig = ctx.createRadialGradient(cx, cy, H * 0.22, cx, cy, H * 0.88)
      vig.addColorStop(0, 'rgba(0,0,0,0)')
      vig.addColorStop(1, 'rgba(0,0,0,0.62)')
      ctx.fillStyle = vig; ctx.fillRect(0, 0, W, H)

      rafRef.current = requestAnimationFrame(animate)
    }

    spawnPulse()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="bg-layer">
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%' }} />
      <div className="grain" />
    </div>
  )
}

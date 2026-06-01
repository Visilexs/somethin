import { useEffect, useRef } from 'react'

const GA = (a) => `rgba(168,200,74,${a})`
const AA = (a) => `rgba(200,168,74,${a})`
const RUNES = ['⸸','✦','✧','✠','⊕','✶','❖','⋆','✙','⊗','◈','⌘']

export default function Background({ scrollY }) {
  const canvasRef   = useRef(null)
  const deepRef     = useRef(null)
  const mouseRef    = useRef({ x: null, y: null })
  const scrollRef   = useRef(0)
  const velRef      = useRef(0)
  const lastScrollRef = useRef(0)
  const rafRef      = useRef()
  const timeRef     = useRef(0)

  /* sync scroll prop into ref without triggering re-render */
  useEffect(() => {
    scrollRef.current = scrollY ?? 0
    velRef.current = scrollY - lastScrollRef.current
    lastScrollRef.current = scrollY ?? 0
  }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    const deep   = deepRef.current
    if (!canvas || !deep) return
    const ctx  = canvas.getContext('2d')
    const dctx = deep.getContext('2d')

    const resize = () => {
      canvas.width = deep.width  = window.innerWidth
      canvas.height = deep.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove  = e => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: null, y: null } }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)

    /* ── FOREGROUND PARTICLES ─────────────────── */
    const W = () => canvas.width
    const H = () => canvas.height
    const COUNT = Math.min(110, Math.floor(window.innerWidth / 14))

    const particles = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      z: Math.random(),                      // depth 0=far 1=near
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.35 + 0.06,
      isRune: i < COUNT * 0.14,
      rune: RUNES[Math.floor(Math.random() * RUNES.length)],
      hue: Math.random() < 0.65 ? 'g' : 'a',
      phase: Math.random() * Math.PI * 2,
      phaseSpeed: 0.004 + Math.random() * 0.008,
    }))

    /* ── DEEP BACKGROUND GEOMETRY ─────────────── */
    const GEO_COUNT = 6
    const geos = Array.from({ length: GEO_COUNT }, (_, i) => ({
      x: (i / GEO_COUNT) * window.innerWidth + Math.random() * 200 - 100,
      y: Math.random() * window.innerHeight,
      r: 60 + Math.random() * 120,
      sides: [3, 4, 6, 8][Math.floor(Math.random() * 4)],
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.002,
      opacity: 0.04 + Math.random() * 0.05,
      z: Math.random() * 0.4,       // deep layer, slow parallax
      hue: Math.random() < 0.6 ? 'g' : 'a',
    }))

    /* ── AURORA BLOBS (canvas-drawn) ──────────── */
    const BLOBS = [
      { x: 0.15, y: 0.12, r: 380, hue: 'g', speed: 0.22 },
      { x: 0.85, y: 0.85, r: 300, hue: 'a', speed: 0.18 },
      { x: 0.55, y: 0.45, r: 240, hue: 'g', speed: 0.28 },
      { x: 0.80, y: 0.20, r: 210, hue: 'a', speed: 0.14 },
      { x: 0.25, y: 0.70, r: 320, hue: 'g', speed: 0.20 },
    ]

    function drawPolygon(ctx, cx, cy, r, sides, rot) {
      ctx.beginPath()
      for (let i = 0; i < sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2
        const x = cx + Math.cos(a) * r
        const y = cy + Math.sin(a) * r
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.closePath()
    }

    const animate = (ts) => {
      const t     = ts * 0.001
      const w     = W(), h = H()
      const sc    = scrollRef.current
      const vel   = velRef.current
      const mouse = mouseRef.current
      timeRef.current = t

      /* ── DEEP LAYER (geometry + aurora) ─────── */
      dctx.clearRect(0, 0, w, h)

      // Aurora blobs — scroll-parallax + slow drift
      for (const b of BLOBS) {
        const px = b.x * w + Math.sin(t * b.speed * 0.7) * 90
        const py = b.y * h + Math.cos(t * b.speed) * 60
                 - sc * b.z * 0.15   // parallax: deep blobs move slow
        const grad = dctx.createRadialGradient(px, py, 0, px, py, b.r)
        const col = b.hue === 'g' ? [168, 200, 74] : [200, 168, 74]
        grad.addColorStop(0, `rgba(${col},0.11)`)
        grad.addColorStop(0.5, `rgba(${col},0.05)`)
        grad.addColorStop(1, `rgba(${col},0)`)
        dctx.fillStyle = grad
        dctx.beginPath()
        dctx.ellipse(px, py, b.r, b.r * 0.6, t * b.speed * 0.3, 0, Math.PI * 2)
        dctx.fill()
      }

      // Sacred geometry — slow rotation + scroll parallax
      for (const g of geos) {
        g.rot += g.rotSpeed
        const px = g.x
        const py = g.y - sc * (0.05 + g.z * 0.12)   // slow parallax
        const col = g.hue === 'g' ? '168,200,74' : '200,168,74'
        drawPolygon(dctx, px, py, g.r, g.sides, g.rot)
        dctx.strokeStyle = `rgba(${col},${g.opacity})`
        dctx.lineWidth = 0.7
        dctx.stroke()
        // inner polygon
        drawPolygon(dctx, px, py, g.r * 0.6, g.sides, g.rot + Math.PI / g.sides)
        dctx.strokeStyle = `rgba(${col},${g.opacity * 0.5})`
        dctx.lineWidth = 0.4
        dctx.stroke()
      }

      /* ── FOREGROUND PARTICLES ────────────────── */
      ctx.clearRect(0, 0, w, h)

      // Scroll: nudge all particles by velocity (fast scroll = particles drift opposite)
      const scrollNudge = vel * 0.04
      for (const p of particles) {
        p.phase += p.phaseSpeed
        const pulse = 0.85 + Math.sin(p.phase) * 0.15

        // Parallax: near particles move more with scroll, far ones less
        const parallaxDrift = vel * (0.02 + p.z * 0.06)
        p.y += parallaxDrift

        // Mouse repulsion
        if (mouse.x != null) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 16000) {
            const d = Math.sqrt(d2)
            const f = (126 - d) / 126 * 0.5 * (0.5 + p.z * 0.5)
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }

        // Scroll velocity turbulence
        p.vx += (Math.random() - 0.5) * Math.abs(vel) * 0.003
        p.vy += scrollNudge * 0.01

        p.vx *= 0.982
        p.vy *= 0.982
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.8) { p.vx /= spd / 1.8; p.vy /= spd / 1.8 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < -40) p.x = w + 40
        if (p.x > w + 40) p.x = -40
        if (p.y < -40) p.y = h + 40
        if (p.y > h + 40) p.y = -40
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 12000) {
            const d = Math.sqrt(d2)
            const a = (1 - d / 110) * 0.12
            const col = particles[i].hue === 'g' ? GA(a) : AA(a * 0.8)
            ctx.strokeStyle = col
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (const p of particles) {
        const op = p.opacity * (0.85 + Math.sin(p.phase) * 0.15)
        const col = p.hue === 'g' ? GA(op) : AA(op * 0.9)
        if (p.isRune) {
          ctx.save()
          const sz = 9 + p.size * 4 + (p.z * 4)
          ctx.font = `${sz}px serif`
          ctx.fillStyle = col
          ctx.globalAlpha = op * 0.5
          // Runes drift upward slightly against scroll
          ctx.fillText(p.rune, p.x, p.y)
          ctx.restore()
        } else {
          const sz = p.size * (0.6 + p.z * 0.7)
          ctx.beginPath()
          ctx.arc(p.x, p.y, sz, 0, Math.PI * 2)
          ctx.fillStyle = col
          ctx.fill()
          if (sz > 1.4) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, sz * 2.8, 0, Math.PI * 2)
            ctx.fillStyle = p.hue === 'g' ? GA(op * 0.05) : AA(op * 0.04)
            ctx.fill()
          }
        }
      }

      // Velocity flash effect: when scrolling fast, brief light streak
      if (Math.abs(vel) > 8) {
        const alpha = Math.min(Math.abs(vel) / 80, 0.06)
        const grad = ctx.createLinearGradient(0, 0, 0, h)
        grad.addColorStop(0, `rgba(168,200,74,0)`)
        grad.addColorStop(vel > 0 ? 0.3 : 0.7, `rgba(168,200,74,${alpha})`)
        grad.addColorStop(1, `rgba(168,200,74,0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      }

      rafRef.current = requestAnimationFrame(animate)
    }

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
      {/* Deep layer: geometry + aurora */}
      <canvas ref={deepRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:0 }} />
      {/* Foreground particles */}
      <canvas ref={canvasRef} style={{ position:'absolute', inset:0, width:'100%', height:'100%', zIndex:1 }} />
      <div className="grain" />
      <div className="vignette" />
    </div>
  )
}

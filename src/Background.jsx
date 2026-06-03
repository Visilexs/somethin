import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Sacred emblem background — a holy octagonal mandala with radiating light rays,
// like a divine sigil or rose window behind an altar. Built for the Church of
// Kopecky aesthetic: olive-green + amber, liturgical geometry, candle-lit dark.
//
//   • A central octagon (the sacred eight — completion, resurrection) that
//     slowly rotates, with nested concentric rings.
//   • Long light rays emanating outward from the centre, breathing in intensity.
//   • Orbiting sigil points along the rings.
//   • A radiant core that pulses like a held flame.
//   • Cursor adds a gentle reading-light; scroll parallaxes the whole emblem.
// No premade particle library — all geometry drawn from the palette + concept.
// ─────────────────────────────────────────────────────────────────────────────

const G = '168,200,74'   // olive-green
const A = '200,168,74'   // amber

export default function Background({ scrollY }) {
  const canvasRef = useRef(null)
  const mouse     = useRef({ x: -1e4, y: -1e4 })
  const scroll    = useRef(0)
  const raf       = useRef()
  const hidden    = useRef(false)

  useEffect(() => { scroll.current = scrollY ?? 0 }, [scrollY])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let W = 0, H = 0
    const DPR = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight
      canvas.width = W * DPR; canvas.height = H * DPR
      canvas.style.width = W + 'px'; canvas.style.height = H + 'px'
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove  = e => { mouse.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouse.current = { x: -1e4, y: -1e4 } }
    const onVis   = () => { hidden.current = document.hidden }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    document.addEventListener('visibilitychange', onVis)

    // Draw a regular polygon path centred at (cx,cy)
    const polygon = (cx, cy, radius, sides, rot) => {
      ctx.beginPath()
      for (let i = 0; i <= sides; i++) {
        const a = rot + (i / sides) * Math.PI * 2
        const x = cx + Math.cos(a) * radius
        const y = cy + Math.sin(a) * radius
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
    }

    const draw = (ts) => {
      if (hidden.current) { raf.current = requestAnimationFrame(draw); return }
      const t  = ts * 0.001
      const sc = scroll.current
      const mx = mouse.current.x, my = mouse.current.y

      // Emblem centre — upper third, parallax up slightly as you scroll down
      const cx = W / 2
      const cy = H * 0.38 - sc * 0.08
      const breathe = 0.5 + Math.sin(t * 0.5) * 0.5          // 0..1 slow pulse
      const rot = t * 0.04                                    // slow rotation

      ctx.clearRect(0, 0, W, H)

      // 1 ── deep radial ground glow behind the emblem
      const ground = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(W, H) * 0.8)
      ground.addColorStop(0, `rgba(${G},0.07)`)
      ground.addColorStop(0.35, `rgba(${G},0.02)`)
      ground.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = ground
      ctx.fillRect(0, 0, W, H)

      // 2 ── radiating light rays from the centre (the "holy" rays)
      const RAYS = 24
      const maxLen = Math.max(W, H) * 0.95
      ctx.save()
      ctx.translate(cx, cy)
      for (let i = 0; i < RAYS; i++) {
        const a = rot * 0.5 + (i / RAYS) * Math.PI * 2
        // alternate long/short rays; breathe their length + opacity
        const long = i % 2 === 0
        const len = (long ? maxLen : maxLen * 0.62) * (0.85 + breathe * 0.15)
        const isAmber = i % 6 === 0
        const col = isAmber ? A : G
        const baseA = (long ? 0.05 : 0.028) * (0.55 + breathe * 0.45)

        const grad = ctx.createLinearGradient(0, 0, Math.cos(a) * len, Math.sin(a) * len)
        grad.addColorStop(0, `rgba(${col},${baseA * 1.6})`)
        grad.addColorStop(0.4, `rgba(${col},${baseA})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')

        // draw a thin tapering wedge for each ray
        const spread = long ? 0.012 : 0.008
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(Math.cos(a - spread) * len, Math.sin(a - spread) * len)
        ctx.lineTo(Math.cos(a + spread) * len, Math.sin(a + spread) * len)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()
      }
      ctx.restore()

      // 3 ── nested sacred octagon rings
      const rings = [
        { r: 70,  sides: 8,  rotMul:  1.0, col: G, a: 0.30 },
        { r: 116, sides: 8,  rotMul: -0.7, col: A, a: 0.22 },
        { r: 168, sides: 16, rotMul:  0.5, col: G, a: 0.14 },
        { r: 230, sides: 8,  rotMul: -0.35,col: G, a: 0.12 },
        { r: 300, sides: 32, rotMul:  0.25,col: G, a: 0.07 },
      ]
      for (const ring of rings) {
        const pr = ring.r * (0.97 + breathe * 0.03)
        polygon(cx, cy, pr, ring.sides, rot * ring.rotMul)
        ctx.strokeStyle = `rgba(${ring.col},${ring.a * (0.6 + breathe * 0.4)})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // 4 ── connective spokes between the inner octagons
      ctx.save()
      ctx.translate(cx, cy)
      for (let i = 0; i < 8; i++) {
        const a = rot + (i / 8) * Math.PI * 2
        ctx.beginPath()
        ctx.moveTo(Math.cos(a) * 70, Math.sin(a) * 70)
        ctx.lineTo(Math.cos(a) * 230, Math.sin(a) * 230)
        ctx.strokeStyle = `rgba(${G},${0.06 + breathe * 0.04})`
        ctx.lineWidth = 0.7
        ctx.stroke()
      }
      ctx.restore()

      // 5 ── orbiting sigil points on the second ring
      ctx.save()
      ctx.translate(cx, cy)
      for (let i = 0; i < 8; i++) {
        const a = -rot * 0.7 + (i / 8) * Math.PI * 2
        const px = Math.cos(a) * 116, py = Math.sin(a) * 116
        ctx.beginPath()
        ctx.arc(px, py, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${A},${0.4 + breathe * 0.4})`
        ctx.fill()
        // tiny halo
        ctx.beginPath()
        ctx.arc(px, py, 6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${A},${0.06 + breathe * 0.06})`
        ctx.fill()
      }
      ctx.restore()

      // 6 ── radiant core (held flame at the centre of the octagon)
      const coreR = 46 + breathe * 14
      const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, coreR)
      core.addColorStop(0, `rgba(${A},${0.22 + breathe * 0.16})`)
      core.addColorStop(0.5, `rgba(${G},0.07)`)
      core.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = core
      ctx.beginPath(); ctx.arc(cx, cy, coreR, 0, Math.PI * 2); ctx.fill()
      // bright centre point
      ctx.beginPath(); ctx.arc(cx, cy, 2 + breathe * 1.2, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${A},${0.7 + breathe * 0.3})`; ctx.fill()

      // 7 ── faint manuscript dust drifting (very subtle, ties to vellum feel)
      const dustN = 36
      for (let i = 0; i < dustN; i++) {
        const seed = i * 137.5
        const dx = (Math.sin(seed + t * 0.05) * 0.5 + 0.5) * W
        const dy = ((Math.cos(seed * 1.3 + t * 0.04) * 0.5 + 0.5) * H + t * 6) % H
        const op = 0.04 + (Math.sin(seed + t) * 0.5 + 0.5) * 0.08
        ctx.beginPath()
        ctx.arc(dx, dy, 0.8, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${G},${op})`
        ctx.fill()
      }

      // 8 ── cursor reading-light
      if (mx > 0) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
        halo.addColorStop(0, `rgba(${G},0.04)`)
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = halo
        ctx.fillRect(0, 0, W, H)
      }

      // 9 ── vignette
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.28, W / 2, H / 2, H * 0.95)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.66)')
      ctx.fillStyle = vg
      ctx.fillRect(0, 0, W, H)

      raf.current = requestAnimationFrame(draw)
    }
    raf.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="bg-layer">
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      <div className="grain" />
    </div>
  )
}

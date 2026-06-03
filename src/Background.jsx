import { useEffect, useRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Custom background: a living sacred cartography of the Tatras.
//   • Topographic contour lines (the mountains Kopecky descended from), drawn
//     as flowing layered curves that slowly breathe.
//   • A faint manuscript grid + meridian lines, like an ancient surveyor's chart.
//   • A single slow light that sweeps the terrain (the "illumination" of an
//     illuminated manuscript), brightening contours as it passes.
//   • Scroll parallaxes the terrain; cursor subtly warps the nearest contours.
// No premade particle systems — every element is drawn from the site's own
// olive/amber palette and liturgical-cartographic concept.
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

    // ── Contour field definition ──────────────────────────────────────────
    // Each contour is a horizontal ridgeline made of summed sine waves.
    // Stacking many of them at decreasing y gives a topographic-map feel.
    const CONTOURS = 26
    const ridge = (x, layer, t) => {
      // layer 0 = lowest/closest, higher = further up the "mountain"
      const f1 = Math.sin(x * 0.0017 + layer * 0.5 + t * 0.06) * 46
      const f2 = Math.sin(x * 0.0039 - layer * 0.32 + t * 0.041) * 24
      const f3 = Math.sin(x * 0.0072 + layer * 0.9 - t * 0.03) * 12
      // peak emphasis toward centre — suggests a mountain massif
      const centre = 1 - Math.min(1, Math.abs(x - W / 2) / (W * 0.62))
      const massif = centre * centre * 120
      return f1 + f2 + f3 - massif
    }

    const draw = (ts) => {
      if (hidden.current) { raf.current = requestAnimationFrame(draw); return }
      const t = ts * 0.001
      const sc = scroll.current
      const mx = mouse.current.x, my = mouse.current.y
      ctx.clearRect(0, 0, W, H)

      // 1 ── deep base wash (top-lit, like vellum under candlelight)
      const wash = ctx.createRadialGradient(W / 2, H * 0.32, 0, W / 2, H * 0.32, H * 0.95)
      wash.addColorStop(0, `rgba(${G},0.055)`)
      wash.addColorStop(0.45, `rgba(${G},0.018)`)
      wash.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = wash
      ctx.fillRect(0, 0, W, H)

      // 2 ── manuscript meridian grid (faint vertical + horizontal rules)
      ctx.lineWidth = 1
      const gridGap = 96
      const gridShift = (sc * 0.04) % gridGap
      ctx.strokeStyle = `rgba(${G},0.035)`
      ctx.beginPath()
      for (let x = (-gridShift % gridGap); x < W; x += gridGap) {
        ctx.moveTo(x, 0); ctx.lineTo(x, H)
      }
      for (let y = (-gridShift % gridGap); y < H; y += gridGap) {
        ctx.moveTo(0, y); ctx.lineTo(W, y)
      }
      ctx.stroke()

      // 3 ── the moving illumination (a slow sweep of light across the terrain)
      const lightX = (Math.sin(t * 0.08) * 0.5 + 0.5) * W
      const lightY = H * 0.4 + Math.cos(t * 0.05) * H * 0.12

      // 4 ── topographic contour lines
      const baseY = H * 0.72 + sc * 0.12   // terrain sits low, parallax on scroll
      for (let i = 0; i < CONTOURS; i++) {
        const layer = i
        const yOff = baseY - i * (H * 0.6 / CONTOURS)
        // distance of this contour band from the sweeping light → brightness
        const distToLight = Math.abs((yOff) - lightY) / H
        const lit = Math.max(0, 1 - distToLight * 1.6)
        const isAmber = i % 7 === 3            // occasional amber ridgeline for accent
        const colour = isAmber ? A : G
        const alpha = 0.05 + lit * 0.22
        ctx.strokeStyle = `rgba(${colour},${alpha})`
        ctx.lineWidth = isAmber ? 1.1 : 0.8

        ctx.beginPath()
        for (let x = -20; x <= W + 20; x += 8) {
          let y = yOff + ridge(x, layer, t)
          // cursor warps nearby contour points outward, like a fingertip on a map
          if (mx > 0) {
            const dx = x - mx, dy = (y) - my
            const d2 = dx * dx + dy * dy
            if (d2 < 26000) {
              const f = (1 - Math.sqrt(d2) / 161) * 18
              y -= f
            }
          }
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      }

      // 5 ── light bloom where the illumination falls
      const bloom = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 320)
      bloom.addColorStop(0, `rgba(${G},0.05)`)
      bloom.addColorStop(0.5, `rgba(${G},0.015)`)
      bloom.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bloom
      ctx.fillRect(0, 0, W, H)

      // 6 ── the summit star: a single fixed point of light at the massif peak
      //      (Kopecky's descent point) with a slow breathing halo
      const peakX = W / 2
      const peakY = baseY - CONTOURS * (H * 0.6 / CONTOURS) - 10
      const breathe = 0.5 + Math.sin(t * 0.6) * 0.5
      const star = ctx.createRadialGradient(peakX, peakY, 0, peakX, peakY, 60 + breathe * 30)
      star.addColorStop(0, `rgba(${A},${0.18 + breathe * 0.12})`)
      star.addColorStop(0.4, `rgba(${G},0.05)`)
      star.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = star
      ctx.fillRect(peakX - 100, peakY - 100, 200, 200)
      ctx.fillStyle = `rgba(${A},${0.5 + breathe * 0.4})`
      ctx.beginPath(); ctx.arc(peakX, peakY, 1.6, 0, Math.PI * 2); ctx.fill()

      // 7 ── cursor halo (a soft reading-light following the cursor)
      if (mx > 0) {
        const halo = ctx.createRadialGradient(mx, my, 0, mx, my, 200)
        halo.addColorStop(0, `rgba(${G},0.04)`)
        halo.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = halo
        ctx.fillRect(0, 0, W, H)
      }

      // 8 ── vignette to seat everything in candle-lit darkness
      const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.92)
      vg.addColorStop(0, 'rgba(0,0,0,0)')
      vg.addColorStop(1, 'rgba(0,0,0,0.62)')
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

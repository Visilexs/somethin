import { useEffect, useRef } from 'react'

const RUNES = ['⸸','✦','✧','☩','⊕','✶','❖','⋆','†','✠']
const GA = (a) => `rgba(168,200,74,${a})`
const AA = (a) => `rgba(200,168,74,${a})`

export default function Background({ mousePos }) {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: null, y: null })
  const rafRef = useRef()

  useEffect(() => {
    if (mousePos) mouseRef.current = mousePos
  }, [mousePos])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const COUNT = Math.min(90, Math.floor(window.innerWidth / 16))
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      size: Math.random() * 2.2 + 0.4,
      opacity: Math.random() * 0.38 + 0.05,
      isRune: Math.random() < 0.13,
      rune: RUNES[Math.floor(Math.random() * RUNES.length)],
      hue: Math.random() < 0.65 ? 'g' : 'a',
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.005 + Math.random() * 0.01,
    }))

    const onMove = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }
    const onLeave = () => { mouseRef.current = { x: null, y: null } }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const W = canvas.width, H = canvas.height
      const mouse = mouseRef.current

      for (const p of particles) {
        p.pulse += p.pulseSpeed
        const pulseFactor = 0.85 + Math.sin(p.pulse) * 0.15

        if (mouse.x != null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const d2 = dx * dx + dy * dy
          if (d2 < 18000) {
            const d = Math.sqrt(d2)
            const f = (134 - d) / 134 * 0.55
            p.vx += (dx / d) * f
            p.vy += (dy / d) * f
          }
        }

        p.vx *= 0.983
        p.vy *= 0.983
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (spd > 1.6) { p.vx /= spd / 1.6; p.vy /= spd / 1.6 }

        p.x += p.vx
        p.y += p.vy
        if (p.x < -30) p.x = W + 30
        if (p.x > W + 30) p.x = -30
        if (p.y < -30) p.y = H + 30
        if (p.y > H + 30) p.y = -30
      }

      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < 14400) {
            const d = Math.sqrt(d2)
            const a = (1 - d / 120) * 0.13
            const col = particles[i].hue === 'g' ? GA(a) : AA(a * 0.85)
            ctx.strokeStyle = col
            ctx.lineWidth = 0.55
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Particles
      for (const p of particles) {
        const op = p.opacity * (0.85 + Math.sin(p.pulse) * 0.15)
        const col = p.hue === 'g' ? GA(op) : AA(op * 0.9)
        if (p.isRune) {
          ctx.save()
          ctx.font = `${10 + p.size * 4}px serif`
          ctx.fillStyle = col
          ctx.globalAlpha = op * 0.55
          ctx.fillText(p.rune, p.x, p.y)
          ctx.restore()
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
          ctx.fillStyle = col
          ctx.fill()
          // Glow for larger particles
          if (p.size > 1.5) {
            ctx.beginPath()
            ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2)
            ctx.fillStyle = p.hue === 'g' ? GA(op * 0.06) : AA(op * 0.05)
            ctx.fill()
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="bg-layer">
      <div className="aurora">
        <div className="a-blob b1" />
        <div className="a-blob b2" />
        <div className="a-blob b3" />
        <div className="a-blob b4" />
        <div className="a-blob b5" />
      </div>
      <canvas ref={canvasRef} className="particle-canvas" />
      <div className="grain" />
      <div className="vignette" />
    </div>
  )
}

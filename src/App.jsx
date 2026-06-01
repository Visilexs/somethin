import { useState, useEffect, useRef, useCallback } from 'react'
import Background from './Background'
import MainPage from './pages/MainPage'
import LawsPage from './pages/LawsPage'
import { MAIN_SECTIONS } from './data'

function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef = useRef(null)
  const spotRef = useRef(null)
  const posRef = useRef({ x: -200, y: -200 })
  const ringPosRef = useRef({ x: -200, y: -200 })
  const rafRef = useRef()

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX - 2.5 + 'px'
        dotRef.current.style.top  = e.clientY - 2.5 + 'px'
      }
      if (spotRef.current) {
        spotRef.current.style.left = e.clientX + 'px'
        spotRef.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      const target = posRef.current
      const cur = ringPosRef.current
      const ease = 0.12
      ringPosRef.current = {
        x: cur.x + (target.x - cur.x) * ease,
        y: cur.y + (target.y - cur.y) * ease,
      }
      if (ringRef.current) {
        ringRef.current.style.left = ringPosRef.current.x - 18 + 'px'
        ringRef.current.style.top  = ringPosRef.current.y - 18 + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }

    const onHoverIn = (e) => {
      if (e.target.matches('button, a, [role="button"], .pillar, .book-card, .sdot')) {
        ringRef.current?.classList.add('hovering')
      }
    }
    const onHoverOut = () => ringRef.current?.classList.remove('hovering')

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onHoverIn)
    document.addEventListener('mouseout', onHoverOut)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onHoverIn)
      document.removeEventListener('mouseout', onHoverOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot" ref={dotRef} />
      <div className="spotlight" ref={spotRef} />
    </>
  )
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      setPct(((el.scrollTop) / (el.scrollHeight - el.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-bar" style={{ width: pct + '%' }} />
}

function ScrollTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`scroll-top ${show ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      title="Back to top"
    >▲</button>
  )
}

export default function App() {
  const [page, setPage] = useState('main')
  const [transitioning, setTransitioning] = useState(false)
  const [mousePos, setMousePos] = useState({ x: null, y: null })

  const navigateTo = useCallback((target) => {
    if (target === page) return
    setTransitioning(true)
    setTimeout(() => {
      setPage(target)
      window.scrollTo(0, 0)
      setTransitioning(false)
    }, 350)
  }, [page])

  useEffect(() => {
    const onMove = (e) => setMousePos({ x: e.clientX, y: e.clientY })
    const onLeave = () => setMousePos({ x: null, y: null })
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <div className="app">
      <Background mousePos={mousePos} />
      <CustomCursor />
      <ScrollProgress />

      <div className={`page-wrap ${transitioning ? 'out' : 'in'}`}>

        {/* Header */}
        <header>
          <span className="h-sym">⸸</span>
          <div className="h-title">Cirkev Kopeckého</div>
          <div className="h-orn">— ✦ ✦ ✦ —</div>
          <div className="h-sub">
            Church of Kopecky &nbsp;·&nbsp; Ancient Slovakia &nbsp;·&nbsp; He Walked the Tatras &nbsp;·&nbsp;
            He Invented the Chud &nbsp;·&nbsp; He Argued About Chess &nbsp;·&nbsp; He Was Right &nbsp;·&nbsp; Mostly
          </div>
        </header>

        {/* Main Nav */}
        <nav className="main-nav">
          {MAIN_SECTIONS.map(s => (
            <button
              key={s.id}
              className={page === 'main' ? 'active' : ''}
              onClick={() => {
                if (page !== 'main') navigateTo('main')
                else document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {s.label}
            </button>
          ))}
          <button
            className={`laws-btn ${page === 'laws' ? 'active' : ''}`}
            onClick={() => navigateTo('laws')}
          >
            ⚖ Laws of Chudhood
          </button>
        </nav>

        {/* Page Content */}
        {page === 'main'
          ? <MainPage setPage={navigateTo} />
          : <LawsPage setPage={navigateTo} />
        }

      </div>

      <ScrollTop />
    </div>
  )
}

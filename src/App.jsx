import { useState, useEffect, useRef, useCallback } from 'react'
import Background from './Background'
import HomePage       from './pages/HomePage'
import OriginsPage    from './pages/OriginsPage'
import ChudPage       from './pages/ChudPage'
import DisciplesPage  from './pages/DisciplesPage'
import ChroniclesPage from './pages/ChroniclesPage'
import TextsPage      from './pages/TextsPage'
import LawsPage       from './pages/LawsPage'
import PrayerPage     from './pages/PrayerPage'
import { PAGES }      from './data'
import { KopeckySymbol } from './components/Icons'

// ── Custom cursor ──────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const rPos    = useRef({ x: -200, y: -200 })
  const raf     = useRef()
  const isHover = useRef(false)

  useEffect(() => {
    const INTERACTABLE = 'button,a,[role="button"],.pillar,.book-card,.disciple-card,.sdot,.miracle-card,.correct-card,.law-hdr'

    const onMove = ({ clientX: x, clientY: y }) => {
      pos.current = { x, y }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 2.5}px,${y - 2.5}px)`
      }
    }
    const onOver = e => {
      const h = !!e.target.closest(INTERACTABLE)
      if (h !== isHover.current) {
        isHover.current = h
        ringRef.current?.classList.toggle('hovering', h)
      }
    }
    const tick = () => {
      const t = pos.current, c = rPos.current
      rPos.current = { x: c.x + (t.x - c.x) * 0.13, y: c.y + (t.y - c.y) * 0.13 }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rPos.current.x - 18}px,${rPos.current.y - 18}px)`
      }
      raf.current = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver, { passive: true })
    raf.current = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ringRef} />
      <div className="cursor-dot"  ref={dotRef}  />
    </>
  )
}

// ── Scroll progress bar ────────────────────────────────────────────────────
function ScrollProgress({ pct }) {
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />
}

// ── Back-to-top ────────────────────────────────────────────────────────────
function ScrollTop({ show }) {
  return (
    <button
      className={`scroll-top ${show ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >▲</button>
  )
}

const PAGE_MAP = {
  home: HomePage, origins: OriginsPage, chud: ChudPage,
  disciples: DisciplesPage, chronicles: ChroniclesPage,
  texts: TextsPage, laws: LawsPage, prayer: PrayerPage,
}

export default function App() {
  const [page,    setPage]    = useState('home')
  const [trans,   setTrans]   = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const scrollTicking = useRef(false)

  // Passive, throttled scroll handler
  useEffect(() => {
    const onScroll = () => {
      if (scrollTicking.current) return
      scrollTicking.current = true
      requestAnimationFrame(() => {
        const y   = window.scrollY
        const el  = document.documentElement
        const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100 || 0
        setScrollY(y)
        setScrollPct(pct)
        setShowTop(y > 500)
        scrollTicking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigateTo = useCallback((target) => {
    if (target === page) return
    // View Transitions API for smooth page changes
    const go = () => {
      setPage(target)
      window.scrollTo(0, 0)
      setScrollY(0)
    }
    if (document.startViewTransition) {
      setTrans(true)
      document.startViewTransition(() => {
        go()
        setTrans(false)
      })
    } else {
      setTrans(true)
      setTimeout(() => { go(); setTrans(false) }, 320)
    }
  }, [page])

  const PageComponent = PAGE_MAP[page] || HomePage

  return (
    <div className="app">
      <Background scrollY={scrollY} />
      <CustomCursor />
      <ScrollProgress pct={scrollPct} />

      <div className={`page-wrap ${trans ? 'out' : 'in'}`}>
        <header>
          <div
            className="h-sym-wrap"
            onClick={() => navigateTo('home')}
            style={{ cursor: 'none', display: 'inline-block', marginBottom: 18 }}
          >
            <KopeckySymbol size={68} glow />
          </div>
          <div
            className="h-title"
            onClick={() => navigateTo('home')}
            style={{ cursor: 'none' }}
          >
            Cirkev Kopeckého
          </div>
          <div className="h-orn">— ✦ ✦ ✦ —</div>
          <div className="h-sub">
            Church of Kopecky · Ancient Slovakia · He Walked the Tatras ·
            He Invented the Chud · He Argued About Chess · He Was Right · Mostly
          </div>
        </header>

        <nav className="main-nav" role="navigation" aria-label="Main navigation">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`${p.id === 'laws' ? 'laws-btn' : ''} ${page === p.id ? 'active' : ''}`}
              onClick={() => navigateTo(p.id)}
              aria-current={page === p.id ? 'page' : undefined}
            >
              {p.id === 'laws' ? '⚖ ' : ''}{p.label}
            </button>
          ))}
        </nav>

        <main>
          <PageComponent setPage={navigateTo} />
        </main>
      </div>

      <ScrollTop show={showTop} />
    </div>
  )
}

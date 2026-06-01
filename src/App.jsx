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
import GamePage       from './pages/GamePage'
import MusicPlayer    from './MusicPlayer'
import { PAGES }      from './data'
import { KopeckySymbol } from './components/Icons'

// ── Transition state machine ────────────────────────────────────────────────
// phase: 'idle' → 'exit' → 'reveal' → 'enter' → 'idle'
const EXIT_MS   = 320   // page slides out
const REVEAL_MS = 180   // overlay holds at full opacity
const ENTER_MS  = 400   // page slides in

// ── Transition overlay ──────────────────────────────────────────────────────
function TransitionOverlay({ phase }) {
  // phase drives CSS classes
  const cls = phase === 'exit'   ? 'tov tov-in'
            : phase === 'reveal' ? 'tov tov-hold'
            : phase === 'enter'  ? 'tov tov-out'
            : 'tov'
  return (
    <div className={cls} aria-hidden="true">
      {/* Glowing sweep line */}
      <div className="tov-line" />
      {/* Centre symbol flash */}
      {(phase === 'reveal') && (
        <div className="tov-symbol">
          <KopeckySymbol size={52} glow />
        </div>
      )}
    </div>
  )
}

// ── Custom cursor ───────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const rPos    = useRef({ x: -200, y: -200 })
  const raf     = useRef()

  useEffect(() => {
    const TARGETS = 'button,a,[role="button"],.pillar,.book-card,.disciple-card,.sdot,.miracle-card,.correct-card,.law-hdr'
    const onMove = ({ clientX: x, clientY: y }) => {
      pos.current = { x, y }
      // Use left/top directly — transform on any parent breaks position:fixed transform offsets
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`
        dotRef.current.style.top  = `${y}px`
      }
    }
    const onOver = e => ringRef.current?.classList.toggle('hovering', !!e.target.closest(TARGETS))
    const tick = () => {
      const t = pos.current, c = rPos.current
      rPos.current = { x: c.x + (t.x - c.x) * 0.13, y: c.y + (t.y - c.y) * 0.13 }
      if (ringRef.current) {
        ringRef.current.style.left = `${rPos.current.x}px`
        ringRef.current.style.top  = `${rPos.current.y}px`
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

// ── Scroll progress ─────────────────────────────────────────────────────────
function ScrollProgress({ pct }) {
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />
}

// ── Back-to-top ─────────────────────────────────────────────────────────────
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
  game: GamePage,
}

export default function App() {
  // Transition state: { current, next, phase }
  const [state, setState] = useState({ current: 'home', next: null, phase: 'idle' })
  const [scrollY,   setScrollY]   = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop,   setShowTop]   = useState(false)
  const ticking  = useRef(false)
  const pending  = useRef(null)   // queued navigation during active transition

  // Throttled scroll
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => {
        const y  = window.scrollY
        const el = document.documentElement
        setScrollY(y)
        setScrollPct(el.scrollTop / (el.scrollHeight - el.clientHeight) * 100 || 0)
        setShowTop(y > 500)
        ticking.current = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navigateTo = useCallback((target) => {
    setState(prev => {
      if (target === prev.current) return prev
      // If already transitioning, queue the destination
      if (prev.phase !== 'idle') { pending.current = target; return prev }
      return { ...prev, next: target, phase: 'exit' }
    })
  }, [])

  // Drive the transition state machine
  useEffect(() => {
    if (state.phase === 'idle') {
      // Check if a navigation was queued during the last transition
      if (pending.current) {
        const target = pending.current
        pending.current = null
        setTimeout(() => navigateTo(target), 0)
      }
      return
    }

    if (state.phase === 'exit') {
      const t = setTimeout(() => {
        window.scrollTo(0, 0)
        setState(prev => ({ current: prev.next, next: null, phase: 'reveal' }))
      }, EXIT_MS)
      return () => clearTimeout(t)
    }

    if (state.phase === 'reveal') {
      const t = setTimeout(() => {
        setState(prev => ({ ...prev, phase: 'enter' }))
      }, REVEAL_MS)
      return () => clearTimeout(t)
    }

    if (state.phase === 'enter') {
      const t = setTimeout(() => {
        setState(prev => ({ ...prev, phase: 'idle' }))
      }, ENTER_MS)
      return () => clearTimeout(t)
    }
  }, [state.phase])

  const PageComponent = PAGE_MAP[state.current] || HomePage

  // Map phase to page CSS class
  const pageClass = state.phase === 'exit'   ? 'page-exiting'
                  : state.phase === 'reveal' ? 'page-hidden'
                  : state.phase === 'enter'  ? 'page-entering'
                  : 'page-idle'

  return (
    <div className="app">
      <Background scrollY={scrollY} />
      <CustomCursor />
      <ScrollProgress pct={scrollPct} />
      <TransitionOverlay phase={state.phase} />

      <div className={`page-wrap ${pageClass}`}>
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
              className={`${p.id === 'laws' ? 'laws-btn' : ''} ${p.id === 'game' ? 'game-btn' : ''} ${state.current === p.id ? 'active' : ''}`}
              onClick={() => navigateTo(p.id)}
              aria-current={state.current === p.id ? 'page' : undefined}
            >
              {p.id === 'laws' ? '⚖ ' : p.id === 'game' ? '♟ ' : ''}{p.label}
            </button>
          ))}
        </nav>

        <main>
          <PageComponent setPage={navigateTo} />
        </main>
      </div>

      <ScrollTop show={showTop} />
      <MusicPlayer />
    </div>
  )
}

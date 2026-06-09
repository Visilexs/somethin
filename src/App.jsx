import {
  useState, useEffect, useRef, useCallback,
  lazy, Suspense, useTransition, useDeferredValue,
} from 'react'
import Background from './Background'
import Lenis from 'lenis'
import { motion } from 'motion/react'
import { PAGES } from './data'
import { KopeckySymbol } from './components/Icons'
import MusicPlayer from './MusicPlayer'
import Achievements from './components/Achievements'
import Notifications from './components/Notifications'
import { useApp } from './AppContext'

// ── Code-split every page with React.lazy ────────────────────────────────────
const HomePage       = lazy(() => import('./pages/HomePage'))
const OriginsPage    = lazy(() => import('./pages/OriginsPage'))
const ChudPage       = lazy(() => import('./pages/ChudPage'))
const DisciplesPage  = lazy(() => import('./pages/DisciplesPage'))
const ChroniclesPage = lazy(() => import('./pages/ChroniclesPage'))
const TextsPage      = lazy(() => import('./pages/TextsPage'))
const LawsPage       = lazy(() => import('./pages/LawsPage'))
const PrayerPage     = lazy(() => import('./pages/PrayerPage'))
const GamePage       = lazy(() => import('./pages/GamePage'))

const PAGE_MAP = {
  home: HomePage, origins: OriginsPage, chud: ChudPage,
  disciples: DisciplesPage, chronicles: ChroniclesPage,
  texts: TextsPage, laws: LawsPage, prayer: PrayerPage, game: GamePage,
}

// Map for prefetching — calling the import warms the chunk cache
const PAGE_IMPORT = {
  home: () => import('./pages/HomePage'),
  origins: () => import('./pages/OriginsPage'),
  chud: () => import('./pages/ChudPage'),
  disciples: () => import('./pages/DisciplesPage'),
  chronicles: () => import('./pages/ChroniclesPage'),
  texts: () => import('./pages/TextsPage'),
  laws: () => import('./pages/LawsPage'),
  prayer: () => import('./pages/PrayerPage'),
  game: () => import('./pages/GamePage'),
}

// ── Suspense fallback ─────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18 }}>
      <div style={{ animation: 'sym-pulse 1.6s ease-in-out infinite' }}>
        <KopeckySymbol size={44} glow />
      </div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(168,200,74,.4)' }}>
        Consulting the Scripture…
      </div>
    </div>
  )
}

// ── Custom cursor ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const pos     = useRef({ x: -200, y: -200 })
  const rPos    = useRef({ x: -200, y: -200 })
  const raf     = useRef()

  useEffect(() => {
    const TARGETS = 'button,a,[role="button"],.pillar,.book-card,.disciple-card,.sdot,.miracle-card,.correct-card,.law-hdr,.nb'
    const onMove = ({ clientX: x, clientY: y }) => {
      pos.current = { x, y }
      if (dotRef.current) { dotRef.current.style.left = `${x}px`; dotRef.current.style.top = `${y}px` }
    }
    const onOver = e => ringRef.current?.classList.toggle('hovering', !!e.target.closest(TARGETS))
    const tick = () => {
      const t = pos.current, c = rPos.current
      rPos.current = { x: c.x + (t.x - c.x) * 0.13, y: c.y + (t.y - c.y) * 0.13 }
      if (ringRef.current) { ringRef.current.style.left = `${rPos.current.x}px`; ringRef.current.style.top = `${rPos.current.y}px` }
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

function ScrollProgress({ pct }) {
  return <div className="scroll-bar" style={{ width: `${pct}%` }} />
}

// ── Transition overlay — backdrop + sweeping line + centre symbol flash ──────
function TransitionOverlay({ phase }) {
  if (!phase) return null
  return (
    <div className={`tov tov-${phase}`} aria-hidden="true">
      <div className="tov-line" />
      {phase === 'hold' && (
        <div className="tov-symbol">
          <KopeckySymbol size={64} glow />
        </div>
      )}
    </div>
  )
}

function ScrollTop({ show }) {
  return (
    <button
      className={`scroll-top ${show ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >▲</button>
  )
}

export default function App() {
  const { state, actions } = useApp()
  const [page,    setPage]    = useState('home')
  const [tovPhase, setTovPhase] = useState('')   // '' | 'in' | 'hold' | 'out' — transition overlay
  const [scrollY, setScrollY] = useState(0)
  const [scrollPct, setScrollPct] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [isPending, startTransition] = useTransition()
  const ticking = useRef(false)
  const pending = useRef(null)
  const lenisRef = useRef(null)

  // ── Lenis smooth scroll (momentum) ──────────────────────────────
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (window.matchMedia('(pointer: coarse)').matches) return  // native momentum on touch

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      autoRaf: false,
    })
    lenisRef.current = lenis

    let rafId
    const raf = (time) => { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)

    return () => { cancelAnimationFrame(rafId); lenis.destroy(); lenisRef.current = null }
  }, [])

  // Throttled scroll + reading progress tracking
  useEffect(() => {
    const update = () => {
      const y  = window.scrollY
      const el = document.documentElement
      const pct = el.scrollTop / (el.scrollHeight - el.clientHeight) * 100 || 0
      setScrollY(y); setScrollPct(pct); setShowTop(y > 500)
      if (pct > 5) actions.setProgress(page, Math.round(pct))
    }
    const onScroll = () => {
      if (ticking.current) return
      ticking.current = true
      requestAnimationFrame(() => { update(); ticking.current = false })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    // Lenis emits its own scroll signal too
    lenisRef.current?.on?.('scroll', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      lenisRef.current?.off?.('scroll', onScroll)
    }
  }, [page, actions])

  const navTimers = useRef([])
  const navigateTo = useCallback((target) => {
    if (target === page) return

    // Clear any in-flight transition timers
    navTimers.current.forEach(clearTimeout)
    navTimers.current = []

    // Phase 1 — overlay sweeps in (backdrop + glowing line wipe across)
    setTovPhase('in')

    // Phase 2 — at the peak of the sweep, swap the page + flash the symbol/ring
    navTimers.current.push(setTimeout(() => {
      startTransition(() => {
        setPage(target)
        actions.visitPage(target)
      })
      window.scrollTo(0, 0)
      lenisRef.current?.scrollTo(0, { immediate: true })
      setScrollY(0)
      setTovPhase('hold')
    }, 300))

    // Phase 3 — overlay fades back out, revealing the new page
    navTimers.current.push(setTimeout(() => setTovPhase('out'), 480))

    // Reset to idle once the fade-out finishes
    navTimers.current.push(setTimeout(() => setTovPhase(''), 920))
  }, [page, actions])

  useEffect(() => () => navTimers.current.forEach(clearTimeout), [])

  // ── Keyboard chapter navigation — ← / → walk the scripture in order ────────
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      if (e.altKey || e.metaKey || e.ctrlKey) return
      const t = e.target
      if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable) return
      const idx = PAGES.findIndex(p => p.id === page)
      const next = PAGES[idx + (e.key === 'ArrowRight' ? 1 : -1)]
      if (next) navigateTo(next.id)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [page, navigateTo])

  // Prefetch a page chunk on nav hover
  const prefetch = useCallback((id) => {
    PAGE_IMPORT[id]?.()
  }, [])

  const PageComponent = PAGE_MAP[page] || HomePage

  return (
    <div className="app">
      <Background scrollY={scrollY} />
      <CustomCursor />
      <ScrollProgress pct={scrollPct} />
      <Notifications />

      <div className="page-wrap">
        <header>
          <div
            className="h-sym-wrap"
            onClick={() => { actions.clickSymbol(); if (page !== 'home') navigateTo('home') }}
            style={{ cursor: 'none', display: 'inline-block', marginBottom: 18 }}
          >
            <KopeckySymbol size={68} glow />
          </div>
          <div className="h-title" onClick={() => navigateTo('home')} style={{ cursor: 'none' }}>
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
              className={`nb ${p.id === 'laws' ? 'laws-btn' : ''} ${p.id === 'game' ? 'game-btn' : ''} ${page === p.id ? 'active' : ''}`}
              onClick={() => navigateTo(p.id)}
              onMouseEnter={() => prefetch(p.id)}
              aria-current={page === p.id ? 'page' : undefined}
            >
              {p.id === 'laws' ? '⚖ ' : p.id === 'game' ? '♟ ' : ''}{p.label}
              {state.visitedPages.includes(p.id) && p.id !== 'home' && (
                <span style={{ marginLeft: 5, fontSize: 7, color: 'rgba(168,200,74,.4)', verticalAlign: 'super' }}>✓</span>
              )}
            </button>
          ))}
        </nav>

        {!window.matchMedia('(pointer: coarse)').matches && (
          <div style={{ textAlign: 'center', marginTop: 10, fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(168,200,74,.22)' }}>
            ← → Walk the chapters in order · The Chud does not rush
          </div>
        )}

        <main>
          <motion.div
            key={page}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut', delay: 0.15 }}
            style={{ opacity: isPending ? 0.7 : undefined }}
          >
            <Suspense fallback={<PageLoader />}>
              <PageComponent setPage={navigateTo} />
            </Suspense>
          </motion.div>
        </main>
      </div>

      <TransitionOverlay phase={tovPhase} />
      <ScrollTop show={showTop} />
      <MusicPlayer />
      <Achievements />
    </div>
  )
}

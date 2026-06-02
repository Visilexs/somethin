import {
  useState, useEffect, useRef, useCallback,
  lazy, Suspense, useTransition, useDeferredValue,
} from 'react'
import Background from './Background'
import Lenis from 'lenis'
import { PAGES } from './data'
import { KopeckySymbol } from './components/Icons'
import { MagnetButton } from './components/ReactBits'
import MusicPlayer from './MusicPlayer'
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
  const [trans,   setTrans]   = useState(false)
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

  const navigateTo = useCallback((target) => {
    if (target === page && trans === false) return
    setTrans(true)
    actions.setPhase('exit')
    setTimeout(() => {
      // useTransition keeps UI responsive while the lazy chunk resolves
      startTransition(() => {
        setPage(target)
        actions.visitPage(target)
      })
      window.scrollTo(0, 0)
      lenisRef.current?.scrollTo(0, { immediate: true })
      setScrollY(0)
      actions.setPhase('enter')
      setTimeout(() => { setTrans(false); actions.setPhase('idle') }, 360)
    }, 280)
  }, [page, trans, actions])

  // Prefetch a page chunk on nav hover
  const prefetch = useCallback((id) => {
    PAGE_IMPORT[id]?.()
  }, [])

  const PageComponent = PAGE_MAP[page] || HomePage
  const pageClass = trans ? 'page-exiting' : 'page-entering'

  return (
    <div className="app">
      <Background scrollY={scrollY} />
      <CustomCursor />
      <ScrollProgress pct={scrollPct} />
      <Notifications />

      <div className={`page-wrap ${pageClass}`} style={{ opacity: isPending ? 0.6 : undefined, transition: isPending ? 'opacity .2s' : undefined }}>
        <header>
          <div
            className="h-sym-wrap"
            onClick={() => { navigateTo('home'); actions.clickSatchel() }}
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
            <MagnetButton
              key={p.id}
              className={`nb ${p.id === 'laws' ? 'laws-btn' : ''} ${p.id === 'game' ? 'game-btn' : ''} ${page === p.id ? 'active' : ''}`}
              onClick={() => navigateTo(p.id)}
              onMouseEnter={() => prefetch(p.id)}
              aria-current={page === p.id ? 'page' : undefined}
              strength={0.22}
            >
              {p.id === 'laws' ? '⚖ ' : p.id === 'game' ? '♟ ' : ''}{p.label}
              {state.visitedPages.includes(p.id) && p.id !== 'home' && (
                <span style={{ marginLeft: 5, fontSize: 7, color: 'rgba(168,200,74,.4)', verticalAlign: 'super' }}>✓</span>
              )}
            </MagnetButton>
          ))}
        </nav>

        <main>
          <Suspense fallback={<PageLoader />}>
            <PageComponent setPage={navigateTo} />
          </Suspense>
        </main>
      </div>

      <ScrollTop show={showTop} />
      <MusicPlayer />
    </div>
  )
}

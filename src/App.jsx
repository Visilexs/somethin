import { useState, useEffect, useRef, useCallback } from 'react'
import Background from './Background'
import HomePage      from './pages/HomePage'
import OriginsPage   from './pages/OriginsPage'
import ChudPage      from './pages/ChudPage'
import DisciplesPage from './pages/DisciplesPage'
import ChroniclesPage from './pages/ChroniclesPage'
import TextsPage     from './pages/TextsPage'
import LawsPage      from './pages/LawsPage'
import PrayerPage    from './pages/PrayerPage'
import { PAGES } from './data'

function CustomCursor() {
  const ringRef = useRef(null)
  const dotRef  = useRef(null)
  const spotRef = useRef(null)
  const pos     = useRef({ x:-200, y:-200 })
  const rPos    = useRef({ x:-200, y:-200 })
  const raf     = useRef()

  useEffect(() => {
    const onMove = e => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) { dotRef.current.style.left = e.clientX-2.5+'px'; dotRef.current.style.top = e.clientY-2.5+'px' }
      if (spotRef.current) { spotRef.current.style.left = e.clientX+'px'; spotRef.current.style.top = e.clientY+'px' }
    }
    const onOver = e => { if (e.target.matches('button,a,[role="button"],.pillar,.book-card,.sdot,.miracle-card,.correct-card')) ringRef.current?.classList.add('hovering') }
    const onOut  = () => ringRef.current?.classList.remove('hovering')
    const tick   = () => {
      const t = pos.current, c = rPos.current, ease = 0.12
      rPos.current = { x: c.x+(t.x-c.x)*ease, y: c.y+(t.y-c.y)*ease }
      if (ringRef.current) { ringRef.current.style.left = rPos.current.x-18+'px'; ringRef.current.style.top = rPos.current.y-18+'px' }
      raf.current = requestAnimationFrame(tick)
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf.current = requestAnimationFrame(tick)
    return () => { window.removeEventListener('mousemove',onMove); document.removeEventListener('mouseover',onOver); document.removeEventListener('mouseout',onOut); cancelAnimationFrame(raf.current) }
  }, [])

  return (
    <>
      <div className="cursor-ring" ref={ringRef}/>
      <div className="cursor-dot"  ref={dotRef}/>
      <div className="spotlight"   ref={spotRef}/>
    </>
  )
}

function ScrollProgress() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => { const el=document.documentElement; setPct(el.scrollTop/(el.scrollHeight-el.clientHeight)*100) }
    window.addEventListener('scroll',fn,{passive:true})
    return ()=>window.removeEventListener('scroll',fn)
  },[])
  return <div className="scroll-bar" style={{width:pct+'%'}}/>
}

function ScrollTop() {
  const [show,setShow]=useState(false)
  useEffect(()=>{const fn=()=>setShow(window.scrollY>500);window.addEventListener('scroll',fn,{passive:true});return()=>window.removeEventListener('scroll',fn)},[])
  return <button className={`scroll-top ${show?'visible':''}`} onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} title="Back to top">▲</button>
}

const PAGE_MAP = {
  home:       HomePage,
  origins:    OriginsPage,
  chud:       ChudPage,
  disciples:  DisciplesPage,
  chronicles: ChroniclesPage,
  texts:      TextsPage,
  laws:       LawsPage,
  prayer:     PrayerPage,
}

export default function App() {
  const [page, setPage]   = useState('home')
  const [trans, setTrans] = useState(false)
  const [mouse, setMouse] = useState({x:null,y:null})

  const navigateTo = useCallback(target => {
    if (target === page) return
    setTrans(true)
    setTimeout(()=>{ setPage(target); window.scrollTo(0,0); setTrans(false) }, 340)
  }, [page])

  useEffect(()=>{
    const mv=e=>setMouse({x:e.clientX,y:e.clientY})
    const ml=()=>setMouse({x:null,y:null})
    window.addEventListener('mousemove',mv,{passive:true})
    window.addEventListener('mouseleave',ml)
    return()=>{window.removeEventListener('mousemove',mv);window.removeEventListener('mouseleave',ml)}
  },[])

  const PageComponent = PAGE_MAP[page] || HomePage

  return (
    <div className="app">
      <Background mousePos={mouse}/>
      <CustomCursor/>
      <ScrollProgress/>

      <div className={`page-wrap ${trans?'out':'in'}`}>
        {/* HEADER */}
        <header>
          <span className="h-sym" onClick={()=>navigateTo('home')} style={{cursor:'none'}}>⸸</span>
          <div className="h-title" onClick={()=>navigateTo('home')} style={{cursor:'none'}}>Cirkev Kopeckého</div>
          <div className="h-orn">— ✦ ✦ ✦ —</div>
          <div className="h-sub">
            Church of Kopecky · Ancient Slovakia · He Walked the Tatras · He Invented the Chud ·
            He Argued About Chess · He Was Right · Mostly
          </div>
        </header>

        {/* NAV */}
        <nav className="main-nav">
          {PAGES.map(p => (
            <button
              key={p.id}
              className={`${p.id==='laws'?'laws-btn':''} ${page===p.id?'active':''}`}
              onClick={()=>navigateTo(p.id)}
            >{p.id==='laws'?'⚖ ':''}{p.label}</button>
          ))}
        </nav>

        <PageComponent setPage={navigateTo}/>
      </div>

      <ScrollTop/>
    </div>
  )
}

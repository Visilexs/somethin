import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useApp, ACHIEVEMENTS } from '../AppContext'
import { KopeckySymbol } from './Icons'

// ════════════════════════════════════════════════════════════════════════════
// Achievements panel + Kopecky chatbot, opened from a fixed sigil button.
// ════════════════════════════════════════════════════════════════════════════

export default function Achievements() {
  const { state, actions } = useApp()
  const [open, setOpen] = useState(false)
  const [tab, setTab]   = useState('marks')   // 'marks' | 'audience'

  const earned = state.achievements.length
  const total  = ACHIEVEMENTS.length
  const hasAudience = state.achievements.includes('audience')

  return (
    <>
      {/* Floating sigil button (bottom-left) */}
      <button
        onClick={() => setOpen(o => !o)}
        title="Marks of Devotion"
        style={{
          position: 'fixed', bottom: 26, left: 26, zIndex: 420,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(6,8,5,.82)', border: '1px solid rgba(168,200,74,.3)',
          color: 'rgba(168,200,74,.85)', cursor: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
        }}
      >
        <span style={{ fontSize: 17, lineHeight: 1 }}>✦</span>
        {earned > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            minWidth: 16, height: 16, padding: '0 4px', borderRadius: 8,
            background: 'rgba(200,168,74,.9)', color: '#060805',
            fontSize: 9, fontWeight: 700, fontFamily: "'Cinzel',serif",
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{earned}</span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(4,5,3,.78)', zIndex: 600, backdropFilter: 'blur(3px)', WebkitBackdropFilter: 'blur(3px)' }}
            />
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 601,
                width: 'min(460px, 92vw)', background: 'rgba(6,8,5,.97)',
                borderRight: '1px solid rgba(168,200,74,.22)',
                boxShadow: '0 0 80px rgba(0,0,0,.6)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Header */}
              <div style={{ padding: '26px 28px 18px', borderBottom: '1px solid rgba(168,200,74,.14)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <KopeckySymbol size={28} glow={false} />
                    <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 17, color: 'var(--g)', letterSpacing: '.05em' }}>
                      Marks of Devotion
                    </div>
                  </div>
                  <button onClick={() => setOpen(false)} style={closeBtn}>✕</button>
                </div>
                {/* Tabs */}
                <div style={{ display: 'flex', gap: 8, marginTop: 18 }}>
                  <TabBtn active={tab === 'marks'} onClick={() => setTab('marks')}>
                    Achievements · {earned}/{total}
                  </TabBtn>
                  <TabBtn active={tab === 'audience'} onClick={() => setTab('audience')} locked={!hasAudience}>
                    {hasAudience ? '✦ Audience' : '🔒 Audience'}
                  </TabBtn>
                </div>
              </div>

              {/* Body */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 28px' }}>
                {tab === 'marks'
                  ? <MarksList achievements={state.achievements} />
                  : hasAudience
                    ? <KopeckyChat onFirstReply={() => actions.setFlag('spokeToKopecky')} />
                    : <LockedAudience earned={earned} />}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

const closeBtn = {
  width: 30, height: 30, borderRadius: '50%', background: 'none',
  border: '1px solid rgba(168,200,74,.2)', color: 'rgba(168,200,74,.6)',
  cursor: 'none', fontSize: 12,
}

function TabBtn({ children, active, onClick, locked }) {
  return (
    <button onClick={onClick} style={{
      flex: 1, padding: '9px 10px', cursor: 'none',
      fontFamily: "'Cinzel',serif", fontSize: 9.5, letterSpacing: '.12em', textTransform: 'uppercase',
      background: active ? 'rgba(168,200,74,.1)' : 'transparent',
      border: `1px solid ${active ? 'rgba(168,200,74,.35)' : 'rgba(168,200,74,.14)'}`,
      color: active ? 'var(--g)' : locked ? 'rgba(168,200,74,.4)' : 'rgba(168,200,74,.62)',
      transition: 'all .2s',
    }}>{children}</button>
  )
}

// ── Achievement list ─────────────────────────────────────────────────────────
function MarksList({ achievements }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 13, fontStyle: 'italic', color: 'rgba(213,206,171,.5)', lineHeight: 1.7, marginBottom: 6 }}>
        Kopecky keeps accurate records of those who walk the Chud. These are yours.
      </p>
      {ACHIEVEMENTS.map((a, i) => {
        const unlocked = achievements.includes(a.id)
        const hidden = a.secret && !unlocked
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03, duration: 0.4 }}
            style={{
              display: 'flex', gap: 14, alignItems: 'center',
              padding: '14px 16px',
              background: unlocked ? 'rgba(168,200,74,.06)' : 'rgba(168,200,74,.015)',
              border: `1px solid ${unlocked ? 'rgba(168,200,74,.28)' : 'rgba(168,200,74,.08)'}`,
              borderLeft: `2px solid ${unlocked ? 'var(--g)' : 'rgba(168,200,74,.12)'}`,
            }}
          >
            <div style={{
              width: 34, height: 34, flexShrink: 0, borderRadius: '50%',
              border: `1px solid ${unlocked ? 'rgba(168,200,74,.5)' : 'rgba(168,200,74,.15)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: unlocked ? 'var(--am)' : 'rgba(168,200,74,.25)', fontSize: 14,
              background: unlocked ? 'rgba(200,168,74,.08)' : 'transparent',
            }}>
              {unlocked ? '✦' : hidden ? '?' : '○'}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 12, letterSpacing: '.06em', color: unlocked ? 'var(--g)' : 'rgba(168,200,74,.4)', textTransform: 'uppercase', marginBottom: 3 }}>
                {hidden ? '???' : a.name}
              </div>
              <div style={{ fontFamily: "'EB Garamond',serif", fontSize: 13, fontStyle: 'italic', color: unlocked ? 'rgba(213,206,171,.7)' : 'rgba(213,206,171,.38)', lineHeight: 1.5 }}>
                {hidden ? 'A mark not yet revealed. Keep walking the Chud.' : a.hint}
              </div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Locked audience screen ────────────────────────────────────────────────────
function LockedAudience({ earned }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 12px' }}>
      <div style={{ opacity: 0.3, marginBottom: 20 }}><KopeckySymbol size={44} glow={false} /></div>
      <div style={{ fontFamily: "'Cinzel Decorative',serif", fontSize: 18, color: 'rgba(168,200,74,.6)', marginBottom: 14 }}>
        The Vestibule Is Barred
      </div>
      <p style={{ fontFamily: "'EB Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(213,206,171,.6)', lineHeight: 1.8, maxWidth: 320, margin: '0 auto 22px' }}>
        Kopecky does not grant audiences to the unproven. Earn five marks of devotion and the way will open.
      </p>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--am)' }}>
        {earned} / 5 marks earned
      </div>
      <div style={{ height: 4, background: 'rgba(168,200,74,.1)', margin: '12px auto 0', maxWidth: 220, borderRadius: 2 }}>
        <div style={{ height: '100%', width: `${Math.min(100, (earned / 5) * 100)}%`, background: 'linear-gradient(90deg, var(--g), var(--am))', borderRadius: 2, transition: 'width .5s' }} />
      </div>
    </div>
  )
}

// ── Kopecky chatbot ────────────────────────────────────────────────────────────
const GREETING = 'You have proven yourself sufficiently. You may speak. I will correct you as needed.'

function KopeckyChat({ onFirstReply }) {
  const [messages, setMessages] = useState([{ role: 'assistant', content: GREETING }])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, loading])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    const next = [...messages, { role: 'user', content: text }]
    setMessages(next)
    setInput('')
    setLoading(true)
    try {
      const resp = await fetch('/api/kopecky', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        // send only role/content history (skip the static greeting)
        body: JSON.stringify({ messages: next.filter((m, i) => !(i === 0 && m.role === 'assistant')) }),
      })
      const data = await resp.json()
      const reply = data.reply || data.error || 'Kopecky says nothing. This too is an answer.'
      setMessages(m => [...m, { role: 'assistant', content: reply }])
      onFirstReply?.()
    } catch {
      setMessages(m => [...m, { role: 'assistant', content: 'The fog obscures the high pass. Your words did not reach me. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 380 }}>
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12, paddingBottom: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            {m.role === 'assistant' && (
              <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--am)', marginBottom: 4 }}>Kopecky</div>
            )}
            <div style={{
              padding: '11px 14px',
              fontFamily: "'EB Garamond',serif", fontSize: 15, lineHeight: 1.65,
              background: m.role === 'user' ? 'rgba(168,200,74,.08)' : 'rgba(200,168,74,.06)',
              border: `1px solid ${m.role === 'user' ? 'rgba(168,200,74,.18)' : 'rgba(200,168,74,.2)'}`,
              color: m.role === 'user' ? 'rgba(213,206,171,.85)' : 'rgba(213,206,171,.92)',
              fontStyle: m.role === 'assistant' ? 'italic' : 'normal',
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8.5, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--am)', marginBottom: 4 }}>Kopecky</div>
            <div style={{ padding: '11px 14px', fontFamily: "'EB Garamond',serif", fontSize: 15, fontStyle: 'italic', color: 'rgba(213,206,171,.5)', border: '1px solid rgba(200,168,74,.12)' }}>
              Kopecky is considering<DotDotDot />
            </div>
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, paddingTop: 12, borderTop: '1px solid rgba(168,200,74,.12)' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder="Address Kopecky..."
          disabled={loading}
          style={{
            flex: 1, padding: '11px 14px', background: 'rgba(168,200,74,.04)',
            border: '1px solid rgba(168,200,74,.22)', color: '#d5ceab',
            fontFamily: "'EB Garamond',serif", fontSize: 15, outline: 'none', cursor: 'none',
          }}
        />
        <button onClick={send} disabled={loading || !input.trim()} style={{
          padding: '0 18px', cursor: 'none',
          fontFamily: "'Cinzel',serif", fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase',
          background: 'rgba(168,200,74,.1)', border: '1px solid rgba(168,200,74,.3)',
          color: 'var(--g)', opacity: loading || !input.trim() ? 0.4 : 1,
        }}>Speak</button>
      </div>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: 8, letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(168,200,74,.25)', textAlign: 'center', marginTop: 8 }}>
        He answers as he sees fit · He is right 97.3% of the time
      </div>
    </div>
  )
}

function DotDotDot() {
  const [n, setN] = useState(1)
  useEffect(() => { const t = setInterval(() => setN(x => (x % 3) + 1), 450); return () => clearInterval(t) }, [])
  return <span>{'.'.repeat(n)}</span>
}

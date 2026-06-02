import { useEffect } from 'react'
import { useApp } from '../AppContext'
import { KopeckySymbol } from './Icons'

function Toast({ n, onDismiss }) {
  useEffect(() => {
    const t = setTimeout(onDismiss, n.kind === 'achievement' ? 6500 : 4000)
    return () => clearTimeout(t)
  }, [])

  const isAch = n.kind === 'achievement'
  return (
    <div
      onClick={onDismiss}
      style={{
        background: 'rgba(6,8,5,.95)',
        border: `1px solid ${isAch ? 'rgba(200,168,74,.4)' : 'rgba(168,200,74,.28)'}`,
        borderLeft: `3px solid ${isAch ? 'var(--am)' : 'var(--g)'}`,
        padding: '14px 18px', maxWidth: 320, cursor: 'none',
        boxShadow: '0 12px 40px rgba(0,0,0,.5)',
        animation: 'toast-in .45s cubic-bezier(.22,1,.36,1) both',
        position: 'relative', overflow: 'hidden',
      }}
    >
      {isAch && (
        <div style={{ position:'absolute', top:8, right:10, opacity:.3 }}>
          <KopeckySymbol size={20} glow={false}/>
        </div>
      )}
      <div style={{
        fontFamily: "'Cinzel',serif", fontSize: 9, letterSpacing: '.2em',
        textTransform: 'uppercase', color: isAch ? 'var(--am)' : 'var(--g)', marginBottom: 6,
      }}>
        {isAch ? '✦ Achievement Unlocked' : 'Notice'}
      </div>
      <div style={{ fontFamily:"'Cinzel',serif", fontSize: 13, color: 'var(--tx)', marginBottom: 4 }}>
        {n.title}
      </div>
      {n.body && (
        <div style={{ fontFamily:"'EB Garamond',serif", fontSize: 13, fontStyle:'italic', color: 'rgba(213,206,171,.6)', lineHeight: 1.6 }}>
          {n.body}
        </div>
      )}
      {/* Progress bar */}
      <div style={{
        position:'absolute', bottom:0, left:0, height:2,
        background: isAch ? 'var(--am)' : 'var(--g)',
        animation: `toast-bar ${isAch ? 6.5 : 4}s linear both`,
      }}/>
    </div>
  )
}

export default function Notifications() {
  const { state, actions } = useApp()
  return (
    <div style={{
      position: 'fixed', top: 16, right: 16, zIndex: 600,
      display: 'flex', flexDirection: 'column', gap: 10, pointerEvents: 'none',
    }}>
      {state.notifications.map(n => (
        <div key={n.id} style={{ pointerEvents: 'auto' }}>
          <Toast n={n} onDismiss={() => actions.dismiss(n.id)} />
        </div>
      ))}
      <style>{`
        @keyframes toast-in {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes toast-bar {
          from { width: 100%; } to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

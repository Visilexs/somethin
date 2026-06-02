import { useState, useEffect, useRef, useCallback } from 'react'
import { useApp } from './AppContext'

// ─────────────────────────────────────────────────────────────────────────────
// TWO-TRACK AMBIENT ENGINE
// Track A — "The Walking" : A minor drone, warm, steady
// Track B — "The Tatras"  : D Phrygian, colder, higher, more movement
// Crossfades every ~32s seamlessly via equal-power curve
// ─────────────────────────────────────────────────────────────────────────────

class TwoTrackEngine {
  constructor() {
    this.ctx    = null
    this.master = null
    this.gainA  = null
    this.gainB  = null
    this.nodes  = []
    this.active = false
    this.track  = 'A'  // which is currently louder
    this._xfTimer = null
    this._melTimer = null
    this._vol   = 0.5
  }

  _osc(freq, type, detune = 0) {
    const o = this.ctx.createOscillator()
    o.type = type
    o.frequency.value = freq
    o.detune.value = detune
    return o
  }

  _lfo(freq, range, target) {
    const l = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    l.frequency.value = freq
    g.gain.value = range
    l.connect(g)
    g.connect(target)
    l.start()
    this.nodes.push(l, g)
  }

  // Build one drone track and return its gain node
  _buildTrack(freqs, gainBus) {
    const ctx = this.ctx
    freqs.forEach(({ f, vol, detune = 0, type = 'sine', lfoRate = 0.09, lfoAmt }) => {
      const osc  = this._osc(f, type, detune)
      const gn   = ctx.createGain()
      const filt = ctx.createBiquadFilter()
      filt.type = 'lowpass'
      filt.frequency.value = 800
      filt.Q.value = 0.6
      gn.gain.value = vol
      // tremolo
      this._lfo(lfoRate + Math.random() * 0.04, (lfoAmt ?? vol * 0.18), gn.gain)
      osc.connect(filt)
      filt.connect(gn)
      gn.connect(gainBus)
      osc.start()
      this.nodes.push(osc, gn, filt)
    })
  }

  // Pentatonic melody notes (A minor / D Phrygian)
  _schedMelody(gainBus, scale, interval = 3.2, vol = 0.032) {
    if (!this.active) return
    const ctx = this.ctx
    const t   = ctx.currentTime

    const patterns = [
      [0,2,4,2,0,-1,1,3],
      [4,3,1,0,2,-1,3,1],
      [0,1,3,4,-1,2,0,-1],
      [2,4,3,-1,1,0,2,-1],
    ]
    const pat = patterns[Math.floor(Math.random() * patterns.length)]

    pat.forEach((idx, i) => {
      if (idx < 0 || idx >= scale.length) return
      const osc = ctx.createOscillator()
      const gn  = ctx.createGain()
      const fl  = ctx.createBiquadFilter()
      osc.type = 'triangle'
      osc.frequency.value = scale[idx]
      fl.type = 'lowpass'
      fl.frequency.value = 1400
      const s = t + i * interval
      const d = interval * 1.15
      gn.gain.setValueAtTime(0, s)
      gn.gain.linearRampToValueAtTime(vol, s + d * 0.12)
      gn.gain.setValueAtTime(vol, s + d * 0.72)
      gn.gain.linearRampToValueAtTime(0, s + d)
      osc.connect(fl); fl.connect(gn); gn.connect(gainBus)
      osc.start(s); osc.stop(s + d + 0.05)
      this.nodes.push(osc, gn, fl)
    })

    const nextIn = pat.length * interval + 4 + Math.random() * 8
    this._melTimer = setTimeout(() => this._schedMelody(gainBus, scale, interval, vol), nextIn * 1000)
  }

  // Equal-power crossfade between track A (down) and B (up)
  _crossfade(toTrack) {
    if (!this.ctx) return
    const ctx = this.ctx
    const now = ctx.currentTime
    const dur = 5.5  // crossfade duration seconds

    const [fadeOut, fadeIn] = toTrack === 'B'
      ? [this.gainA, this.gainB]
      : [this.gainB, this.gainA]

    // Equal-power curve: cos/sin so combined power stays constant
    const STEPS = 60
    for (let i = 0; i <= STEPS; i++) {
      const frac = i / STEPS
      const t = now + frac * dur
      // out: cos(frac * π/2), in: sin(frac * π/2)
      fadeOut.gain.setValueAtTime(Math.cos(frac * Math.PI / 2) * this._vol, t)
      fadeIn.gain.setValueAtTime( Math.sin(frac * Math.PI / 2) * this._vol, t)
    }

    this.track = toTrack
    // Schedule next crossfade
    const next = 28 + Math.random() * 16  // 28-44s between fades
    this._xfTimer = setTimeout(() => {
      if (this.active) this._crossfade(this.track === 'A' ? 'B' : 'A')
    }, (dur + next) * 1000)
  }

  async start() {
    if (this.active) return
    this.ctx    = new (window.AudioContext || window.webkitAudioContext)()
    this.master = this.ctx.createGain()
    this.gainA  = this.ctx.createGain()
    this.gainB  = this.ctx.createGain()

    const comp = this.ctx.createDynamicsCompressor()
    comp.threshold.value = -18
    comp.ratio.value = 4
    comp.attack.value = 0.1
    comp.release.value = 0.4

    this.gainA.connect(comp)
    this.gainB.connect(comp)
    comp.connect(this.master)
    this.master.connect(this.ctx.destination)

    // Start: A at volume, B silent
    this.gainA.gain.value = this._vol
    this.gainB.gain.value = 0

    // ── TRACK A — "The Walking" — A minor, warm low drones ──────────────────
    this._buildTrack([
      { f: 55,    vol: 0.30, lfoRate: 0.07 },  // A1 sub
      { f: 110,   vol: 0.26, lfoRate: 0.11, detune: 0 },   // A2 root
      { f: 164.8, vol: 0.18, lfoRate: 0.09, detune: 3 },   // E3 fifth
      { f: 220,   vol: 0.14, lfoRate: 0.13, detune: -2 },  // A3 octave
      { f: 110.6, vol: 0.08, lfoRate: 0.06, detune: 9 },   // warm detune
    ], this.gainA)

    // ── TRACK B — "The Tatras" — D Phrygian, colder, higher movement ────────
    this._buildTrack([
      { f: 73.4,  vol: 0.28, lfoRate: 0.06 },  // D2 sub
      { f: 146.8, vol: 0.24, lfoRate: 0.08, detune: 2 },   // D3 root
      { f: 196,   vol: 0.16, lfoRate: 0.12, detune: -3 },  // G3 minor third
      { f: 220,   vol: 0.12, lfoRate: 0.10, detune: 5 },   // A3 (shared)
      { f: 293.7, vol: 0.10, lfoRate: 0.07 },  // D4 octave
    ], this.gainB)

    // Pentatonic scales for each track
    const scaleA = [220, 261.6, 293.7, 329.6, 392, 440, 523.3]  // A minor pent
    const scaleB = [293.7, 349.2, 392, 440, 523.3, 587.3, 659.3] // D Phrygian pent

    // Master fade in
    this.master.gain.value = 0
    this.master.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 4)

    this.active = true

    // Start melodies staggered
    this._melTimer = setTimeout(() => this._schedMelody(this.gainA, scaleA, 3.0), 5000)
    setTimeout(() => {
      if (this.active) this._schedMelody(this.gainB, scaleB, 3.4, 0.028)
    }, 6500)

    // First crossfade after 30-38s
    this._xfTimer = setTimeout(() => {
      if (this.active) this._crossfade('B')
    }, (30 + Math.random() * 8) * 1000)
  }

  setVolume(v) {
    this._vol = v
    if (!this.ctx) return
    const now = this.ctx.currentTime
    // Scale current track gains proportionally
    const curA = this.gainA.gain.value
    const curB = this.gainB.gain.value
    const total = curA + curB || 1
    this.gainA.gain.cancelScheduledValues(now)
    this.gainB.gain.cancelScheduledValues(now)
    this.gainA.gain.linearRampToValueAtTime((curA / total) * v, now + 0.4)
    this.gainB.gain.linearRampToValueAtTime((curB / total) * v, now + 0.4)
  }

  async resume() {
    if (this.ctx?.state === 'suspended') await this.ctx.resume()
  }

  stop() {
    this.active = false
    clearTimeout(this._xfTimer)
    clearTimeout(this._melTimer)
    if (this.ctx && this.master) {
      const now = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(now)
      this.master.gain.setValueAtTime(this.master.gain.value, now)
      this.master.gain.linearRampToValueAtTime(0, now + 2.5)
      setTimeout(() => {
        this.nodes.forEach(n => { try { n.disconnect() } catch (_) {} })
        this.nodes = []
        this.ctx?.close()
        this.ctx = this.master = this.gainA = this.gainB = null
      }, 3000)
    }
  }
}

// Module-level singleton
let ENG = null
const eng = () => { if (!ENG) ENG = new TwoTrackEngine(); return ENG }

// ── UI ────────────────────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const { actions } = useApp()
  const [playing,  setPlaying]  = useState(false)
  const [vol,      setVol]      = useState(0.5)
  const [open,     setOpen]     = useState(false)
  const [track,    setTrack]    = useState('A')  // visual indicator only
  const started    = useRef(false)
  const interacted = useRef(false)

  // Autoplay: start on first user interaction (mouse / touch / key)
  useEffect(() => {
    const go = async () => {
      if (interacted.current) return
      interacted.current = true
      try {
        await eng().start()
        setPlaying(true)
        started.current = true
      } catch (_) {}
    }

    // Try immediate (works if page was already interacted with e.g. login click)
    const tryImmediate = async () => {
      try {
        const tmp = new (window.AudioContext || window.webkitAudioContext)()
        if (tmp.state === 'running') {
          tmp.close()
          await go()
          return
        }
        tmp.close()
      } catch (_) {}
    }
    tryImmediate()

    const events = ['mousedown','touchstart','keydown','pointerdown']
    events.forEach(e => window.addEventListener(e, go, { once: true, passive: true }))
    return () => events.forEach(e => window.removeEventListener(e, go))
  }, [])

  // Track visual: poll which is louder every 4s
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => { const tk = ENG?.track || 'A'; setTrack(tk); actions.setTrack(tk) }, 4000)
    return () => clearInterval(t)
  }, [playing, actions])

  // Sync playing state to global context
  useEffect(() => { actions.setAudio(playing) }, [playing, actions])

  const togglePlay = useCallback(async () => {
    if (!playing) {
      if (!started.current) {
        await eng().start()
        started.current = true
      } else {
        ENG = new TwoTrackEngine()
        ENG._vol = vol
        await ENG.start()
      }
      setPlaying(true)
    } else {
      eng().stop()
      ENG = null
      setPlaying(false)
    }
  }, [playing, vol])

  const handleVol = (e) => {
    const v = parseFloat(e.target.value)
    setVol(v)
    if (playing) eng().setVolume(v)
  }

  const trackName = track === 'A' ? 'The Walking' : 'The Tatras'

  return (
    <div style={{
      position: 'fixed', bottom: 74, right: 26, zIndex: 400,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
    }}>
      {/* Volume panel */}
      {open && (
        <div style={{
          background:'rgba(4,5,3,.95)', border:'1px solid rgba(168,200,74,.2)',
          padding:'16px 18px', display:'flex', flexDirection:'column', gap:10, minWidth:170,
        }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:9, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(168,200,74,.42)', textAlign:'center' }}>
            Sacred Ambience
          </div>
          {playing && (
            <div style={{ display:'flex', alignItems:'center', gap:8 }}>
              {['A','B'].map(t => (
                <div key={t} style={{
                  flex:1, height:3, borderRadius:2,
                  background: track === t ? 'rgba(168,200,74,.6)' : 'rgba(168,200,74,.12)',
                  transition:'background .8s ease',
                }}/>
              ))}
            </div>
          )}
          {playing && (
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.14em', textTransform:'uppercase', color:'rgba(168,200,74,.38)', textAlign:'center' }}>
              Now: {trackName}
            </div>
          )}
          <input type="range" min="0" max="0.85" step="0.01" value={vol}
            onChange={handleVol}
            style={{ width:'100%', accentColor:'#a8c84a', cursor:'none' }}
          />
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:8, letterSpacing:'.11em', textTransform:'uppercase', color:'rgba(168,200,74,.25)', textAlign:'center', lineHeight:1.7 }}>
            Two tracks · Seamless crossfade<br/>Composed in the Tatra tradition
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:6, alignItems:'center' }}>
        <button onClick={() => setOpen(o => !o)}
          title="Music settings"
          style={{
            width:30, height:30, borderRadius:'50%',
            background:'rgba(4,5,3,.82)', border:'1px solid rgba(168,200,74,.2)',
            color:'rgba(168,200,74,.5)', fontSize:12, cursor:'none', display:'flex',
            alignItems:'center', justifyContent:'center',
            transition:'border-color .25s, color .25s',
          }}
          onMouseEnter={e=>{e.currentTarget.style.borderColor='rgba(168,200,74,.5)';e.currentTarget.style.color='rgba(168,200,74,.85)'}}
          onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(168,200,74,.2)';e.currentTarget.style.color='rgba(168,200,74,.5)'}}
        >⚙</button>

        <button onClick={togglePlay}
          title={playing ? 'Silence the sacred ambience' : 'Restore the sacred ambience'}
          style={{
            width:38, height:38, borderRadius:'50%',
            background: playing ? 'rgba(168,200,74,.12)' : 'rgba(4,5,3,.82)',
            border:`1px solid ${playing ? 'rgba(168,200,74,.45)' : 'rgba(168,200,74,.22)'}`,
            color: playing ? 'rgba(168,200,74,.95)' : 'rgba(168,200,74,.55)',
            fontSize:14, cursor:'none', display:'flex', alignItems:'center', justifyContent:'center',
            transition:'all .3s', position:'relative',
            boxShadow: playing ? '0 0 14px rgba(168,200,74,.18)' : 'none',
          }}
          onMouseEnter={e=>e.currentTarget.style.borderColor='rgba(168,200,74,.6)'}
          onMouseLeave={e=>e.currentTarget.style.borderColor=playing?'rgba(168,200,74,.45)':'rgba(168,200,74,.22)'}
        >
          {playing ? '◼' : '♪'}
          {playing && (
            <div style={{
              position:'absolute', inset:-4,
              border:'1px solid rgba(168,200,74,.28)',
              borderRadius:'50%',
              animation:'mp-pulse 2.2s ease-in-out infinite',
            }}/>
          )}
        </button>
      </div>

      <style>{`
        @keyframes mp-pulse {
          0%,100%{transform:scale(1);opacity:.55}
          50%{transform:scale(1.3);opacity:0}
        }
      `}</style>
    </div>
  )
}

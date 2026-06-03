import { useState, useEffect, useRef, useCallback } from 'react'
import { useApp } from './AppContext'

// ─────────────────────────────────────────────────────────────────────────────
// MULTI-TRACK AMBIENT ENGINE — four procedural movements, seamless crossfades.
//
//   I.   "The Walking"  — A minor, warm low drones + slow pentatonic melody
//   II.  "The Tatras"   — D Phrygian, colder, higher movement, glass bells
//   III. "The Vigil"    — E minor, deep candle-lit chord swells + sub heartbeat
//   IV.  "The Fog"      — C Lydian, weightless shimmer, high chimes
//
// Each track is a config (drones + scale + optional chord swells / bells / sub).
// The engine builds a gain bus + drone layer per track, fades the master in,
// and crossfades to a random *different* track every ~30–45s via an equal-power
// curve. Tracks are richer than static drones: chords breathe underneath, glass
// bells accent, and a slow sub pulse gives some movements a heartbeat.
// ─────────────────────────────────────────────────────────────────────────────

const TRACKS = [
  {
    id: 'walking', name: 'The Walking',
    drones: [
      { f: 55,    vol: 0.30, lfoRate: 0.07 },
      { f: 110,   vol: 0.26, lfoRate: 0.11 },
      { f: 164.8, vol: 0.18, lfoRate: 0.09, detune: 3 },
      { f: 220,   vol: 0.14, lfoRate: 0.13, detune: -2 },
      { f: 110.6, vol: 0.08, lfoRate: 0.06, detune: 9 },
    ],
    scale: [220, 261.6, 293.7, 329.6, 392, 440, 523.3],   // A minor pentatonic
    melodyInterval: 3.0, melodyVol: 0.032,
    chords: [[110, 164.8, 220], [98, 146.8, 196], [123.5, 164.8, 247]],
    chordVol: 0.05, chordEvery: 11,
    bells: false, subPulse: true,
  },
  {
    id: 'tatras', name: 'The Tatras',
    drones: [
      { f: 73.4,  vol: 0.28, lfoRate: 0.06 },
      { f: 146.8, vol: 0.24, lfoRate: 0.08, detune: 2 },
      { f: 196,   vol: 0.16, lfoRate: 0.12, detune: -3 },
      { f: 220,   vol: 0.12, lfoRate: 0.10, detune: 5 },
      { f: 293.7, vol: 0.10, lfoRate: 0.07 },
    ],
    scale: [293.7, 349.2, 392, 440, 523.3, 587.3, 659.3],
    melodyInterval: 3.4, melodyVol: 0.028,
    chords: [[146.8, 220, 293.7], [164.8, 196, 247]],
    chordVol: 0.04, chordEvery: 13,
    bells: true, subPulse: false,
  },
  {
    id: 'vigil', name: 'The Vigil',
    drones: [
      { f: 41.2,  vol: 0.30, lfoRate: 0.05 },
      { f: 82.4,  vol: 0.26, lfoRate: 0.07 },
      { f: 123.5, vol: 0.18, lfoRate: 0.09, detune: 2 },
      { f: 164.8, vol: 0.13, lfoRate: 0.11, detune: -4 },
      { f: 246.9, vol: 0.07, lfoRate: 0.06, detune: 6 },
    ],
    scale: [164.8, 196, 246.9, 293.7, 329.6, 392],   // E minor
    melodyInterval: 4.2, melodyVol: 0.03,
    chords: [[82.4, 123.5, 164.8], [98, 146.8, 196], [110, 164.8, 220]],
    chordVol: 0.06, chordEvery: 9,
    bells: true, subPulse: true,
  },
  {
    id: 'fog', name: 'The Fog',
    drones: [
      { f: 65.4,  vol: 0.24, lfoRate: 0.05 },
      { f: 130.8, vol: 0.20, lfoRate: 0.08 },
      { f: 196,   vol: 0.15, lfoRate: 0.10, detune: 4 },
      { f: 246.9, vol: 0.11, lfoRate: 0.12, detune: -3 },
      { f: 392,   vol: 0.06, lfoRate: 0.07, detune: 8 },
    ],
    scale: [392, 440, 493.9, 587.3, 659.3, 740],   // C Lydian upper
    melodyInterval: 3.8, melodyVol: 0.024,
    chords: [[130.8, 196, 246.9], [146.8, 220, 277.2]],
    chordVol: 0.035, chordEvery: 12,
    bells: true, subPulse: false,
  },
]

class AmbientEngine {
  constructor() {
    this.ctx = null
    this.master = null
    this.comp = null
    this.buses = []
    this.nodes = []
    this.timers = []
    this.active = false
    this.current = 0
    this.name = TRACKS[0].name
    this._vol = 0.5
  }

  _osc(freq, type, detune = 0) {
    const o = this.ctx.createOscillator()
    o.type = type; o.frequency.value = freq; o.detune.value = detune
    return o
  }

  _lfo(freq, range, target) {
    const l = this.ctx.createOscillator()
    const g = this.ctx.createGain()
    l.frequency.value = freq; g.gain.value = range
    l.connect(g); g.connect(target); l.start()
    this.nodes.push(l, g)
  }

  _buildDrones(drones, bus) {
    const ctx = this.ctx
    drones.forEach(({ f, vol, detune = 0, type = 'sine', lfoRate = 0.09, lfoAmt }) => {
      const osc = this._osc(f, type, detune)
      const gn = ctx.createGain()
      const filt = ctx.createBiquadFilter()
      filt.type = 'lowpass'; filt.frequency.value = 820; filt.Q.value = 0.6
      gn.gain.value = vol
      this._lfo(lfoRate + Math.random() * 0.04, (lfoAmt ?? vol * 0.18), gn.gain)
      osc.connect(filt); filt.connect(gn); gn.connect(bus); osc.start()
      this.nodes.push(osc, gn, filt)
    })
  }

  _note(bus, freq, start, dur, vol, type = 'triangle', filterHz = 1400) {
    const ctx = this.ctx
    const osc = ctx.createOscillator()
    const gn = ctx.createGain()
    const fl = ctx.createBiquadFilter()
    osc.type = type; osc.frequency.value = freq
    fl.type = 'lowpass'; fl.frequency.value = filterHz
    gn.gain.setValueAtTime(0, start)
    gn.gain.linearRampToValueAtTime(vol, start + dur * 0.12)
    gn.gain.setValueAtTime(vol, start + dur * 0.6)
    gn.gain.linearRampToValueAtTime(0, start + dur)
    osc.connect(fl); fl.connect(gn); gn.connect(bus)
    osc.start(start); osc.stop(start + dur + 0.05)
    this.nodes.push(osc, gn, fl)
  }

  _schedMelody(trackIdx) {
    if (!this.active) return
    const cfg = TRACKS[trackIdx]
    const bus = this.buses[trackIdx]
    const t = this.ctx.currentTime
    const { scale, melodyInterval: iv = 3.2, melodyVol: vol = 0.03 } = cfg
    const phrase = 3 + Math.floor(Math.random() * 3)
    let idx = Math.floor(Math.random() * Math.max(1, scale.length - phrase))
    for (let i = 0; i < phrase; i++) {
      const step = Math.random() < 0.5 ? 1 : (Math.random() < 0.5 ? 2 : 0)
      idx = Math.max(0, Math.min(scale.length - 1, idx + (Math.random() < 0.5 ? step : -step)))
      const d = iv * (0.9 + Math.random() * 0.5)
      this._note(bus, scale[idx], t + i * iv * 0.85, d, vol)
    }
    const nextIn = (phrase * iv * 0.85) + 2 + Math.random() * 5
    this.timers.push(setTimeout(() => this._schedMelody(trackIdx), nextIn * 1000))
  }

  _schedChords(trackIdx) {
    if (!this.active) return
    const cfg = TRACKS[trackIdx]
    if (!cfg.chords) return
    const bus = this.buses[trackIdx]
    const t = this.ctx.currentTime
    const chord = cfg.chords[Math.floor(Math.random() * cfg.chords.length)]
    const dur = (cfg.chordEvery || 11) * 0.85
    chord.forEach((f, i) => this._note(bus, f, t + i * 0.04, dur, cfg.chordVol || 0.04, 'sine', 600))
    this.timers.push(setTimeout(() => this._schedChords(trackIdx), (cfg.chordEvery || 11) * 1000))
  }

  _schedBells(trackIdx) {
    if (!this.active) return
    const cfg = TRACKS[trackIdx]
    if (!cfg.bells) return
    const bus = this.buses[trackIdx]
    const t = this.ctx.currentTime
    const note = cfg.scale[Math.floor(Math.random() * cfg.scale.length)] * 2
    this._note(bus, note, t, 3.5 + Math.random() * 2, 0.02, 'sine', 3000)
    const nextIn = 8 + Math.random() * 14
    this.timers.push(setTimeout(() => this._schedBells(trackIdx), nextIn * 1000))
  }

  _schedSub(trackIdx) {
    if (!this.active) return
    const cfg = TRACKS[trackIdx]
    if (!cfg.subPulse) return
    const bus = this.buses[trackIdx]
    const t = this.ctx.currentTime
    this._note(bus, cfg.drones[0].f, t, 4, 0.06, 'sine', 200)
    this.timers.push(setTimeout(() => this._schedSub(trackIdx), (7 + Math.random() * 4) * 1000))
  }

  _startTrackLayers(idx, delayMs = 0) {
    this.timers.push(setTimeout(() => {
      if (!this.active) return
      this._schedMelody(idx)
      this._schedChords(idx)
      this._schedBells(idx)
      this._schedSub(idx)
    }, delayMs))
  }

  _crossfade(toIdx) {
    if (!this.ctx) return
    const now = this.ctx.currentTime
    const dur = 6
    const fromBus = this.buses[this.current]
    const toBus = this.buses[toIdx]
    const STEPS = 64
    for (let i = 0; i <= STEPS; i++) {
      const frac = i / STEPS
      const t = now + frac * dur
      fromBus.gain.setValueAtTime(Math.cos(frac * Math.PI / 2) * this._vol, t)
      toBus.gain.setValueAtTime(Math.sin(frac * Math.PI / 2) * this._vol, t)
    }
    this.current = toIdx
    this.name = TRACKS[toIdx].name
    const next = 30 + Math.random() * 15
    this.timers.push(setTimeout(() => {
      if (!this.active) return
      let n = Math.floor(Math.random() * TRACKS.length)
      if (n === this.current) n = (n + 1) % TRACKS.length
      this._crossfade(n)
    }, (dur + next) * 1000))
  }

  async start() {
    if (this.active) return
    this.ctx = new (window.AudioContext || window.webkitAudioContext)()
    this.master = this.ctx.createGain()
    this.comp = this.ctx.createDynamicsCompressor()
    this.comp.threshold.value = -18; this.comp.ratio.value = 4
    this.comp.attack.value = 0.1; this.comp.release.value = 0.4
    this.comp.connect(this.master)
    this.master.connect(this.ctx.destination)

    this.buses = TRACKS.map((cfg, i) => {
      const bus = this.ctx.createGain()
      bus.gain.value = i === 0 ? this._vol : 0
      bus.connect(this.comp)
      this._buildDrones(cfg.drones, bus)
      return bus
    })

    this.current = 0
    this.name = TRACKS[0].name
    this.active = true

    this.master.gain.value = 0
    this.master.gain.linearRampToValueAtTime(1, this.ctx.currentTime + 4)

    this._startTrackLayers(0, 4500)
    for (let i = 1; i < TRACKS.length; i++) this._startTrackLayers(i, 5000 + i * 800)

    this.timers.push(setTimeout(() => {
      if (!this.active) return
      this._crossfade(1)
    }, (32 + Math.random() * 14) * 1000))
  }

  setVolume(v) {
    this._vol = v
    if (!this.ctx) return
    const now = this.ctx.currentTime
    this.buses.forEach((bus) => {
      if (bus.gain.value > 0.001) {
        bus.gain.cancelScheduledValues(now)
        bus.gain.linearRampToValueAtTime(v, now + 0.4)
      }
    })
  }

  async resume() {
    if (this.ctx?.state === 'suspended') await this.ctx.resume()
  }

  stop() {
    this.active = false
    this.timers.forEach(clearTimeout)
    this.timers = []
    if (this.ctx && this.master) {
      const now = this.ctx.currentTime
      this.master.gain.cancelScheduledValues(now)
      this.master.gain.setValueAtTime(this.master.gain.value, now)
      this.master.gain.linearRampToValueAtTime(0, now + 2.5)
      setTimeout(() => {
        this.nodes.forEach(n => { try { n.disconnect() } catch (_) {} })
        this.nodes = []
        this.ctx?.close()
        this.ctx = this.master = this.comp = null
        this.buses = []
      }, 3000)
    }
  }
}

// Module-level singleton
let ENG = null
const eng = () => { if (!ENG) ENG = new AmbientEngine(); return ENG }


// ── UI ────────────────────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const { actions } = useApp()
  const [playing,  setPlaying]  = useState(false)
  const [vol,      setVol]      = useState(0.5)
  const [open,     setOpen]     = useState(false)
  const [track,    setTrack]    = useState('The Walking')  // visual indicator only
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
    const t = setInterval(() => { const nm = ENG?.name || 'The Walking'; setTrack(nm); actions.setTrack(nm) }, 3000)
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
        ENG = new AmbientEngine()
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

  const trackName = track

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

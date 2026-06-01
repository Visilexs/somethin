import { useState, useEffect, useRef, useCallback } from 'react'

// ── Ambient music engine using Web Audio API ──────────────────────────────
// No audio files — fully procedural Slavic church drone
class AmbientEngine {
  constructor() {
    this.ctx    = null
    this.master = null
    this.nodes  = []
    this.running = false
  }

  async init() {
    if (this.ctx) return
    this.ctx    = new (window.AudioContext || window.webkitAudioContext)()
    this.master = this.ctx.createGain()
    this.master.gain.value = 0
    this.master.connect(this.ctx.destination)
  }

  // Create a slow-beating drone oscillator
  _drone(freq, vol, detuneAmt = 0) {
    const ctx  = this.ctx
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    const filt = ctx.createBiquadFilter()

    osc.type      = 'sine'
    osc.frequency.value = freq
    osc.detune.value    = detuneAmt
    filt.type     = 'lowpass'
    filt.frequency.value = 600
    filt.Q.value  = 0.8
    gain.gain.value = vol

    // Slow tremolo
    const lfo     = ctx.createOscillator()
    const lfoGain = ctx.createGain()
    lfo.frequency.value  = 0.12 + Math.random() * 0.06
    lfoGain.gain.value   = vol * 0.22
    lfo.connect(lfoGain)
    lfoGain.connect(gain.gain)
    lfo.start()

    osc.connect(filt)
    filt.connect(gain)
    gain.connect(this.master)
    osc.start()

    this.nodes.push(osc, lfo, gain, filt, lfoGain)
    return { osc, gain, lfo }
  }

  // Create a slow melodic note that fades in/out
  _note(freq, startTime, duration, vol = 0.04) {
    const ctx  = this.ctx
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    const filt = ctx.createBiquadFilter()

    osc.type = 'triangle'
    osc.frequency.value = freq
    filt.type = 'lowpass'
    filt.frequency.value = 1200

    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(vol, startTime + duration * 0.15)
    gain.gain.setValueAtTime(vol, startTime + duration * 0.7)
    gain.gain.linearRampToValueAtTime(0, startTime + duration)

    osc.connect(filt)
    filt.connect(gain)
    gain.connect(this.master)
    osc.start(startTime)
    osc.stop(startTime + duration + 0.1)
    this.nodes.push(osc, gain, filt)
  }

  // Schedule a repeating melodic sequence (A minor pentatonic)
  _melody() {
    if (!this.running) return
    const ctx = this.ctx
    const t   = ctx.currentTime
    // A2 pentatonic: A(110), C(130.8), D(146.8), E(164.8), G(196)
    // Up an octave: A3(220), C4(261.6), D4(293.7), E4(329.6), G4(392)
    const scale = [220, 261.6, 293.7, 329.6, 392, 440, 523.3]
    const patterns = [
      [0, 2, 4, 2, 0, -1, 1, 3],   // gentle rise
      [4, 3, 2, 1, 0, 2, 4, -1],   // descending
      [0, 1, 3, 4, 3, 1, 0, -1],   // arc
      [2, 4, 3, 1, 0, 2, -1, -1],  // short phrase
    ]
    const pattern = patterns[Math.floor(Math.random() * patterns.length)]
    const noteLen = 2.8 + Math.random() * 1.2

    pattern.forEach((idx, i) => {
      if (idx === -1) return
      this._note(scale[idx], t + i * noteLen, noteLen * 1.1, 0.038)
    })

    // Schedule next phrase after this one ends
    const totalLen = pattern.length * noteLen + 3 + Math.random() * 5
    this._melodyTimer = setTimeout(() => this._melody(), totalLen * 1000)
  }

  async start() {
    if (this.running) return
    await this.init()
    if (this.ctx.state === 'suspended') await this.ctx.resume()
    this.running = true

    // Root drone — A2
    this._drone(110, 0.28, 0)
    // Fifth — E3
    this._drone(164.8, 0.18, 3)
    // Octave — A3 (softer)
    this._drone(220, 0.12, -2)
    // Sub-bass — A1
    this._drone(55, 0.22, 0)
    // Slight detuned second for warmth
    this._drone(110.8, 0.08, 7)

    // Fade master in
    this.master.gain.cancelScheduledValues(this.ctx.currentTime)
    this.master.gain.setValueAtTime(0, this.ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(0.45, this.ctx.currentTime + 3.5)

    // Start melody after 4s
    this._melodyTimer = setTimeout(() => this._melody(), 4000)
  }

  setVolume(v) {
    if (!this.ctx || !this.master) return
    this.master.gain.cancelScheduledValues(this.ctx.currentTime)
    this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime)
    this.master.gain.linearRampToValueAtTime(v, this.ctx.currentTime + 0.8)
  }

  stop() {
    if (!this.running) return
    this.running = false
    clearTimeout(this._melodyTimer)
    if (this.ctx && this.master) {
      this.master.gain.cancelScheduledValues(this.ctx.currentTime)
      this.master.gain.setValueAtTime(this.master.gain.value, this.ctx.currentTime)
      this.master.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 2)
      setTimeout(() => {
        this.nodes.forEach(n => { try { n.disconnect() } catch(e){} })
        this.nodes = []
        if (this.ctx) { this.ctx.close(); this.ctx = null }
        this.master = null
      }, 2500)
    }
  }
}

let engineInstance = null
const getEngine = () => {
  if (!engineInstance) engineInstance = new AmbientEngine()
  return engineInstance
}

// ── Music player UI ───────────────────────────────────────────────────────────
export default function MusicPlayer() {
  const [playing, setPlaying]  = useState(false)
  const [vol,     setVol]      = useState(0.45)
  const [open,    setOpen]     = useState(false)
  const [tooltip, setTooltip]  = useState(false)
  const [started, setStarted]  = useState(false)

  const toggle = useCallback(async () => {
    const eng = getEngine()
    if (!playing) {
      await eng.start()
      setPlaying(true)
      setStarted(true)
    } else {
      eng.stop()
      engineInstance = null
      setPlaying(false)
    }
  }, [playing])

  const handleVol = (e) => {
    const v = parseFloat(e.target.value)
    setVol(v)
    if (playing) getEngine().setVolume(v)
  }

  // Tooltip on first load
  useEffect(() => {
    const t = setTimeout(() => setTooltip(true), 2500)
    const t2 = setTimeout(() => setTooltip(false), 6000)
    return () => { clearTimeout(t); clearTimeout(t2) }
  }, [])

  return (
    <div style={{
      position: 'fixed', bottom: 72, right: 26, zIndex: 400,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8,
    }}>
      {/* Tooltip */}
      {tooltip && !started && (
        <div style={{
          background: 'rgba(6,8,5,.92)', border: '1px solid rgba(168,200,74,.25)',
          padding: '8px 14px', maxWidth: 200, textAlign: 'right',
          fontFamily: "'EB Garamond',serif", fontSize: 13, fontStyle: 'italic',
          color: 'rgba(213,206,171,.65)', lineHeight: 1.6,
          animation: 'fade-in-up .4s ease forwards',
        }}>
          The sacred ambience may be enabled.
        </div>
      )}

      {/* Volume panel */}
      {open && (
        <div style={{
          background: 'rgba(6,8,5,.92)', border: '1px solid rgba(168,200,74,.2)',
          padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 160,
        }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize: 9, letterSpacing: '.2em',
            textTransform: 'uppercase', color: 'rgba(168,200,74,.45)', textAlign:'center' }}>
            Sacred Ambience
          </div>
          <input type="range" min="0" max="0.8" step="0.01" value={vol}
            onChange={handleVol}
            style={{ width: '100%', accentColor: '#a8c84a', cursor: 'none' }}
          />
          <div style={{ fontFamily:"'Cinzel',serif", fontSize: 8, letterSpacing: '.12em',
            textTransform: 'uppercase', color: 'rgba(168,200,74,.28)', textAlign: 'center',
            lineHeight: 1.7 }}>
            Composed in the Tatra tradition<br/>by the scribes of Devín
          </div>
        </div>
      )}

      {/* Main button */}
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        {/* Settings toggle */}
        <button
          onClick={() => setOpen(o => !o)}
          title="Music settings"
          style={{
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(6,8,5,.8)', border: '1px solid rgba(168,200,74,.2)',
            color: 'rgba(168,200,74,.5)', fontSize: 12, cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'border-color .25s, color .25s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(168,200,74,.5)'; e.currentTarget.style.color='rgba(168,200,74,.85)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(168,200,74,.2)'; e.currentTarget.style.color='rgba(168,200,74,.5)' }}
        >⚙</button>

        {/* Play/pause */}
        <button
          onClick={toggle}
          title={playing ? 'Silence the ambience' : 'Enable sacred ambience'}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: playing ? 'rgba(168,200,74,.12)' : 'rgba(6,8,5,.8)',
            border: `1px solid ${playing ? 'rgba(168,200,74,.45)' : 'rgba(168,200,74,.22)'}`,
            color: playing ? 'rgba(168,200,74,.95)' : 'rgba(168,200,74,.55)',
            fontSize: 14, cursor: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .3s',
            boxShadow: playing ? '0 0 14px rgba(168,200,74,.2)' : 'none',
            position: 'relative',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(168,200,74,.6)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=playing?'rgba(168,200,74,.45)':'rgba(168,200,74,.22)' }}
        >
          {playing ? '◼' : '♪'}
          {/* Pulse ring when playing */}
          {playing && (
            <div style={{
              position: 'absolute', inset: -3,
              border: '1px solid rgba(168,200,74,.3)',
              borderRadius: '50%',
              animation: 'music-pulse 2s ease-in-out infinite',
            }}/>
          )}
        </button>
      </div>

      <style>{`
        @keyframes music-pulse {
          0%,100%{transform:scale(1);opacity:.6}
          50%{transform:scale(1.25);opacity:0}
        }
        @keyframes fade-in-up {
          from{opacity:0;transform:translateY(8px)}
          to{opacity:1;transform:translateY(0)}
        }
      `}</style>
    </div>
  )
}

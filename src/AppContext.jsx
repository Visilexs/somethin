/**
 * Global app state via Context + useReducer.
 * Tracks: visited pages, audio, reading progress, achievements (ARG),
 * easter-egg counters, and a notification queue. Achievements + key
 * progress persist to localStorage so the ARG survives across visits.
 */
import { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react'

const LS_KEY = 'kopecky_arg_v1'

// Safe localStorage (private mode / SSR tolerant)
const ls = {
  get() { try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}') } catch { return {} } },
  set(v) { try { localStorage.setItem(LS_KEY, JSON.stringify(v)) } catch {} },
}

const saved = ls.get()

const initialState = {
  visitedPages: saved.visitedPages || ['home'],
  audioPlaying: false,
  audioVolume: 0.5,
  currentTrack: 'A',
  achievements: saved.achievements || [],   // unlocked achievement ids
  notifications: [],
  readingProgress: {},
  transitionPhase: 'idle',
  // ── ARG counters / flags ───────────────────────────────────────────
  satchelClicks: 0,
  symbolClicks: saved.symbolClicks || 0,
  konami: '',                               // tracks secret key sequence
  foundGlyphs: saved.foundGlyphs || [],     // hidden glyph ids discovered
  saltPerfect: saved.saltPerfect || false,  // got the bread salt right in-game
  waterStolen: saved.waterStolen || false,  // completed water theft
  chessRead: saved.chessRead || false,      // read the chess argument fully
  prayerSaid: saved.prayerSaid || false,    // completed a prayer
  spokeToKopecky: saved.spokeToKopecky || false,
}

// All achievements defined in one registry (also drives the UI panel)
export const ACHIEVEMENTS = [
  { id: 'first-steps',     name: 'The First Step',         hint: 'Enter the Church.',                              secret: false },
  { id: 'completionist',   name: 'The Full Scripture',     hint: 'Read every chapter of the site.',                secret: false },
  { id: 'satchel-curious', name: 'Do Not Touch the Satchel',hint: 'Try the satchel. More than once.',              secret: false },
  { id: 'the-symbol',      name: 'The Sacred Sigil',       hint: 'The symbol rewards the persistent.',             secret: true  },
  { id: 'chess-scholar',   name: 'The Queen, Not the King',hint: 'Study the chess argument in full.',              secret: false },
  { id: 'water-thief',     name: 'The Acquisition',        hint: 'Take what Ayub will not miss.',                  secret: false },
  { id: 'correct-bread',   name: 'Salted Correctly',       hint: 'Make the bread the way it must be made.',        secret: false },
  { id: 'the-faithful',    name: 'The Faithful',           hint: 'Offer a prayer to Kopecky.',                     secret: false },
  { id: 'glyph-hunter',    name: 'The Hidden Glyphs',      hint: 'Three sacred marks lie hidden in the scripture.', secret: true },
  { id: 'the-decree',      name: 'Fear Not, Chudling',     hint: 'Speak the founder’s name where access is barred.', secret: true },
  { id: 'audience',        name: 'An Audience With God',   hint: 'Earn five marks of devotion, then speak to Him.', secret: true },
]

function persist(state) {
  ls.set({
    visitedPages: state.visitedPages,
    achievements: state.achievements,
    symbolClicks: state.symbolClicks,
    foundGlyphs: state.foundGlyphs,
    saltPerfect: state.saltPerfect,
    waterStolen: state.waterStolen,
    chessRead: state.chessRead,
    prayerSaid: state.prayerSaid,
    spokeToKopecky: state.spokeToKopecky,
  })
}

function reducer(state, action) {
  switch (action.type) {
    case 'VISIT_PAGE': {
      if (state.visitedPages.includes(action.page)) return state
      return { ...state, visitedPages: [...state.visitedPages, action.page] }
    }
    case 'SET_AUDIO':   return { ...state, audioPlaying: action.playing }
    case 'SET_VOLUME':  return { ...state, audioVolume: action.volume }
    case 'SET_TRACK':   return { ...state, currentTrack: action.track }
    case 'UNLOCK_ACHIEVEMENT': {
      if (state.achievements.includes(action.id)) return state
      return {
        ...state,
        achievements: [...state.achievements, action.id],
        notifications: [...state.notifications, {
          id: `ach-${action.id}-${Date.now()}`,
          kind: 'achievement',
          title: action.title,
          body: action.body,
        }],
      }
    }
    case 'PUSH_NOTIFICATION':
      return { ...state, notifications: [...state.notifications, { id: `n-${Date.now()}-${Math.random()}`, ...action.notification }] }
    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.id) }
    case 'SET_PROGRESS':
      return { ...state, readingProgress: { ...state.readingProgress, [action.page]: Math.max(state.readingProgress[action.page] || 0, action.pct) } }
    case 'SET_PHASE':       return { ...state, transitionPhase: action.phase }
    case 'CLICK_SATCHEL':   return { ...state, satchelClicks: state.satchelClicks + 1 }
    case 'CLICK_SYMBOL':    return { ...state, symbolClicks: state.symbolClicks + 1 }
    case 'KONAMI':          return { ...state, konami: action.value }
    case 'FIND_GLYPH': {
      if (state.foundGlyphs.includes(action.glyph)) return state
      return { ...state, foundGlyphs: [...state.foundGlyphs, action.glyph] }
    }
    case 'SET_FLAG':        return { ...state, [action.flag]: action.value }
    default:                return state
  }
}

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const actions = useMemo(() => ({
    visitPage:  (page) => dispatch({ type: 'VISIT_PAGE', page }),
    setAudio:   (playing) => dispatch({ type: 'SET_AUDIO', playing }),
    setVolume:  (volume) => dispatch({ type: 'SET_VOLUME', volume }),
    setTrack:   (track) => dispatch({ type: 'SET_TRACK', track }),
    unlock:     (id, title, body) => dispatch({ type: 'UNLOCK_ACHIEVEMENT', id, title, body }),
    notify:     (notification) => dispatch({ type: 'PUSH_NOTIFICATION', notification }),
    dismiss:    (id) => dispatch({ type: 'DISMISS_NOTIFICATION', id }),
    setProgress:(page, pct) => dispatch({ type: 'SET_PROGRESS', page, pct }),
    setPhase:   (phase) => dispatch({ type: 'SET_PHASE', phase }),
    clickSatchel: () => dispatch({ type: 'CLICK_SATCHEL' }),
    clickSymbol:  () => dispatch({ type: 'CLICK_SYMBOL' }),
    setKonami:    (value) => dispatch({ type: 'KONAMI', value }),
    findGlyph:    (glyph) => dispatch({ type: 'FIND_GLYPH', glyph }),
    setFlag:      (flag, value = true) => dispatch({ type: 'SET_FLAG', flag, value }),
  }), [])

  const value = useMemo(() => ({ state, actions }), [state])

  // Persist key progress whenever it changes
  useEffect(() => { persist(state) }, [
    state.visitedPages, state.achievements, state.symbolClicks, state.foundGlyphs,
    state.saltPerfect, state.waterStolen, state.chessRead, state.prayerSaid, state.spokeToKopecky,
  ])

  // ── Achievement engine — evaluates unlock conditions on state change ──
  const has = (id) => state.achievements.includes(id)

  // First step: simply being here
  useEffect(() => {
    if (!has('first-steps')) actions.unlock('first-steps', 'The First Step', 'You have entered the Church of Kopecky. He was expecting you. He is always expecting everyone.')
  }, [])

  useEffect(() => {
    const allPages = ['home','origins','chud','disciples','chronicles','texts','laws','prayer','game']
    if (allPages.every(p => state.visitedPages.includes(p)) && !has('completionist')) {
      actions.unlock('completionist', 'The Full Scripture', 'You have read every chapter. Kopecky has noted your thoroughness. He finds it adequate.')
    }
  }, [state.visitedPages])

  useEffect(() => {
    if (state.satchelClicks >= 3 && !has('satchel-curious')) {
      actions.unlock('satchel-curious', 'Do Not Touch the Satchel', 'You tried the satchel three times. This is early-path information about you, and it is not flattering.')
    }
  }, [state.satchelClicks])

  useEffect(() => {
    if (state.symbolClicks >= 7 && !has('the-symbol')) {
      actions.unlock('the-symbol', 'The Sacred Sigil', 'You struck the sigil seven times. Seven is the number of completion. Kopecky suspects you did not know that and got there anyway.')
    }
  }, [state.symbolClicks])

  useEffect(() => {
    if (state.foundGlyphs.length >= 3 && !has('glyph-hunter')) {
      actions.unlock('glyph-hunter', 'The Hidden Glyphs', 'You found all three hidden marks. They mean nothing. Kopecky hid them anyway. You looked anyway. You are well matched.')
    }
  }, [state.foundGlyphs])

  // Flag-driven achievements
  useEffect(() => { if (state.chessRead && !has('chess-scholar')) actions.unlock('chess-scholar', 'The Queen, Not the King', 'You read the chess argument in full. You now understand the matter correctly, which puts you ahead of three former council members.') }, [state.chessRead])
  useEffect(() => { if (state.waterStolen && !has('water-thief')) actions.unlock('water-thief', 'The Acquisition', 'You took the water. Ayub remains unaware. The Church prefers it this way.') }, [state.waterStolen])
  useEffect(() => { if (state.saltPerfect && !has('correct-bread')) actions.unlock('correct-bread', 'Salted Correctly', 'The bread was salted correctly. This is not a matter of opinion. You have done the one correct thing.') }, [state.saltPerfect])
  useEffect(() => { if (state.prayerSaid && !has('the-faithful')) actions.unlock('the-faithful', 'The Faithful', 'You offered a prayer. Kopecky received it. He will not be responding, but he received it.') }, [state.prayerSaid])

  // The decree: founder's name spoken at the barred gate (set by LoginGate)
  useEffect(() => {
    if (saved.spokeTheName && !has('the-decree')) {
      actions.unlock('the-decree', 'Fear Not, Chudling', 'You spoke the name at the barred gate and were admitted. Kopecky notes that you knew the name. He notes everything.')
    }
  }, [])

  // Audience with Kopecky — unlocks the chatbot at 5 achievements
  useEffect(() => {
    const earned = state.achievements.filter(a => a !== 'audience').length
    if (earned >= 5 && !has('audience')) {
      actions.unlock('audience', 'An Audience With God', 'Five marks of devotion. The vestibule to Kopecky himself is now open. Speak, if you must. He will correct you as needed.')
    }
  }, [state.achievements])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

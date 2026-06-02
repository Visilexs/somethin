/**
 * Global app state via Context + useReducer.
 * Tracks: visited pages, audio state, reading progress, achievements,
 * theme intensity, and a notification queue.
 */
import { createContext, useContext, useReducer, useCallback, useMemo, useEffect } from 'react'

const initialState = {
  visitedPages: ['home'],
  audioPlaying: false,
  audioVolume: 0.5,
  currentTrack: 'A',
  achievements: [],          // unlocked achievement ids
  notifications: [],         // active toast notifications
  readingProgress: {},       // pageId -> max scroll %
  transitionPhase: 'idle',
  satchelClicks: 0,          // easter egg counter
}

function reducer(state, action) {
  switch (action.type) {
    case 'VISIT_PAGE': {
      if (state.visitedPages.includes(action.page)) return state
      const visited = [...state.visitedPages, action.page]
      return { ...state, visitedPages: visited }
    }
    case 'SET_AUDIO':
      return { ...state, audioPlaying: action.playing }
    case 'SET_VOLUME':
      return { ...state, audioVolume: action.volume }
    case 'SET_TRACK':
      return { ...state, currentTrack: action.track }
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
      return {
        ...state,
        notifications: [...state.notifications, { id: `n-${Date.now()}-${Math.random()}`, ...action.notification }],
      }
    case 'DISMISS_NOTIFICATION':
      return { ...state, notifications: state.notifications.filter(n => n.id !== action.id) }
    case 'SET_PROGRESS':
      return {
        ...state,
        readingProgress: { ...state.readingProgress, [action.page]: Math.max(state.readingProgress[action.page] || 0, action.pct) },
      }
    case 'SET_PHASE':
      return { ...state, transitionPhase: action.phase }
    case 'CLICK_SATCHEL':
      return { ...state, satchelClicks: state.satchelClicks + 1 }
    default:
      return state
  }
}

const AppCtx = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Memoised action creators
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
  }), [])

  const value = useMemo(() => ({ state, actions }), [state, actions])

  // Achievement: visit all pages
  useEffect(() => {
    const allPages = ['home','origins','chud','disciples','chronicles','texts','laws','prayer','game']
    const visitedAll = allPages.every(p => state.visitedPages.includes(p))
    if (visitedAll && !state.achievements.includes('completionist')) {
      actions.unlock('completionist', 'The Full Scripture', 'You have read every chapter. Kopecky has noted your thoroughness. He finds it adequate.')
    }
  }, [state.visitedPages, state.achievements, actions])

  // Achievement: satchel curiosity
  useEffect(() => {
    if (state.satchelClicks === 3 && !state.achievements.includes('satchel-curious')) {
      actions.unlock('satchel-curious', 'Do Not Touch the Satchel', 'You have tried to interact with the satchel three times. This is early-path information about you.')
    }
  }, [state.satchelClicks, state.achievements, actions])

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>
}

export function useApp() {
  const ctx = useContext(AppCtx)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

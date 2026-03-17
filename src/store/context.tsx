import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type PropsWithChildren,
} from 'react'
import { starterBadges } from '../data/badges'
import type { AppState } from '../types'
import type { AppAction } from './actions'
import { appReducer, initialState } from './reducer'

const STORAGE_KEY = 'poop-quest-state'

const loadPersistedState = (): AppState => {
  if (typeof window === 'undefined') return initialState

  try {
    const rawState = window.localStorage.getItem(STORAGE_KEY)
    if (!rawState) return initialState
    const parsed = JSON.parse(rawState) as Partial<AppState>

    return {
      ...initialState,
      ...parsed,
      settings: {
        ...initialState.settings,
        ...parsed.settings,
      },
      progress: {
        ...initialState.progress,
        ...parsed.progress,
      },
      badges: parsed.badges?.length ? parsed.badges : starterBadges,
      records: parsed.records ?? [],
      ui: {
        lastReward: null,
      },
    }
  } catch {
    return initialState
  }
}

const AppContext = createContext<{ state: AppState; dispatch: Dispatch<AppAction> } | null>(null)

export const AppProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(appReducer, undefined, loadPersistedState)

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ...state,
        ui: {
          lastReward: null,
        },
      }),
    )
  }, [state])

  const value = useMemo(() => ({ state, dispatch }), [state])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider')
  }
  return context
}

import React, { createContext, useContext, useReducer, useEffect } from 'react'
import { initialTransactions } from '../data/mockData'

const AppContext = createContext(null)

const STORAGE_KEY = 'finance_dashboard_state'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return null
}

const defaultState = {
  transactions: initialTransactions,
  role: 'admin', // 'admin' | 'viewer'
  theme: 'light',
  filters: { search: '', category: '', type: '', month: '' },
  activePage: 'dashboard',
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE': return { ...state, role: action.payload }
    case 'SET_THEME': return { ...state, theme: action.payload }
    case 'SET_PAGE': return { ...state, activePage: action.payload }
    case 'SET_FILTER': return { ...state, filters: { ...state.filters, ...action.payload } }
    case 'RESET_FILTERS': return { ...state, filters: defaultState.filters }
    case 'ADD_TRANSACTION': return { ...state, transactions: [action.payload, ...state.transactions] }
    case 'EDIT_TRANSACTION': return {
      ...state,
      transactions: state.transactions.map(t => t.id === action.payload.id ? action.payload : t)
    }
    case 'DELETE_TRANSACTION': return {
      ...state,
      transactions: state.transactions.filter(t => t.id !== action.payload)
    }
    default: return state
  }
}

export function AppProvider({ children }) {
  const saved = loadState()
  const [state, dispatch] = useReducer(reducer, saved || defaultState)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme)
  }, [state.theme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  return useContext(AppContext)
}

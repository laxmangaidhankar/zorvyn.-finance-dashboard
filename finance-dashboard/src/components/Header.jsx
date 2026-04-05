import React from 'react'
import { useApp } from '../context/AppContext'

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
}

export default function Header({ onMenuClick }) {
  const { state, dispatch } = useApp()

  const toggleTheme = () =>
    dispatch({ type: 'SET_THEME', payload: state.theme === 'light' ? 'dark' : 'light' })

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className="page-title">{PAGE_TITLES[state.activePage]}</h1>
      </div>

      <div className="header-right">
        <select
          className="role-select"
          value={state.role}
          onChange={e => dispatch({ type: 'SET_ROLE', payload: e.target.value })}
          aria-label="Switch role"
        >
          <option value="admin">👤 Admin</option>
          <option value="viewer">👁 Viewer</option>
        </select>

        <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
          {state.theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  )
}

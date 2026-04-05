import React from 'react'
import { useApp } from '../context/AppContext'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'transactions', label: 'Transactions', icon: '⇄' },
  { id: 'insights', label: 'Insights', icon: '◎' },
]

export default function Sidebar({ mobileOpen, onClose }) {
  const { state, dispatch } = useApp()

  return (
    <>
      {mobileOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      <aside className={`sidebar ${mobileOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">FinTrack</span>
        </div>

        <nav className="sidebar-nav">
          {NAV.map(item => (
            <button
              key={item.id}
              className={`nav-item ${state.activePage === item.id ? 'nav-item--active' : ''}`}
              onClick={() => { dispatch({ type: 'SET_PAGE', payload: item.id }); onClose() }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="role-badge">
            <span className={`role-dot role-dot--${state.role}`} />
            <span>{state.role === 'admin' ? 'Admin' : 'Viewer'}</span>
          </div>
        </div>
      </aside>
    </>
  )
}

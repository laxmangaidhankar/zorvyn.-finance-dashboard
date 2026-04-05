import React, { useState } from 'react'
import { AppProvider, useApp } from './context/AppContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Insights from './pages/Insights'
import './App.css'

function AppShell() {
  const { state } = useApp()
  const [mobileOpen, setMobileOpen] = useState(false)

  const pages = { dashboard: Dashboard, transactions: Transactions, insights: Insights }
  const Page = pages[state.activePage] || Dashboard

  return (
    <div className="app-layout">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="app-main">
        <Header onMenuClick={() => setMobileOpen(o => !o)} />
        <main className="app-content">
          <Page />
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppShell />
    </AppProvider>
  )
}

import React from 'react'
import { useApp } from '../context/AppContext'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export default function SummaryCards() {
  const { state } = useApp()
  const txs = state.transactions

  const income = txs.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const expenses = txs.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const balance = income - expenses

  // Month-over-month change
  const now = new Date()
  const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
  // Use latest month in data as "current"
  const months = [...new Set(txs.map(t => t.date.slice(0, 7)))].sort()
  const latestMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]

  const monthIncome = txs.filter(t => t.date.startsWith(latestMonth) && t.type === 'income').reduce((s, t) => s + t.amount, 0)
  const monthExpenses = txs.filter(t => t.date.startsWith(latestMonth) && t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const prevExpenses = txs.filter(t => t.date.startsWith(prevMonth) && t.type === 'expense').reduce((s, t) => s + t.amount, 0)
  const expenseChange = prevExpenses ? ((monthExpenses - prevExpenses) / prevExpenses * 100).toFixed(1) : 0

  const cards = [
    {
      label: 'Total Balance',
      value: fmt(balance),
      sub: 'All time net',
      color: 'primary',
      icon: '◈',
    },
    {
      label: 'Total Income',
      value: fmt(income),
      sub: `${fmt(monthIncome)} this month`,
      color: 'green',
      icon: '↑',
    },
    {
      label: 'Total Expenses',
      value: fmt(expenses),
      sub: `${expenseChange > 0 ? '+' : ''}${expenseChange}% vs last month`,
      color: expenseChange > 0 ? 'red' : 'green',
      icon: '↓',
    },
    {
      label: 'Savings Rate',
      value: income > 0 ? `${((balance / income) * 100).toFixed(1)}%` : '0%',
      sub: 'Income saved overall',
      color: 'blue',
      icon: '◎',
    },
  ]

  return (
    <div className="cards-grid">
      {cards.map(card => (
        <div key={card.label} className={`card card--${card.color}`}>
          <div className="card-header">
            <span className="card-label">{card.label}</span>
            <span className={`card-icon card-icon--${card.color}`}>{card.icon}</span>
          </div>
          <div className="card-value">{card.value}</div>
          <div className="card-sub">{card.sub}</div>
        </div>
      ))}
    </div>
  )
}

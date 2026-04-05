import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useApp } from '../context/AppContext'
import { getMonthlyData, getCategoryBreakdown, CATEGORY_COLORS } from '../data/mockData'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="chart-tooltip">
      <p className="tooltip-label">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.fill }}>{p.name}: {fmt(p.value)}</p>
      ))}
    </div>
  )
}

export default function InsightsSection() {
  const { state } = useApp()
  const txs = state.transactions

  const monthly = getMonthlyData(txs)
  const catBreakdown = getCategoryBreakdown(txs)
  const topCategory = catBreakdown[0]

  const months = monthly.slice(-3)
  const latestMonth = monthly[monthly.length - 1]
  const prevMonth = monthly[monthly.length - 2]
  const expenseDiff = latestMonth && prevMonth
    ? ((latestMonth.expenses - prevMonth.expenses) / prevMonth.expenses * 100).toFixed(1)
    : 0

  const avgMonthlyExpense = monthly.length
    ? (monthly.reduce((s, m) => s + m.expenses, 0) / monthly.length).toFixed(0)
    : 0

  const savingsMonths = monthly.filter(m => m.balance > 0).length

  const insights = [
    {
      icon: '🏆',
      title: 'Top Spending Category',
      value: topCategory ? topCategory.name : 'N/A',
      detail: topCategory ? `${fmt(topCategory.value)} total spent` : '',
      color: 'yellow',
    },
    {
      icon: expenseDiff > 0 ? '📈' : '📉',
      title: 'Month-over-Month Expenses',
      value: `${expenseDiff > 0 ? '+' : ''}${expenseDiff}%`,
      detail: latestMonth ? `${latestMonth.label}: ${fmt(latestMonth.expenses)}` : '',
      color: expenseDiff > 0 ? 'red' : 'green',
    },
    {
      icon: '💰',
      title: 'Avg Monthly Expenses',
      value: fmt(avgMonthlyExpense),
      detail: `Across ${monthly.length} months`,
      color: 'blue',
    },
    {
      icon: '✅',
      title: 'Profitable Months',
      value: `${savingsMonths} / ${monthly.length}`,
      detail: 'Months with positive balance',
      color: 'green',
    },
  ]

  return (
    <div className="insights-wrap">
      <div className="insight-cards">
        {insights.map(ins => (
          <div key={ins.title} className={`insight-card insight-card--${ins.color}`}>
            <span className="insight-icon">{ins.icon}</span>
            <div>
              <p className="insight-title">{ins.title}</p>
              <p className="insight-value">{ins.value}</p>
              <p className="insight-detail">{ins.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="charts-row">
        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Monthly Comparison</h2>
            <span className="chart-sub">Last {months.length} months</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={months} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="label" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tickFormatter={v => `$${v / 1000}k`} tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="#10b981" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" name="Expenses" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <div className="chart-card-header">
            <h2 className="chart-title">Top Spending Categories</h2>
            <span className="chart-sub">All time</span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={catBreakdown.slice(0, 6)} layout="vertical" margin={{ top: 5, right: 20, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
              <XAxis type="number" tickFormatter={v => `$${v / 1000}k`} tick={{ fill: 'var(--text2)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fill: 'var(--text2)', fontSize: 12 }} axisLine={false} tickLine={false} width={60} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Spent" radius={[0, 4, 4, 0]}>
                {catBreakdown.slice(0, 6).map(entry => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

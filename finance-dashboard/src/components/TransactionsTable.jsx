import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, CATEGORY_COLORS } from '../data/mockData'
import AddTransactionModal from './AddTransactionModal'

function fmt(n) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
}

export default function TransactionsTable({ limit }) {
  const { state, dispatch } = useApp()
  const { transactions, filters, role } = state
  const [sortKey, setSortKey] = useState('date')
  const [sortDir, setSortDir] = useState('desc')
  const [editing, setEditing] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const months = useMemo(() => {
    const s = new Set(transactions.map(t => t.date.slice(0, 7)))
    return [...s].sort().reverse()
  }, [transactions])

  const filtered = useMemo(() => {
    let list = [...transactions]
    if (filters.search) {
      const q = filters.search.toLowerCase()
      list = list.filter(t =>
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }
    if (filters.category) list = list.filter(t => t.category === filters.category)
    if (filters.type) list = list.filter(t => t.type === filters.type)
    if (filters.month) list = list.filter(t => t.date.startsWith(filters.month))

    list.sort((a, b) => {
      let av = a[sortKey], bv = b[sortKey]
      if (sortKey === 'amount') { av = Number(av); bv = Number(bv) }
      if (av < bv) return sortDir === 'asc' ? -1 : 1
      if (av > bv) return sortDir === 'asc' ? 1 : -1
      return 0
    })

    return limit ? list.slice(0, limit) : list
  }, [transactions, filters, sortKey, sortDir, limit])

  const sort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('desc') }
  }

  const arrow = (key) => sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''

  const exportCSV = () => {
    const header = 'Date,Description,Category,Type,Amount'
    const rows = filtered.map(t => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
    const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv' })
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob)
    a.download = 'transactions.csv'; a.click()
  }

  return (
    <div className="table-card">
      {!limit && (
        <div className="table-toolbar">
          <input
            className="search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: { search: e.target.value } })}
          />
          <select className="filter-select" value={filters.category}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: { category: e.target.value } })}>
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
          <select className="filter-select" value={filters.type}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: { type: e.target.value } })}>
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select className="filter-select" value={filters.month}
            onChange={e => dispatch({ type: 'SET_FILTER', payload: { month: e.target.value } })}>
            <option value="">All Months</option>
            {months.map(m => (
              <option key={m} value={m}>
                {new Date(m + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>
          <div className="toolbar-actions">
            <button className="btn btn--ghost btn--sm" onClick={() => dispatch({ type: 'RESET_FILTERS' })}>Reset</button>
            <button className="btn btn--ghost btn--sm" onClick={exportCSV}>Export CSV</button>
            {role === 'admin' && (
              <button className="btn btn--primary btn--sm" onClick={() => setShowModal(true)}>+ Add</button>
            )}
          </div>
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="empty-state">No transactions found</div>
      ) : (
        <div className="table-wrap">
          <table className="tx-table">
            <thead>
              <tr>
                <th onClick={() => sort('date')} className="sortable">Date{arrow('date')}</th>
                <th>Description</th>
                <th onClick={() => sort('category')} className="sortable">Category{arrow('category')}</th>
                <th onClick={() => sort('type')} className="sortable">Type{arrow('type')}</th>
                <th onClick={() => sort('amount')} className="sortable text-right">Amount{arrow('amount')}</th>
                {role === 'admin' && !limit && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id}>
                  <td className="tx-date">{new Date(tx.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="tx-desc">{tx.description}</td>
                  <td>
                    <span className="category-badge" style={{ background: CATEGORY_COLORS[tx.category] + '22', color: CATEGORY_COLORS[tx.category] }}>
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge type-badge--${tx.type}`}>
                      {tx.type === 'income' ? '↑' : '↓'} {tx.type}
                    </span>
                  </td>
                  <td className={`tx-amount tx-amount--${tx.type}`}>
                    {tx.type === 'income' ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                  {role === 'admin' && !limit && (
                    <td className="tx-actions">
                      <button className="action-btn" onClick={() => { setEditing(tx); setShowModal(true) }}>✎</button>
                      <button className="action-btn action-btn--danger"
                        onClick={() => dispatch({ type: 'DELETE_TRANSACTION', payload: tx.id })}>✕</button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <AddTransactionModal
          editing={editing}
          onClose={() => { setShowModal(false); setEditing(null) }}
        />
      )}
    </div>
  )
}

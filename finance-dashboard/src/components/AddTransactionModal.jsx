import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { CATEGORIES } from '../data/mockData'

const empty = { date: '', amount: '', category: 'Food & Dining', type: 'expense', description: '' }

export default function AddTransactionModal({ onClose, editing }) {
  const { dispatch } = useApp()
  const [form, setForm] = useState(editing || empty)
  const [error, setError] = useState('')

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = (e) => {
    e.preventDefault()
    if (!form.date || !form.amount || !form.description) {
      setError('Please fill in all fields.')
      return
    }
    const amount = parseFloat(form.amount)
    if (isNaN(amount) || amount <= 0) {
      setError('Amount must be a positive number.')
      return
    }
    const tx = { ...form, amount, id: editing ? editing.id : Date.now() }
    dispatch({ type: editing ? 'EDIT_TRANSACTION' : 'ADD_TRANSACTION', payload: tx })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="modal-header">
          <h2>{editing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        <form onSubmit={submit} className="modal-form">
          {error && <p className="form-error">{error}</p>}

          <div className="form-row">
            <label>Date
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)} required />
            </label>
            <label>Type
              <select value={form.type} onChange={e => set('type', e.target.value)}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>Amount ($)
              <input type="number" min="0.01" step="0.01" placeholder="0.00"
                value={form.amount} onChange={e => set('amount', e.target.value)} required />
            </label>
            <label>Category
              <select value={form.category} onChange={e => set('category', e.target.value)}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </label>
          </div>

          <label className="form-full">Description
            <input type="text" placeholder="What was this for?"
              value={form.description} onChange={e => set('description', e.target.value)} required />
          </label>

          <div className="modal-actions">
            <button type="button" className="btn btn--ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn--primary">{editing ? 'Save Changes' : 'Add Transaction'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

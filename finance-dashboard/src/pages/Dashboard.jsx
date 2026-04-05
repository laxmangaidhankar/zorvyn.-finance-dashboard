import React from 'react'
import SummaryCards from '../components/SummaryCards'
import BalanceTrendChart from '../components/BalanceTrendChart'
import SpendingBreakdownChart from '../components/SpendingBreakdownChart'
import TransactionsTable from '../components/TransactionsTable'
import { useApp } from '../context/AppContext'

export default function Dashboard() {
  const { dispatch } = useApp()
  return (
    <div className="page">
      <SummaryCards />
      <div className="charts-row">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>
      <div className="section-header">
        <h2 className="section-title">Recent Transactions</h2>
        <button className="btn btn--ghost btn--sm" onClick={() => dispatch({ type: 'SET_PAGE', payload: 'transactions' })}>
          View all →
        </button>
      </div>
      <TransactionsTable limit={5} />
    </div>
  )
}

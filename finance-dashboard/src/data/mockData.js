export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Entertainment',
  'Healthcare', 'Shopping', 'Utilities', 'Education', 'Travel', 'Salary', 'Freelance', 'Investment'
]

export const CATEGORY_COLORS = {
  'Housing': '#6366f1',
  'Food & Dining': '#f59e0b',
  'Transport': '#3b82f6',
  'Entertainment': '#ec4899',
  'Healthcare': '#10b981',
  'Shopping': '#8b5cf6',
  'Utilities': '#06b6d4',
  'Education': '#f97316',
  'Travel': '#14b8a6',
  'Salary': '#22c55e',
  'Freelance': '#84cc16',
  'Investment': '#a855f7',
}

let idCounter = 1
function tx(date, amount, category, type, description) {
  return { id: idCounter++, date, amount, category, type, description }
}

export const initialTransactions = [
  // January
  tx('2024-01-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-01-03', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-01-05', 85, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-01-07', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-01-10', 320, 'Freelance', 'income', 'Web design project'),
  tx('2024-01-12', 60, 'Entertainment', 'expense', 'Netflix & Spotify'),
  tx('2024-01-14', 110, 'Food & Dining', 'expense', 'Restaurant dinner'),
  tx('2024-01-16', 200, 'Shopping', 'expense', 'Clothing'),
  tx('2024-01-18', 75, 'Utilities', 'expense', 'Electric bill'),
  tx('2024-01-20', 500, 'Investment', 'income', 'Dividend payout'),
  tx('2024-01-22', 40, 'Healthcare', 'expense', 'Pharmacy'),
  tx('2024-01-25', 95, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-01-28', 150, 'Education', 'expense', 'Online course'),
  // February
  tx('2024-02-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-02-02', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-02-04', 90, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-02-06', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-02-08', 480, 'Freelance', 'income', 'Logo design'),
  tx('2024-02-10', 60, 'Entertainment', 'expense', 'Streaming services'),
  tx('2024-02-13', 130, 'Food & Dining', 'expense', 'Valentine dinner'),
  tx('2024-02-15', 350, 'Shopping', 'expense', 'Electronics'),
  tx('2024-02-17', 80, 'Utilities', 'expense', 'Gas bill'),
  tx('2024-02-20', 120, 'Healthcare', 'expense', 'Doctor visit'),
  tx('2024-02-22', 100, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-02-25', 200, 'Travel', 'expense', 'Weekend trip'),
  // March
  tx('2024-03-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-03-02', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-03-05', 95, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-03-07', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-03-09', 600, 'Freelance', 'income', 'App development'),
  tx('2024-03-11', 60, 'Entertainment', 'expense', 'Streaming services'),
  tx('2024-03-13', 85, 'Food & Dining', 'expense', 'Lunch meetings'),
  tx('2024-03-15', 500, 'Investment', 'income', 'Stock sale'),
  tx('2024-03-17', 75, 'Utilities', 'expense', 'Electric bill'),
  tx('2024-03-19', 280, 'Shopping', 'expense', 'Home goods'),
  tx('2024-03-21', 55, 'Healthcare', 'expense', 'Pharmacy'),
  tx('2024-03-24', 105, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-03-27', 400, 'Travel', 'expense', 'Flight booking'),
  // April
  tx('2024-04-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-04-02', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-04-04', 88, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-04-06', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-04-08', 750, 'Freelance', 'income', 'Consulting'),
  tx('2024-04-10', 60, 'Entertainment', 'expense', 'Streaming services'),
  tx('2024-04-12', 95, 'Food & Dining', 'expense', 'Restaurant'),
  tx('2024-04-14', 80, 'Utilities', 'expense', 'Water & electric'),
  tx('2024-04-16', 180, 'Shopping', 'expense', 'Clothing'),
  tx('2024-04-18', 300, 'Investment', 'income', 'Dividend'),
  tx('2024-04-20', 65, 'Healthcare', 'expense', 'Gym membership'),
  tx('2024-04-23', 110, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-04-26', 220, 'Education', 'expense', 'Books & courses'),
  // May
  tx('2024-05-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-05-02', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-05-04', 92, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-05-06', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-05-08', 900, 'Freelance', 'income', 'Website project'),
  tx('2024-05-10', 60, 'Entertainment', 'expense', 'Streaming services'),
  tx('2024-05-12', 140, 'Food & Dining', 'expense', 'Birthday dinner'),
  tx('2024-05-14', 75, 'Utilities', 'expense', 'Electric bill'),
  tx('2024-05-16', 450, 'Shopping', 'expense', 'Appliance'),
  tx('2024-05-18', 85, 'Healthcare', 'expense', 'Dental checkup'),
  tx('2024-05-20', 115, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-05-22', 600, 'Travel', 'expense', 'Hotel booking'),
  tx('2024-05-25', 400, 'Investment', 'income', 'Dividend'),
  // June
  tx('2024-06-01', 5200, 'Salary', 'income', 'Monthly salary'),
  tx('2024-06-02', 1200, 'Housing', 'expense', 'Rent payment'),
  tx('2024-06-04', 98, 'Food & Dining', 'expense', 'Grocery store'),
  tx('2024-06-06', 45, 'Transport', 'expense', 'Monthly transit pass'),
  tx('2024-06-08', 1100, 'Freelance', 'income', 'Long-term contract'),
  tx('2024-06-10', 60, 'Entertainment', 'expense', 'Streaming services'),
  tx('2024-06-12', 120, 'Food & Dining', 'expense', 'Restaurant'),
  tx('2024-06-14', 80, 'Utilities', 'expense', 'Bills'),
  tx('2024-06-16', 300, 'Shopping', 'expense', 'Summer clothes'),
  tx('2024-06-18', 50, 'Healthcare', 'expense', 'Pharmacy'),
  tx('2024-06-20', 125, 'Food & Dining', 'expense', 'Weekly groceries'),
  tx('2024-06-22', 800, 'Travel', 'expense', 'Summer vacation'),
]

export function getMonthlyData(transactions) {
  const months = {}
  transactions.forEach(t => {
    const month = t.date.slice(0, 7)
    if (!months[month]) months[month] = { month, income: 0, expenses: 0 }
    if (t.type === 'income') months[month].income += t.amount
    else months[month].expenses += t.amount
  })
  return Object.values(months)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(m => ({
      ...m,
      label: new Date(m.month + '-01').toLocaleString('default', { month: 'short', year: '2-digit' }),
      balance: m.income - m.expenses,
    }))
}

export function getCategoryBreakdown(transactions) {
  const cats = {}
  transactions.filter(t => t.type === 'expense').forEach(t => {
    cats[t.category] = (cats[t.category] || 0) + t.amount
  })
  return Object.entries(cats)
    .map(([name, value]) => ({ name, value, color: CATEGORY_COLORS[name] || '#6366f1' }))
    .sort((a, b) => b.value - a.value)
}

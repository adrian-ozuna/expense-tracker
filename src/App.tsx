import { createContext, useEffect, useState } from 'react'
import './App.css'
import { TransactionType } from './types/TransactionType'
import { AddTransaction } from './components/addTransaction'
import { TransactionElement } from './components/TransactionElement'
import { Divider } from './components/divider'

export const TransactionContext = createContext(0);

function App() {
  const [income, setIncome] = useState<number>(0)
  const [expense, setExpense] = useState<number>(0)
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  useEffect(() => {
    let localIncome = 0
    let localExpense = 0

    transactions.forEach((transaction) => {
      const amount = parseFloat(transaction.amount)

      if (amount > 0) {
        localIncome += amount
      } else {
        localExpense += amount
      }

    })
    setIncome(localIncome)
    setExpense(localExpense)
  }, [transactions])

  const onAdd = (transaction: TransactionType) => {
    alert(income)
    setTransactions([...transactions, transaction])
  }

  const onDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  return (
    <TransactionContext.Provider value={transactions.length}>
      <main>
        <div className="flex justify-center items-center">
          <div className="flex flex-col gap-2">
            <header>
              <h1 className='font-bold text-4xl text-center mb-6'>Expense Tracker</h1>
            </header>
            <div className="flex flex-col">
              <p className='text-xl'>Your balance</p>
              <p className='text-4xl'>${income + expense}</p>
            </div>
            <div className="flex flex-row bg-white w-full gap-8 text-center justify-center p-4 rounded">
              <div className="flex flex-col">
                <p className='font-bold'>Income</p>
                <p className='text-green-500'>${income}</p>
              </div>
              <div className="flex flex-col">
                <p className='font-bold'>Expense</p>
                <p className='text-red-500'>${expense}</p>
              </div>
            </div>
            <Divider/>
            <h2 className='text-xl'>History</h2>
            <Divider />
            <div className="flex flex-col divide-y">
              {transactions.map(transaction => <TransactionElement transaction={transaction} onDelete={onDelete} key={transaction.id} />)}
            </div>
            <h2 className='text-xl'>Add new transaction</h2>
            <AddTransaction onAdd={onAdd} />
          </div>
        </div>
      </main>
    </TransactionContext.Provider>
  )
}

export default App

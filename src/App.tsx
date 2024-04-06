import { createContext, useState } from 'react'
import './App.css'
import { TransactionType } from './types/TransactionType'
import { AddTransaction } from './components/addTransaction'
import { TransactionElement } from './components/TransactionElement'

export const TransactionContext = createContext(0);

function App() {
  const [balance, setBalance] = useState<number>(0)
  const [income, setIncome] = useState<number>(0)
  const [expense, setExpense] = useState<number>(0)
  const [transactions, setTransactions] = useState<TransactionType[]>([])

  const handleBalanceChange = (transaction: TransactionType) => {
    const amount = parseFloat(transaction.amount)
    const amountSign = transaction.amount[0]

    setBalance(balance + amount)

    if (amountSign === "-") {
      setExpense(amount)
    } else {
      setIncome(amount)
    }
  }

  const onAdd = (transaction: TransactionType) => {
    console.log(transaction.id)
    setTransactions([...transactions, transaction])
    handleBalanceChange(transaction)
  }

  const onDelete = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id))
  }

  return (
    <TransactionContext.Provider value={transactions.length}>
      <div className="flex justify-center items-center">
        <div className="flex flex-col">
          <h1 className='font-bold text-4xl text-center mb-6'>Expense Tracker</h1>
          <div className="flex flex-col">
            <p>Your balance</p>
            <p>${balance}</p>
          </div>
          <div className="flex flex-row bg-white w-full gap-8 text-center justify-center p-4">
            <div className="flex flex-col">
              <p>Income</p>
              <p className='text-green-500'>${income}</p>
            </div>
            <div className="flex flex-col">
              <p>Expense</p>
              <p className='text-red-500'>${expense}</p>
            </div>
          </div>
          <h2>History</h2>
          {transactions.map(transaction => <TransactionElement transaction={transaction} onDelete={onDelete} key={transaction.id} />)}
          <h2>Add new transaction</h2>
          <AddTransaction onAdd={onAdd} />
        </div>
      </div>
    </TransactionContext.Provider>
  )
}

export default App

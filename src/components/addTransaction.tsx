import { useContext, useState } from "react";
import { TransactionType } from "../types/TransactionType"
import { TransactionContext } from "../App";

interface Props {
    onAdd: (transaction: TransactionType) => void;
}

export const AddTransaction = ({ onAdd }: Props) => {
    const [text, setText] = useState<string>("")
    const [amount, setAmount] = useState<string>("")
    
    const transactionsLength = useContext(TransactionContext)

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!text || !amount) {
            alert("Please add a transaction")
            return
        }
        
        onAdd({
            id: transactionsLength,
            text: text,
            amount: amount
        })

        setText('')
        setAmount('')
    }

    return (
        <>
            <form className='flex flex-col gap-2' onSubmit={onSubmit}>
                <label htmlFor="text">Text</label>
                <input type="text" className='p-3 rounded' name='text' id='text' placeholder='Enter text...' value={text} onChange={(e) => setText(e.target.value)} />

                <label htmlFor="amount">Amount (use a negative sign for expenses)</label>
                <input type="text" className='p-3 rounded' name='amount' id='amount' placeholder='Enter amount...' value={amount} onChange={(e) => setAmount(e.target.value)} />

                <input type="submit" className='p-4 rounded bg-red-500 hover:bg-red-600 mt-4 transition duration-150 ease-in-out' value='Add transaction' />
            </form>
        </>
    )
}
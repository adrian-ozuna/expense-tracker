import { TransactionType } from "../types/TransactionType"

interface Props {
    transaction: TransactionType;
    onDelete: (id: number) => void;
}

export const TransactionElement = ({ transaction, onDelete }: Props) => {
    return (
        <>
            <div className="group flex flex-row">
                <div className="flex flex-row justify-between bg-white p-4 w-full">
                    <p>{transaction.text}</p>
                    <p className={parseFloat(transaction.amount) < 0 ? "text-red-500" : "text-green-500"}>{transaction.amount}</p>
                </div>
                <input type="button" onClick={() => onDelete(transaction.id)} className="hidden group-hover:block bg-red-500 w-24" value="X" />
            </div>
        </>
    )
}
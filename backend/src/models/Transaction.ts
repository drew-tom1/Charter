export interface Transaction {
    name: string,
    amount: number,
    created_at: Date,
    type: "credit" | "debit"
};

export const defaultTransaction: Partial<Transaction> = {
    created_at: new Date()
}

export function compileTransactionInfo (name: string, amount: number, type: string): Transaction {
    return {
        ...defaultTransaction as Transaction,
        name,
        amount
    }
}
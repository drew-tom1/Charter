export interface User {
    name: string,
    email: string,
    amount_paid: number,
    total_balance: number,
    crossing_class: string,
    status: string,
    created_at: Date,
}

export function compileUserInfo (name: string, email: string, amount_paid: number, total_balance: number, crossing_class: string, status: string): User {
    return {
        name,
        email,
        crossing_class,
        total_balance,
        amount_paid,
        status,
        created_at: new Date()
    };
}
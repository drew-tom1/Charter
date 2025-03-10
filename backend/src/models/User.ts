export interface User {
    uuid: string,
    name: string,
    email: string | null,
    total_due: number | null,
    created_at: Date,
    role: string | null,
}

export const defaultUser: Partial<User> = {
    uuid: crypto.randomUUID(),
    total_due: 0,
    created_at: new Date(),
    role: "Active",
}
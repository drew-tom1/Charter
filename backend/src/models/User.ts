export interface User {
    uuid: string,
    name: string,
    email: string,
    total_due: number,
    created_at: Date,
    role: string,
    status: string
}

export const defaultUser: Partial<User> = {
    total_due: 0,
    created_at: new Date(),
    role: "brother",
    status: "active"
}

export function compileUserInfo (name: string, email: string): User {
    return {
        ...defaultUser as User,
        name,
        email,
    };
}
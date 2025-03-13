export interface User {
    uuid: string,
    name: string,
    email: string | null,
    total_due: number | null,
    created_at: Date,
    role: string | null,
}

export const defaultUser: Partial<User> = {
    total_due: 0,
    created_at: new Date(),
    role: "Active",
}

export function compileUserInfo (name: string, email: string | null): User {
    return {
        ...defaultUser as User,
        name,
        email,
    };
}
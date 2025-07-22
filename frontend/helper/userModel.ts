import { z } from "zod";

export interface User {
    id: string,
    name: string,
    email: string,
    amount_paid: number,
    total_balance: number,
    crossing_class: string,
    status: string,
    created_at: string,
}

export interface userData {
    usersList: User[]
}

export const memberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  crossing_class: z.string(),
  total_balance: z.number(),
  amount_paid: z.number(),
  created_at: z.string(),
})
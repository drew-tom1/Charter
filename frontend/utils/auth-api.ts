import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react"
import supabase from "./supabase"
import { Session, User } from "@supabase/supabase-js"

interface AuthPayload {
    email: string,
    password: string
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getAuthSession: builder.query<Session | null, void>({
      async queryFn() {
        const { data, error } = await supabase.auth.getSession()

        if (error) {
            return { error: { status: 500, data: error.message } }
        }

        if (data.session === null) {
            return { error: { status: 401, data: "No valid user at these credentials" }}
        }
        return { data: data.session }
      },
    }),
    loginUser: builder.mutation<any, { email: string, password: string }>({
        async queryFn({ email, password }) {
            const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
            })
            if (error) {
            return { error: { status: 400, data: error.message } }
            }
            return { data }
        },
    }),
    registerUser: builder.mutation<{ user: User | null; session: Session | null }, AuthPayload>({
      async queryFn({ email, password }) {
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) return { error: { status: 400, data: error.message } }
        return { data }
      },
    }),
    logoutUser: builder.mutation<void, void>({
      async queryFn() {
        const { error } = await supabase.auth.signOut()
        if (error) return { error: { status: 400, data: error.message } }
        return { data: undefined }
      }
    }),
  })
})

export const {
    useGetAuthSessionQuery,
    useLoginUserMutation,
    useRegisterUserMutation,
    useLogoutUserMutation
} = authApi;
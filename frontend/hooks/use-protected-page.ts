"use client"

import { useGetAuthSessionQuery } from "@/utils/auth-api"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import type { Session } from "@supabase/supabase-js"

export function useProtectedPage() {
  const { data: session, isLoading, isError, error } = useGetAuthSessionQuery()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && isError) {
      const status = (error as any)?.status
      if (status === 401) {
        router.push("/unauthorized")
      }
    }
  }, [isLoading, isError, error, router])

  return { session: session as Session | null, isLoading, isError }
}

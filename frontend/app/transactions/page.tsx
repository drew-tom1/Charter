"use client";

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import data from './data.json'
import { TransactionLedger } from "@/components/transaction-table"
import { useProtectedPage } from "@/hooks/use-protected-page"

export default function Page() {
  const { session, isLoading, isError } = useProtectedPage()

  if (!session) {
    return null // redirect is handled by useProtectedPage
  }

  const sidebarUser = {
    name: session.user.user_metadata?.full_name || "User",
    email: session.user.email || "",
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={sidebarUser} variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <TransactionLedger data={data}/>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

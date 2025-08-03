"use client"
import { useProtectedPage } from "@/hooks/use-protected-page"
import { AppSidebar } from "@/components/app-sidebar"
import { DataTable } from "@/components/member-display"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { Skeleton } from "@/components/ui/skeleton"
import { useGetTableInfoQuery } from "./redux/api"


export default function Page() {
  const { session, isLoading, isError } = useProtectedPage()
  const { data: tableData, isLoading: isTableDataLoading, isError: isTableDataError, error: tableDataError } = useGetTableInfoQuery()

  if (tableDataError) {
    console.log("Something went wrong. RTK Query for Table")
    console.log(tableDataError)
  }

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
              <SectionCards />
              {isTableDataLoading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-" />
                </div>
              ) : tableData ? (
                <DataTable data={tableData.usersList} />
              ) : (
                <div>No member data available.</div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

"use client"

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
  const { data, isLoading: loading, isError, error } = useGetTableInfoQuery()

  if (error) {
    console.log("Something went wrong. RTK Query for Table")
    console.log(error)
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
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              {loading ? (
                <div className="flex flex-col gap-2">
                  <Skeleton className="h-" />
                </div>
              ) : data ? (
                <DataTable data={data.usersList} />
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

"use client"

import { useState } from "react"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { AlumniCard } from "@/components/alumni-card"
import { v4 as uuidv4 } from "uuid"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useProtectedPage } from "@/hooks/use-protected-page"

interface Alumni {
  id: string
  name: string
  contact: string
  job: string
  designation: string
}

export default function AlumniRosterPage() {
  const { session, isLoading, isError } = useProtectedPage()
  const [alumniList, setAlumniList] = useState<Alumni[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Omit<Alumni, "id">>({
    name: "",
    contact: "",
    job: "",
    designation: "",
  })

  if (!session) {
    return null // redirect is handled by useProtectedPage
  }

  const handleAdd = () => {
    setAlumniList([...alumniList, { ...form, id: uuidv4() }])
    setForm({ name: "", contact: "", job: "", designation: "" })
    setOpen(false)
  }

  const handleDelete = (id: string) => {
    return null
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

        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <Button onClick={() => setOpen(true)}>+ Add Alumni</Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {alumniList.map((alumni) => (
              <AlumniCard key={alumni.id} {...alumni} onDelete={handleDelete} />
            ))}
          </div>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Alumni</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <Label>Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Label>Contact</Label>
              <Input
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
              />
              <Label>Job Title</Label>
              <Input
                value={form.job}
                onChange={(e) => setForm({ ...form, job: e.target.value })}
              />
              <Label>Designation</Label>
              <Input
                value={form.designation}
                onChange={(e) => setForm({ ...form, designation: e.target.value })}
              />
              <Button className="w-full mt-4" onClick={handleAdd}>
                Add
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </SidebarInset>
    </SidebarProvider>
  )
}

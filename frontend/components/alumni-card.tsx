import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Alumni {
  id: string
  name: string
  contact: string
  company: string
  designation: string
  category: string
  onDelete: (id: string) => void
}

export function AlumniCard({ id, name, contact, company, designation, category, onDelete }: Alumni) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <p className="text-sm text-muted-foreground">{company} — {designation}</p>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm">{contact}</p>
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </CardContent>
    </Card>
  )
}
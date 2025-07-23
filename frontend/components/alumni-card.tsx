import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alumni } from "@/helper/alumniModel"

export function AlumniCard({ id, name, contact, company, designation, category }: Alumni) {
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
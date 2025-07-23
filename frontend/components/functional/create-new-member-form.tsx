import React from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { IconPlus } from "@tabler/icons-react"
import memberInfo from '@/helper/memberFormInfo.json'
import { useAddTableEntryMutation } from "@/app/dashboard/redux/api"



export function CreateNewMember() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false);
  const [crossingClass, setCrossingClass] = React.useState('')
  const [status, setStatus] = React.useState('')
  const [totalBalance, setTotalBalance] = React.useState(0)
  const [amountPaid, setAmountPaid] = React.useState(0)
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [submissionStatus, setSubmissionStatus] = React.useState<"success" | "error" | null>(null)
  const [addTableEntry, { isLoading, isError }] = useAddTableEntryMutation()



  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);

    if (!open) {
      handleReset();
    };
  };

  const handleCrossingClassChange = (term: string) => {
    setCrossingClass(term);
  };

  const handleStatusChange = (status: string) => {
    setStatus(status);
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setAmountPaid(0);
    setTotalBalance(0);
    setCrossingClass('');
    setStatus('');
    setSubmissionStatus(null);
    setIsOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newUser = {
      name,
      email,
      amount_paid: amountPaid,
      total_balance: totalBalance,
      status: status.toLowerCase(),
      crossing_class: crossingClass 
    }

    try {
      await addTableEntry(newUser)
      setSubmissionStatus("success");
    } catch (err) {
      setSubmissionStatus("error");
      console.log("LOGGING ERROR: ", err)
    }
    console.log(newUser)
  }

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange} direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <IconPlus />
            <span className="hidden lg:inline">Add New Member</span>
          </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>Create New Active Member</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="type">Crossing Class</Label>
                <Select onValueChange={handleCrossingClassChange}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {memberInfo.terms.map((term) => (
                      <SelectItem key={term} value={term}>
                        {term}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label htmlFor="status">Status</Label>
                <Select onValueChange={handleStatusChange}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {memberInfo.statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <Input
                id="amountPaid"
                placeholder="opt."
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="totalBalance">Total Balance</Label>
              <Input
                id="totalBalance"
                placeholder="opt."
                type="number"
                value={totalBalance}
                onChange={(e) => setTotalBalance(Number(e.target.value))}
              />
            </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
          {submissionStatus === "success" && (
            <p className="text-green-600">Member added successfully!</p>
          )}
          {submissionStatus === "error" && (
            <p className="text-red-600">Something went wrong. Please try again.</p>
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" onClick={handleReset}>Done</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
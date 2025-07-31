import React from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { IconPlus } from "@tabler/icons-react";
import memberInfo from "@/helper/memberFormInfo.json";
import { useAddTableEntryMutation } from "@/app/dashboard/redux/api";

export function CreateNewMember() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [crossingClass, setCrossingClass] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState(0);
  const [amountPaid, setAmountPaid] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [submissionStatus, setSubmissionStatus] = React.useState<"success" | "error" | null>(null);
  const [addTableEntry] = useAddTableEntryMutation();

  const handleReset = () => {
    setName("");
    setEmail("");
    setAmountPaid(0);
    setTotalBalance(0);
    setCrossingClass("");
    setStatus("");
    setSubmissionStatus(null);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) handleReset();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addTableEntry({
        name,
        email,
        amount_paid: amountPaid,
        total_balance: totalBalance,
        status: status.toLowerCase(),
        crossing_class: crossingClass,
      });
      setSubmissionStatus("success");
    } catch (err) {
      setSubmissionStatus("error");
      console.error("Submission error:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer transition-colors"
      >
        <IconPlus />
        <span className="hidden lg:inline">Add New Member</span>
      </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Active Member</DialogTitle>
        </DialogHeader>
        <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="crossingClass">Crossing Class</Label>
              <Select onValueChange={setCrossingClass}>
                <SelectTrigger id="crossingClass">
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {memberInfo.terms.map((term) => (
                    <SelectItem key={term} value={term}>
                      {term}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={setStatus}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {memberInfo.statuses.map((status, index) => (
                    <SelectItem key={index} value={status.value}>
                      {status.value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="amountPaid">Amount Paid</Label>
              <Input
                id="amountPaid"
                type="number"
                value={amountPaid}
                onChange={(e) => setAmountPaid(Number(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="totalBalance">Total Balance</Label>
              <Input
                id="totalBalance"
                type="number"
                value={totalBalance}
                onChange={(e) => setTotalBalance(Number(e.target.value))}
              />
            </div>
          </div>

          {submissionStatus === "success" && (
            <p className="text-green-600">Member added successfully!</p>
          )}
          {submissionStatus === "error" && (
            <p className="text-red-600">Something went wrong. Please try again.</p>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleReset} type="button">
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

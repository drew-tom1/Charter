"use client"

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useCount from "@/hooks/use-count";
import { useGetSectionCardInfoQuery } from "@/app/dashboard/redux/api";

export function SectionCards() {
  const { data, isLoading: loading, isError, error } = useGetSectionCardInfoQuery()

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Net Chapter Funds</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error"
            ) : data.netFunds !== null ? (
              `${data.netFunds}`
            ) : (
              "0"
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            available funds to the chapter
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total Brothers</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error"
            ) : data.count !== null ? (
              `${data.count}`
            ) : (
              "0"
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            number of actives this semester
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>
            Total Chapter Funds
          </CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error"
            ) : data.totalFunds !== null ? (
              `${data.totalFunds}`
            ) : (
              "0"
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">total amt expected from members</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Outstanding Balance</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {loading ? (
              "Loading..."
            ) : error ? (
              "Error"
            ) : data.outstandingBalance !== null ? (
              `${data.outstandingBalance}`
            ) : (
              "0"
            )}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">the total amt members owe</div>
        </CardFooter>
      </Card>
    </div>
  )
}

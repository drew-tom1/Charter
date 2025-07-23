"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Bar
} from "recharts"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useGetSectionCardInfoQuery } from "../dashboard/redux/api"
import { useGetBudgetQuery, useUpdateBudgetMutation } from "./redux/api"
import { Allocations } from "@/helper/budgetModel"

const COLORS = ["#4f46e5", "#22c55e", "#f97316", "#14b8a6", "#f43f5e"]

export default function Page() {

    const {data: demographicData, isLoading: isDemographicLoading, isError: isDemographicError, error: demographicError} = useGetSectionCardInfoQuery();
    const {data: budgetData, isLoading: isBudgetLoading, isError: IsBudgetError, error: budgetError} = useGetBudgetQuery();
    const [updateBudget, {isLoading: updateLoading, error: updateError}] = useUpdateBudgetMutation();
    const [allocations, setAllocations] = useState<Allocations>({
        recruitment: 0,
        brotherhood: 0,
        pnm_process: 0,
        projects: 0,
        special_events: 0,
    })

    // removing national dues from chapter budget
    const nationalsTax = demographicData?.count * 108.5
    const chapterFundsAfterTax = (demographicData?.totalFunds - nationalsTax)
    const totalAllocated = Object.values(allocations).reduce((sum, val) => sum + val, 0)
    const remainingFunds = chapterFundsAfterTax - totalAllocated


    useEffect(() => {
        if (budgetData?.allocations){
            setAllocations(budgetData.allocations)
        }
    }, [budgetData?.allocations])

    const handleChange = (category: string, value: string) => {
        setAllocations((prev) => ({
        ...prev,
        [category]: Number(value),
        }))
    }

    const chartData = Object.entries(allocations)
        .filter(([, value]) => value > 0)
        .map(([name, value]) => ({ name, value }))

    const handleSubmit = async () => {
        try {
            await updateBudget({ id: budgetData.id, allocations })
        } catch (err) {
            
        }
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

        <div className="p-6 space-y-6">
            <Card>
                <CardHeader>
                <CardTitle>Enter Budget Allocation by Category</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(allocations).map(([category, value]) => (
                    <div key={category}>
                    <label className="text-sm font-medium block mb-1">{category}</label>
                    <Input
                        type="number"
                        min="0"
                        value={allocations[category as keyof Allocations]}
                        onChange={(e) => handleChange(category, e.target.value)}
                    />
                    </div>
                ))}
                </CardContent>
                <div className="flex justify-between items-center px-6">
                    <span className={`text-sm ${remainingFunds < 0 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        Remaining: ${remainingFunds?.toFixed(2)}
                    </span>
                    <Button
                        size="sm"
                        onClick={handleSubmit}
                        disabled={updateLoading || remainingFunds < 0}
                    >
                        {updateLoading ? "Saving..." : "Save Budget"}
                    </Button>
                </div>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Budget Distribution</CardTitle>
                </CardHeader>
                    <CardContent className="w-full h-96 flex gap-4">
                        <ResponsiveContainer width="50%" height="100%">
                            <PieChart>
                                <Pie
                                data={chartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                label
                                >
                                {chartData.map((_, index) => (
                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                            </ResponsiveContainer>

                            <ResponsiveContainer width="50%" height="100%">
                            <BarChart data={chartData}>
                                <Tooltip />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Bar dataKey="value" fill="#4f46e5" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </SidebarInset>
    </SidebarProvider>
  )
}

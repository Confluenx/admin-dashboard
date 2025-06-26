'use client'
import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Users, Search, Calendar, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import authStore from "@/store/authStore"
import { ChartBarMultiple } from "../bar-chart/mulitiple-bar-chart"
import { RecentActivity } from "../recent-activity"
import { SportDistro } from "../sports-distribution"
import { fetchAthletesPerformances, fetchTotalAthletes, fetchAthleteList } from "@/components/dashboard-sections/services/athlete"
import { fetchScoutsPerformances, fetchTotalScouts } from "./services/scouts"

export interface performanceProps {
  lastMonthCount: number,
  prevMonthCount: number,
  percentageChange: number,
  trend: string
}

export function DashboardSection() {
  const [athletesPerformance, setAthletesPerformance] = useState<performanceProps | null>(null)
  const [scoutsPerformance, setScoutsPerformance] = useState<performanceProps| null>(null)
  const [totalScouts, setTotalScouts] = useState('')
  const [totalAthletes, setTotalAthletes] = useState('')

  async function getData() {
    const performanceData = await fetchAthletesPerformances()
    setAthletesPerformance(performanceData)
    
    const total = await fetchTotalAthletes()
    setTotalAthletes(total)

    const scoutPerformanceData = await fetchScoutsPerformances()
    setScoutsPerformance(scoutPerformanceData)

    const scoutTotal = await fetchTotalScouts()
    setTotalScouts(scoutTotal)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 capitalize">Welcome back, {authStore?.user?.name}.</h1>
          <p className="text-gray-600 mt-1"> Here's what's happening with your platform today.</p>
        </div>
        <div className="flex gap-3">
          {/* <Button className="bg-primary hover:bg-primary/90">Create Trial</Button> */}
          <Button variant="outline" className="border-primary">Generate Report</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Athletes</CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalAthletes}</div>
            {athletesPerformance ? 
              <div className="flex items-center text-sm text-green-600 mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                {athletesPerformance ? `${athletesPerformance.percentageChange}% from last month` : '...'}
              </div>
            : null}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Scouts</CardTitle>
            <Search className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{totalScouts}</div>
            {scoutsPerformance ? 
              <div className={`flex items-center text-sm text-green-600 mt-1`}>
                {scoutsPerformance?.trend == 'increase' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" /> }
                +{scoutsPerformance?.percentageChange}% from last month
              </div>
            : null}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Live Trials</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">127</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +24% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Applications Today</CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">83</div>
            <div className="flex items-center text-sm text-red-600 mt-1">
              <TrendingDown className="h-4 w-4 mr-1" />
              -5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        <SportDistro />

        <ChartBarMultiple />

        <RecentActivity />
      </div>
    </div>
  )
} 
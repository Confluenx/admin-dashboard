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
import { NotificationsSection } from "../recent-activity"
import { SportDistro } from "../sports-distribution"
import { fetchAthletesPerformances, fetchTotalAthletes, fetchAthletesList } from "@/components/dashboard-sections/services/athlete"
import { fetchScoutsPerformances, fetchTotalScouts } from "./services/scouts"
import { fetchTodayApplications, fetchTrialCount, fetchTrialStats } from "./services/trials"

export interface performanceProps {
  lastMonthCount: number,
  prevMonthCount: number,
  percentageChange: number,
  trend: string
}

export interface TrialStats {
  lastMonthCount: number;
  prevMonthCount: number;
  percentageChange: number;
  trend: string;
}

export function DashboardSection() {
  const [athletesPerformance, setAthletesPerformance] = useState<performanceProps | null>(null)
  const [scoutsPerformance, setScoutsPerformance] = useState<performanceProps| null>(null)
  const [totalScouts, setTotalScouts] = useState('')
  const [totalAthletes, setTotalAthletes] = useState('')
  const [trialCount, setTrialCount] = useState('')
  const [todayApplications, setTodayApplications] = useState('')
  const [isLoading, setIsLoading] = useState(true);
  const [trialStats, setTrialStats] = useState<TrialStats | null>(null);

  async function getData() {
    setIsLoading(true);
    const performanceData = await fetchAthletesPerformances()
    setAthletesPerformance(performanceData)
    
    const total = await fetchTotalAthletes()
    setTotalAthletes(total)

    const scoutPerformanceData = await fetchScoutsPerformances()
    setScoutsPerformance(scoutPerformanceData)

    const scoutTotal = await fetchTotalScouts()
    setTotalScouts(scoutTotal)
    setIsLoading(false);

    const trialCount = await fetchTrialCount()
    setTrialCount(trialCount)

    const todayApplications = await fetchTodayApplications()
    setTodayApplications(todayApplications)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    fetchTrialStats().then(setTrialStats);
  }, []);
  
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
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <>
                <div className="text-3xl font-bold text-gray-900">{totalAthletes}</div>
                {athletesPerformance ? 
                  <div className={`flex items-center text-sm ${athletesPerformance?.trend == 'increase' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {athletesPerformance?.trend == 'increase' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" /> }
                    {athletesPerformance?.percentageChange}% from last month
                  </div>
                : null}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Scouts</CardTitle>
            <Search className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
              </div>
            ) : (
              <> 
                <div className="text-3xl font-bold text-gray-900">{totalScouts || 0}</div>
                {scoutsPerformance ? 
                  <div className={`flex items-center text-sm ${scoutsPerformance?.trend == 'increase' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {scoutsPerformance?.trend == 'increase' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" /> }
                {scoutsPerformance?.percentageChange}% from last month
              </div>
                : null}
              </>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Live Trials</CardTitle>
            <Calendar className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{trialCount || 0}</div>
            {trialStats && (
              <div className={`flex items-center text-sm ${trialStats.trend == 'increase' ? 'text-green-600' : 'text-red-600'} mt-1`}>
                {trialStats.trend == 'increase' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" /> }
                {trialStats.percentageChange}% from last month
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Applications Today</CardTitle>
            <Activity className="h-5 w-5 text-purple-500" />
          </CardHeader>
          <CardContent> 
            <div className="text-3xl font-bold text-gray-900">{todayApplications || 0}</div>
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

        <NotificationsSection  />
      </div>
    </div>
  )
} 
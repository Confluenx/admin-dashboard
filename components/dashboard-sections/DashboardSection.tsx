import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Users, Search, Calendar, TrendingUp, TrendingDown, Activity } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

// Dummy data (should be passed as props in a real app)
const chartData = [
  { month: "Jan", athletes: 450, scouts: 120, trials: 80 },
  { month: "Feb", athletes: 380, scouts: 140, trials: 95 },
  { month: "Mar", athletes: 520, scouts: 180, trials: 120 },
  { month: "Apr", athletes: 680, scouts: 220, trials: 150 },
  { month: "May", athletes: 890, scouts: 280, trials: 180 },
  { month: "Jun", athletes: 1200, scouts: 350, trials: 220 },
  { month: "Jul", athletes: 1350, scouts: 380, trials: 240 },
]

const recentActivities = [
  {
    id: 1,
    type: "trial",
    message: "New trial application from John Smith",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "trial",
    message: "Soccer trial in Manchester created",
    time: "15 minutes ago",
    status: "active",
  },
  {
    id: 3,
    type: "verification",
    message: "Scout profile verified: Elite Sports FC",
    time: "1 hour ago",
    status: "completed",
  },
  {
    id: 4,
    type: "report",
    message: "Flagged content reported by user",
    time: "2 hours ago",
    status: "review",
  },
  {
    id: 5,
    type: "subscription",
    message: "Premium subscription renewed",
    time: "3 hours ago",
    status: "completed",
  },
]

export function DashboardSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Admin. Here's what's happening with your platform today.</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-blue-600 hover:bg-blue-700">Create Trial</Button>
          <Button variant="outline">Generate Report</Button>
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
            <div className="text-3xl font-bold text-gray-900">2,847</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Scouts</CardTitle>
            <Search className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">589</div>
            <div className="flex items-center text-sm text-green-600 mt-1">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8% from last month
            </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>User registrations and activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                athletes: {
                  label: "Athletes",
                  color: "hsl(var(--chart-1))",
                },
                scouts: {
                  label: "Scouts",
                  color: "hsl(var(--chart-2))",
                },
                trials: {
                  label: "Trials",
                  color: "hsl(var(--chart-3))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="athletes"
                    stackId="1"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="scouts"
                    stackId="1"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={0.6}
                  />
                  <Area
                    type="monotone"
                    dataKey="trials"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-xs text-gray-500">{activity.time}</p>
                      <Badge
                        variant={
                          activity.status === "active"
                            ? "default"
                            : activity.status === "completed"
                              ? "secondary"
                              : activity.status === "pending"
                                ? "outline"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
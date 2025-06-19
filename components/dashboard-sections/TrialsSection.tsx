import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Calendar, Users, TrendingUp, Eye, Edit } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const trials = [
  {
    id: 1,
    title: "Manchester United Youth Trial",
    sport: "Football",
    location: "Manchester, UK",
    date: "2024-01-25",
    time: "14:00",
    status: "upcoming",
    applicants: 156,
    capacity: 200,
    scout: "Elite Sports FC",
  },
  {
    id: 2,
    title: "London Basketball Championship",
    sport: "Basketball",
    location: "London, UK",
    date: "2024-01-20",
    time: "10:00",
    status: "active",
    applicants: 89,
    capacity: 100,
    scout: "Premier Basketball Academy",
  },
  {
    id: 3,
    title: "Wales Rugby Development",
    sport: "Rugby",
    location: "Cardiff, UK",
    date: "2024-01-15",
    time: "09:00",
    status: "completed",
    applicants: 234,
    capacity: 250,
    scout: "Rugby Excellence",
  },
]

export function TrialsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Trials & Events</h1>
          <p className="text-gray-600 mt-1">Manage trials, events, and scheduling</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Calendar View
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Create Trial</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Trials</CardTitle>
            <Calendar className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">127</div>
            <p className="text-xs text-green-600 mt-1">+24% this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Active Trials</CardTitle>
            <Badge className="bg-green-100 text-green-800">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">45</div>
            <p className="text-xs text-gray-500 mt-1">Currently running</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Applications</CardTitle>
            <Users className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-blue-600 mt-1">Across all trials</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Success Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">68%</div>
            <p className="text-xs text-green-600 mt-1">+5% from last month</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search trials by name, location, or sport..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="upcoming">Upcoming</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-sports">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Sports" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-sports">All Sports</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="rugby">Rugby</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Trials & Events ({trials.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Trial</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sport</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Date & Time</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Applications</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Scout</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {trials.map((trial) => (
                  <tr key={trial.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">{trial.title}</div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{trial.sport}</td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-gray-900">{trial.date}</div>
                        <div className="text-sm text-gray-500">{trial.time}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{trial.location}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          trial.status === "active"
                            ? "default"
                            : trial.status === "upcoming"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          trial.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : trial.status === "upcoming"
                              ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {trial.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-gray-900">
                          {trial.applicants}/{trial.capacity}
                        </div>
                        <div className="text-xs text-gray-500">
                          {Math.round((trial.applicants / trial.capacity) * 100)}% full
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{trial.scout}</td>
                    <td className="py-4 px-4">
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
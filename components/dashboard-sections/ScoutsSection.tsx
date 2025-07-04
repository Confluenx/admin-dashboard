import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Download, Search, Star, Eye, Edit } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { performanceProps } from "./DashboardSection"
import { fetchScoutsList, fetchScoutsPerformances, fetchTotalScouts } from "./services/scouts"

interface scoutProps {
  _id: string,
  name: string,
  email: string,
  skill: string,
  position: string,
  location: {
    country: string,
    city: string,
  },
  title: string,
  accountStatus: string,
  createdAt: string,
}

export function ScoutsSection() {
  const [scoutsPerformance, setScoutsPerformance] = useState<performanceProps| null>(null)
  const [totalScouts, setTotalScouts] = useState('')
  const [scoutData, setScoutData] = useState([])
  
  async function getData() {
    const scoutPerformanceData = await fetchScoutsPerformances()
    setScoutsPerformance(scoutPerformanceData)

    const scoutTotal = await fetchTotalScouts()
    setTotalScouts(scoutTotal)

    const scoutList = await fetchScoutsList()
    setScoutData(scoutList)
  }

  useEffect(() => {
    getData()
  }, [])
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Scout Management</h1>
          <p className="text-gray-600 mt-1">Manage scout profiles and verification status</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button className="bg-primary hover:bg-primary/90">Add Scout</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Scouts</CardTitle>
            <Search className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalScouts}</div>
            <p className="text-xs text-green-600 mt-1">+{scoutsPerformance?.lastMonthCount} this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Verified Scouts</CardTitle>
            <Badge className="bg-green-100 text-green-800">Verified</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">456</div>
            <p className="text-xs text-gray-500 mt-1">77% verification rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Pending Verification</CardTitle>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
              Pending
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">133</div>
            <p className="text-xs text-orange-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search scouts by name, organization, or location..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
          <CardTitle>Scouts ({totalScouts})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Organization</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Specialization</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  {/* <th className="text-left py-3 px-4 font-medium text-gray-600">Athletes</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th> */}
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scoutData.map((scout: scoutProps) => (
                  <tr key={scout?._id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-gray-900">{scout?.title}</div>
                        <div className="text-sm text-gray-500">Joined {scout?.createdAt}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <div className="text-gray-900">{scout.name}</div>
                        <div className="text-sm text-gray-500">{scout.email}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{scout?.skill}</td>
                    <td className="py-4 px-4 text-gray-900">{scout?.location.city}, {scout?.location.country}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={scout?.accountStatus == "Active" ? "default" : "outline"}
                        className={
                          scout?.accountStatus == "Active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : "bg-yellow-400 text-yellow-800 hover:bg-yellow-400"
                        }
                      >
                        {scout?.accountStatus}
                      </Badge>
                    </td>
                    {/* <td className="py-4 px-4 text-gray-900">{scout.athletes}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900">{scout.rating}</span>
                      </div>
                    </td> */}
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
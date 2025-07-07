import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Download, Search, Star, Eye, Edit, EllipsisVertical } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { performanceProps } from "./DashboardSection"
import { fetchScoutsList, fetchScoutsPerformances, fetchTotalScouts } from "./services/scouts"
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { useRouter } from "next/navigation";
import axios from "axios";

interface scoutProps {
  _id: string,
  name: string,
  email: string,
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
  const [scoutData, setScoutData] = useState<scoutProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  async function getData() {
    const scoutPerformanceData = await fetchScoutsPerformances()
    setScoutsPerformance(scoutPerformanceData)

    const scoutTotal = await fetchTotalScouts()
    setTotalScouts(scoutTotal)

    const scoutList = await fetchScoutsList()
    setScoutData(scoutList)
  }

  useEffect(() => {
    setIsLoading(true);
    getData().then(() => {
      setIsLoading(false);
    });
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
          {/* <Button className="bg-primary hover:bg-primary/90">Add Scout</Button> */}
        </div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Scouts</CardTitle>
            <Search className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalScouts || 0}</div>
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
      </div> */}
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
              <SelectItem value="rejected">Suspended</SelectItem>
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
              <SelectItem value="rugby">Tennis</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Scouts ({totalScouts || 0})</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Joined On</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Title</th>
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
                          {/* <div className="font-medium text-gray-900">{scout?.title}</div> */}
                          <div className="text-sm text-gray-500">{new Date(scout?.createdAt).toLocaleDateString()}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-gray-900">{scout.name}</div>
                          <div className="text-sm text-gray-500">{scout.email}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 capitalize">{scout?.title}</td>
                      <td className="py-4 px-4 text-gray-900">{scout?.location.city || "null"}, {scout?.location.country || "null"}</td>
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
                        <ScoutActions scout={scout} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 

function ScoutActions({ scout }: { scout: scoutProps }) {
  const router = useRouter();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="sm" variant="outline">
          <EllipsisVertical className="h-4 w-4 mr-1" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            onClick={() => router.push(`/scouts/${scout._id}`)}
          >
            View details
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
} 
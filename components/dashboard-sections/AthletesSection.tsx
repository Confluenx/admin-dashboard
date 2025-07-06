import React, { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Download, Filter, Star, Eye, Edit, EllipsisVertical } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { fetchAthletesList, fetchAthletesPerformances, fetchTotalAthletes } from "./services/athlete"
import { performanceProps } from "./DashboardSection"

interface athleteProps {
  _id: string,
  name: string,
  email: string,
  profileImg: string,
  skill: string,
  position: string,
  location: {
    country: string,
    city: string,
  },
  achievement: [],
  accountStatus: string,
  createdAt: string,
}

export function AthletesSection() {
  const [isLoading, setIsLoading] = useState(true);
  const [athletes, setAthletes] = useState<athleteProps[]>([]);
  const [athletesPerformance, setAthletesPerformance] = useState<performanceProps| null>(null)
  const [athletesTotal, setAthletesTotal] = useState('')
  const [athletesList, setAthletesList] = useState<athleteProps[]>([]);


  async function getData() {
    const athletesPerformanceData = await fetchAthletesPerformances()
    setAthletesPerformance(athletesPerformanceData)

    const athletesTotalData = await fetchTotalAthletes()
    setAthletesTotal(athletesTotalData)

    const athletesListData = await fetchAthletesList()
    setAthletesList(athletesListData)
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
          <h1 className="text-3xl font-bold text-gray-900">Athlete Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered athletes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Export Data
        </Button>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search athletes by name, email, or sport..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Athletes ({athletesList?.length})</CardTitle>
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
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Athlete</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Skill</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Position</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Achievements</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {athletesList?.map((athlete) => (
                    <tr key={athlete._id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={athlete?.profileImg || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {(athlete?.name ?? "")
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-gray-900">{athlete.name}</div>
                            <div className="text-sm text-gray-500">{athlete.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-900 capitalize">{athlete?.skill}</td>
                      <td className="py-4 px-4 text-gray-900">{athlete?.location?.city || "null"}, {athlete?.location?.country || "null" }</td>
                      <td className="py-4 px-4">
                        <Badge
                          variant={
                            athlete.accountStatus === "Active"
                              ? "default"
                              : athlete.accountStatus === "Suspended"
                                ? "outline"
                                : "secondary"
                          }
                          className={
                            athlete.accountStatus === "Active"
                              ? "bg-green-100 text-green-800 hover:bg-green-100"
                              : athlete.accountStatus === "Suspended"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                          }
                        >
                          {athlete.accountStatus}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-gray-900 capitalize">{athlete.position}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-900">{athlete?.achievement?.length}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <EllipsisVertical className="h-4 w-4 mr-1" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        }
        </CardContent>
      </Card>
    </div>
  )
} 
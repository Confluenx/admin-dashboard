import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Download, Filter, Star, Eye, Edit } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

const athletes = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    sport: "Football",
    location: "Manchester, UK",
    status: "active",
    trials: 12,
    rating: 4.8,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    sport: "Basketball",
    location: "London, UK",
    status: "pending",
    trials: 8,
    rating: 4.6,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike@example.com",
    sport: "Rugby",
    location: "Birmingham, UK",
    status: "inactive",
    trials: 15,
    rating: 4.9,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export function AthletesSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Athlete Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered athletes</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
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
          <CardTitle>Athletes ({athletes.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Athlete</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Sport</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Location</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Trials</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {athletes.map((athlete) => (
                  <tr key={athlete.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={athlete.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-blue-100 text-blue-600">
                            {athlete.name
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
                    <td className="py-4 px-4 text-gray-900">{athlete.sport}</td>
                    <td className="py-4 px-4 text-gray-900">{athlete.location}</td>
                    <td className="py-4 px-4">
                      <Badge
                        variant={
                          athlete.status === "active"
                            ? "default"
                            : athlete.status === "pending"
                              ? "outline"
                              : "secondary"
                        }
                        className={
                          athlete.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : athlete.status === "pending"
                              ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              : "bg-gray-100 text-gray-800 hover:bg-gray-100"
                        }
                      >
                        {athlete.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-gray-900">{athlete.trials}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-gray-900">{athlete.rating}</span>
                      </div>
                    </td>
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
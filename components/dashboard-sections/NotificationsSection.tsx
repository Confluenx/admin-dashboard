import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Bell, Activity } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const notifications = [
  {
    id: 1,
    title: "System Maintenance Scheduled",
    message: "Platform maintenance scheduled for tonight at 2:00 AM GMT",
    type: "system",
    priority: "high",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New Scout Application",
    message: "Manchester City Academy has submitted verification documents",
    type: "application",
    priority: "medium",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    title: "Trial Capacity Reached",
    message: "London Basketball Championship has reached maximum capacity",
    type: "trial",
    priority: "low",
    time: "3 hours ago",
    read: true,
  },
]

export function NotificationsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-1">Manage system notifications and alerts</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Mark All Read</Button>
          <Button className="bg-blue-600 hover:bg-blue-700">Create Notification</Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Notifications</CardTitle>
            <Bell className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Unread</CardTitle>
            <Badge variant="destructive">New</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-red-600 mt-1">Requires attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">High Priority</CardTitle>
            <Badge className="bg-red-100 text-red-800">High</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">5</div>
            <p className="text-xs text-red-600 mt-1">Urgent items</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Today</CardTitle>
            <Activity className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <p className="text-xs text-green-600 mt-1">New notifications</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search notifications..." className="w-full" />
        </div>
        <div className="flex gap-2">
          <Select defaultValue="all">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="system">System</SelectItem>
              <SelectItem value="application">Applications</SelectItem>
              <SelectItem value="trial">Trials</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-priority">
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="All Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-priority">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`flex items-start space-x-4 p-4 rounded-lg border ${
                  !notification.read ? "bg-blue-50 border-blue-200" : "bg-white border-gray-200"
                }`}
              >
                <div className="flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full mt-1 ${
                      notification.priority === "high"
                        ? "bg-red-500"
                        : notification.priority === "medium"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={
                          notification.priority === "high"
                            ? "bg-red-100 text-red-800"
                            : notification.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                        }
                      >
                        {notification.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{notification.time}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {notification.type}
                    </Badge>
                    {!notification.read && (
                      <Button size="sm" variant="ghost" className="text-xs">
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
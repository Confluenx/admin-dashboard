import React from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Users, Download, Bell, Settings, Activity, TrendingUp } from "lucide-react"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

export function SettingsSection() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Platform configuration and preferences</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Platform Name</label>
              <Input defaultValue="Confluenxe Sports Scouting" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Support Email</label>
              <Input defaultValue="support@confluenxe.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Default Language</label>
              <Select defaultValue="en">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Time Zone</label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="gmt">GMT</SelectItem>
                  <SelectItem value="est">EST</SelectItem>
                  <SelectItem value="pst">PST</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              Bulk User Import
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-4 w-4 mr-2" />
              Export All Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Bell className="h-4 w-4 mr-2" />
              Send Announcement
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-4 w-4 mr-2" />
              System Maintenance
            </Button>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Security Settings</CardTitle>
            <CardDescription>Platform security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Two-Factor Authentication</h4>
                <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Session Timeout</h4>
                <p className="text-sm text-gray-500">Auto-logout after inactivity</p>
              </div>
              <Select defaultValue="30">
                <SelectTrigger className="w-24">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15m</SelectItem>
                  <SelectItem value="30">30m</SelectItem>
                  <SelectItem value="60">1h</SelectItem>
                  <SelectItem value="120">2h</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-gray-900">Password Policy</h4>
                <p className="text-sm text-gray-500">Minimum password requirements</p>
              </div>
              <Button variant="outline" size="sm">
                Configure
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform health overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Database</span>
              <Badge className="bg-green-100 text-green-800">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">API Services</span>
              <Badge className="bg-green-100 text-green-800">Online</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">File Storage</span>
              <Badge className="bg-green-100 text-green-800">Available</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Email Service</span>
              <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
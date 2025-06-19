"use client"

import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import authStore from '../store/authStore'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Search,
  Calendar,
  BarChart3,
  Bell,
  HelpCircle,
  Settings,
  User,
  ChevronDown,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Activity,
  Eye,
  Edit,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { DashboardSection } from "./dashboard-sections/DashboardSection"
import { AthletesSection } from "./dashboard-sections/AthletesSection"
import { ScoutsSection } from "./dashboard-sections/ScoutsSection"
import { TrialsSection } from "./dashboard-sections/TrialsSection"
import { AnalyticsSection } from "./dashboard-sections/AnalyticsSection"
import { NotificationsSection } from "./dashboard-sections/NotificationsSection"
import { SupportSection } from "./dashboard-sections/SupportSection"
import { SettingsSection } from "./dashboard-sections/SettingsSection"

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { title: "Athletes", icon: Users, id: "athletes" },
  { title: "Scouts", icon: Search, id: "scouts" },
  { title: "Trials & Events", icon: Calendar, id: "trials" },
  { title: "Analytics", icon: BarChart3, id: "analytics" },
  { title: "Notifications", icon: Bell, id: "notifications" },
  { title: "Support", icon: HelpCircle, id: "support" },
  { title: "Settings", icon: Settings, id: "settings" },
]

export const AdminDashboard = observer(function AdminDashboard() {
  const router = useRouter()
  const [activeSection, setActiveSection] = useState("dashboard")

  useEffect(() => {
    if (!authStore.token) {
      router.push('/auth/login')
    }
  }, [authStore.token, router])

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardSection />
      case "athletes":
        return <AthletesSection />
      case "scouts":
        return <ScoutsSection />
      case "trials":
        return <TrialsSection />
      case "analytics":
        return <AnalyticsSection />
      case "notifications":
        return <NotificationsSection />
      case "support":
        return <SupportSection />
      case "settings":
        return <SettingsSection />
      default:
        return <DashboardSection />
    }
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200" variant="sidebar">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-8 w-8">
                <Image src="/images/confluenxe-logo.png" alt="Confluenxe" fill className="object-contain" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Admin Panel</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => setActiveSection(item.id)}
                    isActive={activeSection === item.id}
                    className={`w-full justify-start ${
                      activeSection === item.id
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarFallback className="bg-blue-100 text-blue-600">AU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium">Admin User</div>
                    <div className="text-xs text-gray-500">Super Admin</div>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center gap-4 border-b border-gray-200 bg-white px-6">
            <SidebarTrigger className="text-gray-600" />
            <Separator orientation="vertical" className="h-6" />
            <div className="flex-1" />
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
          </header>

          <main className="flex-1 p-6">{renderContent()}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
})

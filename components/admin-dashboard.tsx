"use client"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard, Users, Search, Calendar, BarChart3, Bell, HelpCircle, Settings, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import authStore from "@/store/authStore";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard" },
  { title: "Athletes", icon: Users, id: "athletes" },
  { title: "Scouts", icon: Search, id: "scouts" },
  { title: "Trials & Events", icon: Calendar, id: "trials" },
  // { title: "Analytics", icon: BarChart3, id: "analytics" },
  { title: "Notifications", icon: Bell, id: "notifications" },
  // { title: "Support", icon: HelpCircle, id: "support" },
  { title: "Settings", icon: Settings, id: "settings" },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter()

  const handleLogout = () => {
    authStore?.logout()
    router.push('/auth/login')
  }
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200" variant="sidebar">
          <SidebarHeader className="border-b border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-8 w-8">
                <Image src="/logo.png" alt="Confluenxe" fill className="object-contain rounded-sm" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">CONFLUENXE</h2>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="p-4">
            <SidebarMenu>
              {menuItems.map((item) => {
                let path = `/${item.id}`;
                if (item.id === 'dashboard') path = '/dashboard';
                if (item.id === 'trials') path = '/trials';
                const isActive = pathname === path;
                return (
                  <SidebarMenuItem key={item.id}>
                    <Link href={path} legacyBehavior passHref>
                      <SidebarMenuButton
                        asChild
                        className={`w-full justify-start hover:bg-gray-100 ${
                          isActive
                            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                            : 'text-gray-700'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
                        </span>
                      </SidebarMenuButton>
                    </Link>
                  </SidebarMenuItem>
                );
              })}
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
                <DropdownMenuItem onClick={() => router.push('/profile')}>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/settings')}>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem onClick={ () => handleLogout()}>Sign out</DropdownMenuItem>
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
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

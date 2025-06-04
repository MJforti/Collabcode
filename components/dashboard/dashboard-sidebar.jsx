"use client"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  Home,
  Users,
  MessageSquare,
  BarChart3,
  Bot,
  FileText,
  Settings,
  Code,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Workspaces", href: "/workspace", icon: Code },
    { name: "Teams", href: "/teams", icon: Users },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
    { name: "AI Assistant", href: "/ai-assistant", icon: Bot },
    { name: "Documentation", href: "/docs", icon: FileText },
  ]

  const bottomNavigation = [
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Support", href: "/support", icon: HelpCircle },
  ]

  return (
    <div
      className={cn(
        "bg-gray-800/50 border-r border-gray-700 flex flex-col transition-all duration-300",
        isCollapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">CollabCode</h1>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-400 hover:text-white"
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Button
              key={item.name}
              variant="ghost"
              onClick={() => router.push(item.href)}
              className={cn(
                "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                isCollapsed && "justify-center px-2",
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.name}
            </Button>
          )
        })}
      </nav>

      {/* Bottom Navigation */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        {bottomNavigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Button
              key={item.name}
              variant="ghost"
              onClick={() => router.push(item.href)}
              className={cn(
                "w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700",
                isActive && "bg-blue-600 text-white hover:bg-blue-700",
                isCollapsed && "justify-center px-2",
              )}
            >
              <item.icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
              {!isCollapsed && item.name}
            </Button>
          )
        })}
      </div>
    </div>
  )
}

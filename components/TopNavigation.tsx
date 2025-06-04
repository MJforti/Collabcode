"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Code2,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  GitBranch,
  Play,
  Save,
  Share,
  Moon,
  Sun,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useTheme } from "@/components/theme-provider"

interface TopNavigationProps {
  theme: "dark" | "light"
  toggleTheme: () => void
  workspaceName: string
  setWorkspaceName: (name: string) => void
  notifications: any[]
  setNotifications: (notifications: any[]) => void
}

export function TopNavigation({
  theme,
  toggleTheme,
  workspaceName,
  setWorkspaceName,
  notifications,
  setNotifications,
}: TopNavigationProps) {
  const [githubConnected, setGithubConnected] = useState(false)
  const [figmaConnected, setFigmaConnected] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [autoSave, setAutoSave] = useState(true)
  const { theme: currentTheme, setTheme } = useTheme()

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`h-14 border-b flex items-center justify-between px-4 ${
        currentTheme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
      }`}
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Code2 className="w-5 h-5 text-white" />
          </div>
          <span className={`text-lg font-bold ${currentTheme === "dark" ? "text-white" : "text-gray-900"}`}>
            CollabCode
          </span>
        </div>

        {/* Workspace Info */}
        <div className="flex items-center gap-2">
          <Badge
            variant="outline"
            className={`${currentTheme === "dark" ? "border-gray-600 text-gray-300" : "border-gray-300 text-gray-600"}`}
          >
            <Users className="w-3 h-3 mr-1" />
            Team Project
          </Badge>
          <Badge variant="outline" className="border-green-500 text-green-400">
            <GitBranch className="w-3 h-3 mr-1" />
            main
          </Badge>
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="flex-1 max-w-md mx-4">
        <div className="relative">
          <Search
            className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${currentTheme === "dark" ? "text-gray-400" : "text-gray-500"}`}
          />
          <Input
            placeholder="Search files, tasks, or team members..."
            className={`pl-10 ${
              currentTheme === "dark"
                ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">
        {/* Action Buttons */}
        <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white">
          <Save className="w-4 h-4 mr-1" />
          Save
        </Button>

        <Button
          size="sm"
          variant="outline"
          className={`${currentTheme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
        >
          <Play className="w-4 h-4 mr-1" />
          Run
        </Button>

        <Button
          size="sm"
          variant="outline"
          className={`${currentTheme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
        >
          <Share className="w-4 h-4 mr-1" />
          Share
        </Button>

        {/* Theme Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
            >
              {currentTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`${currentTheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <DropdownMenuItem
              onClick={() => setTheme("light")}
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              <Sun className="w-4 h-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("dark")}
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              <Moon className="w-4 h-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme("system")}
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              <Monitor className="w-4 h-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className={`relative ${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <Bell className="w-4 h-4" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
              {unreadCount}
            </Badge>
          )}
        </Button>

        {/* Add Button */}
        <Button
          size="sm"
          variant="outline"
          className={`${currentTheme === "dark" ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-300 text-gray-600 hover:bg-gray-50"}`}
        >
          <Plus className="w-4 h-4" />
        </Button>

        {/* Settings */}
        <Button
          variant="ghost"
          size="sm"
          className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-600 hover:bg-gray-100"}`}
        >
          <Settings className="w-4 h-4" />
        </Button>

        {/* User Avatar */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className={`w-56 ${currentTheme === "dark" ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"}`}
          >
            <DropdownMenuItem
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className={`${currentTheme === "dark" ? "bg-gray-700" : "bg-gray-200"}`} />
            <DropdownMenuItem
              className={`${currentTheme === "dark" ? "text-gray-300 hover:bg-gray-700" : "text-gray-900 hover:bg-gray-100"}`}
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.div>
  )
}

"use client"

import { useState } from "react"
import { Search, Bell, Settings, LogOut, User, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"

export function DashboardHeader() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")

  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user") || "{}") : {}

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    })
    router.push("/auth/signin")
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Searching for: ${searchQuery}`,
      })
    }
  }

  return (
    <header className="h-16 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search workspaces, teams, files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
          />
        </form>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-gray-800 border-gray-700">
            <DropdownMenuLabel className="text-white">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">New team invitation</p>
                <p className="text-xs text-gray-400">Sarah invited you to Frontend Team</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Workspace updated</p>
                <p className="text-xs text-gray-400">React Dashboard has new changes</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium">Meeting reminder</p>
                <p className="text-xs text-gray-400">Sprint planning in 30 minutes</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 text-gray-300 hover:text-white">
              <Avatar className="w-8 h-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden md:block">{user?.name || "User"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700">
            <DropdownMenuLabel className="text-white">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem onClick={() => router.push("/profile")} className="text-gray-300 hover:bg-gray-700">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/settings")} className="text-gray-300 hover:bg-gray-700">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push("/support")} className="text-gray-300 hover:bg-gray-700">
              <HelpCircle className="mr-2 h-4 w-4" />
              Support
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-gray-700" />
            <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-gray-700">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

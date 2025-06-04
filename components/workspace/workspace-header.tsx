"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Save,
  Play,
  Github,
  Figma,
  Rocket,
  Plus,
  FolderPlus,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Undo,
  Redo,
  Share,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CreateFileModal } from "@/components/modals/create-file-modal"
import { ShareWorkspaceModal } from "@/components/modals/share-workspace-modal"
import { ProfileModal } from "@/components/modals/profile-modal"
import { SettingsModal } from "@/components/modals/settings-modal"
import { useToast } from "@/hooks/use-toast"

interface WorkspaceHeaderProps {
  activeFile: string
  files: any
  onSave: () => void
  onRun: () => void
  onCreateFile: (name: string, type: string) => void
  collaborators: any[]
}

export function WorkspaceHeader({
  activeFile,
  files,
  onSave,
  onRun,
  onCreateFile,
  collaborators,
}: WorkspaceHeaderProps) {
  const { toast } = useToast()
  const [showCreateFile, setShowCreateFile] = useState(false)
  const [showShare, setShowShare] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isGitHubConnected, setIsGitHubConnected] = useState(false)
  const [isFigmaConnected, setIsFigmaConnected] = useState(false)

  const handleGitHubConnect = () => {
    setIsGitHubConnected(!isGitHubConnected)
    toast({
      title: isGitHubConnected ? "GitHub Disconnected" : "GitHub Connected",
      description: isGitHubConnected
        ? "Your GitHub account has been disconnected."
        : "Successfully connected to GitHub!",
    })
  }

  const handleFigmaConnect = () => {
    setIsFigmaConnected(!isFigmaConnected)
    toast({
      title: isFigmaConnected ? "Figma Disconnected" : "Figma Connected",
      description: isFigmaConnected ? "Your Figma account has been disconnected." : "Successfully connected to Figma!",
    })
  }

  const handleDeploy = () => {
    toast({
      title: "Deployment Started",
      description: "Your project is being deployed to Vercel...",
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    window.location.href = "/auth/signin"
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-12 bg-black/85 backdrop-blur-md border-b border-gray-700/50 flex items-center justify-between px-4 sticky top-0 z-50"
      >
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">C</span>
            </div>
            <div>
              <h1 className="text-white font-semibold text-sm">CollabCode</h1>
              <p className="text-gray-400 text-xs">My Awesome Project</p>
            </div>
          </div>
        </div>

        {/* Center Section */}
        <div className="flex items-center space-x-2">
          {/* File Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCreateFile(true)}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Plus className="w-4 h-4 mr-1" />
            File
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCreateFile(true)}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <FolderPlus className="w-4 h-4 mr-1" />
            Folder
          </Button>

          <div className="w-px h-6 bg-gray-600" />

          {/* Editor Actions */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onSave}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
            <Undo className="w-4 h-4" />
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
            <Redo className="w-4 h-4" />
          </Button>

          <div className="w-px h-6 bg-gray-600" />

          {/* Integrations */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Github className="w-4 h-4 mr-1" />
                GitHub
                <div className={`w-2 h-2 rounded-full ml-2 ${isGitHubConnected ? "bg-green-500" : "bg-red-500"}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem onClick={handleGitHubConnect} className="text-white hover:bg-gray-700">
                {isGitHubConnected ? "Disconnect" : "Connect"} GitHub
              </DropdownMenuItem>
              {isGitHubConnected && (
                <>
                  <DropdownMenuItem className="text-white hover:bg-gray-700">Select Repository</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-gray-700">View on GitHub</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Figma className="w-4 h-4 mr-1" />
                Figma
                <div className={`w-2 h-2 rounded-full ml-2 ${isFigmaConnected ? "bg-green-500" : "bg-red-500"}`} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700">
              <DropdownMenuItem onClick={handleFigmaConnect} className="text-white hover:bg-gray-700">
                {isFigmaConnected ? "Disconnect" : "Connect"} Figma
              </DropdownMenuItem>
              {isFigmaConnected && (
                <>
                  <DropdownMenuItem className="text-white hover:bg-gray-700">Link Project</DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-gray-700">View Designs</DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleDeploy}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Rocket className="w-4 h-4 mr-1" />
            Deploy
          </Button>

          <div className="w-px h-6 bg-gray-600" />

          <Button variant="default" size="sm" onClick={onRun} className="bg-green-500 hover:bg-green-600 text-white">
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-40 h-8 pl-7 bg-gray-700 border-gray-600 text-white text-sm"
            />
          </div>

          {/* Collaborators */}
          <div className="flex items-center -space-x-2">
            {collaborators.slice(0, 3).map((collab) => (
              <Avatar key={collab.id} className="w-6 h-6 border-2 border-gray-700">
                <AvatarFallback className="text-white text-xs" style={{ backgroundColor: collab.color }}>
                  {collab.avatar}
                </AvatarFallback>
              </Avatar>
            ))}
            {collaborators.length > 3 && (
              <div className="w-6 h-6 bg-gray-600 rounded-full border-2 border-gray-700 flex items-center justify-center">
                <span className="text-white text-xs">+{collaborators.length - 3}</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowShare(true)}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Share className="w-4 h-4" />
          </Button>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700 relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </Badge>
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-gray-700">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback className="bg-blue-500 text-white text-xs">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 border-gray-700" align="end">
              <DropdownMenuItem onClick={() => setShowProfile(true)} className="text-white hover:bg-gray-700">
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setShowSettings(true)} className="text-white hover:bg-gray-700">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-700" />
              <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-gray-700">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.header>

      {/* Modals */}
      <CreateFileModal open={showCreateFile} onOpenChange={setShowCreateFile} onCreateFile={onCreateFile} />
      <ShareWorkspaceModal open={showShare} onOpenChange={setShowShare} />
      <ProfileModal open={showProfile} onOpenChange={setShowProfile} />
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </>
  )
}

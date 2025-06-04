"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Plus, Users, Code, Zap, MessageSquare, Bot, Search, Bell, LogOut, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CreateWorkspaceModal } from "@/components/modals/create-workspace-modal"
import { CreateTeamModal } from "@/components/modals/create-team-modal"
import { InviteFriendModal } from "@/components/modals/invite-friend-modal"
import { useToast } from "@/hooks/use-toast"

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showCreateWorkspace, setShowCreateWorkspace] = useState(false)
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [showInviteFriend, setShowInviteFriend] = useState(false)
  const [workspaces, setWorkspaces] = useState([
    {
      id: "1",
      name: "React Dashboard",
      description: "Modern admin dashboard with React and TypeScript",
      lastModified: "2 hours ago",
      collaborators: 3,
      status: "active",
      tech: ["React", "TypeScript", "Tailwind"],
    },
    {
      id: "2",
      name: "E-commerce API",
      description: "RESTful API for online store with Node.js",
      lastModified: "1 day ago",
      collaborators: 2,
      status: "active",
      tech: ["Node.js", "Express", "MongoDB"],
    },
    {
      id: "3",
      name: "Mobile App UI",
      description: "React Native app for food delivery",
      lastModified: "3 days ago",
      collaborators: 4,
      status: "archived",
      tech: ["React Native", "Expo"],
    },
  ])

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    setUser(JSON.parse(userData))

    // Load saved workspaces
    const savedWorkspaces = localStorage.getItem("workspaces")
    if (savedWorkspaces) {
      setWorkspaces(JSON.parse(savedWorkspaces))
    }

    setIsLoading(false)
  }, [router])

  const handleCreateWorkspace = (workspaceData: any) => {
    const newWorkspace = {
      id: Date.now().toString(),
      name: workspaceData.name,
      description: workspaceData.description,
      lastModified: "Just now",
      collaborators: 1,
      status: "active",
      tech: workspaceData.template ? [workspaceData.template] : ["React"],
    }

    const updatedWorkspaces = [newWorkspace, ...workspaces]
    setWorkspaces(updatedWorkspaces)

    // Save to localStorage
    localStorage.setItem("workspaces", JSON.stringify(updatedWorkspaces))

    toast({
      title: "Workspace created!",
      description: `${workspaceData.name} has been created successfully.`,
    })

    // Navigate to the new workspace
    setTimeout(() => {
      router.push(`/workspace/${newWorkspace.id}`)
    }, 1000)
  }

  const handleCreateTeam = (teamData: any) => {
    toast({
      title: "Team created!",
      description: `${teamData.name} team has been created successfully.`,
    })
  }

  const handleInviteFriend = (email: string) => {
    toast({
      title: "Invitation sent!",
      description: `Invitation sent to ${email}`,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("authToken")
    localStorage.removeItem("user")
    router.push("/auth/signin")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-10 h-10 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Loading Dashboard</h2>
          <p className="text-gray-400">Setting up your workspace...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        {/* Header */}
        <header className="border-b border-gray-700/50 bg-black/20 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Code className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">CollabCode</h1>
                  <p className="text-sm text-gray-400">Dashboard</p>
                </div>
              </div>

              {/* Search */}
              <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search workspaces, teams, files..."
                    className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                  <Bell className="w-5 h-5" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>

                <Button variant="ghost" size="icon" onClick={handleLogout} className="text-gray-400 hover:text-white">
                  <LogOut className="w-5 h-5" />
                </Button>

                <Avatar className="w-8 h-8 cursor-pointer">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                    {user?.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4">Welcome back, {user?.name || "Developer"}! 👋</h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Ready to build something amazing? Create a new workspace or continue working on your projects.
              </p>
            </motion.div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Card
                  className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowCreateWorkspace(true)}
                >
                  <CardContent className="p-6 text-center">
                    <Plus className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="font-semibold text-white">New Workspace</h3>
                    <p className="text-blue-100 text-sm">Start a new project</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Card
                  className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowCreateTeam(true)}
                >
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="font-semibold text-white">Create Team</h3>
                    <p className="text-green-100 text-sm">Collaborate with others</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Card
                  className="bg-gradient-to-r from-orange-500 to-red-500 border-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowInviteFriend(true)}
                >
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="font-semibold text-white">Invite Friends</h3>
                    <p className="text-orange-100 text-sm">Share the experience</p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Card
                  className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => router.push("/ai-assistant")}
                >
                  <CardContent className="p-6 text-center">
                    <Bot className="w-8 h-8 text-white mx-auto mb-2" />
                    <h3 className="font-semibold text-white">AI Assistant</h3>
                    <p className="text-purple-100 text-sm">Get coding help</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>

          {/* Workspaces Grid */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Workspaces</h2>
              <Button
                onClick={() => setShowCreateWorkspace(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                New Workspace
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace, index) => (
                <motion.div
                  key={workspace.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card
                    className="bg-gray-800/50 border-gray-700 hover:border-blue-500/50 transition-all cursor-pointer group"
                    onClick={() => router.push(`/workspace/${workspace.id}`)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white group-hover:text-blue-400 transition-colors">
                          {workspace.name}
                        </CardTitle>
                        <Badge
                          variant={workspace.status === "active" ? "default" : "secondary"}
                          className={workspace.status === "active" ? "bg-green-500" : "bg-gray-500"}
                        >
                          {workspace.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-4">{workspace.description}</p>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {workspace.tech.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-400">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{workspace.collaborators} collaborators</span>
                        </div>
                        <span>{workspace.lastModified}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Code className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">{workspaces.length}</p>
                    <p className="text-gray-400 text-sm">Active Projects</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">12</p>
                    <p className="text-gray-400 text-sm">Team Members</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">847</p>
                    <p className="text-gray-400 text-sm">Lines of Code</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-orange-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">5</p>
                    <p className="text-gray-400 text-sm">Deployments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateWorkspaceModal
        open={showCreateWorkspace}
        onOpenChange={setShowCreateWorkspace}
        onCreateWorkspace={handleCreateWorkspace}
      />
      <CreateTeamModal open={showCreateTeam} onOpenChange={setShowCreateTeam} onCreateTeam={handleCreateTeam} />
      <InviteFriendModal
        open={showInviteFriend}
        onOpenChange={setShowInviteFriend}
        onInviteFriend={handleInviteFriend}
      />
    </>
  )
}

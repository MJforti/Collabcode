"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Users, Plus, Search, Settings, Crown, UserPlus, MoreHorizontal, Mail, Calendar, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { CreateTeamModal } from "@/components/modals/create-team-modal"
import { InviteFriendModal } from "@/components/modals/invite-friend-modal"
import { useToast } from "@/hooks/use-toast"

export default function TeamsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [showCreateTeam, setShowCreateTeam] = useState(false)
  const [showInviteFriend, setShowInviteFriend] = useState(false)
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: "Frontend Team",
      description: "Building amazing user interfaces with React and TypeScript",
      members: 8,
      role: "Admin",
      avatar: "/placeholder.svg?height=80&width=80",
      isOwner: true,
      lastActivity: "2 hours ago",
      projects: 5,
      status: "active",
    },
    {
      id: 2,
      name: "Backend Engineers",
      description: "Scalable APIs and microservices architecture",
      members: 6,
      role: "Member",
      avatar: "/placeholder.svg?height=80&width=80",
      isOwner: false,
      lastActivity: "1 day ago",
      projects: 3,
      status: "active",
    },
  ])

  const recentActivity = [
    {
      id: 1,
      team: "Frontend Team",
      user: "Sarah Chen",
      action: "joined the team",
      time: "2 hours ago",
    },
    {
      id: 2,
      team: "Backend Engineers",
      user: "Marcus Johnson",
      action: "created a new project",
      time: "1 day ago",
    },
  ]

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    setUser(JSON.parse(userData))
    setIsLoading(false)

    // Load teams from localStorage
    const savedTeams = localStorage.getItem("teams")
    if (savedTeams) {
      setTeams(JSON.parse(savedTeams))
    }
  }, [router])

  const handleCreateTeam = (teamData: any) => {
    const newTeam = {
      id: Date.now(),
      name: teamData.name,
      description: teamData.description,
      members: teamData.members?.length || 1,
      role: "Admin",
      isOwner: true,
      lastActivity: "Just now",
      projects: 0,
      status: "active",
      avatar: "/placeholder.svg?height=80&width=80",
    }

    const updatedTeams = [newTeam, ...teams]
    setTeams(updatedTeams)
    localStorage.setItem("teams", JSON.stringify(updatedTeams))

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

  const filteredTeams = teams.filter(
    (team) =>
      team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Teams</h2>
          <p className="text-gray-400">Fetching your team information...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Teams Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-between"
            >
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Teams</h1>
                <p className="text-gray-400">Collaborate with your team members and manage projects together</p>
              </div>
              <Button
                onClick={() => setShowCreateTeam(true)}
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Team
              </Button>
            </motion.div>

            {/* Search and Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white"
                />
              </div>
              <Button
                variant="outline"
                onClick={() => setShowInviteFriend(true)}
                className="bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Members
              </Button>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Teams Grid */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredTeams.map((team, index) => (
                    <motion.div
                      key={team.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-all duration-300 group">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={team.avatar || "/placeholder.svg"} />
                                <AvatarFallback className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                  {team.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-white flex items-center">
                                  {team.name}
                                  {team.isOwner && <Crown className="h-4 w-4 ml-2 text-yellow-400" />}
                                </CardTitle>
                                <Badge
                                  variant={team.role === "Admin" ? "default" : "secondary"}
                                  className={
                                    team.role === "Admin"
                                      ? "bg-blue-500/20 text-blue-400"
                                      : team.role === "Member"
                                        ? "bg-green-500/20 text-green-400"
                                        : "bg-gray-500/20 text-gray-400"
                                  }
                                >
                                  {team.role}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <p className="text-gray-400 text-sm">{team.description}</p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center text-gray-400">
                                <Users className="h-3 w-3 mr-1" />
                                {team.members} members
                              </span>
                              <span className="flex items-center text-gray-400">
                                <Activity className="h-3 w-3 mr-1" />
                                {team.projects} projects
                              </span>
                            </div>
                            <Badge
                              variant={team.status === "active" ? "default" : "secondary"}
                              className={
                                team.status === "active"
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }
                            >
                              {team.status}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <span className="text-xs text-gray-500">Last activity: {team.lastActivity}</span>
                            <div className="flex items-center space-x-2">
                              {team.isOwner ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-600 text-gray-300 hover:text-white"
                                >
                                  <Settings className="h-3 w-3 mr-1" />
                                  Manage
                                </Button>
                              ) : (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="border-red-600 text-red-400 hover:bg-red-500/20"
                                >
                                  Leave
                                </Button>
                              )}
                              <Button
                                variant="default"
                                size="sm"
                                onClick={() => router.push(`/teams/${team.id}`)}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                View
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}

                  {/* Create New Team Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card
                      className="bg-gray-800/30 border-gray-700 border-dashed hover:border-green-500/50 transition-all duration-300 cursor-pointer h-full flex items-center justify-center group"
                      onClick={() => setShowCreateTeam(true)}
                    >
                      <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                        <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <Plus className="h-8 w-8 text-green-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2 group-hover:text-green-300 transition-colors">
                          Create New Team
                        </h3>
                        <p className="text-sm text-gray-400">Start collaborating with your colleagues</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>

              {/* Activity Sidebar */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Activity className="h-5 w-5 mr-2" />
                        Recent Activity
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              {activity.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-300">
                              <span className="font-medium text-white">{activity.user}</span> {activity.action} in{" "}
                              <span className="text-blue-400">{activity.team}</span>
                            </p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600"
                        onClick={() => setShowCreateTeam(true)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Create Team
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600"
                        onClick={() => setShowInviteFriend(true)}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Send Invites
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-start bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600"
                        onClick={() => router.push("/meetings")}
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <CreateTeamModal open={showCreateTeam} onOpenChange={setShowCreateTeam} onCreateTeam={handleCreateTeam} />
      <InviteFriendModal
        open={showInviteFriend}
        onOpenChange={setShowInviteFriend}
        onInviteFriend={handleInviteFriend}
      />
    </div>
  )
}

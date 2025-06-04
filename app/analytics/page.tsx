"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { BarChart3, TrendingUp, Users, Code, GitCommit, Calendar, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
// import { AnalyticsChart } from "@/components/analytics/analytics-chart"
// import { MetricsCard } from "@/components/analytics/metrics-card"
// import { ActivityHeatmap } from "@/components/analytics/activity-heatmap"
// import { TeamPerformance } from "@/components/analytics/team-performance"

export default function AnalyticsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState("7d")
  const [isRefreshing, setIsRefreshing] = useState(false)

  const metrics = [
    {
      title: "Total Commits",
      value: "1,247",
      change: "+12.5%",
      trend: "up",
      icon: GitCommit,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Users",
      value: "24",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Lines of Code",
      value: "45.2K",
      change: "+15.3%",
      trend: "up",
      icon: Code,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Projects",
      value: "12",
      change: "+2",
      trend: "up",
      icon: BarChart3,
      color: "from-orange-500 to-red-500",
    },
  ]

  const chartData = {
    commits: [
      { date: "2024-01-01", value: 45 },
      { date: "2024-01-02", value: 52 },
      { date: "2024-01-03", value: 38 },
      { date: "2024-01-04", value: 61 },
      { date: "2024-01-05", value: 55 },
      { date: "2024-01-06", value: 42 },
      { date: "2024-01-07", value: 67 },
    ],
    users: [
      { date: "2024-01-01", value: 18 },
      { date: "2024-01-02", value: 22 },
      { date: "2024-01-03", value: 19 },
      { date: "2024-01-04", value: 25 },
      { date: "2024-01-05", value: 24 },
      { date: "2024-01-06", value: 21 },
      { date: "2024-01-07", value: 26 },
    ],
  }

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
  }, [router])

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulate data refresh
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsRefreshing(false)
  }

  const handleExport = () => {
    // Simulate export functionality
    const data = {
      metrics,
      chartData,
      timeRange,
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `analytics-${timeRange}-${new Date().toISOString().split("T")[0]}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <BarChart3 className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Analytics</h2>
          <p className="text-gray-400">Gathering insights from your data...</p>
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

        {/* Analytics Content */}
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
                <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
                <p className="text-gray-400">Track your team's performance and project insights</p>
              </div>

              <div className="flex items-center space-x-3">
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="1d">Last 24h</SelectItem>
                    <SelectItem value="7d">Last 7 days</SelectItem>
                    <SelectItem value="30d">Last 30 days</SelectItem>
                    <SelectItem value="90d">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-gray-800 border-gray-700 text-white hover:bg-gray-700"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
                  Refresh
                </Button>

                <Button
                  onClick={handleExport}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </motion.div>

            {/* Metrics Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {metrics.map((metric, index) => (
                // <MetricsCard key={metric.title} metric={metric} index={index} />
                <div key={metric.title} className="bg-gray-800/50 border-gray-700 p-4 rounded-lg">
                  <h2 className="text-lg font-bold text-white mb-2">{metric.title}</h2>
                  <p className="text-sm text-gray-400">{metric.value}</p>
                </div>
              ))}
            </motion.div>

            {/* Charts Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-gray-800 border-gray-700">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="team">Team Performance</TabsTrigger>
                  <TabsTrigger value="projects">Projects</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <GitCommit className="h-5 w-5 mr-2" />
                          Commits Over Time
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* <AnalyticsChart data={chartData.commits} type="line" color="#3B82F6" /> */}
                        <div className="h-64 bg-gray-800/50 border-gray-700 p-4 rounded-lg">
                          <h2 className="text-lg font-bold text-white mb-2">Commits Over Time</h2>
                          <p className="text-sm text-gray-400">No data available</p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Active Users
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        {/* <AnalyticsChart data={chartData.users} type="bar" color="#10B981" /> */}
                        <div className="h-64 bg-gray-800/50 border-gray-700 p-4 rounded-lg">
                          <h2 className="text-lg font-bold text-white mb-2">Active Users</h2>
                          <p className="text-sm text-gray-400">No data available</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <TrendingUp className="h-5 w-5 mr-2" />
                        Performance Trends
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">+23%</div>
                          <div className="text-sm text-gray-400">Code Quality</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-400 mb-1">+15%</div>
                          <div className="text-sm text-gray-400">Productivity</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-400 mb-1">+8%</div>
                          <div className="text-sm text-gray-400">Collaboration</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="activity" className="space-y-6">
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        Activity Heatmap
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {/* <ActivityHeatmap /> */}
                      <div className="h-64 bg-gray-800/50 border-gray-700 p-4 rounded-lg">
                        <h2 className="text-lg font-bold text-white mb-2">Activity Heatmap</h2>
                        <p className="text-sm text-gray-400">No data available</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="team" className="space-y-6">
                  {/* <TeamPerformance /> */}
                  <div className="h-64 bg-gray-800/50 border-gray-700 p-4 rounded-lg">
                    <h2 className="text-lg font-bold text-white mb-2">Team Performance</h2>
                    <p className="text-sm text-gray-400">No data available</p>
                  </div>
                </TabsContent>

                <TabsContent value="projects" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { name: "Frontend Dashboard", commits: 156, contributors: 5, status: "active" },
                      { name: "API Service", commits: 89, contributors: 3, status: "active" },
                      { name: "Mobile App", commits: 67, contributors: 4, status: "review" },
                      { name: "Design System", commits: 45, contributors: 2, status: "maintenance" },
                      { name: "Documentation", commits: 23, contributors: 6, status: "active" },
                      { name: "Testing Suite", commits: 34, contributors: 3, status: "development" },
                    ].map((project, index) => (
                      <motion.div
                        key={project.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-white text-lg">{project.name}</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Commits</span>
                              <span className="text-white font-medium">{project.commits}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Contributors</span>
                              <span className="text-white font-medium">{project.contributors}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Status</span>
                              <span
                                className={`text-sm font-medium ${
                                  project.status === "active"
                                    ? "text-green-400"
                                    : project.status === "review"
                                      ? "text-yellow-400"
                                      : project.status === "maintenance"
                                        ? "text-blue-400"
                                        : "text-purple-400"
                                }`}
                              >
                                {project.status}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  )
}

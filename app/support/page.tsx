"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  HelpCircle,
  MessageSquare,
  Mail,
  Phone,
  Search,
  Book,
  Video,
  Send,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { useToast } from "@/hooks/use-toast"

export default function SupportPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")
  const [ticketPriority, setTicketPriority] = useState("medium")

  const faqs = [
    {
      id: 1,
      question: "How do I create a new workspace?",
      answer:
        "Click the 'Create Workspace' button on your dashboard, choose a template, and fill in the details. Your workspace will be ready in seconds!",
      category: "Workspaces",
    },
    {
      id: 2,
      question: "How can I invite team members?",
      answer: "Go to your team page and click 'Invite Members'. You can send email invitations or share a join link.",
      category: "Teams",
    },
    {
      id: 3,
      question: "Is my code secure?",
      answer: "Yes! We use enterprise-grade encryption and security measures to protect your code and data.",
      category: "Security",
    },
    {
      id: 4,
      question: "How do I start a video meeting?",
      answer:
        "In any workspace, click the meeting panel and select 'Start new meeting'. You can invite others using the meeting ID.",
      category: "Meetings",
    },
    {
      id: 5,
      question: "Can I use CollabCode offline?",
      answer:
        "CollabCode requires an internet connection for real-time collaboration, but you can work on cached files temporarily offline.",
      category: "General",
    },
  ]

  const tickets = [
    {
      id: "TICK-001",
      subject: "Unable to join video meeting",
      status: "open",
      priority: "high",
      created: "2 hours ago",
      lastUpdate: "1 hour ago",
    },
    {
      id: "TICK-002",
      subject: "Workspace not loading properly",
      status: "in-progress",
      priority: "medium",
      created: "1 day ago",
      lastUpdate: "3 hours ago",
    },
    {
      id: "TICK-003",
      subject: "Feature request: Dark theme for editor",
      status: "resolved",
      priority: "low",
      created: "3 days ago",
      lastUpdate: "1 day ago",
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
  }, [router])

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault()

    if (!ticketSubject.trim() || !ticketMessage.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both subject and message fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate ticket creation
    toast({
      title: "Support ticket created!",
      description: "We'll get back to you within 24 hours.",
    })

    setTicketSubject("")
    setTicketMessage("")
    setTicketPriority("medium")
  }

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertCircle className="h-4 w-4 text-red-400" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-yellow-400" />
      case "resolved":
        return <CheckCircle className="h-4 w-4 text-green-400" />
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-red-500/20 text-red-400"
      case "in-progress":
        return "bg-yellow-500/20 text-yellow-400"
      case "resolved":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/20 text-red-400"
      case "medium":
        return "bg-yellow-500/20 text-yellow-400"
      case "low":
        return "bg-green-500/20 text-green-400"
      default:
        return "bg-gray-500/20 text-gray-400"
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Support</h2>
          <p className="text-gray-400">Preparing help resources...</p>
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

        {/* Support Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">Support Center</h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Get help with CollabCode. Search our knowledge base, contact support, or browse frequently asked
                questions.
              </p>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
            >
              <Card className="bg-gradient-to-r from-blue-500 to-purple-500 border-0 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <MessageSquare className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="font-semibold text-white">Live Chat</h3>
                  <p className="text-blue-100 text-sm">Chat with support</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="font-semibold text-white">Email Support</h3>
                  <p className="text-green-100 text-sm">Send us an email</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <Book className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="font-semibold text-white">Documentation</h3>
                  <p className="text-orange-100 text-sm">Browse guides</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 cursor-pointer hover:scale-105 transition-transform">
                <CardContent className="p-6 text-center">
                  <Video className="w-8 h-8 text-white mx-auto mb-2" />
                  <h3 className="font-semibold text-white">Video Tutorials</h3>
                  <p className="text-purple-100 text-sm">Watch and learn</p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Main Content */}
            <Tabs defaultValue="faq" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                <TabsTrigger value="faq">FAQ</TabsTrigger>
                <TabsTrigger value="tickets">My Tickets</TabsTrigger>
                <TabsTrigger value="contact">Contact Support</TabsTrigger>
              </TabsList>

              {/* FAQ Tab */}
              <TabsContent value="faq" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 focus:border-blue-500 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <CardTitle className="text-white text-lg">{faq.question}</CardTitle>
                              <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/20">
                                {faq.category}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <p className="text-gray-400">{faq.answer}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Tickets Tab */}
              <TabsContent value="tickets" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="space-y-4">
                    {tickets.map((ticket, index) => (
                      <motion.div
                        key={ticket.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                      >
                        <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                          <CardHeader>
                            <div className="flex items-start justify-between">
                              <div>
                                <CardTitle className="text-white flex items-center space-x-2">
                                  {getStatusIcon(ticket.status)}
                                  <span>{ticket.subject}</span>
                                </CardTitle>
                                <p className="text-gray-400 text-sm mt-1">Ticket ID: {ticket.id}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(ticket.status)}>{ticket.status}</Badge>
                                <Badge className={getPriorityColor(ticket.priority)}>{ticket.priority}</Badge>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="flex items-center justify-between text-sm text-gray-400">
                              <span>Created: {ticket.created}</span>
                              <span>Last update: {ticket.lastUpdate}</span>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Contact Tab */}
              <TabsContent value="contact" className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                >
                  {/* Contact Form */}
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">Create Support Ticket</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitTicket} className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Subject</label>
                          <Input
                            value={ticketSubject}
                            onChange={(e) => setTicketSubject(e.target.value)}
                            placeholder="Brief description of your issue"
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Priority</label>
                          <select
                            value={ticketPriority}
                            onChange={(e) => setTicketPriority(e.target.value)}
                            className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-gray-300 mb-2 block">Message</label>
                          <Textarea
                            value={ticketMessage}
                            onChange={(e) => setTicketMessage(e.target.value)}
                            placeholder="Describe your issue in detail..."
                            className="bg-gray-700 border-gray-600 text-white"
                            rows={6}
                          />
                        </div>

                        <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                          <Send className="w-4 h-4 mr-2" />
                          Submit Ticket
                        </Button>
                      </form>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <div className="space-y-6">
                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="text-white font-medium">Email Support</p>
                            <p className="text-gray-400 text-sm">support@collabcode.dev</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="text-white font-medium">Phone Support</p>
                            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          <MessageSquare className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="text-white font-medium">Live Chat</p>
                            <p className="text-gray-400 text-sm">Available 24/7</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">Response Times</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-400">High Priority</span>
                          <span className="text-red-400 font-medium">2-4 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Medium Priority</span>
                          <span className="text-yellow-400 font-medium">8-12 hours</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Low Priority</span>
                          <span className="text-green-400 font-medium">24-48 hours</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

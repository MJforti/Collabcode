"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Search,
  Plus,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Smile,
  Send,
  Hash,
  Lock,
  Users,
  Settings,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { useToast } from "@/hooks/use-toast"

export default function MessagesPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedChat, setSelectedChat] = useState<any>(null)
  const [message, setMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [messages, setMessages] = useState<any[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [chats] = useState([
    {
      id: 1,
      name: "Frontend Team",
      type: "channel",
      participants: 8,
      lastMessage: "Sarah: The new component is ready for review",
      lastTime: "2m ago",
      unread: 3,
      isPrivate: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Chen",
      type: "direct",
      participants: 2,
      lastMessage: "Can you review the PR when you have time?",
      lastTime: "15m ago",
      unread: 1,
      isPrivate: true,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Backend Engineers",
      type: "channel",
      participants: 6,
      lastMessage: "Marcus: API endpoints are deployed",
      lastTime: "1h ago",
      unread: 0,
      isPrivate: false,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ])

  const initialMessages = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      content:
        "Hey everyone! I just finished the new dashboard component. It includes all the requested features and follows our design system guidelines.",
      timestamp: "10:30 AM",
      isOwn: false,
      type: "text",
    },
    {
      id: 2,
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "Looks great! I'll review it this afternoon. Did you include the responsive breakpoints?",
      timestamp: "10:32 AM",
      isOwn: true,
      type: "text",
    },
    {
      id: 3,
      user: "Marcus Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      content: "I can help with the backend integration once the component is finalized.",
      timestamp: "10:35 AM",
      isOwn: false,
      type: "text",
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

    // Set default selected chat and messages
    setSelectedChat(chats[0])
    setMessages(initialMessages)
  }, [router])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now(),
      user: "You",
      avatar: "/placeholder.svg?height=32&width=32",
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      type: "text",
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Simulate AI response after 2 seconds
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        user: "AI Assistant",
        avatar: "/placeholder.svg?height=32&width=32",
        content: "I can help you with that! Let me analyze your code and provide suggestions.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isOwn: false,
        type: "text",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 2000)

    toast({
      title: "Message sent!",
      description: "Your message has been delivered.",
    })
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const filteredChats = chats.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <MessageSquare className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Messages</h2>
          <p className="text-gray-400">Connecting to chat servers...</p>
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

        {/* Messages Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat List Sidebar */}
          <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
            {/* Chat List Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Messages</h2>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
                  className={`p-4 cursor-pointer border-b border-gray-700/50 ${
                    selectedChat?.id === chat.id ? "bg-blue-500/20 border-l-4 border-l-blue-500" : ""
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={chat.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {chat.type === "channel" ? (
                            <Hash className="h-5 w-5" />
                          ) : (
                            chat.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                          )}
                        </AvatarFallback>
                      </Avatar>
                      {chat.type === "direct" && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-medium text-white truncate">{chat.name}</h3>
                          {chat.isPrivate && <Lock className="h-3 w-3 text-gray-400" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500">{chat.lastTime}</span>
                          {chat.unread > 0 && (
                            <Badge className="bg-red-500 text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                              {chat.unread}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-gray-400 truncate">{chat.lastMessage}</p>
                        {chat.type === "channel" && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="h-3 w-3 mr-1" />
                            {chat.participants}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="h-16 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-6">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedChat.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        {selectedChat.type === "channel" ? (
                          <Hash className="h-5 w-5" />
                        ) : (
                          selectedChat.name
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-white">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-400">
                        {selectedChat.type === "channel" ? `${selectedChat.participants} members` : "Active now"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[70%] ${msg.isOwn ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        {!msg.isOwn && (
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                              {msg.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`${msg.isOwn ? "text-right" : ""}`}>
                          {!msg.isOwn && <p className="text-sm font-medium text-white mb-1">{msg.user}</p>}

                          <div
                            className={`p-3 rounded-lg ${
                              msg.isOwn ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
                            }`}
                          >
                            {msg.type === "file" ? (
                              <div className="flex items-center space-x-2">
                                <Paperclip className="h-4 w-4" />
                                <span className="text-sm">{msg.content}</span>
                              </div>
                            ) : (
                              <p className="text-sm">{msg.content}</p>
                            )}
                          </div>

                          <p className={`text-xs text-gray-500 mt-1 ${msg.isOwn ? "text-right" : ""}`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-gray-700 bg-gray-800/50">
                  <div className="flex items-end space-x-3">
                    <div className="flex-1">
                      <Textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={`Message ${selectedChat.name}...`}
                        className="min-h-[40px] max-h-32 resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        rows={1}
                      />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                        <Smile className="h-4 w-4" />
                      </Button>
                      <Button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="bg-blue-500 hover:bg-blue-600 text-white"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select a conversation</h3>
                  <p className="text-gray-400">Choose a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Send, Paperclip, Smile, MoreHorizontal, Reply, Pin, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

export function ChatPanel({ workspaceId }) {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: { name: "Alex Rivera", avatar: "AR", id: 1 },
      content:
        "Hey team! I just pushed the latest changes to the dashboard component. Can someone review the user authentication flow?",
      timestamp: "2:30 PM",
      type: "message",
    },
    {
      id: 2,
      user: { name: "Sarah Wilson", avatar: "SW", id: 2 },
      content:
        "Looking at it now! The login form looks great. One suggestion - we should add loading states for better UX.",
      timestamp: "2:32 PM",
      type: "message",
    },
    {
      id: 3,
      user: { name: "Mike Chen", avatar: "MC", id: 3 },
      content: "Agreed! Also, I noticed we're not handling the case where the API is down. Should we add a fallback?",
      timestamp: "2:35 PM",
      type: "message",
    },
    {
      id: 4,
      user: { name: "AI Assistant", avatar: "AI", id: 0 },
      content:
        "I can help generate error handling code for API failures. Would you like me to create a robust error boundary component?",
      timestamp: "2:36 PM",
      type: "ai",
    },
    {
      id: 5,
      user: { name: "Alex Rivera", avatar: "AR", id: 1 },
      content: "That would be perfect! @ai please generate an error boundary component with retry functionality.",
      timestamp: "2:37 PM",
      type: "message",
    },
  ])

  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)
  const textareaRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: messages.length + 1,
      user: { name: "You", avatar: "YU", id: "current" },
      content: message,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      type: "message",
    }

    setMessages([...messages, newMessage])
    setMessage("")

    // Simulate AI response if message contains @ai
    if (message.toLowerCase().includes("@ai")) {
      setIsTyping(true)
      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          user: { name: "AI Assistant", avatar: "AI", id: 0 },
          content:
            "I'll help you with that! Let me generate the error boundary component with retry functionality. This will include automatic retry logic and user-friendly error messages.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          type: "ai",
        }
        setMessages((prev) => [...prev, aiResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const formatMessage = (content) => {
    // Simple formatting for @mentions and code blocks
    return content
      .replace(/@(\w+)/g, '<span class="text-blue-400 font-medium">@$1</span>')
      .replace(/`([^`]+)`/g, '<code class="bg-gray-700 px-1 rounded text-sm">$1</code>')
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-white">Team Chat</h3>
            <p className="text-xs text-gray-400">5 members online</p>
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <Search className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {messages.map((msg) => (
          <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="group">
            <div className="flex items-start space-x-3">
              <Avatar className="h-8 w-8 mt-1">
                <AvatarFallback className={`text-xs ${msg.type === "ai" ? "bg-purple-500" : "bg-blue-500"}`}>
                  {msg.user.avatar}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-sm font-medium text-white">{msg.user.name}</span>
                  {msg.type === "ai" && (
                    <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/20">
                      AI
                    </Badge>
                  )}
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>

                <div
                  className="text-sm text-gray-300 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                />

                {/* Message Actions */}
                <div className="flex items-center space-x-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Reply className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    <Pin className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-purple-500 text-xs">AI</AvatarFallback>
            </Avatar>
            <div className="flex items-center space-x-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
              <span className="text-xs text-gray-400 ml-2">AI is typing...</span>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-3 border-t border-gray-700 bg-gray-800">
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message... Use @ai for AI assistance"
              className="min-h-[40px] max-h-32 resize-none bg-gray-700 border-gray-600 text-sm"
              rows={1}
            />
          </div>

          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Smile className="h-4 w-4" />
            </Button>
            <Button onClick={handleSendMessage} disabled={!message.trim()} size="icon" className="h-8 w-8">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2 mt-2">
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-600">
            @ai format code
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-600">
            @ai review
          </Badge>
          <Badge variant="outline" className="text-xs cursor-pointer hover:bg-gray-600">
            @ai generate tests
          </Badge>
        </div>
      </div>
    </div>
  )
}

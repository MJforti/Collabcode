"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { X, Bot, Send, Code, FileText, Lightbulb, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface AIAssistantModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

export function AIAssistantModal({ open, onOpenChange }: AIAssistantModalProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hi! I'm your AI assistant. I can help you with code review, debugging, documentation, and more. What would you like to work on today?",
      timestamp: new Date(),
    },
  ])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const quickActions = [
    { icon: Code, label: "Review my code", prompt: "Can you review my latest code changes?" },
    { icon: FileText, label: "Write documentation", prompt: "Help me write documentation for my project" },
    { icon: Lightbulb, label: "Suggest improvements", prompt: "What improvements can I make to my codebase?" },
    { icon: Zap, label: "Debug an issue", prompt: "I'm having trouble with a bug, can you help me debug it?" },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(input),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const generateAIResponse = (userInput: string): string => {
    const responses = [
      "I'd be happy to help you with that! Let me analyze your request and provide some suggestions.",
      "Great question! Based on your input, here are some recommendations I can offer.",
      "I can definitely assist with that. Let me break this down for you step by step.",
      "That's an interesting challenge! Here's how I would approach solving this problem.",
      "I see what you're trying to accomplish. Let me provide some guidance on best practices.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleQuickAction = (prompt: string) => {
    setInput(prompt)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="w-full max-w-4xl h-[80vh] flex flex-col"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl flex-1 flex flex-col">
          <CardContent className="p-0 flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">AI Assistant</h2>
                  <p className="text-gray-400">Your intelligent coding companion</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Quick Actions */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickAction(action.prompt)}
                    className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <action.icon className="w-4 h-4 mr-2" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-4 rounded-lg ${
                      message.type === "user"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-gray-700/50 text-gray-100"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.type === "assistant" && (
                        <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-2 ${message.type === "user" ? "text-blue-100" : "text-gray-400"}`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                        <Bot className="w-3 h-3 text-white" />
                      </div>
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
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-6 border-t border-gray-700">
              <form onSubmit={handleSubmit} className="flex space-x-3">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything about your code..."
                  className="flex-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-2">
                AI responses are generated and may not always be accurate. Always review suggestions carefully.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

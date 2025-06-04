"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  Bot,
  Send,
  Code,
  FileText,
  Lightbulb,
  Zap,
  Copy,
  Trash2,
  Settings,
  History,
  Star,
  ArrowLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  category?: string
  code?: string
}

export default function AIAssistantPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI coding assistant. I can help you with code review, debugging, documentation, refactoring, and much more. What would you like to work on today?",
      timestamp: new Date(),
      category: "greeting",
    },
  ])
  const messagesEndRef = useRef(null)

  const quickCommands = [
    {
      icon: Code,
      label: "Review Code",
      prompt: "Can you review my latest code changes and suggest improvements?",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FileText,
      label: "Write Docs",
      prompt: "Help me write comprehensive documentation for my project",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Lightbulb,
      label: "Optimize",
      prompt: "How can I optimize the performance of my application?",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Zap,
      label: "Debug Issue",
      prompt: "I'm having trouble with a bug, can you help me debug it?",
      color: "from-purple-500 to-pink-500",
    },
  ]

  const conversationHistory = [
    {
      id: "conv-1",
      title: "React Component Optimization",
      lastMessage: "Great! The useMemo hook will help...",
      timestamp: "2 hours ago",
      starred: true,
    },
    {
      id: "conv-2",
      title: "API Error Handling",
      lastMessage: "You should implement retry logic...",
      timestamp: "1 day ago",
      starred: false,
    },
    {
      id: "conv-3",
      title: "Database Schema Design",
      lastMessage: "Consider normalizing the user table...",
      timestamp: "3 days ago",
      starred: true,
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

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input
    setInput("")
    setIsTyping(true)

    try {
      // Simulate AI processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: generateAIResponse(currentInput),
        timestamp: new Date(),
        category: detectCategory(currentInput),
        code: generateCode(currentInput),
      }

      setMessages((prev) => [...prev, aiResponse])
    } catch (error) {
      toast({
        title: "AI Assistant Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsTyping(false)
    }
  }

  const generateAIResponse = (userInput) => {
    const responses = {
      code: "I'd be happy to help you with your code! Here's my analysis and suggestions:",
      debug:
        "Let me help you debug this issue. Here's a systematic approach:\n\n1. **Check the console** for any error messages\n2. **Verify your data flow** - ensure props are being passed correctly\n3. **Add logging** at key points to trace execution\n4. **Test edge cases** that might cause unexpected behavior\n\nCould you share the specific error message or code snippet?",
      docs: "I'll help you create comprehensive documentation. Here's a template structure:\n\n## Project Overview\n- Purpose and goals\n- Key features\n- Technology stack\n\n## Installation\n```bash\nnpm install\nnpm start\n```\n\n## API Reference\n- Endpoints\n- Parameters\n- Examples\n\nWould you like me to elaborate on any specific section?",
      optimize:
        "Here are several optimization strategies I recommend:\n\n**Performance:**\n- Implement code splitting with React.lazy()\n- Use React.memo for expensive components\n- Optimize bundle size with tree shaking\n\n**Database:**\n- Add proper indexing\n- Implement query optimization\n- Consider caching strategies\n\n**Frontend:**\n- Lazy load images and components\n- Minimize re-renders\n- Use virtual scrolling for large lists",
    }

    const category = detectCategory(userInput)
    return (
      responses[category] ||
      "I understand your question. Let me provide a detailed response to help you solve this challenge effectively."
    )
  }

  const generateCode = (userInput) => {
    if (userInput.toLowerCase().includes("react") || userInput.toLowerCase().includes("component")) {
      return `const Button = ({ children, onClick, variant = "primary" }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;`
    }

    if (userInput.toLowerCase().includes("debug") || userInput.toLowerCase().includes("error")) {
      return `try {
  // Your code here
  const result = await fetchData();
  return result;
} catch (error) {
  console.error('Error:', error);
  // Handle error appropriately
  throw new Error('Failed to fetch data');
}`
    }

    if (userInput.toLowerCase().includes("api") || userInput.toLowerCase().includes("fetch")) {
      return `const fetchData = async () => {
  try {
    const response = await fetch('/api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};`
    }

    return null
  }

  const detectCategory = (input) => {
    const lowerInput = input.toLowerCase()
    if (lowerInput.includes("review") || lowerInput.includes("code")) return "code"
    if (lowerInput.includes("debug") || lowerInput.includes("error") || lowerInput.includes("bug")) return "debug"
    if (lowerInput.includes("document") || lowerInput.includes("docs")) return "docs"
    if (lowerInput.includes("optimize") || lowerInput.includes("performance")) return "optimize"
    return "general"
  }

  const handleQuickCommand = (prompt) => {
    setInput(prompt)
  }

  const copyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    })
  }

  const insertCode = (code) => {
    // Simulate inserting code into active editor
    toast({
      title: "Code inserted!",
      description: "Code has been inserted into your active file.",
    })
  }

  const clearConversation = () => {
    setMessages([
      {
        id: "1",
        type: "assistant",
        content:
          "Hello! I'm your AI coding assistant. I can help you with code review, debugging, documentation, refactoring, and much more. What would you like to work on today?",
        timestamp: new Date(),
        category: "greeting",
      },
    ])
    toast({
      title: "Conversation cleared",
      description: "Started a new conversation.",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-10 h-10 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Loading AI Assistant</h2>
          <p className="text-gray-400">Initializing your coding companion...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="border-b border-gray-700/50 bg-black/20 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/dashboard")}
                className="text-gray-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Assistant</h1>
                <p className="text-sm text-gray-400">Your coding companion</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <History className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
          {/* Conversation History Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-800/50 border-gray-700 h-full">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Conversations</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearConversation}
                    className="text-gray-400 hover:text-white"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-3">
                  {conversationHistory.map((conv) => (
                    <Card
                      key={conv.id}
                      className="bg-gray-700/50 border-gray-600 hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <CardContent className="p-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-white text-sm truncate">{conv.title}</h4>
                            <p className="text-xs text-gray-400 mt-1 truncate">{conv.lastMessage}</p>
                            <p className="text-xs text-gray-500 mt-1">{conv.timestamp}</p>
                          </div>
                          {conv.starred && (
                            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 ml-2 flex-shrink-0" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 border-gray-700 h-full flex flex-col">
              <CardContent className="p-0 flex-1 flex flex-col">
                {/* Quick Commands */}
                <div className="p-4 border-b border-gray-700 bg-gray-800/30">
                  <div className="flex flex-wrap gap-2">
                    {quickCommands.map((command, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickCommand(command.prompt)}
                        className="bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600"
                      >
                        <command.icon className="h-3 w-3 mr-2" />
                        {command.label}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[80%] ${
                          message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-gradient-to-r from-blue-500 to-purple-500"
                              : "bg-gradient-to-r from-orange-500 to-red-500"
                          }`}
                        >
                          {message.type === "user" ? (
                            <span className="text-white text-sm font-medium">{user?.name?.charAt(0) || "U"}</span>
                          ) : (
                            <Bot className="w-4 h-4 text-white" />
                          )}
                        </div>

                        <div className={`${message.type === "user" ? "text-right" : ""}`}>
                          <div
                            className={`p-4 rounded-lg ${
                              message.type === "user" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-100"
                            }`}
                          >
                            <div className="prose prose-sm max-w-none">
                              <p className="whitespace-pre-wrap">{message.content}</p>

                              {message.code && (
                                <div className="mt-3">
                                  <pre className="bg-gray-800 p-3 rounded text-sm overflow-x-auto">
                                    <code>{message.code}</code>
                                  </pre>
                                  <div className="flex space-x-2 mt-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => copyToClipboard(message.code)}
                                      className="h-6 text-xs border-gray-600 text-gray-300 hover:bg-gray-600"
                                    >
                                      <Copy className="h-3 w-3 mr-1" />
                                      Copy
                                    </Button>
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => insertCode(message.code)}
                                      className="h-6 text-xs border-gray-600 text-gray-300 hover:bg-gray-600"
                                    >
                                      <Code className="h-3 w-3 mr-1" />
                                      Insert
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {message.type === "assistant" && (
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-600">
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(message.content)}
                                    className="h-6 px-2 text-xs text-gray-300 hover:text-white"
                                  >
                                    <Copy className="h-3 w-3 mr-1" />
                                    Copy
                                  </Button>
                                  {message.category && (
                                    <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
                                      {message.category}
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400">{message.timestamp.toLocaleTimeString()}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg">
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
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-gray-700 bg-gray-800/50">
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="flex space-x-3">
                      <Textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything about your code, debugging, optimization, or documentation..."
                        className="flex-1 min-h-[60px] max-h-32 resize-none bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                        disabled={isTyping}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            handleSubmit(e)
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        disabled={isTyping || !input.trim()}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white self-end"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Press Enter to send, Shift+Enter for new line</span>
                      <span>AI responses are generated and may not always be accurate</span>
                    </div>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

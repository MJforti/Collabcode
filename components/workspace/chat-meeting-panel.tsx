"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import {
  MessageSquare,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Send,
  Smile,
  Paperclip,
  Users,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { useToast } from "@/hooks/use-toast"

interface ChatMeetingPanelProps {
  workspaceId: string
  collaborators: any[]
  onCodeInsert: (code: string) => void
}

export function ChatMeetingPanel({ workspaceId, collaborators, onCodeInsert }: ChatMeetingPanelProps) {
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: "1",
      user: "Sarah Chen",
      avatar: "SC",
      content: "Hey team! I just pushed the latest changes to the header component.",
      timestamp: new Date(Date.now() - 300000),
      type: "message",
    },
    {
      id: "2",
      user: "Marcus Johnson",
      avatar: "MJ",
      content: "Great work! The styling looks much better now.",
      timestamp: new Date(Date.now() - 240000),
      type: "message",
    },
    {
      id: "3",
      user: "AI Assistant",
      avatar: "AI",
      content:
        "I noticed some optimization opportunities in your React components. Would you like me to suggest improvements?",
      timestamp: new Date(Date.now() - 180000),
      type: "ai",
    },
  ])

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = () => {
    if (!message.trim()) return

    const newMessage = {
      id: Date.now().toString(),
      user: "You",
      avatar: "YO",
      content: message,
      timestamp: new Date(),
      type: "message" as const,
    }

    setMessages((prev) => [...prev, newMessage])
    setMessage("")

    // Handle AI commands
    if (message.startsWith("@")) {
      handleAICommand(message)
    }
  }

  const handleAICommand = (command: string) => {
    setTimeout(() => {
      let response = ""
      let code = ""

      if (command.includes("@code")) {
        response = "Here's a React component for you:"
        code = `const Button = ({ children, onClick, variant = "primary" }) => {
  return (
    <button 
      className={\`btn btn-\${variant}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};`
      } else if (command.includes("@debug")) {
        response = "I found a potential issue in your code. Here's the fix:"
        code = `// Add error boundary
try {
  // Your code here
} catch (error) {
  console.error('Error:', error);
}`
      } else if (command.includes("@explain")) {
        response = "This code creates a reusable React component with proper TypeScript types and error handling."
      } else {
        response = "I'm here to help! Try @code, @debug, or @explain commands."
      }

      const aiResponse = {
        id: (Date.now() + 1).toString(),
        user: "AI Assistant",
        avatar: "AI",
        content: response,
        timestamp: new Date(),
        type: "ai" as const,
        code,
      }

      setMessages((prev) => [...prev, aiResponse])
    }, 1000)
  }

  const startMeeting = async () => {
    try {
      // Request camera and microphone access
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      setIsInMeeting(true)
      toast({
        title: "Meeting started",
        description: "You're now in a video call with your team.",
      })
    } catch (error) {
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to start a meeting.",
        variant: "destructive",
      })
    }
  }

  const endMeeting = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }
    setIsInMeeting(false)
    setIsScreenSharing(false)
    toast({
      title: "Meeting ended",
      description: "You've left the video call.",
    })
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const videoTrack = stream.getVideoTracks()[0]
      if (videoTrack) {
        videoTrack.enabled = !isVideoOn
      }
    }
  }

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      const audioTrack = stream.getAudioTracks()[0]
      if (audioTrack) {
        audioTrack.enabled = !isAudioOn
      }
    }
  }

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        })
        setIsScreenSharing(true)
        toast({
          title: "Screen sharing started",
          description: "Your screen is now being shared.",
        })
      } else {
        setIsScreenSharing(false)
        toast({
          title: "Screen sharing stopped",
          description: "You've stopped sharing your screen.",
        })
      }
    } catch (error) {
      toast({
        title: "Screen share failed",
        description: "Unable to share screen. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg m-1 flex flex-col overflow-hidden">
      {!isInMeeting ? (
        // Chat Only View
        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="bg-gray-700 m-2 mb-0">
            <TabsTrigger value="chat" className="flex-1">
              Chat
            </TabsTrigger>
            <TabsTrigger value="team" className="flex-1">
              Team
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col m-2 mt-0">
            {/* Chat Header */}
            <div className="p-3 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-blue-400" />
                <span className="text-white font-medium">Team Chat</span>
                <Badge variant="outline" className="border-gray-600 text-gray-400">
                  <Users className="w-3 h-3 mr-1" />
                  {collaborators.length + 1}
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 px-2">
                  <Phone className="w-3 h-3" />
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={startMeeting}
                  className="bg-green-500 hover:bg-green-600 h-6 px-2"
                >
                  <Video className="w-3 h-3 mr-1" />
                  <span className="text-xs">Start Meeting</span>
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start space-x-2"
                >
                  <Avatar className="w-6 h-6 flex-shrink-0">
                    <AvatarFallback
                      className={`text-white text-xs ${msg.type === "ai" ? "bg-purple-500" : "bg-blue-500"}`}
                    >
                      {msg.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-white text-xs font-medium">{msg.user}</span>
                      <span className="text-gray-500 text-xs">
                        {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div
                      className={`text-xs leading-relaxed ${
                        msg.type === "ai" ? "bg-purple-500/20 p-2 rounded" : "text-gray-300"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                      {msg.code && (
                        <div className="mt-2">
                          <pre className="bg-gray-800 p-2 rounded text-xs overflow-x-auto">
                            <code>{msg.code}</code>
                          </pre>
                          <div className="flex space-x-1 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => navigator.clipboard.writeText(msg.code)}
                              className="h-5 text-xs border-purple-400 text-purple-400 hover:bg-purple-500/20"
                            >
                              Copy
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onCodeInsert(msg.code)}
                              className="h-5 text-xs border-purple-400 text-purple-400 hover:bg-purple-500/20"
                            >
                              Insert
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-700 p-3">
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center bg-gray-700 rounded border border-gray-600">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type a message... Use @code, @debug, @explain"
                    className="border-0 bg-transparent text-white text-xs focus:ring-0"
                  />
                  <div className="flex items-center space-x-1 px-2">
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-white">
                      <Paperclip className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-5 w-5 p-0 text-gray-400 hover:text-white">
                      <Smile className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <Button size="sm" onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 h-7 px-2">
                  <Send className="w-3 h-3" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Use @commands for AI assistance: @code, @debug, @explain</p>
            </div>
          </TabsContent>

          <TabsContent value="team" className="flex-1 m-2 mt-0">
            <div className="p-3 space-y-3">
              <h3 className="text-white font-medium text-sm">Team Members</h3>
              {collaborators.map((collab) => (
                <div key={collab.id} className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="text-white text-xs" style={{ backgroundColor: collab.color }}>
                      {collab.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-white text-xs font-medium">{collab.name}</p>
                    <p className="text-gray-400 text-xs">{collab.status === "online" ? "🟢 Online" : "🔴 Offline"}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      ) : (
        // Meeting View
        <ResizablePanelGroup direction="vertical" className="flex-1">
          {/* Chat Section */}
          <ResizablePanel defaultSize={40} minSize={20}>
            <div className="h-full flex flex-col p-2">
              <h3 className="text-white font-medium text-sm mb-2">Chat</h3>
              <div className="flex-1 overflow-y-auto space-y-2">
                {messages.slice(-3).map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <Avatar className="w-4 h-4">
                      <AvatarFallback className="bg-blue-500 text-white text-xs">{msg.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-300">
                        <span className="font-medium">{msg.user}:</span> {msg.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-1 mt-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Message..."
                  className="text-xs bg-gray-700 border-gray-600 text-white"
                />
                <Button size="sm" onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600 h-6 w-6 p-0">
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-700 hover:bg-blue-500 transition-colors" />

          {/* Meeting Section */}
          <ResizablePanel defaultSize={60} minSize={30}>
            <div className="h-full flex flex-col p-2">
              {/* Meeting Controls */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <h3 className="text-white font-medium text-sm">Meeting</h3>
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    Live
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant={isVideoOn ? "default" : "outline"}
                    size="sm"
                    onClick={toggleVideo}
                    className={`h-6 w-6 p-0 ${isVideoOn ? "bg-blue-500" : "border-gray-600 text-gray-400"}`}
                  >
                    {isVideoOn ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant={isAudioOn ? "default" : "outline"}
                    size="sm"
                    onClick={toggleAudio}
                    className={`h-6 w-6 p-0 ${isAudioOn ? "bg-blue-500" : "border-gray-600 text-gray-400"}`}
                  >
                    {isAudioOn ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant={isScreenSharing ? "default" : "outline"}
                    size="sm"
                    onClick={toggleScreenShare}
                    className={`h-6 w-6 p-0 ${isScreenSharing ? "bg-green-500" : "border-gray-600 text-gray-400"}`}
                  >
                    {isScreenSharing ? <Monitor className="w-3 h-3" /> : <MonitorOff className="w-3 h-3" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={endMeeting}
                    className="bg-red-500 hover:bg-red-600 text-white h-6 w-6 p-0"
                  >
                    <PhoneOff className="w-3 h-3" />
                  </Button>
                </div>
              </div>

              {/* Video Grid */}
              <div className="flex-1 grid grid-cols-2 gap-2">
                {/* Your Video */}
                <div className="relative bg-gray-800 rounded overflow-hidden">
                  {isVideoOn ? (
                    <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <VideoOff className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                  <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">You</div>
                  {!isAudioOn && (
                    <div className="absolute top-1 right-1 bg-red-500 rounded-full p-1">
                      <MicOff className="w-2 h-2 text-white" />
                    </div>
                  )}
                  {isScreenSharing && (
                    <div className="absolute top-1 left-1 bg-green-500 rounded-full p-1">
                      <Monitor className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>

                {/* Collaborators Videos */}
                {collaborators.slice(0, 3).map((collab) => (
                  <div key={collab.id} className="relative bg-gray-800 rounded overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium text-lg">{collab.avatar}</span>
                    </div>
                    <div className="absolute bottom-1 left-1 bg-black/50 text-white text-xs px-1 rounded">
                      {collab.name}
                    </div>
                    <div className="absolute top-1 right-1 bg-green-500 rounded-full p-1">
                      <Mic className="w-2 h-2 text-white" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </div>
  )
}

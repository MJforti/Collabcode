"use client"

import { useState } from "react"
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  Monitor,
  MonitorOff,
  PhoneOff,
  Settings,
  Users,
  MessageSquare,
  MoreHorizontal,
  Phone,
  UserPlus,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

export function MeetingPanel({ workspaceId }) {
  const { toast } = useToast()
  const [isInMeeting, setIsInMeeting] = useState(false)
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)
  const [meetingId, setMeetingId] = useState("")

  const [participants] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      isVideoOn: true,
      isAudioOn: true,
      isScreenSharing: false,
      status: "speaking",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      avatar: "MJ",
      isVideoOn: false,
      isAudioOn: true,
      isScreenSharing: false,
      status: "muted",
    },
    {
      id: "3",
      name: "Elena Rodriguez",
      avatar: "ER",
      isVideoOn: true,
      isAudioOn: false,
      isScreenSharing: true,
      status: "presenting",
    },
  ])

  const startMeeting = () => {
    setIsInMeeting(true)
    setMeetingId(`meeting-${Date.now()}`)
    toast({
      title: "Meeting started!",
      description: "You're now in a video meeting with your team.",
    })
  }

  const joinMeeting = () => {
    if (!meetingId.trim()) {
      toast({
        title: "Meeting ID required",
        description: "Please enter a valid meeting ID to join.",
        variant: "destructive",
      })
      return
    }
    setIsInMeeting(true)
    toast({
      title: "Joined meeting!",
      description: `Connected to meeting: ${meetingId}`,
    })
  }

  const endMeeting = () => {
    setIsInMeeting(false)
    setIsScreenSharing(false)
    setMeetingId("")
    toast({
      title: "Meeting ended",
      description: "You have left the meeting.",
    })
  }

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    toast({
      title: isVideoOn ? "Camera turned off" : "Camera turned on",
      description: isVideoOn ? "Your video is now disabled" : "Your video is now enabled",
    })
  }

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    toast({
      title: isAudioOn ? "Microphone muted" : "Microphone unmuted",
      description: isAudioOn ? "You are now muted" : "You are now unmuted",
    })
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    toast({
      title: isScreenSharing ? "Screen sharing stopped" : "Screen sharing started",
      description: isScreenSharing ? "You stopped sharing your screen" : "You are now sharing your screen",
    })
  }

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn)
    toast({
      title: isSpeakerOn ? "Speaker muted" : "Speaker unmuted",
      description: isSpeakerOn ? "Audio output disabled" : "Audio output enabled",
    })
  }

  const inviteParticipant = () => {
    const inviteLink = `${window.location.origin}/meeting/${meetingId}`
    navigator.clipboard.writeText(inviteLink)
    toast({
      title: "Invite link copied!",
      description: "Share this link with others to join the meeting.",
    })
  }

  if (!isInMeeting) {
    return (
      <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-sm">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-2">Video Meeting</h3>
          <p className="text-sm text-gray-400">Start or join a meeting with your team members</p>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-6">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4">
            <Video className="h-12 w-12 text-white" />
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-white">Ready to connect?</h3>
            <p className="text-gray-400 max-w-xs">Start a video meeting with your team to collaborate in real-time</p>
          </div>

          <div className="w-full max-w-sm space-y-4">
            <Button
              onClick={startMeeting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            >
              <Video className="h-4 w-4 mr-2" />
              Start new meeting
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-600" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-900 px-2 text-gray-400">Or</span>
              </div>
            </div>

            <div className="space-y-2">
              <Input
                placeholder="Enter meeting ID"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-400"
              />
              <Button
                onClick={joinMeeting}
                variant="outline"
                className="w-full border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
              >
                <Phone className="h-4 w-4 mr-2" />
                Join meeting
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-900/50 backdrop-blur-sm">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Active Meeting</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Badge variant="outline" className="bg-green-500/10 text-green-400 border-green-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse" />
                Live
              </Badge>
              <span>• {participants.length + 1} participants</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={inviteParticipant}
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <UserPlus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Meeting Content */}
      <div className="flex-1 p-4 flex flex-col">
        <Tabs defaultValue="gallery" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mb-4">
            <TabsTrigger value="gallery" className="text-xs">
              <Users className="h-3 w-3 mr-1" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="speaker" className="text-xs">
              <MessageSquare className="h-3 w-3 mr-1" />
              Speaker
            </TabsTrigger>
            <TabsTrigger value="screen" className="text-xs">
              <Monitor className="h-3 w-3 mr-1" />
              Screen
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="flex-1 m-0">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Your video */}
              <Card className="relative bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full">
                  {isVideoOn ? (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">You</span>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                      <VideoOff className="h-8 w-8 text-gray-500" />
                    </div>
                  )}

                  {/* Status indicators */}
                  <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">You</div>

                  <div className="absolute top-2 right-2 flex gap-1">
                    {!isAudioOn && (
                      <div className="bg-red-500 rounded-full p-1">
                        <MicOff className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isScreenSharing && (
                      <div className="bg-green-500 rounded-full p-1">
                        <Monitor className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Participant videos */}
              {participants.slice(0, 3).map((participant) => (
                <Card key={participant.id} className="relative bg-gray-800 border-gray-700 overflow-hidden">
                  <CardContent className="p-0 h-full">
                    {participant.isVideoOn ? (
                      <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">{participant.avatar}</span>
                      </div>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <VideoOff className="h-8 w-8 text-gray-500" />
                      </div>
                    )}

                    {/* Status indicators */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {participant.name}
                    </div>

                    <div className="absolute top-2 right-2 flex gap-1">
                      {!participant.isAudioOn && (
                        <div className="bg-red-500 rounded-full p-1">
                          <MicOff className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {participant.isScreenSharing && (
                        <div className="bg-green-500 rounded-full p-1">
                          <Monitor className="w-3 h-3 text-white" />
                        </div>
                      )}
                      {participant.status === "speaking" && (
                        <div className="bg-blue-500 rounded-full p-1 animate-pulse">
                          <Mic className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="speaker" className="flex-1 m-0">
            <div className="flex flex-col h-full space-y-3">
              {/* Main speaker */}
              <Card className="flex-1 bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full relative">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                    <span className="text-white font-semibold text-2xl">SC</span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-black/70 text-white text-sm px-3 py-1 rounded">
                    Sarah Chen (Speaking)
                  </div>

                  <div className="absolute top-3 right-3">
                    <div className="bg-blue-500 rounded-full p-2 animate-pulse">
                      <Mic className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnails */}
              <div className="h-20 flex space-x-2">
                <Card className="w-28 bg-gray-800 border-gray-700 overflow-hidden">
                  <CardContent className="p-0 h-full">
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-white font-medium text-sm">You</span>
                    </div>
                  </CardContent>
                </Card>

                {participants.slice(1, 3).map((participant) => (
                  <Card key={participant.id} className="w-28 bg-gray-800 border-gray-700 overflow-hidden">
                    <CardContent className="p-0 h-full">
                      {participant.isVideoOn ? (
                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">{participant.avatar}</span>
                        </div>
                      ) : (
                        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                          <VideoOff className="h-4 w-4 text-gray-500" />
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="screen" className="flex-1 m-0">
            <div className="flex flex-col h-full space-y-3">
              {/* Screen share */}
              <Card className="flex-1 bg-gray-800 border-gray-700 overflow-hidden">
                <CardContent className="p-0 h-full">
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center flex-col space-y-4">
                    <Monitor className="h-16 w-16 text-gray-500" />
                    <div className="text-center">
                      <p className="text-gray-400 text-lg font-medium">
                        {isScreenSharing ? "You are sharing your screen" : "Elena is sharing her screen"}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {isScreenSharing ? "Others can see your screen" : "Viewing Elena's presentation"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Thumbnails */}
              <div className="h-20 flex space-x-2">
                {[{ id: "you", name: "You", avatar: "YO" }, ...participants].map((person) => (
                  <Card key={person.id} className="w-28 bg-gray-800 border-gray-700 overflow-hidden">
                    <CardContent className="p-0 h-full">
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{person.avatar}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Controls */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isAudioOn ? "default" : "destructive"}
              size="icon"
              onClick={toggleAudio}
              className="h-10 w-10"
            >
              {isAudioOn ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
            </Button>

            <Button
              variant={isVideoOn ? "default" : "destructive"}
              size="icon"
              onClick={toggleVideo}
              className="h-10 w-10"
            >
              {isVideoOn ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
            </Button>

            <Button
              variant={isScreenSharing ? "secondary" : "outline"}
              size="icon"
              onClick={toggleScreenShare}
              className={`h-10 w-10 ${isScreenSharing ? "bg-green-500 hover:bg-green-600" : ""}`}
            >
              {isScreenSharing ? <Monitor className="h-4 w-4" /> : <MonitorOff className="h-4 w-4" />}
            </Button>

            <Button
              variant={isSpeakerOn ? "default" : "destructive"}
              size="icon"
              onClick={toggleSpeaker}
              className="h-10 w-10"
            >
              {isSpeakerOn ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" className="h-10 w-10">
              <Users className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <MessageSquare className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="icon" className="h-10 w-10">
              <Settings className="h-4 w-4" />
            </Button>

            <Button variant="destructive" size="icon" onClick={endMeeting} className="h-10 w-10">
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Meeting info */}
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            Meeting ID: {meetingId} • Duration: {Math.floor(Math.random() * 45) + 5} minutes
          </p>
        </div>
      </div>
    </div>
  )
}

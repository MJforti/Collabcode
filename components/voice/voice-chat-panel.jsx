"use client"

import { useState, useEffect, useRef } from "react"
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Settings,
  Users,
  Phone,
  PhoneOff,
  Radio,
  Headphones,
  Waves,
  Activity,
  Zap,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"

export function VoiceChatPanel({ workspaceId, channelId }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isDeafened, setIsDeafened] = useState(false)
  const [isPushToTalk, setIsPushToTalk] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [volume, setVolume] = useState([80])
  const [micVolume, setMicVolume] = useState([75])
  const [noiseSuppression, setNoiseSuppression] = useState(true)
  const [echoCancellation, setEchoCancellation] = useState(true)
  const [voiceActivity, setVoiceActivity] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  const pushToTalkRef = useRef(false)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)

  const [participants] = useState([
    {
      id: 1,
      name: "Alex Rivera",
      avatar: "AR",
      isSpeaking: true,
      isMuted: false,
      isDeafened: false,
      voiceLevel: 85,
      status: "speaking",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "SW",
      isSpeaking: false,
      isMuted: false,
      isDeafened: false,
      voiceLevel: 0,
      status: "listening",
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar: "MC",
      isSpeaking: false,
      isMuted: true,
      isDeafened: false,
      voiceLevel: 0,
      status: "muted",
    },
    {
      id: 4,
      name: "Emma Davis",
      avatar: "ED",
      isSpeaking: false,
      isMuted: false,
      isDeafened: true,
      voiceLevel: 0,
      status: "deafened",
    },
  ])

  // Simulate voice activity detection
  useEffect(() => {
    if (!isConnected || isMuted) return

    const interval = setInterval(() => {
      if (!isPushToTalk || pushToTalkRef.current) {
        setVoiceActivity(Math.random() > 0.7)
      } else {
        setVoiceActivity(false)
      }
    }, 200)

    return () => clearInterval(interval)
  }, [isConnected, isMuted, isPushToTalk])

  // Push to talk functionality
  useEffect(() => {
    if (!isPushToTalk) return

    const handleKeyDown = (e) => {
      if (e.code === "Space" && !e.repeat) {
        e.preventDefault()
        pushToTalkRef.current = true
        setVoiceActivity(true)
      }
    }

    const handleKeyUp = (e) => {
      if (e.code === "Space") {
        e.preventDefault()
        pushToTalkRef.current = false
        setVoiceActivity(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [isPushToTalk])

  const connectToVoice = () => {
    setIsConnected(true)
  }

  const disconnectFromVoice = () => {
    setIsConnected(false)
    setIsMuted(false)
    setIsDeafened(false)
    setVoiceActivity(false)
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      setVoiceActivity(false)
    }
  }

  const toggleDeafen = () => {
    setIsDeafened(!isDeafened)
    if (!isDeafened) {
      setIsMuted(true)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "speaking":
        return "border-green-500 bg-green-500/20"
      case "listening":
        return "border-blue-500 bg-blue-500/20"
      case "muted":
        return "border-red-500 bg-red-500/20"
      case "deafened":
        return "border-gray-500 bg-gray-500/20"
      default:
        return "border-gray-600 bg-gray-600/20"
    }
  }

  if (!isConnected) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-white">Voice Chat</h3>
              <p className="text-sm text-gray-400">Connect to start voice communication</p>
            </div>
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              <Radio className="w-3 h-3 mr-1" />
              Offline
            </Badge>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
            <Headphones className="h-12 w-12 text-blue-400" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">Join Voice Channel</h3>
          <p className="text-gray-400 text-center mb-8 max-w-md">
            Connect to the voice channel to communicate with your team members in real-time
          </p>

          <div className="space-y-4 w-full max-w-sm">
            <Button onClick={connectToVoice} className="w-full bg-green-500 hover:bg-green-600">
              <Phone className="h-4 w-4 mr-2" />
              Connect to Voice
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowSettings(!showSettings)}
              className="w-full border-gray-600 text-gray-300"
            >
              <Settings className="h-4 w-4 mr-2" />
              Voice Settings
            </Button>
          </div>

          {/* Quick Settings */}
          {showSettings && (
            <Card className="w-full max-w-md mt-6 bg-gray-800 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-white">Quick Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Push to Talk</Label>
                  <Switch checked={isPushToTalk} onCheckedChange={setIsPushToTalk} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Noise Suppression</Label>
                  <Switch checked={noiseSuppression} onCheckedChange={setNoiseSuppression} />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-300">Echo Cancellation</Label>
                  <Switch checked={echoCancellation} onCheckedChange={setEchoCancellation} />
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Voice Chat</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Badge variant="outline" className="border-green-500 text-green-400 bg-green-500/10">
                <Radio className="w-3 h-3 mr-1" />
                Connected
              </Badge>
              <span>• {participants.length} participants</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="text-gray-400 hover:text-white"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Tabs defaultValue="participants" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 mx-4 mt-4">
            <TabsTrigger value="participants">Participants</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="recording">Recording</TabsTrigger>
          </TabsList>

          <TabsContent value="participants" className="flex-1 p-4 m-0">
            <div className="space-y-3">
              {/* Your status */}
              <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg border border-gray-700">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-blue-500 text-white">You</AvatarFallback>
                  </Avatar>
                  {voiceActivity && (
                    <div className="absolute -inset-1 rounded-full border-2 border-green-400 animate-pulse" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-white font-medium">You</span>
                    {isPushToTalk && (
                      <Badge variant="outline" className="text-xs border-yellow-500 text-yellow-400">
                        PTT
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <span>
                      {isMuted ? "Muted" : isDeafened ? "Deafened" : voiceActivity ? "Speaking" : "Listening"}
                    </span>
                    {voiceActivity && <Activity className="w-3 h-3 text-green-400" />}
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                  {isDeafened && <VolumeX className="w-4 h-4 text-red-400" />}
                </div>
              </div>

              {/* Other participants */}
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg border transition-all ${getStatusColor(
                    participant.status,
                  )}`}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-purple-500 text-white">{participant.avatar}</AvatarFallback>
                    </Avatar>
                    {participant.isSpeaking && (
                      <div className="absolute -inset-1 rounded-full border-2 border-green-400 animate-pulse" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-medium">{participant.name}</span>
                      {participant.voiceLevel > 0 && (
                        <div className="flex items-center space-x-1">
                          <Waves className="w-3 h-3 text-green-400" />
                          <div className="w-8 h-1 bg-gray-600 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-400 transition-all duration-100"
                              style={{ width: `${participant.voiceLevel}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span className="capitalize">{participant.status}</span>
                      {participant.isSpeaking && <Activity className="w-3 h-3 text-green-400" />}
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                    {participant.isDeafened && <VolumeX className="w-4 h-4 text-red-400" />}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="flex-1 p-4 m-0">
            <div className="space-y-6">
              {/* Audio Input */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white flex items-center">
                    <Mic className="w-4 h-4 mr-2" />
                    Audio Input
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Microphone Volume</Label>
                    <Slider value={micVolume} onValueChange={setMicVolume} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>{micVolume[0]}%</span>
                      <span>100%</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <Label className="text-sm text-gray-300">Push to Talk</Label>
                    <Switch checked={isPushToTalk} onCheckedChange={setIsPushToTalk} />
                  </div>

                  {isPushToTalk && (
                    <div className="p-3 bg-gray-700 rounded border border-gray-600">
                      <p className="text-xs text-gray-300 mb-1">Push to Talk Key</p>
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        Spacebar
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Audio Output */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white flex items-center">
                    <Volume2 className="w-4 h-4 mr-2" />
                    Audio Output
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Output Volume</Label>
                    <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>0%</span>
                      <span>{volume[0]}%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Audio Processing */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white flex items-center">
                    <Zap className="w-4 h-4 mr-2" />
                    Audio Processing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-gray-300">Noise Suppression</Label>
                      <p className="text-xs text-gray-400">Reduces background noise</p>
                    </div>
                    <Switch checked={noiseSuppression} onCheckedChange={setNoiseSuppression} />
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-gray-300">Echo Cancellation</Label>
                      <p className="text-xs text-gray-400">Prevents audio feedback</p>
                    </div>
                    <Switch checked={echoCancellation} onCheckedChange={setEchoCancellation} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recording" className="flex-1 p-4 m-0">
            <div className="space-y-6">
              {/* Recording Controls */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white flex items-center">
                    <Shield className="w-4 h-4 mr-2" />
                    Voice Recording
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-sm text-gray-300">Record Voice Chat</Label>
                      <p className="text-xs text-gray-400">Save voice conversations for later</p>
                    </div>
                    <Button
                      variant={isRecording ? "destructive" : "default"}
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      {isRecording ? "Stop Recording" : "Start Recording"}
                    </Button>
                  </div>

                  {isRecording && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-red-400 text-sm font-medium">Recording in progress</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">All participants have been notified</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Recent Recordings */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-white">Recent Recordings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                      <div>
                        <p className="text-sm text-white">Team Standup - Dec 4</p>
                        <p className="text-xs text-gray-400">15:30 duration</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                      <div>
                        <p className="text-sm text-white">Code Review Session - Dec 3</p>
                        <p className="text-xs text-gray-400">45:20 duration</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Voice Controls */}
      <div className="p-4 border-t border-gray-700 bg-gray-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant={isMuted ? "destructive" : "default"}
              size="icon"
              onClick={toggleMute}
              className="h-10 w-10"
            >
              {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>

            <Button
              variant={isDeafened ? "destructive" : "outline"}
              size="icon"
              onClick={toggleDeafen}
              className="h-10 w-10"
            >
              {isDeafened ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </Button>

            {isPushToTalk && (
              <Badge variant="outline" className="border-yellow-500 text-yellow-400 px-2 py-1">
                Hold SPACE to talk
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="border-gray-600 text-gray-400">
              <Users className="w-3 h-3 mr-1" />
              {participants.length + 1}
            </Badge>

            <Button variant="destructive" size="icon" onClick={disconnectFromVoice} className="h-10 w-10">
              <PhoneOff className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Voice Activity Indicator */}
        {voiceActivity && !isMuted && (
          <div className="mt-3 flex items-center justify-center">
            <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-green-400 text-xs font-medium">Speaking</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

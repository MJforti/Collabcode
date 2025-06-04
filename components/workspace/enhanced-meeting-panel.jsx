"use client"

import { useState } from "react"
import { VoiceChatPanel } from "@/components/voice/voice-chat-panel"
import { VoiceChannelList } from "@/components/voice/voice-channel-list"
import { VoiceSettingsModal } from "@/components/voice/voice-settings-modal"
import { MeetingPanel } from "@/components/workspace/meeting-panel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Settings, Video, Headphones } from "lucide-react"

export function EnhancedMeetingPanel({ workspaceId }) {
  const [activeChannel, setActiveChannel] = useState(null)
  const [meetingType, setMeetingType] = useState("voice") // 'voice' or 'video'

  const handleJoinChannel = (channel) => {
    setActiveChannel(channel)
  }

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Communication</h3>
          <div className="flex items-center space-x-2">
            <VoiceSettingsModal>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
            </VoiceSettingsModal>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <Tabs value={meetingType} onValueChange={setMeetingType} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-2 bg-gray-800 mx-3 mt-3">
            <TabsTrigger value="voice" className="flex items-center">
              <Headphones className="h-4 w-4 mr-2" />
              Voice Chat
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Video Meeting
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voice" className="flex-1 m-0">
            {activeChannel ? (
              <VoiceChatPanel workspaceId={workspaceId} channelId={activeChannel.id} />
            ) : (
              <VoiceChannelList onJoinChannel={handleJoinChannel} />
            )}
          </TabsContent>

          <TabsContent value="video" className="flex-1 m-0">
            <MeetingPanel workspaceId={workspaceId} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

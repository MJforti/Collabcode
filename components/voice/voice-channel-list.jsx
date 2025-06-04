"use client"

import { useState } from "react"
import { Volume2, Lock, Plus, Settings, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function VoiceChannelList({ onJoinChannel }) {
  const [channels] = useState([
    {
      id: 1,
      name: "General Voice",
      type: "voice",
      participants: [
        { id: 1, name: "Alex Rivera", avatar: "AR", isSpeaking: true },
        { id: 2, name: "Sarah Wilson", avatar: "SW", isSpeaking: false },
      ],
      isPrivate: false,
      maxParticipants: 10,
    },
    {
      id: 2,
      name: "Development Team",
      type: "voice",
      participants: [
        { id: 3, name: "Mike Chen", avatar: "MC", isSpeaking: false },
        { id: 4, name: "Emma Davis", avatar: "ED", isSpeaking: true },
        { id: 5, name: "John Smith", avatar: "JS", isSpeaking: false },
      ],
      isPrivate: false,
      maxParticipants: 8,
    },
    {
      id: 3,
      name: "Design Review",
      type: "voice",
      participants: [],
      isPrivate: true,
      maxParticipants: 5,
    },
    {
      id: 4,
      name: "Client Meeting",
      type: "voice",
      participants: [{ id: 6, name: "Lisa Johnson", avatar: "LJ", isSpeaking: false }],
      isPrivate: true,
      maxParticipants: 6,
    },
  ])

  return (
    <div className="h-full flex flex-col bg-gray-900">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Voice Channels</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                  <Plus className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create Voice Channel</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Channel List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {channels.map((channel) => (
            <div
              key={channel.id}
              className="group relative p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
              onClick={() => onJoinChannel(channel)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    {channel.isPrivate ? (
                      <Lock className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Volume2 className="h-4 w-4 text-gray-400" />
                    )}
                    <span className="text-white font-medium text-sm">{channel.name}</span>
                  </div>
                  {channel.participants.length > 0 && (
                    <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
                      {channel.participants.length}/{channel.maxParticipants}
                    </Badge>
                  )}
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Settings className="h-3 w-3" />
                </Button>
              </div>

              {/* Participants */}
              {channel.participants.length > 0 && (
                <div className="space-y-1">
                  {channel.participants.map((participant) => (
                    <div key={participant.id} className="flex items-center space-x-2 pl-6">
                      <div className="relative">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="bg-purple-500 text-white text-xs">
                            {participant.avatar}
                          </AvatarFallback>
                        </Avatar>
                        {participant.isSpeaking && (
                          <div className="absolute -inset-0.5 rounded-full border border-green-400 animate-pulse" />
                        )}
                      </div>
                      <span className="text-gray-300 text-sm">{participant.name}</span>
                      {participant.isSpeaking && (
                        <div className="flex items-center space-x-1">
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" />
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse delay-75" />
                          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Empty state */}
              {channel.participants.length === 0 && (
                <div className="pl-6">
                  <p className="text-gray-500 text-xs">No one in channel</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-700">
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start text-sm" size="sm">
            <Hash className="h-4 w-4 mr-2" />
            Browse All Channels
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create Voice Channel
          </Button>
        </div>
      </div>
    </div>
  )
}

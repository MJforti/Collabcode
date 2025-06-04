"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Mail, Copy, Share, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface InviteFriendModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onInviteFriend: (email: string) => void
}

export function InviteFriendModal({ open, onOpenChange, onInviteFriend }: InviteFriendModalProps) {
  const { toast } = useToast()
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("Hey! I'm using CollabCode for collaborative coding. Want to join me?")
  const [inviteLink] = useState("https://collabcode.dev/invite/abc123")

  const handleSendInvite = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    onInviteFriend(email)
    setEmail("")
    onOpenChange(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inviteLink)
    toast({
      title: "Link copied!",
      description: "Invite link has been copied to clipboard.",
    })
  }

  const handleShareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on CollabCode",
          text: message,
          url: inviteLink,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      handleCopyLink()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Invite Friends</h2>
                  <p className="text-gray-400 text-sm">Share CollabCode with others</p>
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

            <div className="space-y-6">
              {/* Email Invite */}
              <form onSubmit={handleSendInvite} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Email Address</label>
                  <Input
                    type="email"
                    placeholder="friend@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Personal Message</label>
                  <Textarea
                    placeholder="Add a personal message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Invitation
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or share link</span>
                </div>
              </div>

              {/* Share Link */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-300 block">Invite Link</label>
                <div className="flex space-x-2">
                  <Input value={inviteLink} readOnly className="bg-gray-700 border-gray-600 text-white" />
                  <Button onClick={handleCopyLink} className="bg-blue-500 hover:bg-blue-600">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex space-x-2">
                  <Button
                    onClick={handleShareNative}
                    variant="outline"
                    className="flex-1 bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Share className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h3 className="text-white font-medium mb-2">Why CollabCode?</h3>
                <ul className="text-gray-400 text-sm space-y-1">
                  <li>• Real-time collaborative coding</li>
                  <li>• Built-in video meetings</li>
                  <li>• AI-powered coding assistant</li>
                  <li>• Seamless GitHub integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

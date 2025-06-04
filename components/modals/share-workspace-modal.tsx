"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Share, Copy, Users, Eye, Edit, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface ShareWorkspaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShareWorkspaceModal({ open, onOpenChange }: ShareWorkspaceModalProps) {
  const { toast } = useToast()
  const [shareLink, setShareLink] = useState("https://collabcode.dev/workspace/abc123")
  const [permission, setPermission] = useState("edit")
  const [inviteEmail, setInviteEmail] = useState("")

  const permissions = [
    { value: "view", label: "View Only", icon: Eye, description: "Can view files and chat" },
    { value: "edit", label: "Editor", icon: Edit, description: "Can edit files and collaborate" },
    { value: "admin", label: "Admin", icon: Crown, description: "Full access including settings" },
  ]

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink)
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard.",
    })
  }

  const handleSendInvite = () => {
    if (!inviteEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Invitation sent!",
      description: `Invitation sent to ${inviteEmail}`,
    })
    setInviteEmail("")
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Share className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Share Workspace</h2>
                  <p className="text-gray-400 text-sm">Invite others to collaborate</p>
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
              {/* Share Link */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Share Link</label>
                <div className="flex space-x-2">
                  <Input value={shareLink} readOnly className="bg-gray-700 border-gray-600 text-white" />
                  <Button onClick={handleCopyLink} className="bg-blue-500 hover:bg-blue-600">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Permission Level */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Default Permission</label>
                <Select value={permission} onValueChange={setPermission}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {permissions.map((perm) => (
                      <SelectItem key={perm.value} value={perm.value} className="text-white hover:bg-gray-700">
                        <div className="flex items-center space-x-2">
                          <perm.icon className="w-4 h-4" />
                          <div>
                            <div className="font-medium">{perm.label}</div>
                            <div className="text-xs text-gray-400">{perm.description}</div>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Email Invitation */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Invite by Email</label>
                <div className="flex space-x-2">
                  <Input
                    placeholder="Enter email address"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                  <Button onClick={handleSendInvite} className="bg-green-500 hover:bg-green-600">
                    <Users className="w-4 h-4 mr-2" />
                    Invite
                  </Button>
                </div>
              </div>

              {/* Current Collaborators */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Current Collaborators</label>
                <div className="space-y-2">
                  {[
                    { name: "You", email: "john@example.com", role: "admin", isOwner: true },
                    { name: "Sarah Chen", email: "sarah@example.com", role: "edit", isOwner: false },
                    { name: "Marcus Johnson", email: "marcus@example.com", role: "view", isOwner: false },
                  ].map((collab, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-medium text-sm">{collab.name}</p>
                        <p className="text-gray-400 text-xs">{collab.email}</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={`${
                          collab.role === "admin"
                            ? "border-purple-500 text-purple-400"
                            : collab.role === "edit"
                              ? "border-blue-500 text-blue-400"
                              : "border-gray-500 text-gray-400"
                        }`}
                      >
                        {collab.isOwner ? "Owner" : collab.role}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Close
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

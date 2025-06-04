"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, User, Camera, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"

interface ProfileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { toast } = useToast()
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    bio: "Full-stack developer passionate about collaborative coding",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const handleSave = () => {
    // Save profile logic here
    localStorage.setItem("user", JSON.stringify(profile))

    toast({
      title: "Profile updated!",
      description: "Your profile has been saved successfully.",
    })
    onOpenChange(false)
  }

  const handleAvatarChange = () => {
    // Simulate avatar upload
    toast({
      title: "Avatar updated!",
      description: "Your profile picture has been updated.",
    })
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
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Edit Profile</h2>
                  <p className="text-gray-400 text-sm">Update your personal information</p>
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

            <div className="space-y-4">
              {/* Avatar */}
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  onClick={handleAvatarChange}
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>

              {/* Name */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Full Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile((prev) => ({ ...prev, name: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Email</label>
                <Input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile((prev) => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile((prev) => ({ ...prev, bio: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Users, Mail, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CreateTeamModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateTeam: (data: any) => void
}

export function CreateTeamModal({ open, onOpenChange, onCreateTeam }: CreateTeamModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    members: [{ email: "", role: "member" }],
  })

  const handleAddMember = () => {
    setFormData((prev) => ({
      ...prev,
      members: [...prev.members, { email: "", role: "member" }],
    }))
  }

  const handleRemoveMember = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.filter((_, i) => i !== index),
    }))
  }

  const handleMemberChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.map((member, i) => (i === index ? { ...member, [field]: value } : member)),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    onCreateTeam(formData)

    // Reset form
    setFormData({
      name: "",
      description: "",
      members: [{ email: "", role: "member" }],
    })

    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Create Team</h2>
                  <p className="text-gray-400 text-sm">Invite collaborators to join your team</p>
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

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Team Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Team Name *</label>
                  <Input
                    placeholder="Frontend Team"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                  <Textarea
                    placeholder="What does this team work on?"
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Team Members */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-gray-300">Team Members</label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAddMember}
                    className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add Member
                  </Button>
                </div>

                <div className="space-y-3">
                  {formData.members.map((member, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="flex-1">
                        <Input
                          placeholder="colleague@company.com"
                          type="email"
                          value={member.email}
                          onChange={(e) => handleMemberChange(index, "email", e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <Select value={member.role} onValueChange={(value) => handleMemberChange(index, "role", value)}>
                        <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-800 border-gray-700">
                          <SelectItem value="admin" className="text-white hover:bg-gray-700">
                            Admin
                          </SelectItem>
                          <SelectItem value="member" className="text-white hover:bg-gray-700">
                            Member
                          </SelectItem>
                          <SelectItem value="viewer" className="text-white hover:bg-gray-700">
                            Viewer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {formData.members.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveMember(index)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                  disabled={!formData.name.trim()}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Create & Invite
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

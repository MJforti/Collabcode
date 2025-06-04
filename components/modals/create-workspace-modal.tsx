"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Plus, Code, Globe, Smartphone, Database, Palette } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface CreateWorkspaceModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateWorkspace: (data: any) => void
}

export function CreateWorkspaceModal({ open, onOpenChange, onCreateWorkspace }: CreateWorkspaceModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "react",
    isPublic: false,
  })

  const templates = [
    {
      id: "react",
      name: "React App",
      description: "Modern React application with TypeScript",
      icon: Code,
      tech: ["React", "TypeScript", "Tailwind"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "nextjs",
      name: "Next.js",
      description: "Full-stack React framework",
      icon: Globe,
      tech: ["Next.js", "React", "TypeScript"],
      color: "from-gray-700 to-gray-900",
    },
    {
      id: "node",
      name: "Node.js API",
      description: "RESTful API with Express",
      icon: Database,
      tech: ["Node.js", "Express", "MongoDB"],
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "mobile",
      name: "React Native",
      description: "Cross-platform mobile app",
      icon: Smartphone,
      tech: ["React Native", "Expo"],
      color: "from-purple-500 to-pink-500",
    },
    {
      id: "design",
      name: "Design System",
      description: "Component library and design tokens",
      icon: Palette,
      tech: ["Storybook", "CSS", "Figma"],
      color: "from-orange-500 to-red-500",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim()) {
      return
    }

    const selectedTemplate = templates.find((t) => t.id === formData.template)

    onCreateWorkspace({
      ...formData,
      tech: selectedTemplate?.tech || ["React"],
      template: selectedTemplate,
    })

    // Reset form
    setFormData({
      name: "",
      description: "",
      template: "react",
      isPublic: false,
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
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Create New Workspace</h2>
                  <p className="text-gray-400 text-sm">Start a new collaborative project</p>
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
              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Workspace Name *</label>
                  <Input
                    placeholder="My Awesome Project"
                    value={formData.name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe what you're building..."
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    className="bg-gray-700 border-gray-600 text-white"
                    rows={3}
                  />
                </div>
              </div>

              {/* Template Selection */}
              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">Choose Template</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={`cursor-pointer transition-all ${
                        formData.template === template.id
                          ? "bg-blue-500/20 border-blue-500"
                          : "bg-gray-700/50 border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setFormData((prev) => ({ ...prev, template: template.id }))}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${template.color}`}>
                            <template.icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-white text-sm">{template.name}</h3>
                            <p className="text-gray-400 text-xs mt-1">{template.description}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {template.tech.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs border-gray-600 text-gray-400">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  disabled={!formData.name.trim()}
                >
                  Create Workspace
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, File, Code, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface CreateFileModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateFile: (name: string, type: string) => void
}

export function CreateFileModal({ open, onOpenChange, onCreateFile }: CreateFileModalProps) {
  const { toast } = useToast()
  const [fileName, setFileName] = useState("")
  const [selectedType, setSelectedType] = useState("js")

  const fileTypes = [
    { id: "js", name: "JavaScript", icon: Code, extension: ".js", color: "from-yellow-500 to-orange-500" },
    { id: "jsx", name: "React Component", icon: Code, extension: ".jsx", color: "from-blue-500 to-cyan-500" },
    { id: "css", name: "CSS Stylesheet", icon: FileText, extension: ".css", color: "from-blue-600 to-purple-600" },
    { id: "html", name: "HTML Document", icon: FileText, extension: ".html", color: "from-orange-500 to-red-500" },
    { id: "json", name: "JSON Data", icon: File, extension: ".json", color: "from-green-500 to-emerald-500" },
    { id: "md", name: "Markdown", icon: FileText, extension: ".md", color: "from-gray-500 to-gray-600" },
  ]

  const handleCreate = () => {
    if (!fileName.trim()) {
      toast({
        title: "File name required",
        description: "Please enter a file name.",
        variant: "destructive",
      })
      return
    }

    onCreateFile(fileName, selectedType)
    setFileName("")
    setSelectedType("js")
    onOpenChange(false)
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
              <h2 className="text-xl font-bold text-white">Create New File</h2>
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
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">File Name</label>
                <Input
                  placeholder="Enter file name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  autoFocus
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-3 block">File Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {fileTypes.map((type) => (
                    <Card
                      key={type.id}
                      className={`cursor-pointer transition-all ${
                        selectedType === type.id
                          ? "bg-blue-500/20 border-blue-500"
                          : "bg-gray-700/50 border-gray-600 hover:border-gray-500"
                      }`}
                      onClick={() => setSelectedType(type.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded bg-gradient-to-r ${type.color}`}>
                            <type.icon className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">{type.name}</p>
                            <p className="text-xs text-gray-400">{type.extension}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                Create File
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

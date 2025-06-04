"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Folder,
  FolderOpen,
  Plus,
  Search,
  MoreHorizontal,
  Code2,
  ImageIcon,
  FileText,
  Calendar,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "@/components/theme-provider"

export function DirectoriesPanel() {
  const [expandedFolders, setExpandedFolders] = useState(new Set(["src", "components"]))
  const [searchTerm, setSearchTerm] = useState("")
  const { theme } = useTheme()

  const toggleFolder = (folderId) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId)
    } else {
      newExpanded.add(folderId)
    }
    setExpandedFolders(newExpanded)
  }

  const fileStructure = [
    {
      id: "src",
      name: "src",
      type: "folder",
      children: [
        {
          id: "components",
          name: "components",
          type: "folder",
          children: [
            { id: "button.jsx", name: "Button.jsx", type: "file", icon: Code2 },
            { id: "modal.jsx", name: "Modal.jsx", type: "file", icon: Code2 },
            { id: "header.jsx", name: "Header.jsx", type: "file", icon: Code2, active: true },
          ],
        },
        { id: "app.jsx", name: "App.jsx", type: "file", icon: Code2 },
        { id: "index.js", name: "index.js", type: "file", icon: Code2 },
      ],
    },
    {
      id: "public",
      name: "public",
      type: "folder",
      children: [
        { id: "logo.png", name: "logo.png", type: "file", icon: ImageIcon },
        { id: "favicon.ico", name: "favicon.ico", type: "file", icon: ImageIcon },
      ],
    },
    { id: "readme.md", name: "README.md", type: "file", icon: FileText },
    { id: "package.json", name: "package.json", type: "file", icon: FileText },
  ]

  const tasks = [
    { id: 1, title: "Implement user authentication", status: "in-progress", assignee: "Alice", priority: "high" },
    { id: 2, title: "Design landing page", status: "todo", assignee: "Bob", priority: "medium" },
    { id: 3, title: "Set up database", status: "done", assignee: "Charlie", priority: "high" },
    { id: 4, title: "Write API documentation", status: "todo", assignee: "Diana", priority: "low" },
  ]

  const renderFileTree = (items, depth = 0) => {
    return items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: depth * 0.1 }}
        className={`ml-${depth * 4}`}
      >
        <div
          className={`flex items-center gap-2 p-1 rounded cursor-pointer group hover:bg-gray-700/50 ${
            item.active ? "bg-blue-500/20 text-blue-400" : theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
          onClick={() => item.type === "folder" && toggleFolder(item.id)}
        >
          {item.type === "folder" ? (
            expandedFolders.has(item.id) ? (
              <FolderOpen className="w-4 h-4 text-blue-400" />
            ) : (
              <Folder className="w-4 h-4 text-blue-400" />
            )
          ) : (
            <item.icon className="w-4 h-4" />
          )}
          <span className="text-sm flex-1">{item.name}</span>
          <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0">
            <MoreHorizontal className="w-3 h-3" />
          </Button>
        </div>
        {item.type === "folder" && expandedFolders.has(item.id) && item.children && (
          <div className="ml-4">{renderFileTree(item.children, depth + 1)}</div>
        )}
      </motion.div>
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "todo":
        return "bg-gray-500"
      case "in-progress":
        return "bg-blue-500"
      case "done":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "text-red-400"
      case "medium":
        return "text-yellow-400"
      case "low":
        return "text-green-400"
      default:
        return "text-gray-400"
    }
  }

  return (
    <div
      className={`h-full flex flex-col ${theme === "dark" ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"} border-r`}
    >
      <Tabs defaultValue="files" className="flex-1 flex flex-col">
        <TabsList className={`grid w-full grid-cols-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"} m-2`}>
          <TabsTrigger value="files" className="text-xs">
            Files
          </TabsTrigger>
          <TabsTrigger value="tasks" className="text-xs">
            Tasks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="flex-1 flex flex-col m-0">
          {/* Files Header */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Project Files
              </h3>
              <Button
                size="sm"
                variant="ghost"
                className={`h-6 w-6 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="relative">
              <Search
                className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
              />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`pl-7 h-7 text-xs ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
              />
            </div>
          </div>

          {/* File Tree */}
          <ScrollArea className="flex-1 p-2">{renderFileTree(fileStructure)}</ScrollArea>
        </TabsContent>

        <TabsContent value="tasks" className="flex-1 flex flex-col m-0">
          {/* Tasks Header */}
          <div className="p-3 border-b border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                Sprint Tasks
              </h3>
              <Button
                size="sm"
                variant="ghost"
                className={`h-6 w-6 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              Sprint 23 • 5 days left
            </div>
          </div>

          {/* Task List */}
          <ScrollArea className="flex-1 p-2">
            <div className="space-y-2">
              {tasks.map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-2 rounded border cursor-pointer hover:bg-gray-700/50 ${
                    theme === "dark" ? "bg-gray-800 border-gray-700" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${getStatusColor(task.status)}`} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-medium mb-1 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        {task.title}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={`text-xs h-4 px-1 ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Users className="w-3 h-3" />
                          {task.assignee}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Task Stats */}
            <div className={`mt-4 p-2 rounded ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="text-xs text-gray-500 mb-2">Sprint Progress</div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Completed</span>
                  <span className="text-green-400">1/4</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <div className="bg-green-500 h-1 rounded-full" style={{ width: "25%" }} />
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  )
}

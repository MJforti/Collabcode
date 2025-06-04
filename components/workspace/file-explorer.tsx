"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Folder,
  FolderOpen,
  File,
  FileText,
  Code,
  ImageIcon,
  Settings,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  GitBranch,
  GitCommit,
  GitPullRequest,
  MoreHorizontal,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu"
import { useToast } from "@/hooks/use-toast"

interface FileExplorerProps {
  files: any
  activeFile: string
  onFileSelect: (file: string) => void
  onCreateFile: (name: string, type: string) => void
  collaborators: any[]
}

export function FileExplorer({ files, activeFile, onFileSelect, onCreateFile, collaborators }: FileExplorerProps) {
  const { toast } = useToast()
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(["src"]))
  const [searchQuery, setSearchQuery] = useState("")
  const [showNotifications, setShowNotifications] = useState(true)

  const fileStructure = {
    src: {
      type: "folder",
      children: {
        "App.js": { type: "file", language: "javascript" },
        "App.css": { type: "file", language: "css" },
        "index.js": { type: "file", language: "javascript" },
        components: {
          type: "folder",
          children: {
            "Header.jsx": { type: "file", language: "javascript" },
            "Button.jsx": { type: "file", language: "javascript" },
          },
        },
      },
    },
    public: {
      type: "folder",
      children: {
        "index.html": { type: "file", language: "html" },
        "favicon.ico": { type: "file", language: "image" },
      },
    },
    "package.json": { type: "file", language: "json" },
    "README.md": { type: "file", language: "markdown" },
    ".gitignore": { type: "file", language: "text" },
  }

  const notifications = [
    {
      id: "1",
      type: "commit",
      message: "Sarah pushed to main",
      time: "2m ago",
      icon: GitCommit,
    },
    {
      id: "2",
      type: "pr",
      message: "PR #123 approved",
      time: "5m ago",
      icon: GitPullRequest,
    },
    {
      id: "3",
      type: "branch",
      message: "New branch: feature/auth",
      time: "10m ago",
      icon: GitBranch,
    },
  ]

  const getFileIcon = (fileName: string, language?: string) => {
    if (language === "javascript" || fileName.endsWith(".js") || fileName.endsWith(".jsx")) {
      return <Code className="w-4 h-4 text-yellow-400" />
    }
    if (language === "css" || fileName.endsWith(".css")) {
      return <Code className="w-4 h-4 text-blue-400" />
    }
    if (language === "html" || fileName.endsWith(".html")) {
      return <Code className="w-4 h-4 text-orange-400" />
    }
    if (language === "json" || fileName.endsWith(".json")) {
      return <Code className="w-4 h-4 text-green-400" />
    }
    if (language === "markdown" || fileName.endsWith(".md")) {
      return <FileText className="w-4 h-4 text-gray-400" />
    }
    if (language === "image" || fileName.match(/\.(png|jpg|jpeg|gif|svg)$/)) {
      return <ImageIcon className="w-4 h-4 text-purple-400" />
    }
    return <File className="w-4 h-4 text-gray-400" />
  }

  const toggleFolder = (folderPath: string) => {
    setExpandedFolders((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(folderPath)) {
        newSet.delete(folderPath)
      } else {
        newSet.add(folderPath)
      }
      return newSet
    })
  }

  const renderFileTree = (structure: any, path = "") => {
    return Object.entries(structure).map(([name, item]: [string, any]) => {
      const fullPath = path ? `${path}/${name}` : name
      const isFolder = item.type === "folder"
      const isExpanded = expandedFolders.has(fullPath)
      const isActive = activeFile === fullPath
      const hasCollaborator = collaborators.some((c) => c.file === fullPath)

      if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return null
      }

      return (
        <div key={fullPath}>
          <ContextMenu>
            <ContextMenuTrigger>
              <motion.div
                whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                className={`flex items-center space-x-2 px-2 py-1 cursor-pointer rounded ${
                  isActive ? "bg-blue-500/20 border-l-2 border-l-blue-500" : ""
                }`}
                onClick={() => {
                  if (isFolder) {
                    toggleFolder(fullPath)
                  } else {
                    onFileSelect(fullPath)
                  }
                }}
                style={{ paddingLeft: `${(path.split("/").length) * 12 + 8}px` }}
              >
                {isFolder ? (
                  <>
                    {isExpanded ? (
                      <ChevronDown className="w-3 h-3 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-3 h-3 text-gray-400" />
                    )}
                    {isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-blue-400" />
                    ) : (
                      <Folder className="w-4 h-4 text-blue-400" />
                    )}
                  </>
                ) : (
                  <>
                    <div className="w-3 h-3" />
                    {getFileIcon(name, item.language)}
                  </>
                )}
                <span className={`text-sm truncate ${isActive ? "text-white font-medium" : "text-gray-300"}`}>
                  {name}
                </span>
                {hasCollaborator && <div className="w-2 h-2 bg-green-500 rounded-full ml-auto" />}
                {files[fullPath]?.modified && <div className="w-2 h-2 bg-orange-500 rounded-full ml-auto" />}
              </motion.div>
            </ContextMenuTrigger>
            <ContextMenuContent className="bg-gray-800 border-gray-700">
              {isFolder ? (
                <>
                  <ContextMenuItem
                    onClick={() => onCreateFile("newFile", "js")}
                    className="text-white hover:bg-gray-700"
                  >
                    New File
                  </ContextMenuItem>
                  <ContextMenuItem className="text-white hover:bg-gray-700">New Folder</ContextMenuItem>
                </>
              ) : (
                <>
                  <ContextMenuItem className="text-white hover:bg-gray-700">Rename</ContextMenuItem>
                  <ContextMenuItem className="text-white hover:bg-gray-700">Duplicate</ContextMenuItem>
                  <ContextMenuItem className="text-red-400 hover:bg-gray-700">Delete</ContextMenuItem>
                </>
              )}
            </ContextMenuContent>
          </ContextMenu>
          {isFolder && isExpanded && item.children && <div>{renderFileTree(item.children, fullPath)}</div>}
        </div>
      )
    })
  }

  const handleCommit = () => {
    toast({
      title: "Changes committed",
      description: "Your changes have been committed to the repository.",
    })
  }

  const handlePush = () => {
    toast({
      title: "Pushing to remote",
      description: "Your commits are being pushed to the remote repository.",
    })
  }

  const handlePull = () => {
    toast({
      title: "Pulling changes",
      description: "Fetching latest changes from the remote repository.",
    })
  }

  return (
    <div className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg m-1 flex flex-col overflow-hidden">
      {/* Explorer Header */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-white">Explorer</h3>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onCreateFile("newFile", "js")}
              className="h-6 w-6 p-0 text-gray-400 hover:text-white"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-gray-400 hover:text-white">
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-3 w-3" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 h-7 bg-gray-700 border-gray-600 text-white text-xs"
          />
        </div>
      </div>

      {/* File Tree */}
      <div className="flex-1 overflow-y-auto p-2">{renderFileTree(fileStructure)}</div>

      {/* Git Controls */}
      <div className="border-t border-gray-700 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-400">Source Control</span>
          <Badge variant="outline" className="border-gray-600 text-gray-400 text-xs">
            main
          </Badge>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCommit}
            className="flex-1 h-6 text-xs text-gray-300 hover:text-white"
          >
            <GitCommit className="w-3 h-3 mr-1" />
            Commit
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePush}
            className="flex-1 h-6 text-xs text-gray-300 hover:text-white"
          >
            Push
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePull}
            className="flex-1 h-6 text-xs text-gray-300 hover:text-white"
          >
            Pull
          </Button>
        </div>
      </div>

      {/* Notifications Panel */}
      {showNotifications && (
        <div className="border-t border-gray-700 max-h-32 overflow-y-auto">
          <div className="p-2">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-400">Notifications</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNotifications(false)}
                className="h-4 w-4 p-0 text-gray-400 hover:text-white"
              >
                <MoreHorizontal className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {notifications.map((notif) => (
                <div key={notif.id} className="flex items-center space-x-2 p-1 rounded hover:bg-gray-700/50">
                  <notif.icon className="w-3 h-3 text-blue-400 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-300 truncate">{notif.message}</p>
                    <p className="text-xs text-gray-500">{notif.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RefreshCw, ExternalLink, Smartphone, Tablet, Monitor, Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"

export function PreviewPane() {
  const [viewMode, setViewMode] = useState("desktop")
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()

  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const getViewportSize = () => {
    switch (viewMode) {
      case "mobile":
        return { width: "375px", height: "667px" }
      case "tablet":
        return { width: "768px", height: "1024px" }
      default:
        return { width: "100%", height: "100%" }
    }
  }

  return (
    <div className={`h-full flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {/* Preview Header */}
      <div
        className={`flex items-center justify-between p-3 border-b ${
          theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Eye className={`w-4 h-4 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Live Preview
            </span>
            <Badge
              variant="outline"
              className={`text-xs ${
                theme === "dark" ? "border-green-500 text-green-400" : "border-green-600 text-green-600"
              }`}
            >
              Live
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Viewport Controls */}
          <div className="flex items-center gap-1 mr-2">
            <Button
              size="sm"
              variant={viewMode === "desktop" ? "default" : "ghost"}
              onClick={() => setViewMode("desktop")}
              className="h-7 w-7 p-0"
            >
              <Monitor className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "tablet" ? "default" : "ghost"}
              onClick={() => setViewMode("tablet")}
              className="h-7 w-7 p-0"
            >
              <Tablet className="w-3 h-3" />
            </Button>
            <Button
              size="sm"
              variant={viewMode === "mobile" ? "default" : "ghost"}
              onClick={() => setViewMode("mobile")}
              className="h-7 w-7 p-0"
            >
              <Smartphone className="w-3 h-3" />
            </Button>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleRefresh}
            disabled={isLoading}
            className={`${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className={`${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <ExternalLink className="w-4 h-4" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className={`${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className={`flex-1 p-4 ${theme === "dark" ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="h-full flex items-center justify-center">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${viewMode === "desktop" ? "w-full h-full" : ""}`}
            style={viewMode !== "desktop" ? getViewportSize() : {}}
          >
            {/* Mock Preview Content */}
            <div className="h-full flex flex-col">
              {/* Mock Browser Bar */}
              <div className="h-8 bg-gray-200 flex items-center px-3 gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full" />
                  <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                </div>
                <div className="flex-1 bg-white rounded text-xs px-2 py-0.5 text-gray-600">localhost:3000</div>
              </div>

              {/* Mock App Content */}
              <div className="flex-1 p-6 bg-gradient-to-r from-blue-500 to-purple-500">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-center text-white"
                >
                  <h1 className="text-2xl font-bold mb-4">Hello, Team!</h1>
                  <p className="text-white/80 mb-4">Start collaborating with your team in real-time!</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 transition-colors"
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Preview Info */}
      <div
        className={`flex items-center justify-between px-3 py-2 text-xs border-t ${
          theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>Viewport: {viewMode}</span>
          <span>
            Size: {getViewportSize().width} × {getViewportSize().height}
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span>Last updated: just now</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            Auto-refresh
          </span>
        </div>
      </div>
    </div>
  )
}

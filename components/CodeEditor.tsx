"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Save, Play, Lock, Unlock, Brain, GitBranch, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useTheme } from "@/components/theme-provider"

export function CodeEditor() {
  const [code, setCode] = useState(`// Welcome to CollabCode - Real-time Collaborative Coding
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function WelcomeComponent() {
  const [message, setMessage] = useState('Hello, Team!')
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg"
    >
      <h1 className="text-2xl font-bold text-white mb-4">
        {message}
      </h1>
      <p className="text-white/80">
        Start collaborating with your team in real-time!
      </p>
      <button 
        onClick={() => setMessage('Let\\'s build something amazing!')}
        className="mt-4 px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100"
      >
        Get Started
      </button>
    </motion.div>
  )
}

export default WelcomeComponent`)

  const [isLocked, setIsLocked] = useState(false)
  const [collaborators] = useState([
    { id: 1, name: "Alice", avatar: "A", color: "bg-blue-500", cursor: { line: 15, column: 25 } },
    { id: 2, name: "Bob", avatar: "B", color: "bg-green-500", cursor: { line: 8, column: 12 } },
  ])
  const [aiSuggestions] = useState([
    { type: "optimization", message: "Consider using useCallback for the button click handler" },
    { type: "accessibility", message: "Add aria-label to the button for better accessibility" },
  ])

  const { theme } = useTheme()
  const editorRef = useRef(null)

  const handleSave = () => {
    // Simulate save action
    console.log("File saved!")
  }

  const handleRun = () => {
    // Simulate run action
    console.log("Code executed!")
  }

  const handleAIReview = () => {
    // Simulate AI code review
    console.log("AI reviewing code...")
  }

  return (
    <div className={`h-full flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {/* Editor Header */}
      <div
        className={`flex items-center justify-between p-3 border-b ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${theme === "dark" ? "bg-green-400" : "bg-green-500"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Header.jsx
            </span>
            <Badge
              variant="outline"
              className={`text-xs ${theme === "dark" ? "border-gray-600 text-gray-400" : "border-gray-300 text-gray-600"}`}
            >
              Modified
            </Badge>
          </div>

          {/* Collaborators */}
          <div className="flex items-center gap-1">
            {collaborators.map((collaborator) => (
              <motion.div key={collaborator.id} initial={{ scale: 0 }} animate={{ scale: 1 }} className="relative">
                <Avatar className="w-6 h-6">
                  <AvatarFallback className={`${collaborator.color} text-white text-xs`}>
                    {collaborator.avatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute -top-1 -right-1 w-2 h-2 ${collaborator.color} rounded-full border border-white`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsLocked(!isLocked)}
            className={`${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={handleAIReview}
            className={`${theme === "dark" ? "text-purple-400 hover:text-purple-300 hover:bg-gray-700" : "text-purple-600 hover:text-purple-700 hover:bg-gray-100"}`}
          >
            <Brain className="w-4 h-4" />
          </Button>

          <Button size="sm" onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
            <Save className="w-4 h-4 mr-1" />
            Save
          </Button>

          <Button size="sm" onClick={handleRun} className="bg-blue-500 hover:bg-blue-600 text-white">
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1 relative">
          <ScrollArea className="h-full">
            <div
              ref={editorRef}
              className={`p-4 font-mono text-sm leading-relaxed ${
                theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
              }`}
              style={{ minHeight: "100%" }}
            >
              {/* Line Numbers */}
              <div className="flex">
                <div className={`select-none pr-4 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
                  {code.split("\n").map((_, index) => (
                    <div key={index} className="text-right">
                      {index + 1}
                    </div>
                  ))}
                </div>

                {/* Code Content */}
                <div className="flex-1 relative">
                  <pre className="whitespace-pre-wrap">
                    <code
                      dangerouslySetInnerHTML={{
                        __html: code
                          .replace(/\/\/.*$/gm, '<span class="text-gray-500">$&</span>')
                          .replace(
                            /\b(import|export|from|function|const|let|var|return|if|else|for|while|class|extends)\b/g,
                            '<span class="text-blue-400">$1</span>',
                          )
                          .replace(/\b(React|useState|useEffect|motion)\b/g, '<span class="text-purple-400">$1</span>')
                          .replace(/'([^']*)'/g, "<span class=\"text-green-400\">'$1'</span>")
                          .replace(/"([^"]*)"/g, '<span class="text-green-400">"$1"</span>')
                          .replace(/\b(\d+)\b/g, '<span class="text-orange-400">$1</span>'),
                      }}
                    />
                  </pre>

                  {/* Collaborative Cursors */}
                  {collaborators.map((collaborator) => (
                    <motion.div
                      key={collaborator.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute pointer-events-none"
                      style={{
                        top: `${collaborator.cursor.line * 1.5}rem`,
                        left: `${collaborator.cursor.column * 0.6}ch`,
                      }}
                    >
                      <div className={`w-0.5 h-5 ${collaborator.color} animate-pulse`} />
                      <div
                        className={`absolute -top-6 left-0 px-1 py-0.5 text-xs text-white rounded ${collaborator.color}`}
                      >
                        {collaborator.name}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>

        {/* AI Suggestions Sidebar */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 300, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className={`border-l ${theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"}`}
        >
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                AI Suggestions
              </span>
            </div>

            <div className="space-y-2">
              {aiSuggestions.map((suggestion, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 rounded border ${
                    theme === "dark" ? "bg-gray-700 border-gray-600" : "bg-white border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 ${
                        suggestion.type === "optimization" ? "bg-blue-400" : "bg-yellow-400"
                      }`}
                    />
                    <div className="flex-1">
                      <div className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                        {suggestion.message}
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button size="sm" variant="outline" className="h-6 text-xs px-2">
                          Apply
                        </Button>
                        <Button size="sm" variant="ghost" className="h-6 text-xs px-2">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-4 pt-3 border-t border-gray-600">
              <div className={`text-xs font-medium mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                Quick Actions
              </div>
              <div className="space-y-1">
                <Button size="sm" variant="ghost" className="w-full justify-start h-7 text-xs">
                  <Brain className="w-3 h-3 mr-2" />
                  @format code
                </Button>
                <Button size="sm" variant="ghost" className="w-full justify-start h-7 text-xs">
                  <MessageSquare className="w-3 h-3 mr-2" />
                  @explain function
                </Button>
                <Button size="sm" variant="ghost" className="w-full justify-start h-7 text-xs">
                  <GitBranch className="w-3 h-3 mr-2" />
                  @commit changes
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Status Bar */}
      <div
        className={`flex items-center justify-between px-3 py-1 text-xs border-t ${
          theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>Line 15, Column 25</span>
          <span>JavaScript React</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-4">
          <span>Auto-save: On</span>
          <span className="flex items-center gap-1">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            Connected
          </span>
        </div>
      </div>
    </div>
  )
}

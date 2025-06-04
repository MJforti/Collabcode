"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { TerminalIcon, Play, Trash2, Copy, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TerminalProps {
  onRunCode: () => void
}

export function Terminal({ onRunCode }: TerminalProps) {
  const [terminals, setTerminals] = useState([
    {
      id: "terminal-1",
      name: "Terminal 1",
      history: [
        { type: "command", content: "npm install", timestamp: new Date() },
        { type: "output", content: "✓ Dependencies installed successfully", timestamp: new Date() },
        { type: "command", content: "npm start", timestamp: new Date() },
        { type: "output", content: "🚀 Development server started on http://localhost:3000", timestamp: new Date() },
      ],
      currentCommand: "",
    },
  ])
  const [activeTerminal, setActiveTerminal] = useState("terminal-1")
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const currentTerminal = terminals.find((t) => t.id === activeTerminal)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [currentTerminal?.history])

  const handleCommand = (command: string) => {
    if (!command.trim()) return

    const newEntry = {
      type: "command" as const,
      content: command,
      timestamp: new Date(),
    }

    // Simulate command execution
    let output = ""
    switch (command.toLowerCase().trim()) {
      case "ls":
      case "dir":
        output = "src/\npackage.json\nREADME.md\nnode_modules/"
        break
      case "npm start":
        output = "🚀 Starting development server...\n✓ Server running on http://localhost:3000"
        break
      case "npm install":
        output = "📦 Installing dependencies...\n✓ All packages installed successfully"
        break
      case "git status":
        output = "On branch main\nChanges not staged for commit:\n  modified: src/App.js"
        break
      case "npm test":
        output = "🧪 Running tests...\n✓ All tests passed (5/5)"
        break
      case "npm run build":
        output = "🏗️  Building for production...\n✓ Build completed successfully"
        break
      case "clear":
        setTerminals((prev) => prev.map((t) => (t.id === activeTerminal ? { ...t, history: [] } : t)))
        return
      case "help":
        output = `Available commands:
  ls, dir     - List files
  npm start   - Start development server
  npm install - Install dependencies
  npm test    - Run tests
  npm run build - Build for production
  git status  - Check git status
  clear       - Clear terminal
  help        - Show this help`
        break
      default:
        output = `Command not found: ${command}\nType 'help' for available commands`
    }

    const outputEntry = {
      type: "output" as const,
      content: output,
      timestamp: new Date(),
    }

    setTerminals((prev) =>
      prev.map((t) =>
        t.id === activeTerminal
          ? {
              ...t,
              history: [...t.history, newEntry, outputEntry],
              currentCommand: "",
            }
          : t,
      ),
    )
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(currentTerminal?.currentCommand || "")
    }
  }

  const addNewTerminal = () => {
    const newId = `terminal-${terminals.length + 1}`
    const newTerminal = {
      id: newId,
      name: `Terminal ${terminals.length + 1}`,
      history: [],
      currentCommand: "",
    }
    setTerminals((prev) => [...prev, newTerminal])
    setActiveTerminal(newId)
  }

  const clearTerminal = () => {
    setTerminals((prev) => prev.map((t) => (t.id === activeTerminal ? { ...t, history: [] } : t)))
  }

  const copyOutput = () => {
    const output = currentTerminal?.history
      .map((entry) => `${entry.type === "command" ? "$ " : ""}${entry.content}`)
      .join("\n")

    if (output) {
      navigator.clipboard.writeText(output)
    }
  }

  return (
    <div className="h-full bg-gray-900 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
      {/* Terminal Header */}
      <div className="h-10 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <TerminalIcon className="w-4 h-4 text-green-400" />
          <span className="text-white text-sm font-medium">Terminal</span>
        </div>

        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onRunCode}
            className="text-green-400 hover:text-green-300 h-6 px-2"
          >
            <Play className="w-3 h-3 mr-1" />
            <span className="text-xs">Run</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={copyOutput} className="text-gray-400 hover:text-white h-6 px-2">
            <Copy className="w-3 h-3" />
          </Button>
          <Button variant="ghost" size="sm" onClick={clearTerminal} className="text-gray-400 hover:text-white h-6 px-2">
            <Trash2 className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={addNewTerminal}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            <Plus className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Tabs */}
      <Tabs value={activeTerminal} onValueChange={setActiveTerminal} className="flex-1 flex flex-col">
        <TabsList className="bg-gray-800 border-b border-gray-700 rounded-none h-8">
          {terminals.map((terminal) => (
            <TabsTrigger key={terminal.id} value={terminal.id} className="text-xs data-[state=active]:bg-gray-700">
              {terminal.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {terminals.map((terminal) => (
          <TabsContent
            key={terminal.id}
            value={terminal.id}
            className="flex-1 flex flex-col m-0 data-[state=inactive]:hidden"
          >
            {/* Terminal Output */}
            <div ref={terminalRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm bg-black/20">
              {terminal.history.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-1 ${entry.type === "command" ? "text-green-400" : "text-gray-300"}`}
                >
                  {entry.type === "command" && <span className="text-blue-400 mr-2">$</span>}
                  <span className="whitespace-pre-wrap">{entry.content}</span>
                </motion.div>
              ))}
            </div>

            {/* Terminal Input */}
            <div className="border-t border-gray-700 p-4 bg-black/20">
              <div className="flex items-center space-x-2">
                <span className="text-blue-400 font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={terminal.currentCommand}
                  onChange={(e) => {
                    setTerminals((prev) =>
                      prev.map((t) => (t.id === terminal.id ? { ...t, currentCommand: e.target.value } : t)),
                    )
                  }}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-white font-mono text-sm outline-none"
                  placeholder="Type a command..."
                  autoFocus
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

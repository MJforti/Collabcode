"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { TerminalIcon, Trash2, Download, Users, Lock, Unlock, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useTheme } from "@/components/theme-provider"

export function Terminal() {
  const [isRunning, setIsRunning] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [currentCommand, setCurrentCommand] = useState("")
  const [history, setHistory] = useState([
    { type: "command", content: "npm install", timestamp: "10:30:15" },
    { type: "output", content: "added 1423 packages from 1234 contributors", timestamp: "10:30:18" },
    { type: "command", content: "npm start", timestamp: "10:30:25" },
    { type: "output", content: "Compiled successfully!", timestamp: "10:30:28" },
    { type: "output", content: "Local: http://localhost:3000", timestamp: "10:30:28" },
    { type: "system", content: "Alice joined the terminal session", timestamp: "10:31:00" },
  ])
  const [collaborators] = useState([
    { id: 1, name: "Alice", avatar: "A", color: "bg-blue-500" },
    { id: 2, name: "Bob", avatar: "B", color: "bg-green-500" },
  ])

  const { theme } = useTheme()
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  const handleCommand = (e) => {
    if (e.key === "Enter" && currentCommand.trim()) {
      const newEntry = {
        type: "command",
        content: currentCommand,
        timestamp: new Date().toLocaleTimeString(),
      }

      setHistory((prev) => [...prev, newEntry])

      // Simulate command execution
      setTimeout(() => {
        const output = {
          type: "output",
          content: getCommandOutput(currentCommand),
          timestamp: new Date().toLocaleTimeString(),
        }
        setHistory((prev) => [...prev, output])
      }, 500)

      setCurrentCommand("")
    }
  }

  const getCommandOutput = (command) => {
    const cmd = command.toLowerCase().trim()
    if (cmd.startsWith("ls")) return "src/  public/  package.json  README.md"
    if (cmd.startsWith("pwd")) return "/workspace/team-project"
    if (cmd.startsWith("git status")) return "On branch main\nYour branch is up to date with 'origin/main'."
    if (cmd.startsWith("npm")) return "Command executed successfully"
    return `Command '${command}' executed`
  }

  const clearTerminal = () => {
    setHistory([])
  }

  const exportLogs = () => {
    const logs = history.map((entry) => `[${entry.timestamp}] ${entry.content}`).join("\n")
    const blob = new Blob([logs], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "terminal-logs.txt"
    a.click()
  }

  return (
    <div className={`h-full flex flex-col ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      {/* Terminal Header */}
      <div
        className={`flex items-center justify-between p-3 border-b ${
          theme === "dark" ? "border-gray-700 bg-gray-800" : "border-gray-200 bg-gray-50"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <TerminalIcon className={`w-4 h-4 ${theme === "dark" ? "text-green-400" : "text-green-600"}`} />
            <span className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Shared Terminal
            </span>
            <Badge
              variant="outline"
              className={`text-xs ${
                isRunning
                  ? theme === "dark"
                    ? "border-green-500 text-green-400"
                    : "border-green-600 text-green-600"
                  : theme === "dark"
                    ? "border-gray-500 text-gray-400"
                    : "border-gray-400 text-gray-600"
              }`}
            >
              {isRunning ? "Running" : "Idle"}
            </Badge>
          </div>

          {/* Collaborators */}
          <div className="flex items-center gap-1">
            <Users className={`w-3 h-3 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
            <span className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
              {collaborators.length + 1} users
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setIsLocked(!isLocked)}
            className={`h-7 w-7 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            {isLocked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={exportLogs}
            className={`h-7 w-7 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Download className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            onClick={clearTerminal}
            className={`h-7 w-7 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Trash2 className="w-3 h-3" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className={`h-7 w-7 p-0 ${theme === "dark" ? "text-gray-400 hover:text-white hover:bg-gray-700" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}
          >
            <Settings className="w-3 h-3" />
          </Button>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="flex-1 bg-black text-green-400 font-mono text-sm">
        <ScrollArea className="h-full" ref={terminalRef}>
          <div className="p-4 space-y-1">
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-2"
              >
                <span className="text-gray-500 text-xs min-w-[60px]">{entry.timestamp}</span>
                <div className="flex-1">
                  {entry.type === "command" && (
                    <div className="flex items-center gap-2">
                      <span className="text-blue-400">$</span>
                      <span className="text-white">{entry.content}</span>
                    </div>
                  )}
                  {entry.type === "output" && <div className="text-green-400 whitespace-pre-wrap">{entry.content}</div>}
                  {entry.type === "system" && <div className="text-yellow-400 italic">{entry.content}</div>}
                </div>
              </motion.div>
            ))}

            {/* Current Input Line */}
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-xs min-w-[60px]">{new Date().toLocaleTimeString()}</span>
              <span className="text-blue-400">$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={(e) => setCurrentCommand(e.target.value)}
                onKeyDown={handleCommand}
                disabled={isLocked}
                className="flex-1 bg-transparent text-white outline-none disabled:opacity-50"
                placeholder={isLocked ? "Terminal is locked by another user" : "Type a command..."}
                autoFocus
              />
              <motion.div
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-4 bg-green-400"
              />
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Terminal Status */}
      <div
        className={`flex items-center justify-between px-3 py-1 text-xs border-t ${
          theme === "dark" ? "border-gray-700 bg-gray-800 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-600"
        }`}
      >
        <div className="flex items-center gap-4">
          <span>Session: team-project-terminal</span>
          <span>Shell: bash</span>
          <span>PWD: /workspace/team-project</span>
        </div>
        <div className="flex items-center gap-4">
          <span>{history.length} commands executed</span>
          <span className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${isLocked ? "bg-red-400" : "bg-green-400"}`} />
            {isLocked ? "Locked" : "Unlocked"}
          </span>
        </div>
      </div>
    </div>
  )
}

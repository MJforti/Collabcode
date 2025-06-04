"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { WorkspaceHeader } from "@/components/workspace/workspace-header"
import { FileExplorer } from "@/components/workspace/file-explorer"
import { CodeEditor } from "@/components/workspace/code-editor"
import { Terminal } from "@/components/workspace/terminal"
import { PreviewPane } from "@/components/workspace/preview-pane"
import { ChatMeetingPanel } from "@/components/workspace/chat-meeting-panel"
import { useToast } from "@/hooks/use-toast"

export default function WorkspacePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [activeFile, setActiveFile] = useState("src/App.js")
  const [activeView, setActiveView] = useState<"code" | "preview">("code")
  const [files, setFiles] = useState<any>({
    "src/App.js": {
      content: `import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to CollabCode</h1>
        <p>Real-time collaborative coding platform</p>
        <button onClick={() => setCount(count + 1)}>
          Count: {count}
        </button>
      </header>
    </div>
  );
}

export default App;`,
      language: "javascript",
      modified: false,
    },
    "src/App.css": {
      content: `.App {
  text-align: center;
}

.App-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  color: white;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
  background: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.3s;
}

button:hover {
  background: #45a049;
}`,
      language: "css",
      modified: false,
    },
    "package.json": {
      content: `{
  "name": "collabcode-project",
  "version": "1.0.0",
  "description": "A collaborative coding project",
  "main": "src/App.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}`,
      language: "json",
      modified: false,
    },
  })

  const [collaborators, setCollaborators] = useState([
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "SC",
      color: "#3B82F6",
      cursor: { line: 8, column: 15 },
      file: "src/App.js",
      status: "online",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      avatar: "MJ",
      color: "#10B981",
      cursor: { line: 12, column: 8 },
      file: "src/App.css",
      status: "online",
    },
  ])

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    setUser(JSON.parse(userData))
    setIsLoading(false)

    // Initialize WebSocket connection for real-time collaboration
    initializeWebSocket()
  }, [router])

  const initializeWebSocket = () => {
    // Simulate WebSocket connection
    console.log("WebSocket connected for real-time collaboration")

    // Simulate real-time cursor updates
    const interval = setInterval(() => {
      setCollaborators((prev) =>
        prev.map((collab) => ({
          ...collab,
          cursor: {
            line: Math.floor(Math.random() * 20) + 1,
            column: Math.floor(Math.random() * 40) + 1,
          },
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }

  const handleFileChange = (fileName: string, content: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        content,
        modified: true,
      },
    }))

    // Auto-save after 2 seconds of inactivity
    setTimeout(() => {
      handleSaveFile(fileName)
    }, 2000)
  }

  const handleSaveFile = (fileName: string) => {
    setFiles((prev) => ({
      ...prev,
      [fileName]: {
        ...prev[fileName],
        modified: false,
      },
    }))

    toast({
      title: "File saved",
      description: `${fileName} has been saved successfully.`,
    })
  }

  const handleCreateFile = (fileName: string, fileType: string) => {
    const extension = fileType.toLowerCase()
    const fullFileName = fileName.includes(".") ? fileName : `${fileName}.${extension}`

    const templates: any = {
      js: "// New JavaScript file\nconsole.log('Hello, World!');\n",
      jsx: "import React from 'react';\n\nconst Component = () => {\n  return (\n    <div>\n      <h1>New Component</h1>\n    </div>\n  );\n};\n\nexport default Component;",
      css: "/* New CSS file */\n.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n",
      html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  <h1>Hello, World!</h1>\n</body>\n</html>',
      py: "# New Python file\nprint('Hello, World!')\n",
      json: '{\n  "name": "new-file",\n  "version": "1.0.0"\n}',
    }

    setFiles((prev) => ({
      ...prev,
      [fullFileName]: {
        content: templates[extension] || `// New ${extension} file\n`,
        language: extension === "jsx" ? "javascript" : extension,
        modified: false,
      },
    }))

    setActiveFile(fullFileName)

    toast({
      title: "File created",
      description: `${fullFileName} has been created successfully.`,
    })
  }

  const handleRunCode = () => {
    if (activeFile.endsWith(".js") || activeFile.endsWith(".jsx")) {
      setActiveView("preview")
      toast({
        title: "Code executed",
        description: "Your code is now running in the preview pane.",
      })
    } else {
      toast({
        title: "Execution started",
        description: "Check the terminal for output.",
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-10 h-10 border-2 border-white border-t-transparent rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Loading Workspace</h2>
          <p className="text-gray-400">Setting up your collaborative coding environment...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col overflow-hidden">
      {/* Workspace Header */}
      <WorkspaceHeader
        activeFile={activeFile}
        files={files}
        onSave={() => handleSaveFile(activeFile)}
        onRun={handleRunCode}
        onCreateFile={handleCreateFile}
        collaborators={collaborators}
      />

      {/* Main Workspace */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          {/* Section A: File Explorer */}
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <FileExplorer
              files={files}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              onCreateFile={handleCreateFile}
              collaborators={collaborators}
            />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-700 hover:bg-blue-500 transition-colors" />

          {/* Section B: Code Editor & Terminal */}
          <ResizablePanel defaultSize={55} minSize={40}>
            <ResizablePanelGroup direction="vertical">
              {/* Code Editor / Preview */}
              <ResizablePanel defaultSize={70} minSize={30}>
                <div className="h-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg m-1">
                  {activeView === "code" ? (
                    <CodeEditor
                      file={activeFile}
                      content={files[activeFile]?.content || ""}
                      language={files[activeFile]?.language || "javascript"}
                      onChange={(content) => handleFileChange(activeFile, content)}
                      collaborators={collaborators}
                      isModified={files[activeFile]?.modified || false}
                    />
                  ) : (
                    <PreviewPane files={files} activeFile={activeFile} onBackToCode={() => setActiveView("code")} />
                  )}
                </div>
              </ResizablePanel>

              <ResizableHandle withHandle className="bg-gray-700 hover:bg-blue-500 transition-colors" />

              {/* Terminal */}
              <ResizablePanel defaultSize={30} minSize={20} maxSize={50}>
                <Terminal onRunCode={handleRunCode} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-gray-700 hover:bg-blue-500 transition-colors" />

          {/* Section C: Chat & Meetings */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={35}>
            <ChatMeetingPanel
              workspaceId="workspace-1"
              collaborators={collaborators}
              onCodeInsert={(code) => {
                const currentContent = files[activeFile]?.content || ""
                handleFileChange(activeFile, currentContent + "\n" + code)
              }}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  )
}

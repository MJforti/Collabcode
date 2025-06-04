"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  FileText,
  Search,
  Download,
  BookOpen,
  Code,
  Zap,
  Users,
  Settings,
  ExternalLink,
  ChevronRight,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"

export default function DocumentationPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState("getting-started")

  const sections = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: Home,
      subsections: [
        { id: "installation", title: "Installation" },
        { id: "quick-start", title: "Quick Start" },
        { id: "project-structure", title: "Project Structure" },
      ],
    },
    {
      id: "features",
      title: "Features",
      icon: Zap,
      subsections: [
        { id: "real-time-coding", title: "Real-time Coding" },
        { id: "ai-assistance", title: "AI Assistance" },
        { id: "team-collaboration", title: "Team Collaboration" },
      ],
    },
    {
      id: "workspace",
      title: "Workspace",
      icon: Code,
      subsections: [
        { id: "file-management", title: "File Management" },
        { id: "code-editor", title: "Code Editor" },
        { id: "terminal", title: "Terminal" },
      ],
    },
    {
      id: "teams",
      title: "Teams & Collaboration",
      icon: Users,
      subsections: [
        { id: "creating-teams", title: "Creating Teams" },
        { id: "inviting-members", title: "Inviting Members" },
        { id: "permissions", title: "Permissions" },
      ],
    },
    {
      id: "api",
      title: "API Reference",
      icon: Settings,
      subsections: [
        { id: "authentication", title: "Authentication" },
        { id: "endpoints", title: "Endpoints" },
        { id: "webhooks", title: "Webhooks" },
      ],
    },
  ]

  const content = {
    "getting-started": {
      title: "Getting Started with CollabCode",
      content: `
# Getting Started

Welcome to CollabCode! This guide will help you get up and running with our collaborative development platform.

## What is CollabCode?

CollabCode is a real-time collaborative coding platform that enables teams to work together seamlessly on projects. With features like live code editing, AI assistance, and integrated communication tools, CollabCode transforms how teams develop software.

## Key Features

- **Real-time Collaboration**: Multiple developers can edit code simultaneously
- **AI-Powered Assistance**: Get intelligent code suggestions and reviews
- **Integrated Communication**: Chat and video calls without leaving your workspace
- **Project Management**: Kanban boards, task tracking, and team analytics
- **Version Control**: Built-in Git integration for seamless workflow

## Prerequisites

Before you begin, ensure you have:
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- Stable internet connection
- Basic knowledge of web development

## Next Steps

1. [Create your first workspace](#workspace)
2. [Invite team members](#teams)
3. [Start coding together](#features)
      `,
    },
    installation: {
      title: "Installation",
      content: `
# Installation

CollabCode is a web-based platform that requires no installation. Simply access it through your web browser.

## System Requirements

### Minimum Requirements
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **RAM**: 4GB minimum, 8GB recommended
- **Internet**: Broadband connection (10 Mbps recommended)

### Recommended Setup
- **Browser**: Latest version of Chrome or Firefox
- **RAM**: 16GB for optimal performance
- **Internet**: High-speed broadband (50+ Mbps)
- **Display**: 1920x1080 or higher resolution

## Browser Extensions

For the best experience, consider installing these optional extensions:

### Chrome Extensions
- **CollabCode Helper**: Enhances performance and adds shortcuts
- **Git Lens**: Better Git integration and history viewing

### VS Code Integration
If you prefer VS Code, you can use our extension:

\`\`\`bash
# Install via VS Code marketplace
code --install-extension collabcode.vscode-extension
\`\`\`

## Mobile Access

CollabCode is optimized for desktop use, but basic functionality is available on mobile devices:
- **iOS**: Safari 14+ or Chrome 90+
- **Android**: Chrome 90+ or Firefox 88+

Note: Full editing capabilities require a desktop browser.
      `,
    },
    "quick-start": {
      title: "Quick Start Guide",
      content: `
# Quick Start Guide

Get up and running with CollabCode in just a few minutes!

## Step 1: Create Your Account

1. Visit [collabcode.dev](https://collabcode.dev)
2. Click "Sign Up" in the top right corner
3. Choose your preferred sign-up method:
   - Email and password
   - GitHub OAuth
   - Google OAuth

## Step 2: Complete Onboarding

After signing up, you'll be guided through a quick onboarding process:

1. **Profile Setup**: Add your name and profile picture
2. **Preferences**: Choose your coding preferences and themes
3. **First Workspace**: Create your first collaborative workspace

## Step 3: Create Your First Workspace

\`\`\`javascript
// Example: Creating a React workspace
const workspace = {
  name: "My First Project",
  template: "react-typescript",
  visibility: "private"
}
\`\`\`

1. Click "Create Workspace" from your dashboard
2. Choose a template (React, Vue, Node.js, etc.)
3. Set visibility (private or public)
4. Click "Create"

## Step 4: Invite Team Members

1. Open your workspace
2. Click the "Invite" button in the top toolbar
3. Enter email addresses or share the invite link
4. Set appropriate permissions (Admin, Editor, Viewer)

## Step 5: Start Coding

Your workspace includes:
- **File Explorer**: Manage your project files
- **Code Editor**: Write code with real-time collaboration
- **Terminal**: Run commands and scripts
- **Chat**: Communicate with your team
- **AI Assistant**: Get coding help and suggestions

## Pro Tips

- Use \`Ctrl+K\` (or \`Cmd+K\`) to open the command palette
- Type \`@ai\` in chat to ask the AI assistant questions
- Use \`Ctrl+S\` to save files (auto-save is enabled by default)
- Press \`F11\` for distraction-free coding mode
      `,
    },
  }

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
  }, [router])

  const handleExportPDF = () => {
    // Simulate PDF export
    const element = document.createElement("a")
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("CollabCode Documentation - PDF Export")
    element.download = "collabcode-docs.pdf"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const currentContent = content[selectedSection as keyof typeof content] || content["getting-started"]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Documentation</h2>
          <p className="text-gray-400">Preparing the knowledge base...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <DashboardHeader />

        {/* Documentation Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Table of Contents */}
          <div className="w-80 bg-gray-800/50 border-r border-gray-700 flex flex-col">
            {/* TOC Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-white">Documentation</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportPDF}
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Download className="h-3 w-3 mr-1" />
                  PDF
                </Button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-700 border-gray-600 focus:border-blue-500 text-white"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex-1 overflow-y-auto p-4">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <div key={section.id}>
                    <button
                      onClick={() => setSelectedSection(section.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors ${
                        selectedSection === section.id
                          ? "bg-blue-500/20 text-blue-400"
                          : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <section.icon className="h-4 w-4" />
                        <span className="font-medium">{section.title}</span>
                      </div>
                      <ChevronRight className="h-3 w-3" />
                    </button>

                    {section.subsections && selectedSection === section.id && (
                      <div className="ml-6 mt-2 space-y-1">
                        {section.subsections.map((subsection) => (
                          <button
                            key={subsection.id}
                            onClick={() => setSelectedSection(subsection.id)}
                            className="w-full text-left p-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700/30 rounded transition-colors"
                          >
                            {subsection.title}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Documentation Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8">
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                  <span>Documentation</span>
                  <ChevronRight className="h-3 w-3" />
                  <span className="text-white">{currentContent.title}</span>
                </div>

                {/* Content */}
                <div className="prose prose-invert prose-blue max-w-none">
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700">
                    <div className="whitespace-pre-wrap text-gray-300 leading-relaxed">{currentContent.content}</div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center text-lg">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Tutorials
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-3">Step-by-step guides to help you master CollabCode</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        View Tutorials
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white flex items-center text-lg">
                        <Code className="h-5 w-5 mr-2" />
                        API Reference
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-400 text-sm mb-3">Complete API documentation for developers</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      >
                        View API Docs
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                {/* Help Section */}
                <div className="mt-8 p-6 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                  <h3 className="text-lg font-semibold text-white mb-2">Need Help?</h3>
                  <p className="text-gray-300 mb-4">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
                    >
                      Contact Support
                    </Button>
                    <Button variant="outline" className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600">
                      Community Forum
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

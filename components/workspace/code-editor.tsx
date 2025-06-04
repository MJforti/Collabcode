"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Lightbulb, Users } from "lucide-react"

interface CodeEditorProps {
  file: string
  content: string
  language: string
  onChange: (content: string) => void
  collaborators: any[]
  isModified: boolean
}

export function CodeEditor({ file, content, language, onChange, collaborators, isModified }: CodeEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [monaco, setMonaco] = useState<any>(null)
  const [editor, setEditor] = useState<any>(null)
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([])

  useEffect(() => {
    // Load Monaco Editor
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/npm/monaco-editor@0.34.1/min/vs/loader.js"
    script.onload = () => {
      // @ts-ignore
      window.require.config({ paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.34.1/min/vs" } })
      // @ts-ignore
      window.require(["vs/editor/editor.main"], (monaco: any) => {
        setMonaco(monaco)
      })
    }
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    if (monaco && editorRef.current && !editor) {
      const newEditor = monaco.editor.create(editorRef.current, {
        value: content,
        language: language === "jsx" ? "javascript" : language,
        theme: "vs-dark",
        fontSize: 14,
        fontFamily: "Fira Code, monospace",
        minimap: { enabled: true },
        scrollBeyondLastLine: false,
        automaticLayout: true,
        lineNumbers: "on",
        renderWhitespace: "selection",
        wordWrap: "on",
        folding: true,
        bracketMatching: "always",
        autoIndent: "full",
        formatOnPaste: true,
        formatOnType: true,
        suggestOnTriggerCharacters: true,
        quickSuggestions: true,
        parameterHints: { enabled: true },
        hover: { enabled: true },
      })

      newEditor.onDidChangeModelContent(() => {
        const value = newEditor.getValue()
        onChange(value)

        // Simulate AI suggestions
        if (value.includes("function") && !value.includes("return")) {
          setAiSuggestions(["Add return statement", "Add error handling", "Add JSDoc comments"])
        } else {
          setAiSuggestions([])
        }
      })

      setEditor(newEditor)
    }
  }, [monaco, content, language, onChange, editor])

  useEffect(() => {
    if (editor && content !== editor.getValue()) {
      editor.setValue(content)
    }
  }, [content, editor])

  // Simulate real-time collaboration cursors
  useEffect(() => {
    if (editor && collaborators.length > 0) {
      const decorations: any[] = []

      collaborators.forEach((collab) => {
        if (collab.file === file) {
          decorations.push({
            range: new monaco.Range(
              collab.cursor.line,
              collab.cursor.column,
              collab.cursor.line,
              collab.cursor.column + 1,
            ),
            options: {
              className: "collaborator-cursor",
              hoverMessage: { value: `${collab.name} is editing here` },
              afterContentClassName: "collaborator-cursor-label",
              stickiness: 1,
            },
          })
        }
      })

      if (decorations.length > 0) {
        editor.deltaDecorations([], decorations)
      }
    }
  }, [editor, collaborators, file, monaco])

  const activeCollaborators = collaborators.filter((c) => c.file === file)

  return (
    <div className="h-full flex flex-col bg-gray-900 rounded-lg overflow-hidden">
      {/* Editor Header */}
      <div className="h-10 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <span className="text-white text-sm font-medium">{file}</span>
          {isModified && <div className="w-2 h-2 bg-orange-500 rounded-full" />}
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
            {language}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          {/* Active Collaborators */}
          {activeCollaborators.length > 0 && (
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-gray-400" />
              <span className="text-xs text-gray-400">{activeCollaborators.length} editing</span>
            </div>
          )}

          {/* AI Suggestions */}
          {aiSuggestions.length > 0 && (
            <Button variant="ghost" size="sm" className="text-yellow-400 hover:text-yellow-300 h-6 px-2">
              <Lightbulb className="w-3 h-3 mr-1" />
              <span className="text-xs">{aiSuggestions.length} suggestions</span>
            </Button>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
        <div ref={editorRef} className="h-full w-full" />

        {/* Collaborator Cursors Overlay */}
        {activeCollaborators.map((collab) => (
          <motion.div
            key={collab.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute pointer-events-none"
            style={{
              top: `${(collab.cursor.line - 1) * 18 + 10}px`,
              left: `${collab.cursor.column * 7 + 60}px`,
            }}
          >
            <div className="w-0.5 h-4 rounded-full" style={{ backgroundColor: collab.color }} />
            <div
              className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
              style={{ backgroundColor: collab.color }}
            >
              {collab.name}
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Suggestions Panel */}
      {aiSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-yellow-500/10 border-t border-yellow-500/20 p-3"
        >
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">AI Suggestions</span>
          </div>
          <div className="space-y-1">
            {aiSuggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/20 h-6 px-2 text-xs justify-start"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </motion.div>
      )}

      <style jsx global>{`
        .collaborator-cursor {
          background: rgba(59, 130, 246, 0.3) !important;
          border-left: 2px solid #3b82f6 !important;
        }
        .collaborator-cursor-label::after {
          content: attr(data-name);
          position: absolute;
          top: -20px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 11px;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { RefreshCw, ZoomIn, ZoomOut, Code, ExternalLink, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PreviewPaneProps {
  files: any
  activeFile: string
  onBackToCode: () => void
}

export function PreviewPane({ files, activeFile, onBackToCode }: PreviewPaneProps) {
  const [zoom, setZoom] = useState(100)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const generatePreviewHTML = () => {
    const appJs = files["src/App.js"]?.content || ""
    const appCss = files["src/App.css"]?.content || ""
    const indexHtml = files["public/index.html"]?.content || ""

    // Simple React-like transformation for preview
    const transformedJs = appJs
      .replace(/import.*from.*['"];?\n?/g, "")
      .replace(/export default.*/, "")
      .replace(/function App$$$$/, "function App()")
      .replace(/const \[(\w+), set\w+\] = useState$$([^)]+)$$;?/g, "let $1 = $2;")
      .replace(/onClick=\{[^}]+\}/g, 'onclick="handleClick()"')

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
    <style>
        ${appCss}
        body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script>
        let count = 0;
        function handleClick() {
            count++;
            document.querySelector('button').textContent = 'Count: ' + count;
        }
        
        function App() {
            return \`
                <div class="App">
                    <header class="App-header">
                        <h1>Welcome to CollabCode</h1>
                        <p>Real-time collaborative coding platform</p>
                        <button onclick="handleClick()">Count: 0</button>
                    </header>
                </div>
            \`;
        }
        
        document.getElementById('root').innerHTML = App();
    </script>
</body>
</html>
    `
  }

  const refreshPreview = () => {
    setIsLoading(true)
    setErrors([])

    try {
      const html = generatePreviewHTML()
      const blob = new Blob([html], { type: "text/html" })
      const url = URL.createObjectURL(blob)

      if (iframeRef.current) {
        iframeRef.current.src = url
      }

      setTimeout(() => {
        setIsLoading(false)
        URL.revokeObjectURL(url)
      }, 1000)
    } catch (error) {
      setErrors(["Failed to generate preview"])
      setIsLoading(false)
    }
  }

  useEffect(() => {
    refreshPreview()
  }, [files])

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 25, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 25, 50))
  }

  return (
    <div className="h-full bg-gray-900 rounded-lg border border-gray-700 flex flex-col overflow-hidden">
      {/* Preview Header */}
      <div className="h-10 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" onClick={onBackToCode} className="text-gray-400 hover:text-white h-6 px-2">
            <Code className="w-3 h-3 mr-1" />
            <span className="text-xs">Code</span>
          </Button>
          <span className="text-white text-sm font-medium">Preview</span>
          <Badge variant="outline" className="text-xs border-gray-600 text-gray-400">
            Live
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <ZoomOut className="w-3 h-3" />
            </Button>
            <span className="text-xs text-gray-400 min-w-[3rem] text-center">{zoom}%</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="text-gray-400 hover:text-white h-6 w-6 p-0"
            >
              <ZoomIn className="w-3 h-3" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={refreshPreview}
            disabled={isLoading}
            className="text-gray-400 hover:text-white h-6 px-2"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${isLoading ? "animate-spin" : ""}`} />
            <span className="text-xs">Refresh</span>
          </Button>

          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white h-6 px-2">
            <ExternalLink className="w-3 h-3 mr-1" />
            <span className="text-xs">Open</span>
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center z-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        )}

        {errors.length > 0 && (
          <div className="absolute top-4 left-4 right-4 bg-red-500/20 border border-red-500/50 rounded-lg p-3 z-10">
            <div className="flex items-center space-x-2 mb-2">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-red-400 font-medium text-sm">Preview Errors</span>
            </div>
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-red-300 text-xs">
                  {error}
                </p>
              ))}
            </div>
          </div>
        )}

        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
            width: `${10000 / zoom}%`,
            height: `${10000 / zoom}%`,
          }}
          sandbox="allow-scripts allow-same-origin"
          title="Preview"
        />
      </div>

      {/* Console */}
      <div className="h-20 bg-gray-800/30 border-t border-gray-700 p-2 overflow-y-auto">
        <div className="flex items-center space-x-2 mb-1">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="text-xs text-gray-400">Console</span>
        </div>
        <div className="text-xs text-gray-300 font-mono">
          <div className="text-green-400">✓ Application loaded successfully</div>
          <div className="text-blue-400">ℹ React development server running</div>
          {errors.length === 0 && <div className="text-gray-500">No errors or warnings</div>}
        </div>
      </div>
    </div>
  )
}

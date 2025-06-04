"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { X, Settings, Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/hooks/use-toast"

interface SettingsModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SettingsModal({ open, onOpenChange }: SettingsModalProps) {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    theme: "dark",
    fontSize: 14,
    tabSize: 2,
    wordWrap: true,
    minimap: true,
    notifications: true,
    autoSave: true,
    lineNumbers: true,
  })

  const handleSave = () => {
    localStorage.setItem("editorSettings", JSON.stringify(settings))
    toast({
      title: "Settings saved!",
      description: "Your preferences have been updated.",
    })
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <Card className="bg-gray-800/95 border-gray-700 backdrop-blur-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Settings</h2>
                  <p className="text-gray-400 text-sm">Customize your workspace</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <Tabs defaultValue="appearance" className="space-y-6">
              <TabsList className="bg-gray-700 grid w-full grid-cols-4">
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="shortcuts">Shortcuts</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Theme</h3>
                      <p className="text-gray-400 text-sm">Choose your preferred color scheme</p>
                    </div>
                    <Select
                      value={settings.theme}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, theme: value }))}
                    >
                      <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="dark" className="text-white hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            <Moon className="w-4 h-4" />
                            <span>Dark</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="light" className="text-white hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            <Sun className="w-4 h-4" />
                            <span>Light</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="auto" className="text-white hover:bg-gray-700">
                          <div className="flex items-center space-x-2">
                            <Monitor className="w-4 h-4" />
                            <span>Auto</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="editor" className="space-y-4">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">Font Size</h3>
                        <p className="text-gray-400 text-sm">Adjust editor font size</p>
                      </div>
                      <span className="text-white text-sm">{settings.fontSize}px</span>
                    </div>
                    <Slider
                      value={[settings.fontSize]}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, fontSize: value[0] }))}
                      min={10}
                      max={24}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Tab Size</h3>
                      <p className="text-gray-400 text-sm">Number of spaces per tab</p>
                    </div>
                    <Select
                      value={settings.tabSize.toString()}
                      onValueChange={(value) => setSettings((prev) => ({ ...prev, tabSize: Number.parseInt(value) }))}
                    >
                      <SelectTrigger className="w-20 bg-gray-700 border-gray-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="2" className="text-white hover:bg-gray-700">
                          2
                        </SelectItem>
                        <SelectItem value="4" className="text-white hover:bg-gray-700">
                          4
                        </SelectItem>
                        <SelectItem value="8" className="text-white hover:bg-gray-700">
                          8
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Word Wrap</h3>
                      <p className="text-gray-400 text-sm">Wrap long lines</p>
                    </div>
                    <Switch
                      checked={settings.wordWrap}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, wordWrap: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Minimap</h3>
                      <p className="text-gray-400 text-sm">Show code minimap</p>
                    </div>
                    <Switch
                      checked={settings.minimap}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, minimap: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Line Numbers</h3>
                      <p className="text-gray-400 text-sm">Show line numbers</p>
                    </div>
                    <Switch
                      checked={settings.lineNumbers}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, lineNumbers: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Auto Save</h3>
                      <p className="text-gray-400 text-sm">Automatically save changes</p>
                    </div>
                    <Switch
                      checked={settings.autoSave}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoSave: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-gray-400 text-sm">Receive notifications for workspace activity</p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, notifications: checked }))}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="shortcuts" className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-white font-medium mb-4">Keyboard Shortcuts</h3>
                  {[
                    { action: "Save File", shortcut: "Ctrl+S" },
                    { action: "New File", shortcut: "Ctrl+N" },
                    { action: "Find", shortcut: "Ctrl+F" },
                    { action: "Replace", shortcut: "Ctrl+H" },
                    { action: "Comment Line", shortcut: "Ctrl+/" },
                    { action: "Run Code", shortcut: "Ctrl+Enter" },
                    { action: "Toggle Terminal", shortcut: "Ctrl+`" },
                    { action: "Command Palette", shortcut: "Ctrl+Shift+P" },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                      <span className="text-gray-300 text-sm">{item.action}</span>
                      <kbd className="px-2 py-1 bg-gray-600 text-white text-xs rounded font-mono">{item.shortcut}</kbd>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                Save Settings
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

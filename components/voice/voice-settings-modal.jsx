"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Mic, Volume2, Zap, Shield, Keyboard } from "lucide-react"

export function VoiceSettingsModal({ children }) {
  const [inputDevice, setInputDevice] = useState("default")
  const [outputDevice, setOutputDevice] = useState("default")
  const [inputVolume, setInputVolume] = useState([75])
  const [outputVolume, setOutputVolume] = useState([80])
  const [noiseSuppression, setNoiseSuppression] = useState(true)
  const [echoCancellation, setEchoCancellation] = useState(true)
  const [autoGainControl, setAutoGainControl] = useState(false)
  const [pushToTalk, setPushToTalk] = useState(false)
  const [voiceActivation, setVoiceActivation] = useState(true)
  const [activationSensitivity, setActivationSensitivity] = useState([50])
  const [pushToTalkKey, setPushToTalkKey] = useState("Space")

  const inputDevices = [
    { id: "default", name: "Default - Built-in Microphone" },
    { id: "usb-mic", name: "USB Microphone" },
    { id: "headset", name: "Gaming Headset" },
  ]

  const outputDevices = [
    { id: "default", name: "Default - Built-in Speakers" },
    { id: "headphones", name: "Bluetooth Headphones" },
    { id: "speakers", name: "External Speakers" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Voice & Audio Settings
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Configure your voice chat settings for the best communication experience
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="devices" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-gray-800">
            <TabsTrigger value="devices">Devices</TabsTrigger>
            <TabsTrigger value="voice">Voice</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="keybinds">Keybinds</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6 mt-6">
            {/* Input Device */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Mic className="h-4 w-4 mr-2" />
                  Input Device
                </CardTitle>
                <CardDescription>Select your microphone and adjust input settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Microphone</Label>
                  <Select value={inputDevice} onValueChange={setInputDevice}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {inputDevices.map((device) => (
                        <SelectItem key={device.id} value={device.id} className="text-white">
                          {device.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Input Volume</Label>
                  <Slider value={inputVolume} onValueChange={setInputVolume} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>{inputVolume[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="p-3 bg-gray-700 rounded border border-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <Label className="text-sm text-gray-300">Microphone Test</Label>
                    <Button variant="outline" size="sm">
                      Test Mic
                    </Button>
                  </div>
                  <div className="w-full h-2 bg-gray-600 rounded-full overflow-hidden">
                    <div className="h-full bg-green-400 w-1/3 transition-all duration-100" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Speak to test your microphone</p>
                </div>
              </CardContent>
            </Card>

            {/* Output Device */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Output Device
                </CardTitle>
                <CardDescription>Select your speakers or headphones</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Speakers/Headphones</Label>
                  <Select value={outputDevice} onValueChange={setOutputDevice}>
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      {outputDevices.map((device) => (
                        <SelectItem key={device.id} value={device.id} className="text-white">
                          {device.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Output Volume</Label>
                  <Slider value={outputVolume} onValueChange={setOutputVolume} max={100} step={1} className="w-full" />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0%</span>
                    <span>{outputVolume[0]}%</span>
                    <span>100%</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  Test Audio Output
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="voice" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Voice Activation</CardTitle>
                <CardDescription>Configure how your voice is detected</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Voice Activity Detection</Label>
                    <p className="text-xs text-gray-400">Automatically detect when you're speaking</p>
                  </div>
                  <Switch checked={voiceActivation} onCheckedChange={setVoiceActivation} />
                </div>

                {voiceActivation && (
                  <div>
                    <Label className="text-sm text-gray-300 mb-2 block">Activation Sensitivity</Label>
                    <Slider
                      value={activationSensitivity}
                      onValueChange={setActivationSensitivity}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                    </div>
                  </div>
                )}

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Push to Talk</Label>
                    <p className="text-xs text-gray-400">Hold a key to transmit your voice</p>
                  </div>
                  <Switch checked={pushToTalk} onCheckedChange={setPushToTalk} />
                </div>

                {pushToTalk && (
                  <div className="p-3 bg-gray-700 rounded border border-gray-600">
                    <Label className="text-sm text-gray-300 mb-2 block">Push to Talk Key</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="border-gray-500 text-gray-300">
                        {pushToTalkKey}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Change Key
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="processing" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Zap className="h-4 w-4 mr-2" />
                  Audio Processing
                </CardTitle>
                <CardDescription>Enhance your audio quality with advanced processing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Noise Suppression</Label>
                    <p className="text-xs text-gray-400">Reduce background noise and improve clarity</p>
                  </div>
                  <Switch checked={noiseSuppression} onCheckedChange={setNoiseSuppression} />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Echo Cancellation</Label>
                    <p className="text-xs text-gray-400">Prevent audio feedback and echo</p>
                  </div>
                  <Switch checked={echoCancellation} onCheckedChange={setEchoCancellation} />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Automatic Gain Control</Label>
                    <p className="text-xs text-gray-400">Automatically adjust microphone volume</p>
                  </div>
                  <Switch checked={autoGainControl} onCheckedChange={setAutoGainControl} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Audio Quality</CardTitle>
                <CardDescription>Configure audio quality settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-sm text-gray-300 mb-2 block">Audio Quality</Label>
                  <Select defaultValue="high">
                    <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-700 border-gray-600">
                      <SelectItem value="low" className="text-white">
                        Low (32 kbps)
                      </SelectItem>
                      <SelectItem value="medium" className="text-white">
                        Medium (64 kbps)
                      </SelectItem>
                      <SelectItem value="high" className="text-white">
                        High (128 kbps)
                      </SelectItem>
                      <SelectItem value="ultra" className="text-white">
                        Ultra (256 kbps)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keybinds" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Keyboard className="h-4 w-4 mr-2" />
                  Voice Keybinds
                </CardTitle>
                <CardDescription>Customize keyboard shortcuts for voice controls</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div>
                      <Label className="text-sm text-gray-300">Push to Talk</Label>
                      <p className="text-xs text-gray-400">Hold to transmit voice</p>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      Space
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div>
                      <Label className="text-sm text-gray-300">Toggle Mute</Label>
                      <p className="text-xs text-gray-400">Mute/unmute microphone</p>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      Ctrl + M
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div>
                      <Label className="text-sm text-gray-300">Toggle Deafen</Label>
                      <p className="text-xs text-gray-400">Deafen/undeafen audio</p>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      Ctrl + D
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-700 rounded">
                    <div>
                      <Label className="text-sm text-gray-300">Disconnect Voice</Label>
                      <p className="text-xs text-gray-400">Leave voice channel</p>
                    </div>
                    <Badge variant="outline" className="border-gray-500 text-gray-300">
                      Ctrl + Shift + D
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6 mt-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Control your voice chat privacy settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Allow Voice Recording</Label>
                    <p className="text-xs text-gray-400">Let others record voice conversations</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Voice Activity Sharing</Label>
                    <p className="text-xs text-gray-400">Show when you're speaking to others</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator className="bg-gray-700" />

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm text-gray-300">Auto-join Voice Channels</Label>
                    <p className="text-xs text-gray-400">Automatically join voice when entering workspace</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-700">
          <Button variant="outline">Reset to Defaults</Button>
          <Button>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

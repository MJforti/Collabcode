"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Lock, Bell, Palette, Moon, Sun, Laptop, Save, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function Settings() {
  const router = useRouter()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("profile")
  const [isSaving, setIsSaving] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)

  const [profileData, setProfileData] = useState({
    name: "Alex Rivera",
    email: "alex@example.com",
    bio: "Full-stack developer with a passion for building collaborative tools and real-time applications.",
    jobTitle: "Senior Software Engineer",
    company: "TechCorp",
    location: "San Francisco, CA",
    website: "https://alexrivera.dev",
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    desktopNotifications: true,
    mentionNotifications: true,
    weeklyDigest: false,
    teamUpdates: true,
    productUpdates: false,
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    sessionTimeout: "30",
    loginNotifications: true,
    passwordExpiry: "90",
  })

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "dark",
    fontSize: "medium",
    codeFont: "monospace",
    tabSize: "2",
  })

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("authToken")
    const userData = localStorage.getItem("user")

    if (!token || !userData) {
      router.push("/auth/signin")
      return
    }

    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)

    // Load saved settings
    const savedProfile = localStorage.getItem("profileSettings")
    if (savedProfile) {
      setProfileData(JSON.parse(savedProfile))
    } else {
      setProfileData((prev) => ({ ...prev, name: parsedUser.name, email: parsedUser.email }))
    }

    const savedNotifications = localStorage.getItem("notificationSettings")
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications))
    }

    const savedSecurity = localStorage.getItem("securitySettings")
    if (savedSecurity) {
      setSecuritySettings(JSON.parse(savedSecurity))
    }

    const savedAppearance = localStorage.getItem("appearanceSettings")
    if (savedAppearance) {
      setAppearanceSettings(JSON.parse(savedAppearance))
    }

    setIsLoading(false)
  }, [router])

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData({
      ...profileData,
      [field]: value,
    })
  }

  const handleNotificationUpdate = (field: string, value: boolean) => {
    setNotificationSettings({
      ...notificationSettings,
      [field]: value,
    })
  }

  const handleSecurityUpdate = (field: string, value: string | boolean) => {
    setSecuritySettings({
      ...securitySettings,
      [field]: value,
    })
  }

  const handleAppearanceUpdate = (field: string, value: string) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [field]: value,
    })
  }

  const handleSave = () => {
    setIsSaving(true)

    // Save all settings to localStorage
    localStorage.setItem("profileSettings", JSON.stringify(profileData))
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
    localStorage.setItem("securitySettings", JSON.stringify(securitySettings))
    localStorage.setItem("appearanceSettings", JSON.stringify(appearanceSettings))

    // Update user data
    const updatedUser = { ...user, name: profileData.name, email: profileData.email }
    localStorage.setItem("user", JSON.stringify(updatedUser))
    setUser(updatedUser)

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "Settings saved!",
        description: "Your preferences have been updated successfully.",
      })
    }, 1500)
  }

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
    { id: "appearance", label: "Appearance", icon: Palette },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 mx-auto animate-pulse">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Settings</h2>
          <p className="text-gray-400">Preparing your preferences...</p>
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

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
              <p className="text-gray-400">Manage your account preferences and workspace settings</p>
            </motion.div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Tabs */}
              <div className="w-full md:w-64 space-y-1">
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "secondary" : "ghost"}
                    className={`w-full justify-start ${
                      activeTab === tab.id
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon className="mr-3 h-4 w-4" />
                    {tab.label}
                  </Button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                  {/* Profile Settings */}
                  {activeTab === "profile" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h2 className="text-xl font-semibold text-white mb-6">Profile Settings</h2>

                      <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <div className="flex flex-col items-center">
                          <Avatar className="w-24 h-24 mb-4">
                            <AvatarImage src="/placeholder.svg?height=96&width=96" />
                            <AvatarFallback className="bg-blue-500 text-xl">
                              {profileData.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <Button variant="outline" size="sm">
                            Change Avatar
                          </Button>
                        </div>

                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="name">Full Name</Label>
                              <Input
                                id="name"
                                value={profileData.name}
                                onChange={(e) => handleProfileUpdate("name", e.target.value)}
                                className="bg-gray-700 border-gray-600"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                type="email"
                                value={profileData.email}
                                onChange={(e) => handleProfileUpdate("email", e.target.value)}
                                className="bg-gray-700 border-gray-600"
                              />
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              value={profileData.bio}
                              onChange={(e) => handleProfileUpdate("bio", e.target.value)}
                              className="bg-gray-700 border-gray-600"
                              rows={3}
                            />
                          </div>
                        </div>
                      </div>

                      <Separator className="my-6" />

                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="jobTitle">Job Title</Label>
                            <Input
                              id="jobTitle"
                              value={profileData.jobTitle}
                              onChange={(e) => handleProfileUpdate("jobTitle", e.target.value)}
                              className="bg-gray-700 border-gray-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="company">Company</Label>
                            <Input
                              id="company"
                              value={profileData.company}
                              onChange={(e) => handleProfileUpdate("company", e.target.value)}
                              className="bg-gray-700 border-gray-600"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={profileData.location}
                              onChange={(e) => handleProfileUpdate("location", e.target.value)}
                              className="bg-gray-700 border-gray-600"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              value={profileData.website}
                              onChange={(e) => handleProfileUpdate("website", e.target.value)}
                              className="bg-gray-700 border-gray-600"
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Notification Settings */}
                  {activeTab === "notifications" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h2 className="text-xl font-semibold text-white mb-6">Notification Settings</h2>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Email Notifications</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Email Notifications</p>
                              <p className="text-xs text-gray-400">Receive notifications via email</p>
                            </div>
                            <Switch
                              checked={notificationSettings.emailNotifications}
                              onCheckedChange={(checked) => handleNotificationUpdate("emailNotifications", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Weekly Digest</p>
                              <p className="text-xs text-gray-400">Receive a weekly summary of activity</p>
                            </div>
                            <Switch
                              checked={notificationSettings.weeklyDigest}
                              onCheckedChange={(checked) => handleNotificationUpdate("weeklyDigest", checked)}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">App Notifications</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Desktop Notifications</p>
                              <p className="text-xs text-gray-400">Show desktop notifications</p>
                            </div>
                            <Switch
                              checked={notificationSettings.desktopNotifications}
                              onCheckedChange={(checked) => handleNotificationUpdate("desktopNotifications", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Mentions</p>
                              <p className="text-xs text-gray-400">Notify when someone mentions you</p>
                            </div>
                            <Switch
                              checked={notificationSettings.mentionNotifications}
                              onCheckedChange={(checked) => handleNotificationUpdate("mentionNotifications", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Team Updates</p>
                              <p className="text-xs text-gray-400">Notify about team activity</p>
                            </div>
                            <Switch
                              checked={notificationSettings.teamUpdates}
                              onCheckedChange={(checked) => handleNotificationUpdate("teamUpdates", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Product Updates</p>
                              <p className="text-xs text-gray-400">Notify about new features and updates</p>
                            </div>
                            <Switch
                              checked={notificationSettings.productUpdates}
                              onCheckedChange={(checked) => handleNotificationUpdate("productUpdates", checked)}
                            />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Security Settings */}
                  {activeTab === "security" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h2 className="text-xl font-semibold text-white mb-6">Security Settings</h2>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Account Security</h3>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
                              <p className="text-xs text-gray-400">Add an extra layer of security to your account</p>
                            </div>
                            <Switch
                              checked={securitySettings.twoFactorAuth}
                              onCheckedChange={(checked) => handleSecurityUpdate("twoFactorAuth", checked)}
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium text-white">Login Notifications</p>
                              <p className="text-xs text-gray-400">Get notified when someone logs into your account</p>
                            </div>
                            <Switch
                              checked={securitySettings.loginNotifications}
                              onCheckedChange={(checked) => handleSecurityUpdate("loginNotifications", checked)}
                            />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Password Settings</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                              <Input
                                id="sessionTimeout"
                                type="number"
                                value={securitySettings.sessionTimeout}
                                onChange={(e) => handleSecurityUpdate("sessionTimeout", e.target.value)}
                                className="bg-gray-700 border-gray-600"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                              <Input
                                id="passwordExpiry"
                                type="number"
                                value={securitySettings.passwordExpiry}
                                onChange={(e) => handleSecurityUpdate("passwordExpiry", e.target.value)}
                                className="bg-gray-700 border-gray-600"
                              />
                            </div>
                          </div>

                          <Button variant="outline">Change Password</Button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Appearance Settings */}
                  {activeTab === "appearance" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                      <h2 className="text-xl font-semibold text-white mb-6">Appearance Settings</h2>

                      <div className="space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Theme</h3>

                          <RadioGroup
                            value={appearanceSettings.theme}
                            onValueChange={(value) => handleAppearanceUpdate("theme", value)}
                            className="grid grid-cols-3 gap-4"
                          >
                            <div>
                              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                              <Label
                                htmlFor="theme-light"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-700 p-4 hover:bg-gray-600 [&:has([data-state=checked])]:border-blue-500"
                              >
                                <Sun className="mb-3 h-6 w-6" />
                                <span className="text-sm font-medium">Light</span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                              <Label
                                htmlFor="theme-dark"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-700 p-4 hover:bg-gray-600 [&:has([data-state=checked])]:border-blue-500"
                              >
                                <Moon className="mb-3 h-6 w-6" />
                                <span className="text-sm font-medium">Dark</span>
                              </Label>
                            </div>

                            <div>
                              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                              <Label
                                htmlFor="theme-system"
                                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-gray-700 p-4 hover:bg-gray-600 [&:has([data-state=checked])]:border-blue-500"
                              >
                                <Laptop className="mb-3 h-6 w-6" />
                                <span className="text-sm font-medium">System</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                          <h3 className="text-lg font-medium text-white">Editor Settings</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fontSize">Font Size</Label>
                              <select
                                id="fontSize"
                                value={appearanceSettings.fontSize}
                                onChange={(e) => handleAppearanceUpdate("fontSize", e.target.value)}
                                className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"
                              >
                                <option value="small">Small</option>
                                <option value="medium">Medium</option>
                                <option value="large">Large</option>
                              </select>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="codeFont">Code Font</Label>
                              <select
                                id="codeFont"
                                value={appearanceSettings.codeFont}
                                onChange={(e) => handleAppearanceUpdate("codeFont", e.target.value)}
                                className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"
                              >
                                <option value="monospace">Monospace</option>
                                <option value="fira-code">Fira Code</option>
                                <option value="jetbrains-mono">JetBrains Mono</option>
                              </select>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="tabSize">Tab Size</Label>
                              <select
                                id="tabSize"
                                value={appearanceSettings.tabSize}
                                onChange={(e) => handleAppearanceUpdate("tabSize", e.target.value)}
                                className="w-full bg-gray-700 border-gray-600 rounded-md p-2 text-white"
                              >
                                <option value="2">2 spaces</option>
                                <option value="4">4 spaces</option>
                                <option value="8">8 spaces</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Save Button */}
                  <div className="mt-8 flex justify-end">
                    <Button onClick={handleSave} disabled={isSaving}>
                      {isSaving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

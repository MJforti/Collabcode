"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Github, Mail, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store auth token (simulate)
      localStorage.setItem("authToken", "mock-jwt-token")
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: "John Doe",
          email: formData.email,
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSocialLogin = async (provider: string) => {
    setIsLoading(true)
    try {
      // Simulate social login
      await new Promise((resolve) => setTimeout(resolve, 1000))

      localStorage.setItem("authToken", "mock-jwt-token")
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: "1",
          name: "John Doe",
          email: "john@example.com",
          avatar: "/placeholder.svg?height=40&width=40",
        }),
      )

      toast({
        title: "Welcome!",
        description: `Successfully signed in with ${provider}.`,
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-6">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" onClick={() => router.push("/")} className="text-white hover:bg-white/10 p-2">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-4">
                <div className="h-12 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">Welcome Back</CardTitle>
              <p className="text-gray-300">Sign in to your CollabCode account</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Social Login */}
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => handleSocialLogin("GitHub")}
                  disabled={isLoading}
                >
                  <Github className="h-4 w-4 mr-2" />
                  Continue with GitHub
                </Button>
                <Button
                  variant="outline"
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                  onClick={() => handleSocialLogin("Google")}
                  disabled={isLoading}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Continue with Google
                </Button>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              {/* Email/Password Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 pr-10"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: checked as boolean })}
                      className="border-white/20 data-[state=checked]:bg-blue-500"
                    />
                    <label htmlFor="remember" className="text-sm text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <Button
                    variant="link"
                    className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                    onClick={() => router.push("/auth/forgot-password")}
                  >
                    Forgot password?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="text-center">
                <span className="text-gray-400">Don't have an account? </span>
                <Button
                  variant="link"
                  className="text-blue-400 hover:text-blue-300 p-0 h-auto"
                  onClick={() => router.push("/auth/signup")}
                >
                  Sign up
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

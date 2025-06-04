"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Code,
  Users,
  Zap,
  Star,
  Play,
  Sparkles,
  Rocket,
  Brain,
  GitBranch,
  Shield,
  Globe,
  MessageSquare,
  CheckCircle,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    // Intersection Observer for active section
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.5 },
    )

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      })

      setContactForm({ name: "", email: "", message: "" })
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const features = [
    {
      icon: Code,
      title: "Real-Time Coding",
      description: "Collaborate on code with your team in real-time with AI-powered assistance and live cursors",
      color: "from-blue-500 to-cyan-500",
      details: ["Monaco Editor Integration", "Live Cursor Tracking", "Syntax Highlighting", "Auto-completion"],
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work together seamlessly with integrated chat, video calls, and project management tools",
      color: "from-purple-500 to-pink-500",
      details: ["HD Video Meetings", "Team Chat", "File Sharing", "Screen Sharing"],
    },
    {
      icon: Brain,
      title: "AI-Powered Tools",
      description: "Leverage advanced AI for code review, debugging, and automated task completion",
      color: "from-green-500 to-emerald-500",
      details: ["Code Review", "Bug Detection", "Auto-formatting", "Smart Suggestions"],
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with optimized real-time synchronization",
      color: "from-yellow-500 to-orange-500",
      details: ["Real-time Sync", "Edge Computing", "CDN Optimization", "Instant Loading"],
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Bank-grade security with end-to-end encryption and compliance standards",
      color: "from-red-500 to-pink-500",
      details: ["End-to-end Encryption", "SOC 2 Compliance", "GDPR Ready", "2FA Support"],
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Deploy worldwide with multi-region support and 99.9% uptime guarantee",
      color: "from-indigo-500 to-purple-500",
      details: ["Multi-region", "99.9% Uptime", "Auto-scaling", "Global CDN"],
    },
  ]

  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for individual developers and small projects",
      features: ["Up to 3 workspaces", "5 team members", "Basic AI assistance", "Community support", "1GB storage"],
      cta: "Get Started",
      popular: false,
      color: "from-gray-500 to-gray-600",
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "Ideal for growing teams and professional projects",
      features: [
        "Unlimited workspaces",
        "25 team members",
        "Advanced AI features",
        "Priority support",
        "100GB storage",
        "Video meetings",
        "Advanced analytics",
      ],
      cta: "Start Free Trial",
      popular: true,
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For large organizations with advanced security needs",
      features: [
        "Unlimited everything",
        "Unlimited team members",
        "Custom AI models",
        "24/7 dedicated support",
        "Unlimited storage",
        "Advanced security",
        "Custom integrations",
        "SLA guarantee",
      ],
      cta: "Contact Sales",
      popular: false,
      color: "from-purple-500 to-pink-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Lead Developer at TechCorp",
      avatar: "/placeholder.svg?height=64&width=64",
      content:
        "CollabCode has revolutionized how our team works together. The real-time collaboration is seamless and the AI assistance is incredibly helpful.",
      rating: 5,
      company: "TechCorp",
    },
    {
      name: "Marcus Johnson",
      role: "CTO at StartupXYZ",
      avatar: "/placeholder.svg?height=64&width=64",
      content:
        "The AI-powered code review feature has caught bugs we would have missed. It's like having a senior developer reviewing every line of code.",
      rating: 5,
      company: "StartupXYZ",
    },
    {
      name: "Elena Rodriguez",
      role: "Senior Engineer at DevCo",
      avatar: "/placeholder.svg?height=64&width=64",
      content:
        "Best collaborative development platform I've ever used. The UI is beautiful, intuitive, and the performance is outstanding.",
      rating: 5,
      company: "DevCo",
    },
  ]

  const stats = [
    { label: "Active Developers", value: "50K+", icon: Users },
    { label: "Projects Created", value: "100K+", icon: Code },
    { label: "Lines of Code", value: "10M+", icon: GitBranch },
    { label: "Team Satisfaction", value: "99%", icon: Star },
  ]

  const teamMembers = [
    {
      name: "Alex Rivera",
      role: "CEO & Co-founder",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "Former Google engineer with 10+ years in collaborative tools",
    },
    {
      name: "Sam Chen",
      role: "CTO & Co-founder",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "Ex-Microsoft architect specializing in real-time systems",
    },
    {
      name: "Jordan Kim",
      role: "Head of AI",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "PhD in Machine Learning from Stanford, former OpenAI researcher",
    },
    {
      name: "Taylor Brown",
      role: "Head of Design",
      avatar: "/placeholder.svg?height=128&width=128",
      bio: "Award-winning UX designer with experience at Apple and Figma",
    },
  ]

  const navigationItems = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Features", id: "features" },
    { name: "Pricing", id: "pricing" },
    { name: "Contact", id: "contact" },
  ]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900" : "bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50"} overflow-hidden`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 ${theme === "dark" ? "bg-gray-900/80" : "bg-white/80"} backdrop-blur-md border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => scrollToSection("home")}
            >
              <div className="relative">
                <div className="h-10 w-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <span className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                CollabCode
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative group ${
                    activeSection === item.id
                      ? theme === "dark"
                        ? "text-blue-400"
                        : "text-blue-600"
                      : theme === "dark"
                        ? "text-gray-300 hover:text-white"
                        : "text-gray-600 hover:text-gray-900"
                  } transition-colors`}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  {item.name}
                  <span
                    className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300 ${
                      activeSection === item.id ? "w-full" : ""
                    }`}
                  ></span>
                </motion.button>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}
              >
                {theme === "dark" ? "🌙" : "☀️"}
              </Button>

              {/* Desktop Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className={`${theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-900 hover:bg-gray-100"}`}
                  onClick={() => router.push("/auth/signin")}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => router.push("/auth/signup")}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden ${theme === "dark" ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-md border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            >
              <div className="px-6 py-4 space-y-4">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left ${theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                  >
                    {item.name}
                  </button>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full" onClick={() => router.push("/auth/signin")}>
                    Sign In
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    onClick={() => router.push("/auth/signup")}
                  >
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center pt-16"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8"
        >
          <Badge
            className={`${theme === "dark" ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30" : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-300"} mb-6`}
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Now with AI-Powered Collaboration
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`text-5xl lg:text-7xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white via-blue-100 to-purple-100" : "bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900"} bg-clip-text text-transparent leading-tight`}
        >
          Code Together,
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Build Faster
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`text-xl lg:text-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-12 max-w-3xl leading-relaxed`}
        >
          The ultimate collaborative development platform with real-time coding, AI assistance, and seamless team
          communication. Experience the future of software development.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
            onClick={() => router.push("/auth/signup")}
          >
            Start Building Now
            <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className={`${theme === "dark" ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-900 hover:bg-gray-100"} px-8 py-4 text-lg backdrop-blur-sm group`}
          >
            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Watch Demo
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-4xl"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="flex justify-center mb-2">
                <stat.icon
                  className={`h-8 w-8 ${theme === "dark" ? "text-blue-400 group-hover:text-purple-400" : "text-blue-600 group-hover:text-purple-600"} transition-colors`}
                />
              </div>
              <div className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-1`}>
                {stat.value}
              </div>
              <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge
              className={`${theme === "dark" ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30" : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300"} mb-6`}
            >
              <Users className="w-4 h-4 mr-2" />
              About CollabCode
            </Badge>
            <h2
              className={`text-4xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white to-gray-300" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}
            >
              Revolutionizing Development
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto mb-16`}>
              Founded by former engineers from Google, Microsoft, and OpenAI, CollabCode is on a mission to transform
              how developers collaborate and build software together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-6`}>
                Our Mission
              </h3>
              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-6 leading-relaxed`}>
                We believe that the best software is built when teams can collaborate seamlessly, regardless of location
                or time zone. Our platform combines the power of real-time collaboration with cutting-edge AI to create
                an environment where developers can focus on what they do best: building amazing software.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time collaboration without compromise",
                  "AI-powered development assistance",
                  "Enterprise-grade security and compliance",
                  "Global scale with local performance",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card
                className={`${theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"} backdrop-blur-xl overflow-hidden`}
              >
                <CardContent className="p-8">
                  <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-6">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <h4 className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2`}>
                    Watch Our Story
                  </h4>
                  <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                    Learn how CollabCode is transforming the way teams build software together.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Team Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-12`}>
              Meet Our Team
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Card
                    className={`${theme === "dark" ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-gray-50 border-gray-200 hover:border-gray-300"} backdrop-blur-xl transition-all duration-300`}
                  >
                    <CardContent className="p-6 text-center">
                      <Avatar className="h-24 w-24 mx-auto mb-4">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} alt={member.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-1`}>
                        {member.name}
                      </h4>
                      <p className="text-blue-400 text-sm mb-3">{member.role}</p>
                      <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"} leading-relaxed`}>
                        {member.bio}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`relative z-10 py-32 px-6 lg:px-12 ${theme === "dark" ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20" : "bg-gradient-to-r from-blue-50/50 to-purple-50/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge
              className={`${theme === "dark" ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-500/30" : "bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-300"} mb-6`}
            >
              <Zap className="w-4 h-4 mr-2" />
              Powerful Features
            </Badge>
            <h2
              className={`text-4xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white to-gray-300" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}
            >
              Everything You Need
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto`}>
              From real-time collaboration to AI-powered assistance, CollabCode provides all the tools your team needs
              to build amazing software together.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className={`${theme === "dark" ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-gray-200 hover:border-gray-300"} backdrop-blur-xl transition-all duration-300 overflow-hidden h-full`}
                >
                  <CardContent className="p-8">
                    <div
                      className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3
                      className={`text-2xl font-bold ${theme === "dark" ? "text-white group-hover:text-blue-300" : "text-gray-900 group-hover:text-blue-600"} mb-4 transition-colors`}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-lg leading-relaxed mb-6`}
                    >
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                            {detail}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="relative z-10 py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge
              className={`${theme === "dark" ? "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/30" : "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border-green-300"} mb-6`}
            >
              <Star className="w-4 h-4 mr-2" />
              Simple Pricing
            </Badge>
            <h2
              className={`text-4xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white to-gray-300" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}
            >
              Choose Your Plan
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto`}>
              Start free and scale as you grow. All plans include our core collaboration features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className={`group relative ${plan.popular ? "scale-105" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card
                  className={`${theme === "dark" ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-gray-200 hover:border-gray-300"} backdrop-blur-xl transition-all duration-300 overflow-hidden h-full ${
                    plan.popular ? "border-2 border-blue-500" : ""
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="text-center mb-8">
                      <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-2`}>
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className={`text-4xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {plan.price}
                        </span>
                        <span className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} ml-2`}>
                          {plan.period}
                        </span>
                      </div>
                      <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                          : theme === "dark"
                            ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-300"
                      } transition-all duration-300`}
                      onClick={() => {
                        if (plan.name === "Free") {
                          router.push("/auth/signup")
                        } else if (plan.name === "Enterprise") {
                          scrollToSection("contact")
                        } else {
                          router.push("/auth/signup?plan=pro")
                        }
                      }}
                    >
                      {plan.cta}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`relative z-10 py-32 px-6 lg:px-12 ${theme === "dark" ? "bg-gradient-to-r from-blue-900/20 to-purple-900/20" : "bg-gradient-to-r from-blue-50/50 to-purple-50/50"}`}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge
              className={`${theme === "dark" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border-yellow-500/30" : "bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 border-yellow-300"} mb-6`}
            >
              <Star className="w-4 h-4 mr-2" />
              Loved by Developers
            </Badge>
            <h2
              className={`text-4xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white to-gray-300" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}
            >
              What Teams Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card
                  className={`${theme === "dark" ? "bg-white/5 border-white/10 hover:border-white/20" : "bg-white border-gray-200 hover:border-gray-300"} backdrop-blur-xl transition-all duration-300 h-full`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p
                      className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"} text-lg mb-6 leading-relaxed`}
                    >
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                          {testimonial.name}
                        </div>
                        <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>
                          {testimonial.role}
                        </div>
                        <div className="text-blue-400 text-xs">{testimonial.company}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <Badge
              className={`${theme === "dark" ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30" : "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300"} mb-6`}
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Get in Touch
            </Badge>
            <h2
              className={`text-4xl lg:text-6xl font-bold mb-6 ${theme === "dark" ? "bg-gradient-to-r from-white to-gray-300" : "bg-gradient-to-r from-gray-900 to-gray-600"} bg-clip-text text-transparent`}
            >
              Ready to Transform
              <br />
              Your Development?
            </h2>
            <p className={`text-xl ${theme === "dark" ? "text-gray-400" : "text-gray-600"} max-w-3xl mx-auto`}>
              Join thousands of developers who are already building faster and better with CollabCode.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                className={`${theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-gray-200"} backdrop-blur-xl`}
              >
                <CardContent className="p-8">
                  <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-6`}>
                    Send us a message
                  </h3>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
                      >
                        Name
                      </label>
                      <Input
                        id="name"
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className={`${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className={`${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className={`block text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-2`}
                      >
                        Message
                      </label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className={`${theme === "dark" ? "bg-gray-800 border-gray-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"}`}
                        rows={4}
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-6`}>
                  Get in touch
                </h3>
                <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-8`}>
                  Have questions about CollabCode? We'd love to hear from you. Send us a message and we'll respond as
                  soon as possible.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Email
                    </h4>
                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>hello@collabcode.dev</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Phone
                    </h4>
                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>+1 (555) 123-4567</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                      Office
                    </h4>
                    <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      123 Innovation Drive
                      <br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} mb-4`}>
                  Follow us
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className={`w-10 h-10 ${theme === "dark" ? "bg-gray-800 hover:bg-gray-700" : "bg-gray-100 hover:bg-gray-200"} rounded-lg flex items-center justify-center transition-colors`}
                      aria-label={social.label}
                    >
                      <social.icon className={`h-5 w-5 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-20"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-12 py-4 text-lg shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 group"
                onClick={() => router.push("/auth/signup")}
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className={`${theme === "dark" ? "border-white/20 text-white hover:bg-white/10" : "border-gray-300 text-gray-900 hover:bg-gray-100"} px-12 py-4 text-lg backdrop-blur-sm`}
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`relative z-10 border-t ${theme === "dark" ? "border-white/10 bg-gray-900/50" : "border-gray-200 bg-gray-50/50"} backdrop-blur-sm py-12 px-6 lg:px-12`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="h-5 w-5 text-white" />
                </div>
                <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  CollabCode
                </span>
              </div>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm mb-4`}>
                The ultimate collaborative development platform for modern teams.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} uppercase tracking-wider mb-4`}
              >
                Product
              </h3>
              <div className="space-y-2">
                {["Features", "Pricing", "Security", "Integrations"].map((item) => (
                  <div key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} text-sm transition-colors`}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} uppercase tracking-wider mb-4`}
              >
                Company
              </h3>
              <div className="space-y-2">
                {["About", "Blog", "Careers", "Contact"].map((item) => (
                  <div key={item}>
                    <button
                      onClick={() => scrollToSection(item.toLowerCase())}
                      className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} text-sm transition-colors`}
                    >
                      {item}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3
                className={`text-sm font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"} uppercase tracking-wider mb-4`}
              >
                Support
              </h3>
              <div className="space-y-2">
                {["Documentation", "Help Center", "Community", "Status"].map((item) => (
                  <div key={item}>
                    <a
                      href={item === "Documentation" ? "/docs" : "#"}
                      className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} text-sm transition-colors`}
                    >
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div
            className={`border-t ${theme === "dark" ? "border-gray-800" : "border-gray-200"} pt-8 flex flex-col md:flex-row justify-between items-center`}
          >
            <div className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-sm`}>
              © 2024 CollabCode. All rights reserved.
            </div>
            <div className="flex items-center gap-6 mt-4 md:mt-0">
              <a
                href="#"
                className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} text-sm transition-colors`}
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className={`${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} text-sm transition-colors`}
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { ArrowRight, ArrowLeft, Check, User, Briefcase, Code, Palette, Globe, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function OnboardingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [onboardingData, setOnboardingData] = useState({
    profilePicture: "",
    role: "",
    experience: "",
    interests: [] as string[],
    workspaceType: "",
    teamSize: "",
    goals: [] as string[],
    bio: "",
    inviteEmails: [""],
  })

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // This code will only run on the client side
    setIsClient(true)
    
    // Check if user is authenticated
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("authToken")
      if (!token) {
        router.push("/auth/signin")
      }
    }
  }, [router])

  // Return a loading state while checking authentication
  if (!isClient) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  const steps = [
    {
      title: "Welcome to CollabCode!",
      subtitle: "Let's set up your profile",
      component: "profile",
    },
    {
      title: "Tell us about yourself",
      subtitle: "Help us personalize your experience",
      component: "role",
    },
    {
      title: "What interests you?",
      subtitle: "Select your areas of focus",
      component: "interests",
    },
    {
      title: "Set up your workspace",
      subtitle: "Configure your development environment",
      component: "workspace",
    },
    {
      title: "Invite your team",
      subtitle: "Collaborate with others (optional)",
      component: "team",
    },
    {
      title: "You're all set!",
      subtitle: "Ready to start building amazing things",
      component: "complete",
    },
  ]

  const roles = [
    { id: "frontend", label: "Frontend Developer", icon: Palette },
    { id: "backend", label: "Backend Developer", icon: Code },
    { id: "fullstack", label: "Full Stack Developer", icon: Globe },
    { id: "designer", label: "UI/UX Designer", icon: Palette },
    { id: "manager", label: "Project Manager", icon: Briefcase },
    { id: "student", label: "Student", icon: User },
  ]

  const experienceLevels = [
    { id: "beginner", label: "Beginner (0-1 years)" },
    { id: "intermediate", label: "Intermediate (2-5 years)" },
    { id: "senior", label: "Senior (5+ years)" },
    { id: "expert", label: "Expert (10+ years)" },
  ]

  const interestOptions = [
    "Web Development",
    "Mobile Development",
    "Machine Learning",
    "DevOps",
    "UI/UX Design",
    "Data Science",
    "Blockchain",
    "Game Development",
    "Cloud Computing",
    "Cybersecurity",
    "IoT",
    "AR/VR",
  ]

  const workspaceTypes = [
    { id: "personal", label: "Personal Projects", description: "For individual work and learning" },
    { id: "team", label: "Team Collaboration", description: "For working with a team" },
    { id: "company", label: "Company/Organization", description: "For enterprise use" },
  ]

  const teamSizes = [
    { id: "solo", label: "Just me" },
    { id: "small", label: "2-5 people" },
    { id: "medium", label: "6-20 people" },
    { id: "large", label: "20+ people" },
  ]

  const goals = [
    "Learn new technologies",
    "Build side projects",
    "Collaborate with others",
    "Improve code quality",
    "Increase productivity",
    "Share knowledge",
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    try {
      // Simulate API call to save onboarding data
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Welcome to CollabCode!",
        description: "Your account has been set up successfully.",
      })

      router.push("/dashboard")
    } catch (error) {
      toast({
        title: "Setup failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInterest = (interest: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const toggleGoal = (goal: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
    }))
  }

  const addEmailField = () => {
    setOnboardingData((prev) => ({
      ...prev,
      inviteEmails: [...prev.inviteEmails, ""],
    }))
  }

  const updateEmail = (index: number, email: string) => {
    setOnboardingData((prev) => ({
      ...prev,
      inviteEmails: prev.inviteEmails.map((e, i) => (i === index ? email : e)),
    }))
  }

  const removeEmail = (index: number) => {
    setOnboardingData((prev) => ({
      ...prev,
      inviteEmails: prev.inviteEmails.filter((_, i) => i !== index),
    }))
  }

  const renderStepContent = () => {
    switch (steps[currentStep].component) {
      case "profile":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <Avatar className="h-24 w-24 mx-auto mb-4">
                <AvatarImage src={onboardingData.profilePicture || "/placeholder.svg"} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-2xl">
                  {localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!).name.charAt(0) : "U"}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
                Upload Photo
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Bio (Optional)</label>
                <Textarea
                  placeholder="Tell us a bit about yourself..."
                  value={onboardingData.bio}
                  onChange={(e) => setOnboardingData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                  rows={3}
                />
              </div>
            </div>
          </div>
        )

      case "role":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">What's your role?</h3>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((role) => (
                  <Button
                    key={role.id}
                    variant={onboardingData.role === role.id ? "default" : "outline"}
                    className={`h-auto p-4 flex flex-col items-center space-y-2 ${
                      onboardingData.role === role.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => setOnboardingData((prev) => ({ ...prev, role: role.id }))}
                  >
                    <role.icon className="h-6 w-6" />
                    <span className="text-sm text-center">{role.label}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Experience level?</h3>
              <div className="space-y-2">
                {experienceLevels.map((level) => (
                  <Button
                    key={level.id}
                    variant={onboardingData.experience === level.id ? "default" : "outline"}
                    className={`w-full justify-start ${
                      onboardingData.experience === level.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => setOnboardingData((prev) => ({ ...prev, experience: level.id }))}
                  >
                    {level.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case "interests":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">What interests you?</h3>
              <p className="text-gray-400 text-sm mb-4">Select all that apply</p>
              <div className="grid grid-cols-2 gap-2">
                {interestOptions.map((interest) => (
                  <Button
                    key={interest}
                    variant={onboardingData.interests.includes(interest) ? "default" : "outline"}
                    className={`text-sm ${
                      onboardingData.interests.includes(interest)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => toggleInterest(interest)}
                  >
                    {interest}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">What are your goals?</h3>
              <div className="grid grid-cols-1 gap-2">
                {goals.map((goal) => (
                  <Button
                    key={goal}
                    variant={onboardingData.goals.includes(goal) ? "default" : "outline"}
                    className={`justify-start ${
                      onboardingData.goals.includes(goal)
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => toggleGoal(goal)}
                  >
                    {goal}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case "workspace":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Workspace type</h3>
              <div className="space-y-3">
                {workspaceTypes.map((type) => (
                  <Card
                    key={type.id}
                    className={`cursor-pointer transition-all ${
                      onboardingData.workspaceType === type.id
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-500"
                        : "bg-white/5 border-white/20 hover:border-white/30"
                    }`}
                    onClick={() => setOnboardingData((prev) => ({ ...prev, workspaceType: type.id }))}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{type.label}</h4>
                          <p className="text-sm text-gray-400">{type.description}</p>
                        </div>
                        {onboardingData.workspaceType === type.id && <Check className="h-5 w-5 text-blue-400" />}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Team size</h3>
              <div className="grid grid-cols-2 gap-3">
                {teamSizes.map((size) => (
                  <Button
                    key={size.id}
                    variant={onboardingData.teamSize === size.id ? "default" : "outline"}
                    className={`${
                      onboardingData.teamSize === size.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                        : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                    }`}
                    onClick={() => setOnboardingData((prev) => ({ ...prev, teamSize: size.id }))}
                  >
                    {size.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )

      case "team":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Invite team members</h3>
              <p className="text-gray-400 text-sm mb-4">
                Invite colleagues to collaborate with you (you can skip this step)
              </p>

              <div className="space-y-3">
                {onboardingData.inviteEmails.map((email, index) => (
                  <div key={index} className="flex space-x-2">
                    <Input
                      type="email"
                      placeholder="colleague@company.com"
                      value={email}
                      onChange={(e) => updateEmail(index, e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500"
                    />
                    {onboardingData.inviteEmails.length > 1 && (
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => removeEmail(index)}
                        className="bg-white/5 border-white/20 text-white hover:bg-red-500/20"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addEmailField}
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  + Add another email
                </Button>
              </div>
            </div>
          </div>
        )

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <Check className="h-10 w-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">You're all set!</h3>
              <p className="text-gray-400">
                Welcome to CollabCode! You're ready to start building amazing things with your team.
              </p>
            </div>
            <div className="bg-white/5 border border-white/20 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">What's next?</h4>
              <ul className="text-sm text-gray-300 space-y-1 text-left">
                <li>• Create your first workspace</li>
                <li>• Invite team members</li>
                <li>• Start your first project</li>
                <li>• Explore AI-powered features</li>
              </ul>
            </div>
          </div>
        )

      default:
        return null
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

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-gray-400">
              Step {currentStep + 1} of {steps.length}
            </span>
            <span className="text-sm text-gray-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-white mb-2">{steps[currentStep].title}</h1>
                <p className="text-gray-400">{steps[currentStep].subtitle}</p>
              </motion.div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderStepContent()}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === steps.length - 1 ? (
                <Button
                  onClick={handleComplete}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  {isLoading ? (
                    "Setting up..."
                  ) : (
                    <>
                      Get Started
                      <Rocket className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

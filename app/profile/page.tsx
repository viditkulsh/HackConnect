"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Edit, User, SwitchCamera } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavBar } from "@/components/nav-bar"
import { useToast } from "@/hooks/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface UserProfile {
  name: string
  skill1: string
  skill2?: string
  skill3?: string
  lookingFor: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const router = useRouter()
  const { toast } = useToast()
  const [availableProfiles, setAvailableProfiles] = useState<string[]>([])
  const [currentEvent, setCurrentEvent] = useState<string>("HackNYU 2023")

  useEffect(() => {
    // In a real app, we would fetch the profile from an API
    const savedProfile = localStorage.getItem("userProfile")
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile))
    } else {
      // If no profile exists, redirect to setup
      router.push("/setup-profile")
    }

    // Simulate loading available profiles
    setAvailableProfiles(["HackNYU 2023", "TechCrunch Disrupt", "HackMIT"])
  }, [])

  const handleLogout = () => {
    // In a real app, we would handle logout with authentication
    localStorage.removeItem("userProfile")
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
      className: "bg-secondary text-black",
    })
    router.push("/")
  }

  const handleSwitchProfile = (profileName: string) => {
    setCurrentEvent(profileName)
    toast({
      title: "Profile switched",
      description: `You are now using your ${profileName} profile.`,
      className: "bg-primary text-black",
    })
  }

  if (!profile) {
    return <div>Loading...</div>
  }

  const skills = [
    profile.skill1,
    ...(profile.skill2 ? [profile.skill2] : []),
    ...(profile.skill3 ? [profile.skill3] : []),
  ]

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-accent/30">
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-bold text-secondary">Your Profile</h1>
        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
          {currentEvent}
        </Badge>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
              <User className="h-12 w-12 text-primary/50" />
            </div>
            <motion.div
              className="absolute bottom-0 right-0 bg-secondary text-black p-1 rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Edit className="h-4 w-4" />
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
      >
        <Card className="mb-6 border-primary/20 overflow-hidden">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-secondary">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h3 className="text-sm text-secondary/70 mb-1">Name</h3>
              <p className="font-medium text-secondary">{profile.name}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h3 className="text-sm text-secondary/70 mb-1">Top Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map(
                  (skill, index) =>
                    skill && (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      >
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-none">{skill}</Badge>
                      </motion.div>
                    ),
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h3 className="text-sm text-secondary/70 mb-1">Looking For</h3>
              <Badge variant="outline" className="border-secondary text-secondary">
                {profile.lookingFor}
              </Badge>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Switch Event Profile Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-4"
      >
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full bg-primary hover:bg-primary/90 text-black flex items-center gap-2">
              <SwitchCamera className="h-4 w-4" />
              Switch Event Profile
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-secondary">Switch Event Profile</DialogTitle>
              <DialogDescription>Select an event profile or create a new one</DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              {availableProfiles.map((profileName) => (
                <Button
                  key={profileName}
                  variant={currentEvent === profileName ? "secondary" : "outline"}
                  className={`w-full justify-start text-left ${
                    currentEvent === profileName ? "text-black" : "text-secondary hover:bg-secondary/10"
                  }`}
                  onClick={() => handleSwitchProfile(profileName)}
                >
                  {profileName}
                  {currentEvent === profileName && <Badge className="ml-auto bg-black/10 text-black">Active</Badge>}
                </Button>
              ))}
              <Button
                variant="ghost"
                className="w-full justify-start text-left text-primary hover:bg-primary/5"
                onClick={() => router.push("/event-verification")}
              >
                + Add New Event Profile
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 border-secondary text-secondary hover:bg-secondary/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </motion.div>

      <NavBar />
    </div>
  )
}


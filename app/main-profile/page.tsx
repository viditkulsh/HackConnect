"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Github, Linkedin, Upload, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function MainProfilePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setProfileImage(e.target.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate profile creation process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your main profile has been saved successfully.",
        className: "bg-primary text-black",
      })
      router.push("/event-verification")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-accent/30 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-secondary text-xl">Set Up Your Main Profile</CardTitle>
            <CardDescription>This information will be visible to other hackathon attendees</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative h-32 w-32 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border-4 border-white shadow-md">
                    {profileImage ? (
                      <img
                        src={profileImage || "/placeholder.svg"}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <User className="h-16 w-16 text-primary/50" />
                    )}
                  </div>
                  <div className="relative">
                    <Input
                      id="profile-image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    <Label
                      htmlFor="profile-image"
                      className="flex items-center gap-2 text-sm cursor-pointer bg-secondary/10 hover:bg-secondary/20 text-secondary px-3 py-2 rounded-md transition-colors"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Photo
                    </Label>
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name" className="text-secondary">
                      Full Name
                    </Label>
                    <Input
                      id="full-name"
                      placeholder="John Doe"
                      required
                      className="border-secondary/30 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="job-title" className="text-secondary">
                      Job Title / Role
                    </Label>
                    <Input
                      id="job-title"
                      placeholder="Software Engineer"
                      className="border-secondary/30 focus-visible:ring-primary"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-secondary">
                      Short Bio
                    </Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell others a bit about yourself..."
                      className="border-secondary/30 focus-visible:ring-primary resize-none h-24"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-secondary/10">
                <div className="space-y-2">
                  <Label className="text-secondary flex items-center gap-2">
                    <Linkedin className="h-4 w-4" />
                    LinkedIn Profile
                  </Label>
                  <Input
                    id="linkedin"
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="border-secondary/30 focus-visible:ring-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-secondary flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Profile
                  </Label>
                  <Input
                    id="github"
                    placeholder="https://github.com/yourusername"
                    className="border-secondary/30 focus-visible:ring-primary"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black" disabled={isLoading}>
                {isLoading ? "Saving Profile..." : "Continue to Hack Profile"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}


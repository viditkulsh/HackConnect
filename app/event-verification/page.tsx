"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, KeyRound, Mail } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function EventVerificationPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [eventCode, setEventCode] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate verification process
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Verification initiated",
        description: "We've sent a one-time password to your registered email.",
        className: "bg-primary text-black",
      })

      // Store the email for the OTP verification step
      localStorage.setItem("verificationEmail", email)

      // Navigate to OTP verification
      router.push("/event-code")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-accent/30 flex flex-col items-center justify-center p-4">
      <Link href="/main-profile" className="self-start mb-6 flex items-center text-secondary hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Main Profile
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-secondary text-xl">Event Verification</CardTitle>
            <CardDescription>Enter the event code and the email you used to register for the hackathon</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="event-code" className="text-secondary flex items-center gap-2">
                  <KeyRound className="h-4 w-4" />
                  Event Code
                </Label>
                <Input
                  id="event-code"
                  placeholder="Enter the event code (e.g., HACK2023)"
                  value={eventCode}
                  onChange={(e) => setEventCode(e.target.value)}
                  required
                  className="border-secondary/30 focus-visible:ring-primary"
                />
                <p className="text-xs text-secondary/70">The event code is provided by the hackathon organizers.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-secondary flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Registration Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter the email you used to register"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-secondary/30 focus-visible:ring-primary"
                />
                <p className="text-xs text-secondary/70">
                  This must match the email you used when you RSVP'd for the event.
                </p>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black"
                disabled={isLoading || !eventCode || !email}
              >
                {isLoading ? "Verifying..." : "Verify & Send OTP"}
              </Button>

              <p className="text-xs text-center mt-4 text-secondary/70">
                We'll send a one-time password to your registered email to confirm your identity.
              </p>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}


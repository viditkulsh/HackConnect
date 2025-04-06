"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

export default function EventCodePage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState(["", "", "", "", "", ""])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      if (nextInput) {
        nextInput.focus()
      }
    }
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "RSVP confirmed",
        description: "You can now set up your hackathon profile.",
        className: "bg-primary text-black",
      })
      router.push("/hack-profile")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-accent/30 flex flex-col items-center justify-center p-4">
      <Link href="/event-verification" className="self-start mb-6 flex items-center text-secondary hover:underline">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Event Verification
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-primary/20">
          <CardHeader className="bg-primary/5 border-b border-primary/10">
            <CardTitle className="text-secondary text-xl">Verify Event Attendance</CardTitle>
            <CardDescription>
              {otpSent
                ? "Enter the one-time password sent to your email"
                : "Enter the one-time password sent to your registered email"}
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleOtpSubmit}>
            <CardContent className="pt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="otp" className="text-secondary text-center block">
                  One-Time Password
                </Label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      className="w-12 h-12 text-center text-lg border-secondary/30 focus-visible:ring-primary"
                      maxLength={1}
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-secondary/70 text-center">
                Enter the 6-digit code sent to your email to confirm your RSVP.
              </p>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black"
                disabled={isLoading || otp.some((digit) => !digit)}
              >
                {isLoading ? "Verifying..." : "Confirm RSVP"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </motion.div>
    </div>
  )
}


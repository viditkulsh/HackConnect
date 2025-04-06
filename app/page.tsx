"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left Half */}
      <motion.div
        className="w-full md:w-1/2 bg-accent flex items-center justify-center p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary mb-6">HackConnect</h1>
            <p className="text-lg md:text-xl text-secondary/80 mb-8">Find your perfect hackathon team</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/setup-profile">
              <Button size="lg" className="w-full text-lg py-6 bg-secondary hover:bg-secondary/90">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Half */}
      <motion.div
        className="w-full md:w-1/2 bg-primary flex items-center justify-center p-8"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-md w-full text-black">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
          >
            <p className="animate-slide-up" style={{ animationDelay: "0.1s" }}>
              ✓ Connect with the right people at hackathons
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              ✓ Find teammates with complementary skills
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              ✓ Chat directly with your matches
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              ✓ Build better projects with the right team
            </p>
            <p className="animate-slide-up" style={{ animationDelay: "0.5s" }}>
              ✓ Make networking less awkward and more effective
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/about">
              <Button
                variant="outline"
                size="lg"
                className="w-full text-lg py-6 border-black text-black hover:bg-white/10"
              >
                Learn More
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}


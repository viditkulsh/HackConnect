"use client"

import { useState, useEffect } from "react"
import { Check, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { NavBar } from "@/components/nav-bar"
import { mockUsers, type User } from "@/lib/data"
import { useToast } from "@/hooks/use-toast"

export default function DiscoverPage() {
  const [users, setUsers] = useState<User[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // In a real app, we would fetch users from an API
    setUsers(mockUsers)
  }, [])

  const currentUser = users[currentIndex]

  const handleSwipe = (dir: string) => {
    if (currentIndex >= users.length - 1) {
      toast({
        title: "No more profiles",
        description: "You've seen all available profiles for now.",
        className: "bg-secondary text-black",
      })
      return
    }

    setDirection(dir)

    if (dir === "right") {
      // In a real app, we would send this match to the backend
      toast({
        title: "Connection Request Sent!",
        description: `You've expressed interest in connecting with ${currentUser.name}.`,
        className: "bg-primary text-black",
      })
    }

    setTimeout(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1)
      setDirection(null)
    }, 300)
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-accent/30">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-2xl font-bold mb-4 text-secondary">No More Profiles</h1>
          <p className="text-center text-secondary/70 mb-6">
            You've seen all available profiles for now. Check back later for more connections!
          </p>
        </motion.div>
        <NavBar />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-accent/30">
      <motion.h1
        className="text-2xl font-bold mb-6 text-center text-secondary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Discover
      </motion.h1>

      <div className="flex-1 flex items-center justify-center swipe-card-container">
        <AnimatePresence>
          <motion.div
            key={currentUser.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              x: direction === "left" ? -300 : direction === "right" ? 300 : 0,
              rotate: direction === "left" ? -10 : direction === "right" ? 10 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-sm"
          >
            <Card className="overflow-hidden border-2 border-primary/20 shadow-lg">
              <div className="h-64 bg-primary/10 flex items-center justify-center overflow-hidden">
                <motion.img
                  src={currentUser.avatar || "/placeholder.svg"}
                  alt={currentUser.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <CardContent className="p-6 bg-white">
                <motion.h2
                  className="text-2xl font-bold mb-2 text-secondary"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  {currentUser.name}
                </motion.h2>

                <motion.div
                  className="mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  <h3 className="text-sm text-secondary/70 mb-2">Top Skills:</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentUser.skills.map((skill, index) => (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                      >
                        <Badge variant="secondary" className="bg-secondary/10 text-secondary hover:bg-secondary/20">
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                >
                  <h3 className="text-sm text-secondary/70 mb-2">Looking For:</h3>
                  <Badge variant="outline" className="border-primary text-primary">
                    {currentUser.lookingFor}
                  </Badge>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full h-16 w-16 border-2 border-secondary bg-white text-secondary hover:bg-secondary/10"
            onClick={() => handleSwipe("left")}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Pass</span>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            size="lg"
            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 text-black"
            onClick={() => handleSwipe("right")}
          >
            <Check className="h-8 w-8" />
            <span className="sr-only">Connect</span>
          </Button>
        </motion.div>
      </div>

      <NavBar />
    </div>
  )
}


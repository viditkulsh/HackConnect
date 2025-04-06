"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { motion } from "framer-motion"

import { Card, CardContent } from "@/components/ui/card"
import { NavBar } from "@/components/nav-bar"
import { mockMatches, mockUsers, type User } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function MatchesPage() {
  const [matches, setMatches] = useState<{ user: User; matchedAt: Date }[]>([])

  useEffect(() => {
    // In a real app, we would fetch matches from an API
    const matchedUsers = mockMatches.map((match) => {
      const user = mockUsers.find((user) => user.id === match.userId)
      return {
        user: user!,
        matchedAt: match.matchedAt,
      }
    })
    setMatches(matchedUsers)
  }, [])

  return (
    <div className="flex flex-col min-h-screen p-4 pb-20 bg-accent/30">
      <motion.h1
        className="text-2xl font-bold mb-6 text-center text-secondary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Matches
      </motion.h1>

      {matches.length === 0 ? (
        <motion.div
          className="flex-1 flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-secondary/70 mb-4">You don't have any matches yet.</p>
          <p className="text-center text-secondary/70">Start swiping to connect with other attendees!</p>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {matches.map(({ user, matchedAt }, index) => (
            <motion.div
              key={user.id}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Link href={`/chat/${user.id}`}>
                <Card className="hover:bg-white transition-colors border-primary/20">
                  <CardContent className="p-4 flex items-center">
                    <div className="h-12 w-12 rounded-full bg-primary/10 mr-4 overflow-hidden">
                      <img
                        src={user.avatar || "/placeholder.svg"}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-secondary">{user.name}</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {user.skills.slice(0, 2).map((skill) => (
                          <Badge key={skill} variant="outline" className="text-xs border-primary/30 text-primary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-secondary/60">
                      {formatDistanceToNow(matchedAt, { addSuffix: true })}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      <NavBar />
    </div>
  )
}


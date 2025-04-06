"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { MessageSquare, Search, User } from "lucide-react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

export function NavBar() {
  const pathname = usePathname()

  // Don't show navbar on landing page or profile setup
  if (pathname === "/" || pathname === "/setup-profile") {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-accent z-10">
      <div className="container flex justify-around py-2">
        <Link href="/discover" className="flex flex-col items-center p-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Search className={cn("h-6 w-6", pathname === "/discover" ? "text-primary" : "text-secondary/60")} />
          </motion.div>
          <span className={cn("text-xs", pathname === "/discover" ? "text-primary" : "text-secondary/60")}>
            Discover
          </span>
        </Link>

        <Link href="/matches" className="flex flex-col items-center p-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <MessageSquare
              className={cn(
                "h-6 w-6",
                pathname === "/matches" || pathname.startsWith("/chat") ? "text-primary" : "text-secondary/60",
              )}
            />
          </motion.div>
          <span
            className={cn(
              "text-xs",
              pathname === "/matches" || pathname.startsWith("/chat") ? "text-primary" : "text-secondary/60",
            )}
          >
            Matches
          </span>
        </Link>

        <Link href="/profile" className="flex flex-col items-center p-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <User className={cn("h-6 w-6", pathname === "/profile" ? "text-primary" : "text-secondary/60")} />
          </motion.div>
          <span className={cn("text-xs", pathname === "/profile" ? "text-primary" : "text-secondary/60")}>Profile</span>
        </Link>
      </div>
    </div>
  )
}


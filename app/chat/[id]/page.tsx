"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Send, Image, Paperclip } from "lucide-react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavBar } from "@/components/nav-bar"
import { mockUsers, mockChats, type Message, type User } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

export default function ChatPage() {
  const params = useParams()
  const userId = params.id as string
  const [user, setUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, we would fetch the user and chat from an API
    const foundUser = mockUsers.find((u) => u.id === userId)
    if (foundUser) {
      setUser(foundUser)
    }

    const chat = mockChats.find((c) => c.participants.includes("currentUser") && c.participants.includes(userId))

    if (chat) {
      setMessages(chat.messages)
    }
  }, [userId])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const message: Message = {
      id: `msg${Date.now()}`,
      senderId: "currentUser",
      text: newMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate the other user typing
    setTimeout(() => {
      setIsTyping(true)

      // Simulate a response after a delay
      setTimeout(
        () => {
          setIsTyping(false)

          const responseMessage: Message = {
            id: `msg${Date.now() + 1}`,
            senderId: userId,
            text: getRandomResponse(newMessage),
            timestamp: new Date(),
          }

          setMessages((prev) => [...prev, responseMessage])
        },
        Math.random() * 2000 + 1000,
      ) // Random delay between 1-3 seconds
    }, 500)
  }

  const getRandomResponse = (message: string) => {
    const responses = [
      "That sounds interesting! Can you tell me more?",
      "I'd love to collaborate on that idea.",
      "Great point! I was thinking something similar.",
      "I have some experience with that. Maybe we can work together?",
      `I'm also interested in ${user?.skills[0]}. How long have you been working with it?`,
      "Would you like to meet up at the hackathon to discuss this further?",
      "That's exactly what I was looking for in a teammate!",
      "I have some resources that might help with that. I'll share them with you at the event.",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col h-screen bg-accent/20">
      <div className="border-b p-4 flex items-center bg-white shadow-sm">
        <Link href="/matches" className="mr-2">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <ArrowLeft className="h-5 w-5 text-secondary" />
          </motion.div>
          <span className="sr-only">Back to matches</span>
        </Link>

        <div className="h-10 w-10 rounded-full bg-primary/10 mr-3 overflow-hidden relative">
          <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
          {isOnline && (
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
          )}
        </div>

        <div className="flex-1">
          <h2 className="font-medium text-secondary">{user.name}</h2>
          <div className="flex items-center">
            <span className="text-xs text-secondary/60 mr-2">{isOnline ? "Online" : "Offline"}</span>
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              {user.skills[0]}
            </Badge>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <motion.p
              className="text-secondary/60 text-center max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              No messages yet. Say hello to start the conversation!
            </motion.p>
          </div>
        ) : (
          <AnimatePresence>
            {messages.map((message) => {
              const isCurrentUser = message.senderId === "currentUser"

              return (
                <motion.div
                  key={message.id}
                  className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 chat-bubble-animation ${
                      isCurrentUser ? "bg-primary text-black" : "bg-white border border-secondary/20"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${isCurrentUser ? "text-black/70" : "text-secondary/60"}`}>
                      {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                    </p>
                  </div>
                </motion.div>
              )
            })}

            {isTyping && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-white border border-secondary/20 rounded-lg p-3 max-w-[80%]">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="border-t p-4 flex gap-2 bg-white">
        <div className="flex gap-2">
          <Button type="button" size="icon" variant="ghost" className="text-secondary">
            <Paperclip className="h-5 w-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button type="button" size="icon" variant="ghost" className="text-secondary">
            <Image className="h-5 w-5" />
            <span className="sr-only">Send image</span>
          </Button>
        </div>

        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border-secondary/30 focus-visible:ring-primary"
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            size="icon"
            className="bg-primary hover:bg-primary/90 text-black"
            disabled={!newMessage.trim()}
          >
            <Send className="h-4 w-4 text-black" />
            <span className="sr-only">Send</span>
          </Button>
        </motion.div>
      </form>

      <NavBar />
    </div>
  )
}


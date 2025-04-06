export interface User {
  id: string
  name: string
  skills: string[]
  lookingFor: string
  avatar: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    skills: ["React", "TypeScript", "UI/UX"],
    lookingFor: "Backend Developer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Sam Chen",
    skills: ["Python", "AI/ML", "Data Science"],
    lookingFor: "Frontend Developer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Taylor Kim",
    skills: ["Java", "Spring Boot", "DevOps"],
    lookingFor: "UI/UX Designer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Jordan Smith",
    skills: ["Product Design", "Figma", "UI/UX"],
    lookingFor: "Full Stack Developer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Casey Williams",
    skills: ["Node.js", "MongoDB", "Express"],
    lookingFor: "Mobile Developer",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Morgan Lee",
    skills: ["Swift", "iOS", "Mobile"],
    lookingFor: "Tech Co-founder",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "7",
    name: "Riley Garcia",
    skills: ["Blockchain", "Solidity", "Web3"],
    lookingFor: "Product Manager",
    avatar: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "8",
    name: "Quinn Martinez",
    skills: ["AR/VR", "Unity", "3D Modeling"],
    lookingFor: "Business Development",
    avatar: "/placeholder.svg?height=200&width=200",
  },
]

export interface Message {
  id: string
  senderId: string
  text: string
  timestamp: Date
}

export interface Chat {
  id: string
  participants: string[]
  messages: Message[]
}

export const mockChats: Chat[] = [
  {
    id: "chat1",
    participants: ["currentUser", "1"],
    messages: [
      {
        id: "msg1",
        senderId: "1",
        text: "Hey! I saw you're looking for a backend developer. I'm interested in collaborating!",
        timestamp: new Date(Date.now() - 3600000),
      },
      {
        id: "msg2",
        senderId: "currentUser",
        text: "Hi Alex! Yes, I need help with setting up a database and API. What's your experience with that?",
        timestamp: new Date(Date.now() - 3500000),
      },
      {
        id: "msg3",
        senderId: "1",
        text: "I've worked with PostgreSQL and Express for several projects. Would love to chat more about your idea!",
        timestamp: new Date(Date.now() - 3400000),
      },
    ],
  },
  {
    id: "chat2",
    participants: ["currentUser", "4"],
    messages: [
      {
        id: "msg4",
        senderId: "4",
        text: "Hello! I'm a UI/UX designer and I think we could work well together.",
        timestamp: new Date(Date.now() - 86400000),
      },
      {
        id: "msg5",
        senderId: "currentUser",
        text: "Hi Jordan! I'm looking for someone to help design the user interface for my app. Do you have a portfolio?",
        timestamp: new Date(Date.now() - 85000000),
      },
      {
        id: "msg6",
        senderId: "4",
        text: "Yes, I can share some of my recent work. I specialize in clean, intuitive interfaces.",
        timestamp: new Date(Date.now() - 84000000),
      },
    ],
  },
]

export interface Match {
  id: string
  userId: string
  matchedAt: Date
}

export const mockMatches: Match[] = [
  {
    id: "match1",
    userId: "1",
    matchedAt: new Date(Date.now() - 3600000),
  },
  {
    id: "match2",
    userId: "4",
    matchedAt: new Date(Date.now() - 86400000),
  },
]


import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <Link href="/" className="flex items-center text-sm mb-6">
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to Home
      </Link>

      <h1 className="text-3xl font-bold mb-6">About HackConnect</h1>

      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-semibold mb-2">The Problem</h2>
          <p className="text-gray-700">
            At hackathons, it's hard to find the right people to talk to. Most of the time, participants meet random
            people without knowing if they have similar interests or useful skills. This makes networking feel like a
            guessing game.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Our Solution</h2>
          <p className="text-gray-700">
            HackConnect is a networking app made just for hackathon attendees. It helps people connect with others who
            are actually coming to the event and are relevant to them.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Key Features</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>
              <strong>For RSVP Attendees Only</strong> - Works only for people who confirmed they are attending.
            </li>
            <li>
              <strong>Swipe to Connect</strong> - Right swipe to connect, left swipe if not interested.
            </li>
            <li>
              <strong>Simple Profiles</strong> - Name, top skills, and what you're looking for.
            </li>
            <li>
              <strong>Built-in Chat</strong> - If two people match, they can chat in the app.
            </li>
            <li>
              <strong>Real-time Updates</strong> - Only shows people who are confirmed to attend.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal pl-5 space-y-2 text-gray-700">
            <li>Attendee RSVPs to the hackathon.</li>
            <li>HackConnect loads confirmed users.</li>
            <li>User sets up a short profile.</li>
            <li>Start swiping to find people to meet.</li>
            <li>Match and chat in the app.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Why Use HackConnect?</h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            <li>Helps you find useful connections easily.</li>
            <li>Makes networking less awkward.</li>
            <li>Great for first-time or shy participants.</li>
            <li>Helps organizers improve engagement.</li>
          </ul>
        </section>
      </div>

      <div className="mt-8 text-center">
        <Link href="/setup-profile">
          <Button size="lg">Get Started</Button>
        </Link>
      </div>
    </div>
  )
}


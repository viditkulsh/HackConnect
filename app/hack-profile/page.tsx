"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const formSchema = z.object({
  skill1: z.string().min(1, {
    message: "Please select at least one skill.",
  }),
  skill2: z.string().optional(),
  skill3: z.string().optional(),
  lookingFor: z.string().min(1, {
    message: "Please select what you're looking for.",
  }),
  preferredRole: z.string().min(1, {
    message: "Please select your preferred role.",
  }),
})

const skills = [
  "React",
  "Next.js",
  "Vue",
  "Angular",
  "JavaScript",
  "TypeScript",
  "Python",
  "Java",
  "C#",
  "Ruby",
  "Go",
  "Rust",
  "PHP",
  "Swift",
  "Kotlin",
  "UI/UX",
  "Product Design",
  "Graphic Design",
  "Backend",
  "Frontend",
  "Full Stack",
  "DevOps",
  "Cloud",
  "AI/ML",
  "Data Science",
  "Blockchain",
  "Mobile",
  "Game Dev",
  "AR/VR",
  "IoT",
]

const lookingFor = [
  "Tech Co-founder",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "Mobile Developer",
  "Full Stack Developer",
  "Mentor",
  "Investor",
  "Marketing Expert",
  "Business Development",
  "Project Manager",
]

const preferredRoles = [
  "Developer",
  "Designer",
  "Product Manager",
  "Data Scientist",
  "DevOps Engineer",
  "Business Developer",
  "Marketer",
  "Mentor",
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function HackProfilePage() {
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skill1: "",
      skill2: "",
      skill3: "",
      lookingFor: "",
      preferredRole: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, we would save this to a database or local storage
    localStorage.setItem("hackProfile", JSON.stringify(values))

    toast({
      title: "Hack profile created!",
      description: "Your hackathon profile has been set up successfully.",
      className: "bg-primary text-black",
    })

    router.push("/discover")
  }

  return (
    <div className="min-h-screen bg-accent/50">
      <div className="container max-w-md mx-auto py-10 px-4">
        <Link href="/event-code" className="flex items-center text-sm mb-6 text-secondary hover:underline">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Verification
        </Link>

        <motion.div
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
          <Card className="border-primary/20">
            <CardHeader className="bg-primary/5 border-b border-primary/10">
              <CardTitle className="text-secondary text-xl">Set Up Your Hack Profile</CardTitle>
              <CardDescription>This is what other hackathon attendees will see when swiping</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <motion.div variants={fadeInUp}>
                    <FormField
                      control={form.control}
                      name="skill1"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary">Top Skill #1</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-secondary/30 focus:ring-primary">
                                <SelectValue placeholder="Select a skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {skills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-secondary/70">
                            Your primary skill or expertise.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <FormField
                      control={form.control}
                      name="skill2"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary">Top Skill #2 (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-secondary/30 focus:ring-primary">
                                <SelectValue placeholder="Select a skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {skills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <FormField
                      control={form.control}
                      name="skill3"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary">Top Skill #3 (Optional)</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-secondary/30 focus:ring-primary">
                                <SelectValue placeholder="Select a skill" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {skills.map((skill) => (
                                <SelectItem key={skill} value={skill}>
                                  {skill}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <FormField
                      control={form.control}
                      name="lookingFor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary">Looking For</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-secondary/30 focus:ring-primary">
                                <SelectValue placeholder="Select what you're looking for" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {lookingFor.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-secondary/70">
                            What kind of person are you hoping to connect with?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp}>
                    <FormField
                      control={form.control}
                      name="preferredRole"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-secondary">Your Preferred Role</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-secondary/30 focus:ring-primary">
                                <SelectValue placeholder="Select your preferred role" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {preferredRoles.map((role) => (
                                <SelectItem key={role} value={role}>
                                  {role}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormDescription className="text-secondary/70">
                            What role do you typically take in a hackathon team?
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>

                  <motion.div variants={fadeInUp} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-black">
                      Continue to Event Verification
                    </Button>
                  </motion.div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}


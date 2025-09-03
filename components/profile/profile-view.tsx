"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Briefcase, GraduationCap, Sparkles } from "lucide-react"

// Mock profile data
const PROFILE_DATA = {
  name: "Alex Johnson",
  age: 28,
  location: "San Francisco, CA",
  occupation: "Software Engineer",
  education: "Bachelor's Degree",
  bio: "Passionate about technology and human connections. I love exploring new places, trying different cuisines, and having deep conversations about life, science, and everything in between. Looking for someone who shares my curiosity about the world.",
  interests: ["Technology", "Travel", "Cooking", "Hiking", "Photography", "Music"],
  relationshipGoals: ["Dating & Romance", "Friendship"],
  lifestyle: {
    smoking: "Never",
    drinking: "Socially",
    exercise: "Few times a week",
    diet: "Omnivore",
  },
  aiPortrait: "/ai-generated-professional-portrait-of-a-friendly-p.jpg",
}

export function ProfileView() {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Column - Portrait & Basic Info */}
      <div className="lg:col-span-1 space-y-6">
        <Card className="border-border/50">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <div className="relative">
                <img
                  src={PROFILE_DATA.aiPortrait || "/placeholder.svg"}
                  alt="AI Generated Portrait"
                  className="w-full aspect-square rounded-xl object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-accent/90 text-white">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Generated
                </Badge>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{PROFILE_DATA.name}</h1>
                <p className="text-muted-foreground">{PROFILE_DATA.age} years old</p>
              </div>
              <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                {PROFILE_DATA.location}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{PROFILE_DATA.occupation}</span>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{PROFILE_DATA.education}</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">Looking for {PROFILE_DATA.relationshipGoals.join(", ")}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Column - Detailed Info */}
      <div className="lg:col-span-2 space-y-6">
        {/* About */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{PROFILE_DATA.bio}</p>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Interests & Hobbies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {PROFILE_DATA.interests.map((interest) => (
                <Badge key={interest} variant="secondary">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lifestyle */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Lifestyle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="text-sm font-medium">Smoking</div>
                <div className="text-sm text-muted-foreground">{PROFILE_DATA.lifestyle.smoking}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Drinking</div>
                <div className="text-sm text-muted-foreground">{PROFILE_DATA.lifestyle.drinking}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Exercise</div>
                <div className="text-sm text-muted-foreground">{PROFILE_DATA.lifestyle.exercise}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Diet</div>
                <div className="text-sm text-muted-foreground">{PROFILE_DATA.lifestyle.diet}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="border-border/50 bg-gradient-to-r from-accent/5 to-primary/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Compatibility Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Communication Style</span>
                <Badge variant="secondary">Direct & Thoughtful</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Relationship Approach</span>
                <Badge variant="secondary">Serious & Committed</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Social Energy</span>
                <Badge variant="secondary">Balanced Introvert</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

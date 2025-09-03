"use client"

import { useState } from "react"
import { MatchCard } from "./match-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RefreshCw, Sparkles } from "lucide-react"

// Mock match data
const MOCK_MATCHES = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 26,
    location: "San Francisco, CA",
    occupation: "UX Designer",
    bio: "Creative soul who loves exploring new coffee shops and hiking trails. Looking for someone to share adventures and deep conversations with.",
    interests: ["Design", "Coffee", "Hiking", "Photography", "Travel"],
    aiPortrait: "/ai-generated-portrait-of-a-creative-woman-with-wa.jpg",
    compatibilityScore: 94,
    connectionType: "dating",
    aiInsights: {
      personalityMatch: "Complementary creative spirits",
      sharedInterests: ["Photography", "Travel", "Coffee"],
      communicationStyle: "Both value deep, meaningful conversations",
    },
  },
  {
    id: "2",
    name: "Marcus Johnson",
    age: 29,
    location: "San Francisco, CA",
    occupation: "Software Engineer",
    bio: "Tech enthusiast by day, chef by night. Always experimenting with new recipes and technologies. Seeking genuine connections.",
    interests: ["Technology", "Cooking", "Gaming", "Fitness", "Music"],
    aiPortrait: "/ai-generated-portrait-of-a-friendly-tech-profess.jpg",
    compatibilityScore: 87,
    connectionType: "friendship",
    aiInsights: {
      personalityMatch: "Shared analytical thinking with creative outlets",
      sharedInterests: ["Technology", "Music"],
      communicationStyle: "Both appreciate intellectual discussions",
    },
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    age: 24,
    location: "San Francisco, CA",
    occupation: "Marketing Manager",
    bio: "Passionate about sustainable living and social impact. Love yoga, reading, and weekend farmers market visits.",
    interests: ["Sustainability", "Yoga", "Reading", "Volunteering", "Art"],
    aiPortrait: "/ai-generated-portrait-of-a-young-professional-wo.jpg",
    compatibilityScore: 91,
    connectionType: "social",
    aiInsights: {
      personalityMatch: "Aligned values and social consciousness",
      sharedInterests: ["Volunteering", "Art"],
      communicationStyle: "Both are empathetic and value-driven communicators",
    },
  },
]

export function DiscoverInterface() {
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0)
  const [matches, setMatches] = useState(MOCK_MATCHES)
  const [isLoading, setIsLoading] = useState(false)

  const currentMatch = matches[currentMatchIndex]

  const handleAction = (action: "like" | "pass" | "superlike") => {
    console.log("[v0] Match action:", action, "for user:", currentMatch?.name)

    // Move to next match
    if (currentMatchIndex < matches.length - 1) {
      setCurrentMatchIndex(currentMatchIndex + 1)
    } else {
      // Load more matches
      loadMoreMatches()
    }
  }

  const loadMoreMatches = () => {
    setIsLoading(true)
    // Simulate loading more matches
    setTimeout(() => {
      setCurrentMatchIndex(0)
      setIsLoading(false)
      // In real app, would fetch new matches from API
    }, 1500)
  }

  if (isLoading) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-12 text-center">
          <RefreshCw className="w-8 h-8 text-accent mx-auto mb-4 animate-spin" />
          <h3 className="text-lg font-semibold mb-2">Finding Your Perfect Matches</h3>
          <p className="text-muted-foreground">Our AI is analyzing compatibility across multiple dimensions...</p>
        </CardContent>
      </Card>
    )
  }

  if (!currentMatch) {
    return (
      <Card className="border-border/50">
        <CardContent className="p-12 text-center">
          <Sparkles className="w-8 h-8 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No More Matches</h3>
          <p className="text-muted-foreground mb-4">
            You've seen all available matches. Check back later for new connections!
          </p>
          <Button onClick={loadMoreMatches} className="ai-glow">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Matches
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Match {currentMatchIndex + 1} of {matches.length}
        </p>
      </div>

      <MatchCard match={currentMatch} onAction={handleAction} />

      <div className="text-center">
        <Button variant="outline" onClick={loadMoreMatches} className="bg-transparent">
          <RefreshCw className="w-4 h-4 mr-2" />
          Load More Matches
        </Button>
      </div>
    </div>
  )
}

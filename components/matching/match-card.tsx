"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, X, Sparkles, MapPin, Briefcase, Brain, Star } from "lucide-react"

interface Match {
  id: string
  name: string
  age: number
  location: string
  occupation: string
  bio: string
  interests: string[]
  aiPortrait: string
  compatibilityScore: number
  connectionType: string
  aiInsights: {
    personalityMatch: string
    sharedInterests: string[]
    communicationStyle: string
  }
}

interface MatchCardProps {
  match: Match
  onAction: (action: "like" | "pass" | "superlike") => void
}

export function MatchCard({ match, onAction }: MatchCardProps) {
  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "text-[color:var(--success)]"
    if (score >= 80) return "text-accent"
    return "text-[color:var(--warning)]"
  }

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case "dating":
        return "bg-accent/10 text-accent"
      case "friendship":
        return "bg-primary/10 text-primary"
      case "social":
        return "bg-[color:var(--success)]/10 text-[color:var(--success)]"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <Card className="border-border/50 overflow-hidden max-w-2xl mx-auto">
      <div className="relative">
        <img
          src={match.aiPortrait || "/placeholder.svg"}
          alt={`${match.name}'s AI Portrait`}
          className="w-full h-96 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge className="bg-accent/90 text-white">
            <Sparkles className="w-3 h-3 mr-1" />
            AI Generated
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className={`${getCompatibilityColor(match.compatibilityScore)} bg-background/90`}>
            <Brain className="w-3 h-3 mr-1" />
            {match.compatibilityScore}% Match
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-background/90 backdrop-blur-sm rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold">
                {match.name}, {match.age}
              </h2>
              <Badge className={getConnectionTypeColor(match.connectionType)}>{match.connectionType}</Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {match.location}
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="w-3 h-3" />
                {match.occupation}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardContent className="p-6 space-y-6">
        {/* Bio */}
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{match.bio}</p>
        </div>

        {/* Interests */}
        <div>
          <h3 className="font-semibold mb-2">Interests</h3>
          <div className="flex flex-wrap gap-2">
            {match.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-4">
          <h3 className="font-semibold mb-3 flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            AI Compatibility Insights
          </h3>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">Personality:</span>
              <span className="text-muted-foreground ml-2">{match.aiInsights.personalityMatch}</span>
            </div>
            <div>
              <span className="font-medium">Shared Interests:</span>
              <span className="text-muted-foreground ml-2">{match.aiInsights.sharedInterests.join(", ")}</span>
            </div>
            <div>
              <span className="font-medium">Communication:</span>
              <span className="text-muted-foreground ml-2">{match.aiInsights.communicationStyle}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 p-0 border-2 hover:border-destructive hover:bg-destructive/10 bg-transparent"
            onClick={() => onAction("pass")}
          >
            <X className="w-6 h-6 text-destructive" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 p-0 border-2 hover:border-accent hover:bg-accent/10 ai-glow bg-transparent"
            onClick={() => onAction("superlike")}
          >
            <Star className="w-6 h-6 text-accent" />
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full w-16 h-16 p-0 border-2 hover:border-[color:var(--success)] hover:bg-[color:var(--success)]/10 bg-transparent"
            onClick={() => onAction("like")}
          >
            <Heart className="w-6 h-6 text-[color:var(--success)]" />
          </Button>
        </div>
        <div className="flex justify-center gap-8 text-xs text-muted-foreground">
          <span>Pass</span>
          <span>Super Like</span>
          <span>Like</span>
        </div>
      </CardContent>
    </Card>
  )
}

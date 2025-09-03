"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Star, Brain, Clock, Sparkles } from "lucide-react"

// Mock matches data
const MATCHES_DATA = {
  mutual: [
    {
      id: "1",
      name: "Sarah Chen",
      age: 26,
      aiPortrait: "/ai-generated-portrait-of-a-creative-woman-with-wa.jpg",
      compatibilityScore: 94,
      matchedAt: "2 hours ago",
      lastMessage: "Thanks for the coffee recommendation! 😊",
      hasUnread: true,
      connectionType: "dating",
    },
    {
      id: "2",
      name: "Marcus Johnson",
      age: 29,
      aiPortrait: "/ai-generated-portrait-of-a-friendly-tech-profess.jpg",
      compatibilityScore: 87,
      matchedAt: "1 day ago",
      lastMessage: "That hiking trail looks amazing!",
      hasUnread: false,
      connectionType: "friendship",
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      age: 24,
      aiPortrait: "/ai-generated-portrait-of-a-young-professional-wo.jpg",
      compatibilityScore: 91,
      matchedAt: "3 days ago",
      lastMessage: "Would love to join the book club!",
      hasUnread: true,
      connectionType: "social",
    },
  ],
  superLikes: [
    {
      id: "4",
      name: "David Kim",
      age: 31,
      aiPortrait: "/ai-generated-portrait-of-a-professional-asian-m.jpg",
      compatibilityScore: 89,
      matchedAt: "5 hours ago",
      connectionType: "dating",
      isSuperLike: true,
    },
    {
      id: "5",
      name: "Lisa Wang",
      age: 27,
      aiPortrait: "/ai-generated-portrait-of-a-confident-business-.jpg",
      compatibilityScore: 92,
      matchedAt: "1 day ago",
      connectionType: "networking",
      isSuperLike: true,
    },
  ],
  pending: [
    {
      id: "6",
      name: "Alex Thompson",
      age: 25,
      aiPortrait: "/ai-generated-portrait-of-a-young-creative-pers.jpg",
      compatibilityScore: 85,
      matchedAt: "2 days ago",
      connectionType: "friendship",
    },
  ],
}

export function MatchesList() {
  const [activeTab, setActiveTab] = useState("mutual")

  const getConnectionTypeColor = (type: string) => {
    switch (type) {
      case "dating":
        return "bg-accent/10 text-accent"
      case "friendship":
        return "bg-primary/10 text-primary"
      case "social":
        return "bg-[color:var(--success)]/10 text-[color:var(--success)]"
      case "networking":
        return "bg-[color:var(--warning)]/10 text-[color:var(--warning)]"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const MatchCard = ({ match, showMessage = false }: { match: any; showMessage?: boolean }) => (
    <Card className="border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={match.aiPortrait || "/placeholder.svg"}
              alt={`${match.name}'s portrait`}
              className="w-16 h-16 rounded-full object-cover"
            />
            <Badge className="absolute -top-1 -right-1 bg-accent/90 text-white text-xs px-1">
              <Sparkles className="w-2 h-2" />
            </Badge>
            {match.isSuperLike && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Star className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold truncate">
                {match.name}, {match.age}
              </h3>
              <div className="flex items-center gap-2">
                <Badge className="bg-background text-foreground border">
                  <Brain className="w-3 h-3 mr-1" />
                  {match.compatibilityScore}%
                </Badge>
                <Badge className={getConnectionTypeColor(match.connectionType)}>{match.connectionType}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Clock className="w-3 h-3" />
              <span>Matched {match.matchedAt}</span>
            </div>

            {showMessage && match.lastMessage && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground truncate flex-1 mr-2">{match.lastMessage}</p>
                {match.hasUnread && <div className="w-2 h-2 bg-accent rounded-full" />}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {showMessage ? (
              <Button size="sm" className="ai-glow">
                <MessageCircle className="w-4 h-4 mr-2" />
                Chat
              </Button>
            ) : (
              <Button size="sm" variant="outline" className="bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Like Back
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="mutual" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Mutual ({MATCHES_DATA.mutual.length})
        </TabsTrigger>
        <TabsTrigger value="superLikes" className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          Super Likes ({MATCHES_DATA.superLikes.length})
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Pending ({MATCHES_DATA.pending.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="mutual" className="space-y-4 mt-6">
        {MATCHES_DATA.mutual.map((match) => (
          <MatchCard key={match.id} match={match} showMessage={true} />
        ))}
      </TabsContent>

      <TabsContent value="superLikes" className="space-y-4 mt-6">
        {MATCHES_DATA.superLikes.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4 mt-6">
        {MATCHES_DATA.pending.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </TabsContent>
    </Tabs>
  )
}

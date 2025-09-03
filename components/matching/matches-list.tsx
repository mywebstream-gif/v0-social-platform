"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, Heart, Star, Brain, Clock, Sparkles, Loader2 } from "lucide-react"

interface Match {
  id: string
  user1_id: string
  user2_id: string
  compatibility_score: number
  status: string
  created_at: string
  match_type?: string
  profiles: {
    id: string
    display_name: string
    ai_portrait_url: string
    relationship_goals: string
  }
}

const mockMatches: Match[] = [
  {
    id: "1",
    user1_id: "user1",
    user2_id: "user2",
    compatibility_score: 92,
    status: "mutual",
    created_at: new Date().toISOString(),
    profiles: {
      id: "user2",
      display_name: "Sarah Chen",
      ai_portrait_url: "/ai-generated-portrait-of-a-creative-woman-with-wa.jpg",
      relationship_goals: "dating,friendship",
    },
  },
  {
    id: "2",
    user1_id: "user1",
    user2_id: "user3",
    compatibility_score: 88,
    status: "liked",
    match_type: "super_like",
    created_at: new Date(Date.now() - 86400000).toISOString(),
    profiles: {
      id: "user3",
      display_name: "Marcus Johnson",
      ai_portrait_url: "/ai-generated-portrait-of-a-friendly-tech-profess.jpg",
      relationship_goals: "dating,networking",
    },
  },
  {
    id: "3",
    user1_id: "user1",
    user2_id: "user4",
    compatibility_score: 85,
    status: "pending",
    created_at: new Date(Date.now() - 172800000).toISOString(),
    profiles: {
      id: "user4",
      display_name: "Emma Rodriguez",
      ai_portrait_url: "/ai-generated-portrait-of-a-young-professional-wo.jpg",
      relationship_goals: "friendship,social",
    },
  },
]

export function MatchesList() {
  const [activeTab, setActiveTab] = useState("mutual")
  const [matches, setMatches] = useState<{
    mutual: Match[]
    superLikes: Match[]
    pending: Match[]
  }>({
    mutual: [],
    superLikes: [],
    pending: [],
  })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.log("[v0] Supabase not configured, using mock data")
        // Use mock data when Supabase is not configured
        const organizedMatches = {
          mutual: mockMatches.filter((match) => match.status === "mutual"),
          superLikes: mockMatches.filter((match) => match.status === "liked" && match.match_type === "super_like"),
          pending: mockMatches.filter(
            (match) => match.status === "pending" || (match.status === "liked" && !match.match_type),
          ),
        }
        setMatches(organizedMatches)
        setIsLoading(false)
        return
      }

      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        console.log("[v0] No authenticated user, using mock data")
        const organizedMatches = {
          mutual: mockMatches.filter((match) => match.status === "mutual"),
          superLikes: mockMatches.filter((match) => match.status === "liked" && match.match_type === "super_like"),
          pending: mockMatches.filter(
            (match) => match.status === "pending" || (match.status === "liked" && !match.match_type),
          ),
        }
        setMatches(organizedMatches)
        setIsLoading(false)
        return
      }

      const { data: matchesData, error: matchesError } = await supabase
        .from("matches")
        .select(`
          *,
          profiles!matches_user2_id_fkey (
            id,
            display_name,
            ai_portrait_url,
            relationship_goals
          )
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order("created_at", { ascending: false })

      if (matchesError) {
        console.log("[v0] Database query failed, using mock data:", matchesError)
        const organizedMatches = {
          mutual: mockMatches.filter((match) => match.status === "mutual"),
          superLikes: mockMatches.filter((match) => match.status === "liked" && match.match_type === "super_like"),
          pending: mockMatches.filter(
            (match) => match.status === "pending" || (match.status === "liked" && !match.match_type),
          ),
        }
        setMatches(organizedMatches)
        setIsLoading(false)
        return
      }

      const organizedMatches = {
        mutual: matchesData?.filter((match) => match.status === "mutual") || [],
        superLikes: matchesData?.filter((match) => match.status === "liked" && match.match_type === "super_like") || [],
        pending: matchesData?.filter((match) => match.status === "pending" || match.status === "liked") || [],
      }

      setMatches(organizedMatches)
    } catch (err: any) {
      console.error("[v0] Error fetching matches:", err)
      console.log("[v0] Using mock data as fallback")
      const organizedMatches = {
        mutual: mockMatches.filter((match) => match.status === "mutual"),
        superLikes: mockMatches.filter((match) => match.status === "liked" && match.match_type === "super_like"),
        pending: mockMatches.filter(
          (match) => match.status === "pending" || (match.status === "liked" && !match.match_type),
        ),
      }
      setMatches(organizedMatches)
    } finally {
      setIsLoading(false)
    }
  }

  const handleMatchAction = (action: string, matchId: string, userName: string) => {
    console.log(`[v0] Match action: ${action} for user: ${userName}`)
    // In a real app, this would update the database
    // For now, we'll just log the action
  }

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

  const MatchCard = ({ match, showMessage = false }: { match: Match; showMessage?: boolean }) => {
    const profile = match.profiles
    const connectionType = profile.relationship_goals?.split(",")[0] || "dating"

    return (
      <Card className="border-border/50 hover:border-accent/50 transition-colors cursor-pointer">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={profile.ai_portrait_url || "/placeholder.svg?height=64&width=64&query=AI+portrait"}
                alt={`${profile.display_name}'s portrait`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <Badge className="absolute -top-1 -right-1 bg-accent/90 text-white text-xs px-1">
                <Sparkles className="w-2 h-2" />
              </Badge>
              {match.match_type === "super_like" && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Star className="w-3 h-3 text-white" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-semibold truncate">{profile.display_name}</h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-background text-foreground border">
                    <Brain className="w-3 h-3 mr-1" />
                    {Math.round(match.compatibility_score || 85)}%
                  </Badge>
                  <Badge className={getConnectionTypeColor(connectionType)}>{connectionType}</Badge>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Clock className="w-3 h-3" />
                <span>Matched {new Date(match.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              {showMessage ? (
                <Button size="sm" className="ai-glow">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-transparent"
                  onClick={() => handleMatchAction("like", match.id, profile.display_name)}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Like Back
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading matches...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" onClick={fetchMatches} className="mt-4 bg-transparent">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="mutual" className="flex items-center gap-2">
          <Heart className="w-4 h-4" />
          Mutual ({matches.mutual.length})
        </TabsTrigger>
        <TabsTrigger value="superLikes" className="flex items-center gap-2">
          <Star className="w-4 h-4" />
          Super Likes ({matches.superLikes.length})
        </TabsTrigger>
        <TabsTrigger value="pending" className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          Pending ({matches.pending.length})
        </TabsTrigger>
      </TabsList>

      <TabsContent value="mutual" className="space-y-4 mt-6">
        {matches.mutual.length > 0 ? (
          matches.mutual.map((match) => <MatchCard key={match.id} match={match} showMessage={true} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No mutual matches yet. Keep swiping to find connections!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="superLikes" className="space-y-4 mt-6">
        {matches.superLikes.length > 0 ? (
          matches.superLikes.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No super likes yet. Someone special might be waiting!</p>
          </div>
        )}
      </TabsContent>

      <TabsContent value="pending" className="space-y-4 mt-6">
        {matches.pending.length > 0 ? (
          matches.pending.map((match) => <MatchCard key={match.id} match={match} />)
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No pending matches. Start discovering new connections!</p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

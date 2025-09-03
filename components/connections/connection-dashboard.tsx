"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageCircle,
  Calendar,
  TrendingUp,
  Brain,
  Sparkles,
  Clock,
  CheckCircle,
  ArrowRight,
  Loader2,
} from "lucide-react"
import Link from "next/link"

interface Connection {
  id: string
  user1_id: string
  user2_id: string
  connection_stage: string
  connection_type: string
  progress_score: number
  last_interaction: string
  milestones: any[]
  ai_insights: any
  created_at: string
  profiles: {
    id: string
    display_name: string
    ai_portrait_url: string
    interests: string[]
  }
}

export function ConnectionDashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [connections, setConnections] = useState<Connection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchConnections()
  }, [])

  const fetchConnections = async () => {
    try {
      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("Please log in to view connections")
      }

      const { data: connectionsData, error: connectionsError } = await supabase
        .from("connections")
        .select(`
          *,
          profiles!connections_user2_id_fkey (
            id,
            display_name,
            ai_portrait_url,
            interests
          )
        `)
        .or(`user1_id.eq.${user.id},user2_id.eq.${user.id}`)
        .order("last_interaction", { ascending: false })

      if (connectionsError) {
        throw connectionsError
      }

      setConnections(connectionsData || [])
    } catch (err: any) {
      console.error("[v0] Error fetching connections:", err)
      setError(err.message || "Failed to load connections")
    } finally {
      setIsLoading(false)
    }
  }

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "handshake":
        return "bg-primary/10 text-primary"
      case "communication":
        return "bg-accent/10 text-accent"
      case "face2face":
        return "bg-[color:var(--success)]/10 text-[color:var(--success)]"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStageLabel = (stage: string) => {
    switch (stage) {
      case "handshake":
        return "Getting to Know"
      case "communication":
        return "Building Connection"
      case "face2face":
        return "Ready to Meet"
      default:
        return stage
    }
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

  const filteredConnections = connections.filter((connection) => {
    if (activeTab === "all") return true
    return connection.connection_stage === activeTab
  })

  const ConnectionCard = ({ connection }: { connection: Connection }) => {
    const profile = connection.profiles
    const sharedInterests = profile.interests?.slice(0, 3) || []
    const aiInsights = connection.ai_insights || {}

    return (
      <Card className="border-border/50 hover:border-accent/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <img
                src={profile.ai_portrait_url || "/placeholder.svg?height=64&width=64&query=AI+portrait"}
                alt={`${profile.display_name}'s portrait`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <Badge className="absolute -top-1 -right-1 bg-accent/90 text-white text-xs px-1">
                <Sparkles className="w-2 h-2" />
              </Badge>
            </div>

            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{profile.display_name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getConnectionTypeColor(connection.connection_type)}>
                      {connection.connection_type}
                    </Badge>
                    <Badge className="bg-background text-foreground border">
                      <Brain className="w-3 h-3 mr-1" />
                      {aiInsights.compatibility_score || 85}%
                    </Badge>
                  </div>
                </div>
                <Badge className={getStageColor(connection.connection_stage)}>
                  {getStageLabel(connection.connection_stage)}
                </Badge>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Stage Progress</span>
                  <span className="font-medium">{connection.progress_score}%</span>
                </div>
                <Progress value={connection.progress_score} className="h-2" />
              </div>

              {/* Milestones */}
              <div className="flex items-center gap-4">
                {["handshake", "communication", "face2face"].map((stage, index) => (
                  <div key={stage} className="flex items-center gap-2">
                    {connection.connection_stage === stage ||
                    (stage === "handshake" && ["communication", "face2face"].includes(connection.connection_stage)) ||
                    (stage === "communication" && connection.connection_stage === "face2face") ? (
                      <CheckCircle className="w-4 h-4 text-[color:var(--success)]" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />
                    )}
                    <span className="text-xs text-muted-foreground capitalize">{getStageLabel(stage)}</span>
                    {index < 2 && <ArrowRight className="w-3 h-3 text-muted-foreground" />}
                  </div>
                ))}
              </div>

              {/* AI Recommendation */}
              <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-3 border border-accent/20">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">
                      Next Step: {aiInsights.next_milestone || "Continue building connection"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {aiInsights.recommendation ||
                        "Keep engaging in meaningful conversations to strengthen your bond."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Shared Interests */}
              {sharedInterests.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {sharedInterests.map((interest: string) => (
                    <Badge key={interest} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>Connected {new Date(connection.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-3 h-3" />
                    <span>Last chat {new Date(connection.last_interaction).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/chat/${connection.id}`}>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </Link>
                  <Link href={`/connections/${connection.id}`}>
                    <Button size="sm" className="ai-glow">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      View Progress
                    </Button>
                  </Link>
                </div>
              </div>
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
        <span>Loading connections...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>{error}</p>
        <Button variant="outline" onClick={fetchConnections} className="mt-4 bg-transparent">
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Connections</TabsTrigger>
          <TabsTrigger value="handshake">Getting to Know</TabsTrigger>
          <TabsTrigger value="communication">Building Connection</TabsTrigger>
          <TabsTrigger value="face2face">Ready to Meet</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          {filteredConnections.length > 0 ? (
            filteredConnections.map((connection) => <ConnectionCard key={connection.id} connection={connection} />)
          ) : (
            <Card className="border-border/50">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground">
                  <Calendar className="w-8 h-8 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No connections in this stage</h3>
                  <p>Start discovering new matches to build meaningful connections!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

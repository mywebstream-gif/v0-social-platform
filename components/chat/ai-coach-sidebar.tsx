"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Heart, MessageCircle, TrendingUp, Lightbulb, Target, Star } from "lucide-react"

interface AICoachSidebarProps {
  chatId: string
}

export function AICoachSidebar({ chatId }: AICoachSidebarProps) {
  const [activeTab, setActiveTab] = useState("suggestions")

  const conversationInsights = {
    stage: "Building Connection",
    compatibility: 94,
    engagement: "High",
    responseTime: "Quick",
    topics: ["Photography", "Travel", "Coffee", "Hiking"],
    mood: "Positive & Enthusiastic",
  }

  const suggestions = [
    {
      type: "conversation",
      title: "Ask about her photography gear",
      description: "She mentioned taking photos - show interest in her equipment or techniques",
      confidence: 92,
    },
    {
      type: "meetup",
      title: "Suggest a coffee shop visit",
      description: "You both love coffee - propose meeting at the place you recommended",
      confidence: 88,
    },
    {
      type: "shared-interest",
      title: "Share a hiking photo",
      description: "Connect your hiking interest with her photography passion",
      confidence: 85,
    },
  ]

  const relationshipGoals = [
    {
      goal: "Build deeper connection",
      progress: 75,
      nextStep: "Share a personal story or ask about her values",
    },
    {
      goal: "Plan first meetup",
      progress: 45,
      nextStep: "Suggest a specific activity you both enjoy",
    },
    {
      goal: "Establish communication rhythm",
      progress: 90,
      nextStep: "Continue current messaging frequency",
    },
  ]

  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case "conversation":
        return MessageCircle
      case "meetup":
        return Heart
      case "shared-interest":
        return Star
      default:
        return Lightbulb
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2 mb-2">
          <Brain className="w-5 h-5 text-accent" />
          <h2 className="font-semibold">AI Relationship Coach</h2>
        </div>
        <p className="text-sm text-muted-foreground">Real-time guidance for meaningful connections</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 m-4">
            <TabsTrigger value="suggestions" className="text-xs">
              Suggestions
            </TabsTrigger>
            <TabsTrigger value="insights" className="text-xs">
              Insights
            </TabsTrigger>
            <TabsTrigger value="goals" className="text-xs">
              Goals
            </TabsTrigger>
          </TabsList>

          <div className="px-4">
            <TabsContent value="suggestions" className="space-y-4 mt-0">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Smart Suggestions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {suggestions.map((suggestion, index) => {
                    const IconComponent = getSuggestionIcon(suggestion.type)
                    return (
                      <div key={index} className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-start gap-2 mb-2">
                          <IconComponent className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium">{suggestion.title}</h4>
                            <p className="text-xs text-muted-foreground mt-1">{suggestion.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.confidence}% confidence
                          </Badge>
                          <Button size="sm" variant="outline" className="text-xs h-6 bg-transparent">
                            Use This
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-r from-accent/5 to-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="w-4 h-4 text-accent" />
                    <span className="text-sm font-medium">Quick Tip</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Sarah responds well to specific questions about her interests. Try asking about her favorite
                    photography locations or coffee brewing methods.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="insights" className="space-y-4 mt-0">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Conversation Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold text-accent">{conversationInsights.compatibility}%</div>
                      <div className="text-xs text-muted-foreground">Compatibility</div>
                    </div>
                    <div className="text-center p-2 bg-muted/50 rounded">
                      <div className="text-lg font-bold">{conversationInsights.engagement}</div>
                      <div className="text-xs text-muted-foreground">Engagement</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Connection Stage:</span>
                      <Badge className="bg-accent/10 text-accent">{conversationInsights.stage}</Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Response Time:</span>
                      <span className="text-muted-foreground">{conversationInsights.responseTime}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Conversation Mood:</span>
                      <span className="text-muted-foreground">{conversationInsights.mood}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Shared Topics</h4>
                    <div className="flex flex-wrap gap-1">
                      {conversationInsights.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4 mt-0">
              <Card className="border-border/50">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Target className="w-4 h-4 text-accent" />
                    Relationship Goals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relationshipGoals.map((goal, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium">{goal.goal}</h4>
                        <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-accent h-2 rounded-full transition-all"
                          style={{ width: `${goal.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">{goal.nextStep}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-r from-[color:var(--success)]/5 to-accent/5">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-4 h-4 text-[color:var(--success)]" />
                    <span className="text-sm font-medium">Connection Milestone</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    You're ready to suggest meeting in person! The conversation flow and mutual interest indicate a
                    strong foundation for a face-to-face connection.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

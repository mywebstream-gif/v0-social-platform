"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  MessageCircle,
  Calendar,
  TrendingUp,
  CheckCircle,
  Clock,
  Sparkles,
  Target,
  Star,
  ArrowRight,
} from "lucide-react"

interface ConnectionDetailProps {
  connectionId: string
}

// Mock detailed connection data
const CONNECTION_DETAIL = {
  id: "1",
  name: "Sarah Chen",
  age: 26,
  aiPortrait: "/ai-generated-portrait-of-a-creative-woman-with-wa.jpg",
  connectionType: "dating",
  currentStage: "communication",
  stageProgress: 75,
  compatibilityScore: 94,
  connectedAt: "2024-01-15",
  lastInteraction: "2 hours ago",

  stageHistory: [
    {
      stage: "handshake",
      startedAt: "2024-01-15",
      completedAt: "2024-01-17",
      duration: "2 days",
      keyMoments: ["First message exchanged", "Shared photography interests", "Established communication rhythm"],
      aiInsights: "Strong initial connection with shared creative interests",
    },
    {
      stage: "communication",
      startedAt: "2024-01-17",
      completedAt: null,
      duration: "3 days (ongoing)",
      keyMoments: ["Deep conversation about travel", "Shared personal stories", "Discussed coffee preferences"],
      aiInsights: "Building emotional connection through meaningful conversations",
    },
  ],

  milestones: [
    {
      id: 1,
      title: "First Message",
      completed: true,
      completedAt: "2024-01-15",
      description: "Initial contact established",
    },
    {
      id: 2,
      title: "Shared Interest Discovery",
      completed: true,
      completedAt: "2024-01-15",
      description: "Found common ground in photography",
    },
    {
      id: 3,
      title: "Personal Story Sharing",
      completed: true,
      completedAt: "2024-01-17",
      description: "Opened up about personal experiences",
    },
    {
      id: 4,
      title: "Daily Communication",
      completed: true,
      completedAt: "2024-01-18",
      description: "Established regular messaging pattern",
    },
    {
      id: 5,
      title: "Future Plans Discussion",
      completed: false,
      progress: 60,
      description: "Talk about meeting in person",
    },
    {
      id: 6,
      title: "First Date Planned",
      completed: false,
      progress: 0,
      description: "Schedule face-to-face meeting",
    },
  ],

  aiAnalysis: {
    connectionStrength: 94,
    communicationStyle: "Open and engaging",
    responsePattern: "Consistent and timely",
    emotionalConnection: 87,
    sharedValues: 92,
    nextStepConfidence: 89,
    recommendations: [
      "Suggest a coffee date at the place you both discussed",
      "Share a specific photography location you'd like to visit together",
      "Ask about her weekend plans to find a meeting opportunity",
    ],
  },

  conversationTopics: [
    { topic: "Photography", frequency: 12, sentiment: "positive" },
    { topic: "Travel", frequency: 8, sentiment: "enthusiastic" },
    { topic: "Coffee", frequency: 6, sentiment: "positive" },
    { topic: "Work", frequency: 4, sentiment: "neutral" },
    { topic: "Family", frequency: 3, sentiment: "warm" },
  ],
}

export function ConnectionDetail({ connectionId }: ConnectionDetailProps) {
  const [activeTab, setActiveTab] = useState("progress")
  const connection = CONNECTION_DETAIL

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "handshake":
        return "text-primary"
      case "communication":
        return "text-accent"
      case "face2face":
        return "text-[color:var(--success)]"
      default:
        return "text-muted-foreground"
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

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
      case "enthusiastic":
        return "text-[color:var(--success)]"
      case "warm":
        return "text-accent"
      case "neutral":
        return "text-muted-foreground"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <Card className="border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={connection.aiPortrait || "/placeholder.svg"}
                alt={`${connection.name}'s portrait`}
                className="w-24 h-24 rounded-full object-cover"
              />
              <Badge className="absolute -top-1 -right-1 bg-accent/90 text-white">
                <Sparkles className="w-3 h-3" />
              </Badge>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold">
                    {connection.name}, {connection.age}
                  </h1>
                  <Badge className="bg-accent/10 text-accent mt-1">{connection.connectionType}</Badge>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-accent">{connection.compatibilityScore}%</div>
                  <div className="text-sm text-muted-foreground">Compatibility</div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <Badge className={`${getStageColor(connection.currentStage)} bg-background border`}>
                  {getStageLabel(connection.currentStage)}
                </Badge>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Connected {new Date(connection.connectedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MessageCircle className="w-4 h-4" />
                  <span>Last interaction {connection.lastInteraction}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Current Stage Progress</span>
                  <span className="font-medium">{connection.stageProgress}%</span>
                </div>
                <Progress value={connection.stageProgress} className="h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="milestones">Milestones</TabsTrigger>
          <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="topics">Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="progress" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-accent" />
                Stage Journey
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {connection.stageHistory.map((stage, index) => (
                <div key={stage.stage} className="relative">
                  {index < connection.stageHistory.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-16 bg-border" />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        stage.completedAt
                          ? "border-[color:var(--success)] bg-[color:var(--success)]/10"
                          : "border-accent bg-accent/10"
                      }`}
                    >
                      {stage.completedAt ? (
                        <CheckCircle className="w-6 h-6 text-[color:var(--success)]" />
                      ) : (
                        <Clock className="w-6 h-6 text-accent" />
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg">{getStageLabel(stage.stage)}</h3>
                        <Badge variant={stage.completedAt ? "default" : "secondary"}>
                          {stage.completedAt ? "Completed" : "In Progress"}
                        </Badge>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        Started: {new Date(stage.startedAt).toLocaleDateString()}
                        {stage.completedAt && <> • Completed: {new Date(stage.completedAt).toLocaleDateString()}</>}
                        <> • Duration: {stage.duration}</>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">Key Moments:</h4>
                        <ul className="space-y-1">
                          {stage.keyMoments.map((moment, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                              {moment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg p-3 border border-accent/20">
                        <div className="flex items-start gap-2">
                          <Brain className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-xs font-medium text-accent mb-1">AI Insight</p>
                            <p className="text-xs text-muted-foreground">{stage.aiInsights}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="milestones" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-accent" />
                Connection Milestones
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connection.milestones.map((milestone, index) => (
                <div key={milestone.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      milestone.completed
                        ? "bg-[color:var(--success)] text-white"
                        : milestone.progress
                          ? "bg-accent/20 text-accent"
                          : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {milestone.completed ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-xs font-bold">{index + 1}</span>
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium">{milestone.title}</h3>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    {milestone.completedAt && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Completed: {new Date(milestone.completedAt).toLocaleDateString()}
                      </p>
                    )}
                    {milestone.progress && !milestone.completed && (
                      <div className="mt-2">
                        <Progress value={milestone.progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{milestone.progress}% complete</p>
                      </div>
                    )}
                  </div>

                  {milestone.completed && (
                    <Badge className="bg-[color:var(--success)]/10 text-[color:var(--success)]">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Done
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-accent" />
                  AI Connection Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-2xl font-bold text-accent">{connection.aiAnalysis.connectionStrength}%</div>
                    <div className="text-xs text-muted-foreground">Connection Strength</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-2xl font-bold text-accent">{connection.aiAnalysis.emotionalConnection}%</div>
                    <div className="text-xs text-muted-foreground">Emotional Bond</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-2xl font-bold text-accent">{connection.aiAnalysis.sharedValues}%</div>
                    <div className="text-xs text-muted-foreground">Shared Values</div>
                  </div>
                  <div className="text-center p-3 bg-muted/50 rounded">
                    <div className="text-2xl font-bold text-accent">{connection.aiAnalysis.nextStepConfidence}%</div>
                    <div className="text-xs text-muted-foreground">Next Step Confidence</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Communication Style:</span>
                    <span className="text-muted-foreground">{connection.aiAnalysis.communicationStyle}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Response Pattern:</span>
                    <span className="text-muted-foreground">{connection.aiAnalysis.responsePattern}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-accent" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {connection.aiAnalysis.recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/20"
                  >
                    <div className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-muted-foreground">{rec}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="topics" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                Conversation Topics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {connection.conversationTopics.map((topic, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-accent">{topic.frequency}</span>
                    </div>
                    <div>
                      <h3 className="font-medium">{topic.topic}</h3>
                      <p className="text-sm text-muted-foreground">{topic.frequency} mentions</p>
                    </div>
                  </div>
                  <Badge className={`${getSentimentColor(topic.sentiment)} bg-background border`}>
                    {topic.sentiment}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <Button variant="outline" className="bg-transparent">
          <MessageCircle className="w-4 h-4 mr-2" />
          Continue Chat
        </Button>
        <Button className="ai-glow">
          <Calendar className="w-4 h-4 mr-2" />
          Plan Meetup
        </Button>
      </div>
    </div>
  )
}

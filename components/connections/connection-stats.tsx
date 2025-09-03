"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, Calendar, TrendingUp, Heart, Handshake } from "lucide-react"

export function ConnectionStats() {
  const stats = {
    totalConnections: 24,
    activeChats: 12,
    scheduledMeetups: 3,
    thisWeekProgress: 8,
    stageDistribution: {
      handshake: 8,
      communication: 12,
      face2face: 4,
    },
    connectionTypes: {
      dating: 10,
      friendship: 8,
      social: 4,
      networking: 2,
    },
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Total Connections */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Connections</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalConnections}</div>
          <p className="text-xs text-muted-foreground">+3 from last week</p>
        </CardContent>
      </Card>

      {/* Active Chats */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Conversations</CardTitle>
          <MessageCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeChats}</div>
          <p className="text-xs text-muted-foreground">Ongoing dialogues</p>
        </CardContent>
      </Card>

      {/* Scheduled Meetups */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Scheduled Meetups</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.scheduledMeetups}</div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      {/* Weekly Progress */}
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Weekly Progress</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.thisWeekProgress}</div>
          <p className="text-xs text-muted-foreground">Stage advancements</p>
        </CardContent>
      </Card>

      {/* Connection Stages Overview */}
      <Card className="border-border/50 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Handshake className="w-4 h-4" />
            Connection Stages
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-primary rounded-full" />
                <span className="text-sm">Getting to Know</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.stageDistribution.handshake}</span>
                <Progress value={(stats.stageDistribution.handshake / stats.totalConnections) * 100} className="w-20" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-accent rounded-full" />
                <span className="text-sm">Building Connection</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.stageDistribution.communication}</span>
                <Progress
                  value={(stats.stageDistribution.communication / stats.totalConnections) * 100}
                  className="w-20"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[color:var(--success)] rounded-full" />
                <span className="text-sm">Ready to Meet</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{stats.stageDistribution.face2face}</span>
                <Progress value={(stats.stageDistribution.face2face / stats.totalConnections) * 100} className="w-20" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Types */}
      <Card className="border-border/50 md:col-span-2">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Connection Types
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-accent/10 text-accent">Dating: {stats.connectionTypes.dating}</Badge>
            <Badge className="bg-primary/10 text-primary">Friendship: {stats.connectionTypes.friendship}</Badge>
            <Badge className="bg-[color:var(--success)]/10 text-[color:var(--success)]">
              Social: {stats.connectionTypes.social}
            </Badge>
            <Badge className="bg-[color:var(--warning)]/10 text-[color:var(--warning)]">
              Networking: {stats.connectionTypes.networking}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

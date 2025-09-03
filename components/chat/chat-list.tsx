"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MessageCircle, Brain, Clock, Sparkles } from "lucide-react"
import Link from "next/link"

// Mock chat data
const CHATS_DATA = [
  {
    id: "1",
    name: "Sarah Chen",
    aiPortrait: "/ai-generated-portrait-of-a-creative-woman-with-wa.jpg",
    lastMessage: "Thanks for the coffee recommendation! The place you mentioned has amazing pastries too 😊",
    timestamp: "2 min ago",
    unreadCount: 2,
    isOnline: true,
    connectionStage: "communication",
    aiCoachSuggestion: "Ask about her favorite coffee brewing method to deepen the conversation",
    compatibilityScore: 94,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    aiPortrait: "/ai-generated-portrait-of-a-friendly-tech-profess.jpg",
    lastMessage: "That hiking trail looks amazing! When are you planning to go?",
    timestamp: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
    connectionStage: "handshake",
    aiCoachSuggestion: "Share a specific hiking experience to build connection",
    compatibilityScore: 87,
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    aiPortrait: "/ai-generated-portrait-of-a-young-professional-wo.jpg",
    lastMessage: "Would love to join the book club! What's the current read?",
    timestamp: "3 hours ago",
    unreadCount: 1,
    isOnline: true,
    connectionStage: "face2face",
    aiCoachSuggestion: "Suggest meeting at a cozy bookstore cafe for your first meetup",
    compatibilityScore: 91,
  },
  {
    id: "4",
    name: "David Kim",
    aiPortrait: "/ai-generated-portrait-of-a-professional-asian-m.jpg",
    lastMessage: "The startup event sounds interesting. Are you presenting?",
    timestamp: "1 day ago",
    unreadCount: 0,
    isOnline: false,
    connectionStage: "communication",
    aiCoachSuggestion: "Share your entrepreneurial interests to find common ground",
    compatibilityScore: 89,
  },
]

export function ChatList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedChat, setSelectedChat] = useState<string | null>(null)

  const filteredChats = CHATS_DATA.filter((chat) => chat.name.toLowerCase().includes(searchQuery.toLowerCase()))

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

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search conversations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Chat List */}
      <div className="space-y-4">
        {filteredChats.map((chat) => (
          <Card
            key={chat.id}
            className={`border-border/50 hover:border-accent/50 transition-colors cursor-pointer ${
              selectedChat === chat.id ? "border-accent bg-accent/5" : ""
            }`}
            onClick={() => setSelectedChat(chat.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={chat.aiPortrait || "/placeholder.svg"}
                    alt={`${chat.name}'s portrait`}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <Badge className="absolute -top-1 -right-1 bg-accent/90 text-white text-xs px-1">
                    <Sparkles className="w-2 h-2" />
                  </Badge>
                  {chat.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[color:var(--success)] border-2 border-background rounded-full" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold truncate">{chat.name}</h3>
                      <Badge className="bg-background text-foreground border text-xs">
                        <Brain className="w-2 h-2 mr-1" />
                        {chat.compatibilityScore}%
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStageColor(chat.connectionStage)}>
                        {getStageLabel(chat.connectionStage)}
                      </Badge>
                      {chat.unreadCount > 0 && (
                        <Badge className="bg-accent text-white min-w-5 h-5 text-xs flex items-center justify-center">
                          {chat.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground truncate mb-2">{chat.lastMessage}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{chat.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-accent">
                      <Brain className="w-3 h-3" />
                      <span>AI Coach Available</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Link href={`/chat/${chat.id}`}>
                    <Button size="sm" className="ai-glow">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Open Chat
                    </Button>
                  </Link>
                </div>
              </div>

              {/* AI Coach Preview */}
              <div className="mt-4 p-3 bg-gradient-to-r from-accent/5 to-primary/5 rounded-lg border border-accent/20">
                <div className="flex items-start gap-2">
                  <Brain className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-accent mb-1">AI Coach Suggestion:</p>
                    <p className="text-xs text-muted-foreground">{chat.aiCoachSuggestion}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

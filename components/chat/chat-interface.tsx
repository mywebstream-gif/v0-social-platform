"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Smile, Paperclip, Brain } from "lucide-react"

interface Message {
  id: string
  type: "user" | "other" | "ai-suggestion" | "system"
  content: string
  timestamp: string
  isRead?: boolean
  sender?: string
}

// Mock messages data
const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    type: "system",
    content: "You matched with Sarah! Your AI coach suggests starting with a friendly greeting about her interests.",
    timestamp: "2 days ago",
  },
  {
    id: "2",
    type: "user",
    content: "Hi Sarah! I noticed you're into photography. That sunset shot on your profile is absolutely stunning!",
    timestamp: "2 days ago",
  },
  {
    id: "3",
    type: "other",
    content:
      "Thank you so much! I actually took that during a weekend trip to Half Moon Bay. Do you enjoy photography too?",
    timestamp: "2 days ago",
    isRead: true,
    sender: "Sarah",
  },
  {
    id: "4",
    type: "ai-suggestion",
    content:
      "Great opening! Consider sharing a specific photography experience or asking about her favorite photography spots.",
    timestamp: "2 days ago",
  },
  {
    id: "5",
    type: "user",
    content:
      "I'm more of an amateur, but I love capturing moments during my hikes. Half Moon Bay sounds amazing - I've been wanting to explore more of the coast for photography!",
    timestamp: "2 days ago",
  },
  {
    id: "6",
    type: "other",
    content:
      "That's so cool! Hiking photography can be really rewarding. Have you been to any good spots around the Bay Area?",
    timestamp: "1 day ago",
    isRead: true,
    sender: "Sarah",
  },
  {
    id: "7",
    type: "other",
    content: "Thanks for the coffee recommendation! The place you mentioned has amazing pastries too 😊",
    timestamp: "2 min ago",
    isRead: false,
    sender: "Sarah",
  },
]

interface ChatInterfaceProps {
  chatId: string
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      type: "user",
      content: newMessage,
      timestamp: "now",
    }

    setMessages((prev) => [...prev, message])
    setNewMessage("")

    // Simulate typing indicator
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Add AI suggestion after user message
      const aiSuggestion: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai-suggestion",
        content: "Great message! Consider asking a follow-up question to keep the conversation flowing naturally.",
        timestamp: "now",
      }
      setMessages((prev) => [...prev, aiSuggestion])
    }, 2000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const MessageBubble = ({ message }: { message: Message }) => {
    if (message.type === "system") {
      return (
        <div className="flex justify-center my-4">
          <Badge variant="secondary" className="px-3 py-1">
            {message.content}
          </Badge>
        </div>
      )
    }

    if (message.type === "ai-suggestion") {
      return (
        <div className="flex justify-center my-4">
          <Card className="max-w-md border-accent/20 bg-gradient-to-r from-accent/5 to-primary/5">
            <CardContent className="p-3">
              <div className="flex items-start gap-2">
                <Brain className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs font-medium text-accent mb-1">AI Coach</p>
                  <p className="text-xs text-muted-foreground">{message.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    const isUser = message.type === "user"
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div className={`max-w-xs lg:max-w-md ${isUser ? "order-2" : "order-1"}`}>
          <div
            className={`px-4 py-2 rounded-2xl ${isUser ? "bg-accent text-white ml-auto" : "bg-muted text-foreground"}`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div
            className={`flex items-center gap-1 mt-1 text-xs text-muted-foreground ${
              isUser ? "justify-end" : "justify-start"
            }`}
          >
            <span>{message.timestamp}</span>
            {isUser && message.isRead !== false && (
              <div className="flex">
                <div className="w-1 h-1 bg-accent rounded-full mr-0.5" />
                <div className="w-1 h-1 bg-accent rounded-full" />
              </div>
            )}
          </div>
        </div>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ml-2 order-2">
            <img
              src="/ai-generated-portrait-of-a-creative-woman-with-wa.jpg"
              alt="Sarah"
              className="w-8 h-8 rounded-full object-cover"
            />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <img
                  src="/ai-generated-portrait-of-a-creative-woman-with-wa.jpg"
                  alt="Sarah"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="bg-muted px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  />
                  <div
                    className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="border-t border-border/50 p-4">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 bg-muted rounded-2xl px-4 py-2">
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              />
              <Button variant="ghost" size="sm" className="p-1 h-auto">
                <Smile className="w-4 h-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full w-10 h-10 p-0 ai-glow"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

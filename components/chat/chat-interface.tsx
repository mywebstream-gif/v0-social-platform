"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Send, Smile, Paperclip, Brain, Loader2 } from "lucide-react"

interface Message {
  id: string
  content: string
  message_type: "text" | "ai_suggestion" | "system"
  sender_id: string
  created_at: string
  ai_analysis?: any
}

interface ChatInterfaceProps {
  chatId: string
}

export function ChatInterface({ chatId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentUserId, setCurrentUserId] = useState<string | null>(null)
  const [error, setError] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    fetchMessages()
  }, [chatId])

  const fetchMessages = async () => {
    try {
      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("Please log in to view messages")
      }

      setCurrentUserId(user.id)

      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*")
        .eq("connection_id", chatId)
        .order("created_at", { ascending: true })

      if (messagesError) {
        throw messagesError
      }

      setMessages(messagesData || [])
    } catch (err: any) {
      console.error("[v0] Error fetching messages:", err)
      setError(err.message || "Failed to load messages")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !currentUserId) return

    try {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("messages")
        .insert({
          connection_id: chatId,
          sender_id: currentUserId,
          content: newMessage,
          message_type: "text",
        })
        .select()
        .single()

      if (error) {
        throw error
      }

      setMessages((prev) => [...prev, data])
      setNewMessage("")

      await supabase.from("connections").update({ last_interaction: new Date().toISOString() }).eq("id", chatId)

      // Simulate AI suggestion after user message
      setTimeout(async () => {
        const aiSuggestion = {
          connection_id: chatId,
          sender_id: currentUserId,
          content: "Great message! Consider asking a follow-up question to keep the conversation flowing naturally.",
          message_type: "ai_suggestion" as const,
        }

        const { data: aiData } = await supabase.from("messages").insert(aiSuggestion).select().single()

        if (aiData) {
          setMessages((prev) => [...prev, aiData])
        }
      }, 2000)
    } catch (err: any) {
      console.error("[v0] Error sending message:", err)
      setError("Failed to send message")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const MessageBubble = ({ message }: { message: Message }) => {
    if (message.message_type === "system") {
      return (
        <div className="flex justify-center my-4">
          <Badge variant="secondary" className="px-3 py-1">
            {message.content}
          </Badge>
        </div>
      )
    }

    if (message.message_type === "ai_suggestion") {
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

    const isUser = message.sender_id === currentUserId
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
            <span>{new Date(message.created_at).toLocaleTimeString()}</span>
            {isUser && (
              <div className="flex">
                <div className="w-1 h-1 bg-accent rounded-full mr-0.5" />
                <div className="w-1 h-1 bg-accent rounded-full" />
              </div>
            )}
          </div>
        </div>
        {!isUser && (
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center ml-2 order-2">
            <img src="/ai-portrait.jpg" alt="Contact" className="w-8 h-8 rounded-full object-cover" />
          </div>
        )}
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-6 h-6 animate-spin mr-2" />
        <span>Loading messages...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground">
        <p>{error}</p>
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
                <img src="/ai-portrait.jpg" alt="Contact" className="w-8 h-8 rounded-full object-cover" />
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

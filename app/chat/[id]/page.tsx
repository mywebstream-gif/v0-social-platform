import { ChatInterface } from "@/components/chat/chat-interface"
import { AICoachSidebar } from "@/components/chat/ai-coach-sidebar"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, MoreVertical } from "lucide-react"
import Link from "next/link"

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/chat">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="/ai-generated-portrait-of-a-creative-woman-with-wa.jpg"
                  alt="Sarah Chen's portrait"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[color:var(--success)] border-2 border-background rounded-full" />
              </div>
              <div>
                <h1 className="font-semibold">Sarah Chen</h1>
                <p className="text-xs text-muted-foreground">Online • Building Connection</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-accent font-medium">AI Coach Active</span>
            </div>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Chat Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Interface */}
        <div className="flex-1 flex flex-col">
          <ChatInterface chatId={params.id} />
        </div>

        {/* AI Coach Sidebar */}
        <div className="w-80 border-l border-border/50 bg-background/50">
          <AICoachSidebar chatId={params.id} />
        </div>
      </div>
    </div>
  )
}

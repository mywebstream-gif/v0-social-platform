import { ConnectionDashboard } from "@/components/connections/connection-dashboard"
import { ConnectionStats } from "@/components/connections/connection-stats"
import { Button } from "@/components/ui/button"
import { Brain, Users, TrendingUp, Settings } from "lucide-react"
import Link from "next/link"

export default function ConnectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ConnectAI
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/discover" className="text-muted-foreground hover:text-foreground transition-colors">
              Discover
            </Link>
            <Link href="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
              Matches
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </Link>
            <Link href="/connections" className="text-foreground font-medium">
              Connections
            </Link>
            <Link href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
              Profile
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Connection Journey</h1>
          <p className="text-muted-foreground">
            Track your relationships as they grow from first contact to meaningful connections
          </p>
        </div>

        {/* Connection Stats */}
        <ConnectionStats />

        {/* Connection Dashboard */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              <h2 className="text-xl font-semibold">Your Connections</h2>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Sorted by progress</span>
            </div>
          </div>
          <ConnectionDashboard />
        </div>
      </div>
    </div>
  )
}

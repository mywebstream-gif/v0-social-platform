import { DiscoverInterface } from "@/components/matching/discover-interface"
import { MatchFilters } from "@/components/matching/match-filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Settings, Heart, Users } from "lucide-react"
import Link from "next/link"

export default function DiscoverPage() {
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
            <Link href="/discover" className="text-foreground font-medium">
              Discover
            </Link>
            <Link href="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
              Matches
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              Chat
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
          <h1 className="text-3xl font-bold mb-2">Discover Connections</h1>
          <p className="text-muted-foreground">AI-powered matches tailored just for you</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Heart className="w-8 h-8 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">New Matches Today</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Brain className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">94%</div>
              <div className="text-sm text-muted-foreground">AI Compatibility Score</div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-[color:var(--success)] mx-auto mb-2" />
              <div className="text-2xl font-bold">156</div>
              <div className="text-sm text-muted-foreground">Active Connections</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Match Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <MatchFilters />
              </CardContent>
            </Card>
          </div>

          {/* Main Discovery Interface */}
          <div className="lg:col-span-3">
            <DiscoverInterface />
          </div>
        </div>
      </div>
    </div>
  )
}

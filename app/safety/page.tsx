import { SafetyCenter } from "@/components/safety/safety-center"
import { SafetyStats } from "@/components/safety/safety-stats"
import { Button } from "@/components/ui/button"
import { Brain, Shield, AlertTriangle, Settings } from "lucide-react"
import Link from "next/link"

export default function SafetyPage() {
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
            <Link href="/matches" className="text-muted-foreground hover:text-foreground transition-colors">
              Matches
            </Link>
            <Link href="/chat" className="text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </Link>
            <Link href="/connections" className="text-muted-foreground hover:text-foreground transition-colors">
              Connections
            </Link>
            <Link href="/safety" className="text-foreground font-medium">
              Safety
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/safety/settings">
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[color:var(--trust-indicator)]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Safety Center</h1>
          <p className="text-muted-foreground">
            Your safety is our priority. Access tools, resources, and support to stay secure on ConnectAI.
          </p>
        </div>

        {/* Safety Stats */}
        <SafetyStats />

        {/* Emergency Alert */}
        <div className="bg-gradient-to-r from-destructive/10 to-[color:var(--warning)]/10 border border-destructive/20 rounded-lg p-4 mb-8">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-destructive">Need Immediate Help?</h3>
              <p className="text-sm text-muted-foreground">
                If you're in immediate danger, contact local emergency services. For urgent safety concerns on our
                platform, use our emergency reporting feature.
              </p>
            </div>
            <Button variant="destructive" size="sm">
              Emergency Report
            </Button>
          </div>
        </div>

        {/* Safety Center */}
        <SafetyCenter />
      </div>
    </div>
  )
}

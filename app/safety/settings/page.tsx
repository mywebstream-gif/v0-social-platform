import { SafetySettings } from "@/components/safety/safety-settings"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, Shield } from "lucide-react"
import Link from "next/link"

export default function SafetySettingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/safety">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Safety
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ConnectAI
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-8 h-8 text-[color:var(--trust-indicator)]" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Safety & Privacy Settings</h1>
          <p className="text-muted-foreground">
            Customize your safety preferences and control who can interact with you on ConnectAI.
          </p>
        </div>

        {/* Safety Settings */}
        <SafetySettings />
      </div>
    </div>
  )
}

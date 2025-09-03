import { ProfileView } from "@/components/profile/profile-view"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Settings, Shield, Crown, Edit } from "lucide-react"
import Link from "next/link"

export default function ProfilePage() {
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
          <div className="flex items-center gap-3">
            <Link href="/profile/edit">
              <Button variant="outline" size="sm">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Profile Status */}
        <Card className="mb-8 border-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[color:var(--trust-indicator)]" />
                Profile Status
              </CardTitle>
              <Badge variant="secondary" className="bg-[color:var(--success)]/10 text-[color:var(--success)]">
                <Crown className="w-3 h-3 mr-1" />
                Advanced Plan
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-[color:var(--success)]">Verified</div>
                <div className="text-sm text-muted-foreground">KYC Status</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">92%</div>
                <div className="text-sm text-muted-foreground">Profile Completeness</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.8</div>
                <div className="text-sm text-muted-foreground">AI Compatibility Score</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile View */}
        <ProfileView />
      </div>
    </div>
  )
}

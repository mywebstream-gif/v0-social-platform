import { ProfileSetupForm } from "@/components/profile/profile-setup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles } from "lucide-react"

export default function ProfileSetupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="container mx-auto max-w-2xl py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ConnectAI
            </span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
          <p className="text-muted-foreground">Help our AI understand you better for perfect matches</p>
          <Progress value={33} className="mt-4 max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">Step 1 of 3: Basic Information</p>
        </div>

        {/* Profile Setup Form */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              Tell Us About Yourself
            </CardTitle>
            <CardDescription>
              This information helps our AI create your unique profile and find compatible matches.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSetupForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

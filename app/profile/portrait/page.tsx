import { AIPortraitGenerator } from "@/components/profile/ai-portrait-generator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Sparkles } from "lucide-react"

export default function AIPortraitPage() {
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
          <h1 className="text-3xl font-bold mb-2">Create Your AI Portrait</h1>
          <p className="text-muted-foreground">
            Our AI will generate a beautiful, representative portrait for your profile
          </p>
          <Progress value={66} className="mt-4 max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">Step 2 of 3: AI Portrait Generation</p>
        </div>

        {/* AI Portrait Generator */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              AI Portrait Studio
            </CardTitle>
            <CardDescription>
              No real photos needed. Our AI creates a unique portrait that represents your personality and style.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AIPortraitGenerator />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

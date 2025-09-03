import { SubscriptionPlans } from "@/components/profile/subscription-plans"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Crown } from "lucide-react"

export default function SubscriptionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <div className="container mx-auto max-w-4xl py-8">
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
          <h1 className="text-3xl font-bold mb-2">Choose Your Plan</h1>
          <p className="text-muted-foreground">Unlock the full potential of AI-powered connections</p>
          <Progress value={100} className="mt-4 max-w-md mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">Step 3 of 3: Subscription Selection</p>
        </div>

        {/* Subscription Plans */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-accent" />
              Subscription Plans
            </CardTitle>
            <CardDescription>
              Choose the plan that best fits your connection goals. You can upgrade or downgrade anytime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SubscriptionPlans />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Sparkles, Zap, ArrowRight } from "lucide-react"

const PLANS = [
  {
    id: "standard",
    name: "Standard",
    price: "Free",
    description: "Perfect for getting started with AI connections",
    icon: Sparkles,
    features: [
      "5 AI matches per day",
      "Basic AI coach guidance",
      "Standard profile features",
      "Basic chat functionality",
      "Community safety features",
    ],
    limitations: ["Limited daily matches", "Basic AI insights"],
  },
  {
    id: "advanced",
    name: "Advanced",
    price: "$19.99/month",
    description: "Enhanced AI features for serious connections",
    icon: Zap,
    popular: true,
    features: [
      "Unlimited AI matches",
      "Advanced AI coach with insights",
      "Priority profile visibility",
      "Enhanced chat features",
      "Advanced compatibility analysis",
      "Read receipts & typing indicators",
      "Profile boost (2x per month)",
    ],
    limitations: [],
  },
  {
    id: "premium",
    name: "Premium",
    price: "$39.99/month",
    description: "Ultimate AI-powered relationship experience",
    icon: Crown,
    features: [
      "Everything in Advanced",
      "AI relationship predictions",
      "Exclusive premium matches",
      "Personal AI relationship coach",
      "Advanced privacy controls",
      "Priority customer support",
      "Unlimited profile boosts",
      "Early access to new features",
      "Video chat capabilities",
    ],
    limitations: [],
  },
]

export function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState("advanced")

  const handleSelectPlan = (planId: string) => {
    setSelectedPlan(planId)
  }

  const handleContinue = () => {
    console.log("[v0] Selected plan:", selectedPlan)
    // Navigate to payment or complete profile setup
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const IconComponent = plan.icon
          const isSelected = selectedPlan === plan.id

          return (
            <Card
              key={plan.id}
              className={`relative cursor-pointer transition-all border-border/50 hover:border-accent/50 ${
                isSelected ? "border-accent bg-accent/5 ring-2 ring-accent/20" : ""
              } ${plan.popular ? "scale-105" : ""}`}
              onClick={() => handleSelectPlan(plan.id)}
            >
              {plan.popular && (
                <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-accent">Most Popular</Badge>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-2">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      plan.id === "premium"
                        ? "bg-gradient-to-br from-accent to-primary"
                        : plan.id === "advanced"
                          ? "bg-accent/20"
                          : "bg-muted"
                    }`}
                  >
                    <IconComponent className={`w-6 h-6 ${plan.id === "premium" ? "text-white" : "text-accent"}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <div className="text-2xl font-bold">{plan.price}</div>
                <CardDescription className="text-sm">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-[color:var(--success)] flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations.length > 0 && (
                  <div className="pt-2 border-t border-border/50">
                    <p className="text-xs text-muted-foreground mb-2">Limitations:</p>
                    {plan.limitations.map((limitation, index) => (
                      <div key={index} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full flex-shrink-0" />
                        <span>{limitation}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button onClick={handleContinue} className="ai-glow px-8 py-6 text-lg">
          {selectedPlan === "standard"
            ? "Start with Free Plan"
            : `Subscribe to ${PLANS.find((p) => p.id === selectedPlan)?.name}`}
          <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
        <p className="text-xs text-muted-foreground mt-2">You can change or cancel your subscription anytime</p>
      </div>
    </div>
  )
}

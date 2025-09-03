"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  AlertTriangle,
  FileText,
  Settings,
  MessageCircle,
  UserX,
  Eye,
  Lock,
  Phone,
  BookOpen,
} from "lucide-react"
import Link from "next/link"

export function SafetyCenter() {
  const safetyTools = [
    {
      icon: AlertTriangle,
      title: "Report a User",
      description: "Report inappropriate behavior, harassment, or safety concerns",
      action: "Report Now",
      href: "/safety/report",
      urgent: true,
    },
    {
      icon: UserX,
      title: "Block & Unmatch",
      description: "Manage blocked users and remove unwanted connections",
      action: "Manage Blocks",
      href: "/safety/blocked-users",
      urgent: false,
    },
    {
      icon: Settings,
      title: "Privacy Settings",
      description: "Control who can see your profile and contact you",
      action: "Update Settings",
      href: "/safety/settings",
      urgent: false,
    },
    {
      icon: Eye,
      title: "Profile Visibility",
      description: "Manage your profile visibility and discovery settings",
      action: "Adjust Visibility",
      href: "/safety/visibility",
      urgent: false,
    },
  ]

  const safetyResources = [
    {
      icon: BookOpen,
      title: "Community Guidelines",
      description: "Learn about our community standards and expected behavior",
      href: "/safety/guidelines",
    },
    {
      icon: FileText,
      title: "Safety Tips",
      description: "Best practices for safe online dating and meeting people",
      href: "/safety/tips",
    },
    {
      icon: Lock,
      title: "Privacy Policy",
      description: "Understand how we protect and use your personal information",
      href: "/privacy",
    },
    {
      icon: Phone,
      title: "Emergency Resources",
      description: "Crisis hotlines and emergency contact information",
      href: "/safety/emergency",
    },
  ]

  return (
    <div className="space-y-8">
      {/* Safety Tools */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <Shield className="w-6 h-6 text-[color:var(--trust-indicator)]" />
          Safety Tools
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {safetyTools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Card
                key={tool.title}
                className={`border-border/50 hover:border-accent/50 transition-colors ${
                  tool.urgent ? "border-destructive/20 bg-destructive/5" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          tool.urgent
                            ? "bg-destructive/10 text-destructive"
                            : "bg-[color:var(--trust-indicator)]/10 text-[color:var(--trust-indicator)]"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{tool.title}</CardTitle>
                        {tool.urgent && (
                          <Badge variant="destructive" className="mt-1">
                            Urgent
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <Link href={tool.href}>
                    <Button
                      variant={tool.urgent ? "destructive" : "default"}
                      className={tool.urgent ? "" : "ai-glow"}
                      size="sm"
                    >
                      {tool.action}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Safety Resources */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-accent" />
          Safety Resources
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {safetyResources.map((resource) => {
            const IconComponent = resource.icon
            return (
              <Card key={resource.title} className="border-border/50 hover:border-accent/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                      <Link href={resource.href}>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      {/* AI Safety Features */}
      <Card className="border-border/50 bg-gradient-to-r from-accent/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-accent" />
            AI-Powered Safety
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Message Screening</h3>
              <p className="text-xs text-muted-foreground">AI monitors conversations for inappropriate content</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Eye className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Profile Verification</h3>
              <p className="text-xs text-muted-foreground">Advanced AI detects fake profiles and suspicious behavior</p>
            </div>
            <div className="text-center p-4 bg-background/50 rounded-lg">
              <Shield className="w-8 h-8 text-accent mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Risk Assessment</h3>
              <p className="text-xs text-muted-foreground">Continuous monitoring for safety risk indicators</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

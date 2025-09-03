"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Shield, Eye, MessageCircle, Users, CheckCircle } from "lucide-react"

export function SafetySettings() {
  const [settings, setSettings] = useState({
    // Profile Visibility
    profileVisibility: "verified-only",
    showOnlineStatus: true,
    showLastSeen: false,
    hideFromSearch: false,

    // Communication Controls
    allowMessages: "matches-only",
    readReceipts: true,
    typingIndicators: true,
    allowVideoChat: false,

    // Matching Preferences
    verifiedUsersOnly: true,
    ageVerificationRequired: true,
    locationSharing: "approximate",
    autoBlock: true,

    // Safety Features
    aiModeration: true,
    contentFiltering: "strict",
    reportNotifications: true,
    safetyAlerts: true,
  })

  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    console.log("[v0] Safety settings saved:", settings)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const updateSetting = (key: string, value: any) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="privacy" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="communication">Communication</TabsTrigger>
          <TabsTrigger value="matching">Matching</TabsTrigger>
          <TabsTrigger value="safety">Safety</TabsTrigger>
        </TabsList>

        <TabsContent value="privacy" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-[color:var(--trust-indicator)]" />
                Profile Visibility
              </CardTitle>
              <CardDescription>Control who can see your profile and personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Who can see my profile</Label>
                <Select
                  value={settings.profileVisibility}
                  onValueChange={(value) => updateSetting("profileVisibility", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="verified-only">Verified users only</SelectItem>
                    <SelectItem value="matches-only">My matches only</SelectItem>
                    <SelectItem value="private">Private (invisible)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show online status</Label>
                  <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                </div>
                <Switch
                  checked={settings.showOnlineStatus}
                  onCheckedChange={(checked) => updateSetting("showOnlineStatus", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Show last seen</Label>
                  <p className="text-sm text-muted-foreground">Display when you were last active</p>
                </div>
                <Switch
                  checked={settings.showLastSeen}
                  onCheckedChange={(checked) => updateSetting("showLastSeen", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Hide from search</Label>
                  <p className="text-sm text-muted-foreground">Don't appear in discovery or search results</p>
                </div>
                <Switch
                  checked={settings.hideFromSearch}
                  onCheckedChange={(checked) => updateSetting("hideFromSearch", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communication" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                Communication Controls
              </CardTitle>
              <CardDescription>Manage who can contact you and how</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Who can message me</Label>
                <Select value={settings.allowMessages} onValueChange={(value) => updateSetting("allowMessages", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="everyone">Everyone</SelectItem>
                    <SelectItem value="matches-only">My matches only</SelectItem>
                    <SelectItem value="verified-matches">Verified matches only</SelectItem>
                    <SelectItem value="none">No one</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Read receipts</Label>
                  <p className="text-sm text-muted-foreground">Show when you've read messages</p>
                </div>
                <Switch
                  checked={settings.readReceipts}
                  onCheckedChange={(checked) => updateSetting("readReceipts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Typing indicators</Label>
                  <p className="text-sm text-muted-foreground">Show when you're typing</p>
                </div>
                <Switch
                  checked={settings.typingIndicators}
                  onCheckedChange={(checked) => updateSetting("typingIndicators", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Video chat</Label>
                  <p className="text-sm text-muted-foreground">Allow video calls with matches</p>
                </div>
                <Switch
                  checked={settings.allowVideoChat}
                  onCheckedChange={(checked) => updateSetting("allowVideoChat", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="matching" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Matching Preferences
              </CardTitle>
              <CardDescription>Set safety requirements for potential matches</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    Verified users only
                    <Badge className="bg-[color:var(--trust-indicator)]/10 text-[color:var(--trust-indicator)]">
                      Recommended
                    </Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">Only show KYC verified profiles</p>
                </div>
                <Switch
                  checked={settings.verifiedUsersOnly}
                  onCheckedChange={(checked) => updateSetting("verifiedUsersOnly", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Age verification required</Label>
                  <p className="text-sm text-muted-foreground">Require government ID verification</p>
                </div>
                <Switch
                  checked={settings.ageVerificationRequired}
                  onCheckedChange={(checked) => updateSetting("ageVerificationRequired", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Location sharing</Label>
                <Select
                  value={settings.locationSharing}
                  onValueChange={(value) => updateSetting("locationSharing", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exact">Exact location</SelectItem>
                    <SelectItem value="approximate">Approximate (5 mile radius)</SelectItem>
                    <SelectItem value="city-only">City only</SelectItem>
                    <SelectItem value="hidden">Hidden</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-block reported users</Label>
                  <p className="text-sm text-muted-foreground">Automatically block users with multiple reports</p>
                </div>
                <Switch
                  checked={settings.autoBlock}
                  onCheckedChange={(checked) => updateSetting("autoBlock", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="safety" className="space-y-6 mt-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-[color:var(--trust-indicator)]" />
                AI Safety Features
              </CardTitle>
              <CardDescription>Advanced AI-powered safety and moderation tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="flex items-center gap-2">
                    AI content moderation
                    <Badge className="bg-accent/10 text-accent">AI Powered</Badge>
                  </Label>
                  <p className="text-sm text-muted-foreground">Automatically detect and filter inappropriate content</p>
                </div>
                <Switch
                  checked={settings.aiModeration}
                  onCheckedChange={(checked) => updateSetting("aiModeration", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label>Content filtering level</Label>
                <Select
                  value={settings.contentFiltering}
                  onValueChange={(value) => updateSetting("contentFiltering", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strict">Strict (recommended)</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Safety alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about potential safety risks</p>
                </div>
                <Switch
                  checked={settings.safetyAlerts}
                  onCheckedChange={(checked) => updateSetting("safetyAlerts", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Report notifications</Label>
                  <p className="text-sm text-muted-foreground">Updates on reports you've submitted</p>
                </div>
                <Switch
                  checked={settings.reportNotifications}
                  onCheckedChange={(checked) => updateSetting("reportNotifications", checked)}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button onClick={handleSave} className="ai-glow px-8">
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4 mr-2" />
              Settings Saved
            </>
          ) : (
            "Save Safety Settings"
          )}
        </Button>
      </div>
    </div>
  )
}

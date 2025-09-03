"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, CheckCircle, AlertTriangle } from "lucide-react"

export function SafetyStats() {
  const stats = {
    verifiedUsers: 98.7,
    reportedIssues: 12,
    resolvedReports: 156,
    activeModerators: 24,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
          <Shield className="h-4 w-4 text-[color:var(--trust-indicator)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.verifiedUsers}%</div>
          <p className="text-xs text-muted-foreground">KYC verified profiles</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
          <AlertTriangle className="h-4 w-4 text-[color:var(--warning)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.reportedIssues}</div>
          <p className="text-xs text-muted-foreground">Under investigation</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Resolved This Month</CardTitle>
          <CheckCircle className="h-4 w-4 text-[color:var(--success)]" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.resolvedReports}</div>
          <p className="text-xs text-muted-foreground">Safety issues resolved</p>
        </CardContent>
      </Card>

      <Card className="border-border/50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Safety Team</CardTitle>
          <Users className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activeModerators}</div>
          <p className="text-xs text-muted-foreground">Active moderators</p>
        </CardContent>
      </Card>
    </div>
  )
}

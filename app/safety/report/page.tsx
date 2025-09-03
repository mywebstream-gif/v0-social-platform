import { ReportForm } from "@/components/safety/report-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, ArrowLeft, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function ReportPage() {
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

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Report a Safety Concern</h1>
          <p className="text-muted-foreground">
            Help us maintain a safe community by reporting inappropriate behavior or safety issues.
          </p>
        </div>

        {/* Emergency Notice */}
        <Card className="border-destructive/20 bg-destructive/5 mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-destructive">Emergency Situations</h3>
                <p className="text-sm text-muted-foreground">
                  If you're in immediate danger, contact local emergency services (911) immediately. This form is for
                  non-emergency safety concerns on our platform.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Report Form */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle>Report Details</CardTitle>
            <CardDescription>
              Please provide as much detail as possible to help our safety team investigate your concern.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReportForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

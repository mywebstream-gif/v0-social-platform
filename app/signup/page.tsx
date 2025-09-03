import { SignupForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Shield, Heart } from "lucide-react"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ConnectAI
            </span>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-balance">
              Join the Future of{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Social Connections
              </span>
            </h1>
            <p className="text-lg text-muted-foreground text-pretty">
              Experience AI-powered matching that understands you deeply and connects you with compatible people for
              meaningful relationships.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-[color:var(--trust-indicator)]" />
              <span className="text-sm">KYC verified users only</span>
            </div>
            <div className="flex items-center gap-3">
              <Brain className="w-5 h-5 text-accent" />
              <span className="text-sm">AI-powered compatibility matching</span>
            </div>
            <div className="flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm">Guided relationship coaching</span>
            </div>
          </div>
        </div>

        {/* Right side - Signup Form */}
        <Card className="w-full max-w-md mx-auto border-border/50">
          <CardHeader className="text-center">
            <div className="lg:hidden flex items-center justify-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ConnectAI
              </span>
            </div>
            <CardTitle className="text-2xl">Create Your Account</CardTitle>
            <CardDescription>Start your journey to meaningful connections</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm />
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-accent hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Shield, Brain, Heart, Users, Sparkles, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Brain className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              ConnectAI
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#safety" className="text-muted-foreground hover:text-foreground transition-colors">
              Safety
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/signup">
              <Button className="ai-glow">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <Badge variant="secondary" className="mb-6 px-4 py-2">
          <Sparkles className="w-4 h-4 mr-2" />
          AI-Powered Matching Technology
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
          Discover Authentic{" "}
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            AI-Guided
          </span>{" "}
          Connections
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
          Experience the future of social connections with our AI coach that guides you through meaningful
          relationships, from first contact to lasting bonds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Link href="/signup">
            <Button size="lg" className="ai-glow px-8 py-6 text-lg">
              Start Your Journey
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg bg-transparent">
            Watch Demo
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[color:var(--trust-indicator)]" />
            <span>KYC Verified Users</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-[color:var(--success)]" />
            <span>AI-Generated Portraits</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="w-4 h-4 text-accent" />
            <span>Smart Matching Algorithm</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Revolutionizing Social Connections</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered platform creates safe, authentic connections through innovative technology and human insight.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Brain className="w-12 h-12 text-accent mb-4" />
              <CardTitle>AI Matching Engine</CardTitle>
              <CardDescription>
                Advanced algorithms analyze compatibility across multiple dimensions for meaningful connections.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Shield className="w-12 h-12 text-[color:var(--trust-indicator)] mb-4" />
              <CardTitle>KYC Verification</CardTitle>
              <CardDescription>
                Government ID verification ensures authentic users and creates a safe environment for everyone.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Users className="w-12 h-12 text-primary mb-4" />
              <CardTitle>AI-Generated Portraits</CardTitle>
              <CardDescription>
                No real photos needed. Our AI creates beautiful, representative portraits that protect your privacy.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Heart className="w-12 h-12 text-accent mb-4" />
              <CardTitle>Multi-Stage Connections</CardTitle>
              <CardDescription>
                From handshake to face-to-face meetings, our structured approach builds genuine relationships.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <Sparkles className="w-12 h-12 text-primary mb-4" />
              <CardTitle>AI Relationship Coach</CardTitle>
              <CardDescription>
                Get personalized guidance and insights to navigate connections and build meaningful relationships.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="border-border/50 hover:border-accent/50 transition-colors">
            <CardHeader>
              <CheckCircle className="w-12 h-12 text-[color:var(--success)] mb-4" />
              <CardTitle>Safety First</CardTitle>
              <CardDescription>
                Comprehensive safety features, reporting systems, and community guidelines keep everyone protected.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-accent/20">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Find Your Perfect Match?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have discovered meaningful connections through our AI-powered platform.
            </p>
            <Link href="/signup">
              <Button size="lg" className="ai-glow px-8 py-6 text-lg">
                Start Matching Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
                  <Brain className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="font-bold">ConnectAI</span>
              </div>
              <p className="text-sm text-muted-foreground">AI-powered social connections for the modern world.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="#features" className="hover:text-foreground transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-foreground transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#safety" className="hover:text-foreground transition-colors">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-foreground transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-foreground transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-foreground transition-colors">
                    Community
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 ConnectAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

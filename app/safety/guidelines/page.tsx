export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-semibold">Community Guidelines</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Introduction */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold text-balance">Building Safe & Meaningful Connections</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Our community guidelines ensure everyone can build authentic relationships in a safe, respectful
              environment.
            </p>
          </div>

          {/* Guidelines Sections */}
          <div className="grid gap-6">
            {/* Respect & Kindness */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                Respect & Kindness
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Treat all members with respect and dignity</li>
                <li>• Use inclusive and welcoming language</li>
                <li>• Be patient with different communication styles</li>
                <li>• Celebrate diversity in backgrounds and perspectives</li>
              </ul>
            </div>

            {/* Authentic Connections */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm">✓</span>
                </div>
                Authentic Connections
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Be genuine and honest in your interactions</li>
                <li>• Use AI-generated portraits as intended (no real photos)</li>
                <li>• Share accurate information about yourself</li>
                <li>• Respect others' boundaries and preferences</li>
              </ul>
            </div>

            {/* Safety First */}
            <div className="bg-card rounded-xl p-6 border border-border/50">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-sm">!</span>
                </div>
                Safety First
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Never share personal information too quickly</li>
                <li>• Meet in public places for first meetings</li>
                <li>• Trust your instincts and report suspicious behavior</li>
                <li>• Use our AI coach guidance for safe interactions</li>
              </ul>
            </div>

            {/* Prohibited Behavior */}
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-destructive">
                <div className="w-6 h-6 bg-destructive/20 rounded-full flex items-center justify-center">
                  <span className="text-destructive text-sm">×</span>
                </div>
                Prohibited Behavior
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Harassment, bullying, or threatening behavior</li>
                <li>• Sharing inappropriate or explicit content</li>
                <li>• Spam, scams, or fraudulent activities</li>
                <li>• Impersonation or fake profiles</li>
                <li>• Discrimination based on any personal characteristics</li>
              </ul>
            </div>
          </div>

          {/* Reporting */}
          <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
            <h3 className="text-xl font-semibold mb-4">Report Violations</h3>
            <p className="text-muted-foreground mb-4">
              Help us maintain a safe community by reporting any violations of these guidelines.
            </p>
            <div className="flex gap-3">
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
                Report Issue
              </button>
              <button className="border border-border px-4 py-2 rounded-lg hover:bg-accent transition-colors">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, RefreshCw, Sparkles, Download } from "lucide-react"

const STYLE_OPTIONS = [
  { value: "realistic", label: "Realistic", description: "Natural, photorealistic style" },
  { value: "artistic", label: "Artistic", description: "Stylized, creative interpretation" },
  { value: "minimalist", label: "Minimalist", description: "Clean, simple aesthetic" },
  { value: "vibrant", label: "Vibrant", description: "Bold colors and energy" },
]

const MOOD_OPTIONS = ["Professional", "Friendly", "Confident", "Approachable", "Creative", "Sophisticated"]

export function AIPortraitGenerator() {
  const [preferences, setPreferences] = useState({
    style: "",
    mood: "",
    colorScheme: "",
    background: "",
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedPortraits, setGeneratedPortraits] = useState<string[]>([])
  const [selectedPortrait, setSelectedPortrait] = useState<string>("")

  const handleGenerate = async () => {
    setIsGenerating(true)
    // Simulate AI generation
    setTimeout(() => {
      const mockPortraits = [
        "/placeholder-i6a4r.png",
        "/placeholder-ut3fh.png",
        "/placeholder-8wy30.png",
        "/placeholder-9lj0o.png",
      ]
      setGeneratedPortraits(mockPortraits)
      setIsGenerating(false)
    }, 3000)
  }

  const handleContinue = () => {
    console.log("[v0] Selected portrait:", selectedPortrait)
    // Navigate to subscription selection
  }

  return (
    <div className="space-y-6">
      {/* Style Preferences */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Portrait Style</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {STYLE_OPTIONS.map((style) => (
              <Card
                key={style.value}
                className={`cursor-pointer transition-colors border-border/50 hover:border-accent/50 ${
                  preferences.style === style.value ? "border-accent bg-accent/5" : ""
                }`}
                onClick={() => setPreferences((prev) => ({ ...prev, style: style.value }))}
              >
                <CardContent className="p-4">
                  <h3 className="font-medium">{style.label}</h3>
                  <p className="text-sm text-muted-foreground">{style.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Mood & Personality</Label>
          <div className="flex flex-wrap gap-2">
            {MOOD_OPTIONS.map((mood) => (
              <Badge
                key={mood}
                variant={preferences.mood === mood ? "default" : "outline"}
                className="cursor-pointer hover:bg-accent/80 transition-colors"
                onClick={() => setPreferences((prev) => ({ ...prev, mood }))}
              >
                {mood}
              </Badge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Color Scheme</Label>
            <Select
              value={preferences.colorScheme}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, colorScheme: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select color preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="warm">Warm tones</SelectItem>
                <SelectItem value="cool">Cool tones</SelectItem>
                <SelectItem value="neutral">Neutral tones</SelectItem>
                <SelectItem value="vibrant">Vibrant colors</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Background</Label>
            <Select
              value={preferences.background}
              onValueChange={(value) => setPreferences((prev) => ({ ...prev, background: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select background" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid color</SelectItem>
                <SelectItem value="gradient">Soft gradient</SelectItem>
                <SelectItem value="abstract">Abstract pattern</SelectItem>
                <SelectItem value="minimal">Minimal texture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGenerate}
        disabled={!preferences.style || !preferences.mood || isGenerating}
        className="w-full ai-glow"
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            Generating Your AI Portrait...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate AI Portraits
          </>
        )}
      </Button>

      {/* Generated Portraits */}
      {generatedPortraits.length > 0 && (
        <div className="space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Choose Your Portrait</h3>
            <p className="text-sm text-muted-foreground">Select the portrait that best represents you</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {generatedPortraits.map((portrait, index) => (
              <Card
                key={index}
                className={`cursor-pointer transition-all border-border/50 hover:border-accent/50 ${
                  selectedPortrait === portrait ? "border-accent bg-accent/5 ring-2 ring-accent/20" : ""
                }`}
                onClick={() => setSelectedPortrait(portrait)}
              >
                <CardContent className="p-4">
                  <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden">
                    <img
                      src={portrait || "/placeholder.svg"}
                      alt={`AI Generated Portrait ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Style {index + 1}</span>
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="flex-1 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Generate New Options
            </Button>
            <Button onClick={handleContinue} disabled={!selectedPortrait} className="flex-1 ai-glow">
              Continue with Selected Portrait
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

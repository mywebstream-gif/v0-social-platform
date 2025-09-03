"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const INTERESTS = [
  "Technology",
  "Travel",
  "Fitness",
  "Music",
  "Art",
  "Cooking",
  "Reading",
  "Movies",
  "Gaming",
  "Sports",
  "Photography",
  "Dancing",
  "Hiking",
  "Yoga",
  "Writing",
  "Fashion",
  "Science",
  "History",
  "Languages",
  "Volunteering",
  "Entrepreneurship",
  "Meditation",
]

const RELATIONSHIP_GOALS = [
  { value: "dating", label: "Dating & Romance" },
  { value: "friendship", label: "Friendship" },
  { value: "social", label: "Social Groups" },
  { value: "casual", label: "Casual Connections" },
  { value: "networking", label: "Professional Networking" },
]

export function ProfileSetupForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    bio: "",
    occupation: "",
    education: "",
    height: "",
    relationshipGoals: [] as string[],
    interests: [] as string[],
    lookingFor: "",
    ageRange: { min: 18, max: 35 },
    maxDistance: 50,
    lifestyle: {
      smoking: "",
      drinking: "",
      exercise: "",
      diet: "",
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const supabase = createClient()

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
        throw new Error("Please log in to continue")
      }

      // Update profile with additional information
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          bio: formData.bio,
          occupation: formData.occupation,
          education: formData.education,
          interests: formData.interests,
          relationship_goals: formData.relationshipGoals.join(","),
          profile_completeness: 75, // Update completeness score
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (updateError) {
        throw updateError
      }

      console.log("[v0] Profile setup completed for user:", user.id)

      // Navigate to AI portrait generation
      router.push("/profile/portrait")
    } catch (err: any) {
      console.error("[v0] Profile setup error:", err)
      setError(err.message || "Failed to save profile. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const toggleRelationshipGoal = (goal: string) => {
    setFormData((prev) => ({
      ...prev,
      relationshipGoals: prev.relationshipGoals.includes(goal)
        ? prev.relationshipGoals.filter((g) => g !== goal)
        : [...prev.relationshipGoals, goal],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Bio */}
      <div className="space-y-2">
        <Label htmlFor="bio">About You</Label>
        <Textarea
          id="bio"
          placeholder="Tell us about yourself, your passions, and what makes you unique..."
          value={formData.bio}
          onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
          className="min-h-24"
          maxLength={500}
        />
        <p className="text-xs text-muted-foreground">{formData.bio.length}/500 characters</p>
      </div>

      {/* Professional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation</Label>
          <Input
            id="occupation"
            value={formData.occupation}
            onChange={(e) => setFormData((prev) => ({ ...prev, occupation: e.target.value }))}
            placeholder="Software Engineer, Teacher, etc."
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="education">Education</Label>
          <Select
            value={formData.education}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, education: value }))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high-school">High School</SelectItem>
              <SelectItem value="some-college">Some College</SelectItem>
              <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
              <SelectItem value="masters">Master's Degree</SelectItem>
              <SelectItem value="phd">PhD</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Physical Attributes */}
      <div className="space-y-2">
        <Label htmlFor="height">Height (optional)</Label>
        <Select value={formData.height} onValueChange={(value) => setFormData((prev) => ({ ...prev, height: value }))}>
          <SelectTrigger>
            <SelectValue placeholder="Select height" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-5ft">Under 5'0"</SelectItem>
            <SelectItem value="5ft-5ft3">5'0" - 5'3"</SelectItem>
            <SelectItem value="5ft4-5ft7">5'4" - 5'7"</SelectItem>
            <SelectItem value="5ft8-5ft11">5'8" - 5'11"</SelectItem>
            <SelectItem value="6ft-6ft3">6'0" - 6'3"</SelectItem>
            <SelectItem value="over-6ft3">Over 6'3"</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Relationship Goals */}
      <div className="space-y-3">
        <Label>What are you looking for?</Label>
        <div className="grid grid-cols-1 gap-2">
          {RELATIONSHIP_GOALS.map((goal) => (
            <div key={goal.value} className="flex items-center space-x-2">
              <Checkbox
                id={goal.value}
                checked={formData.relationshipGoals.includes(goal.value)}
                onCheckedChange={() => toggleRelationshipGoal(goal.value)}
              />
              <Label htmlFor={goal.value} className="text-sm font-normal">
                {goal.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label>Interests & Hobbies</Label>
        <p className="text-sm text-muted-foreground">Select up to 10 interests that represent you</p>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <Badge
              key={interest}
              variant={formData.interests.includes(interest) ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent/80 transition-colors"
              onClick={() => toggleInterest(interest)}
            >
              {interest}
              {formData.interests.includes(interest) && <X className="w-3 h-3 ml-1" />}
            </Badge>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">{formData.interests.length}/10 selected</p>
      </div>

      {/* Lifestyle Preferences */}
      <Card className="border-border/50">
        <CardHeader>
          <CardTitle className="text-lg">Lifestyle Preferences</CardTitle>
          <CardDescription>Help us find compatible matches</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Smoking</Label>
            <Select
              value={formData.lifestyle.smoking}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, smoking: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
                <SelectItem value="regularly">Regularly</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Drinking</Label>
            <Select
              value={formData.lifestyle.drinking}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, drinking: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select preference" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="never">Never</SelectItem>
                <SelectItem value="socially">Socially</SelectItem>
                <SelectItem value="regularly">Regularly</SelectItem>
                <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Exercise</Label>
            <Select
              value={formData.lifestyle.exercise}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, exercise: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="few-times-week">Few times a week</SelectItem>
                <SelectItem value="occasionally">Occasionally</SelectItem>
                <SelectItem value="rarely">Rarely</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Diet</Label>
            <Select
              value={formData.lifestyle.diet}
              onValueChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  lifestyle: { ...prev.lifestyle, diet: value },
                }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select diet type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="omnivore">Omnivore</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="vegan">Vegan</SelectItem>
                <SelectItem value="pescatarian">Pescatarian</SelectItem>
                <SelectItem value="keto">Keto</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Button
        type="submit"
        className="w-full ai-glow"
        disabled={formData.interests.length === 0 || formData.relationshipGoals.length === 0 || isLoading}
      >
        {isLoading ? "Saving Profile..." : "Continue to AI Portrait Generation"}
        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </form>
  )
}

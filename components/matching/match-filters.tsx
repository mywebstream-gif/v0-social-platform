"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

const CONNECTION_TYPES = [
  { value: "dating", label: "Dating & Romance" },
  { value: "friendship", label: "Friendship" },
  { value: "social", label: "Social Groups" },
  { value: "casual", label: "Casual Connections" },
  { value: "networking", label: "Professional Networking" },
]

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
]

export function MatchFilters() {
  const [filters, setFilters] = useState({
    connectionTypes: ["dating"] as string[],
    ageRange: [22, 35],
    maxDistance: [25],
    interests: [] as string[],
    education: "",
    lifestyle: {
      smoking: "",
      drinking: "",
      exercise: "",
    },
    minCompatibility: [80],
  })

  const toggleConnectionType = (type: string) => {
    setFilters((prev) => ({
      ...prev,
      connectionTypes: prev.connectionTypes.includes(type)
        ? prev.connectionTypes.filter((t) => t !== type)
        : [...prev.connectionTypes, type],
    }))
  }

  const toggleInterest = (interest: string) => {
    setFilters((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const applyFilters = () => {
    console.log("[v0] Applying filters:", filters)
    // Apply filters to matching algorithm
  }

  const resetFilters = () => {
    setFilters({
      connectionTypes: ["dating"],
      ageRange: [18, 50],
      maxDistance: [50],
      interests: [],
      education: "",
      lifestyle: {
        smoking: "",
        drinking: "",
        exercise: "",
      },
      minCompatibility: [70],
    })
  }

  return (
    <div className="space-y-6">
      {/* Connection Types */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Looking For</Label>
        <div className="space-y-2">
          {CONNECTION_TYPES.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <Checkbox
                id={type.value}
                checked={filters.connectionTypes.includes(type.value)}
                onCheckedChange={() => toggleConnectionType(type.value)}
              />
              <Label htmlFor={type.value} className="text-sm font-normal">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Age Range */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">
          Age Range: {filters.ageRange[0]} - {filters.ageRange[1]}
        </Label>
        <Slider
          value={filters.ageRange}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, ageRange: value }))}
          min={18}
          max={65}
          step={1}
          className="w-full"
        />
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Max Distance: {filters.maxDistance[0]} miles</Label>
        <Slider
          value={filters.maxDistance}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, maxDistance: value }))}
          min={1}
          max={100}
          step={1}
          className="w-full"
        />
      </div>

      {/* Minimum Compatibility */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Min Compatibility: {filters.minCompatibility[0]}%</Label>
        <Slider
          value={filters.minCompatibility}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, minCompatibility: value }))}
          min={50}
          max={100}
          step={5}
          className="w-full"
        />
      </div>

      {/* Education */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Education</Label>
        <Select
          value={filters.education}
          onValueChange={(value) => setFilters((prev) => ({ ...prev, education: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Any education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any education level</SelectItem>
            <SelectItem value="high-school">High School+</SelectItem>
            <SelectItem value="some-college">Some College+</SelectItem>
            <SelectItem value="bachelors">Bachelor's+</SelectItem>
            <SelectItem value="masters">Master's+</SelectItem>
            <SelectItem value="phd">PhD+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lifestyle Preferences */}
      <div className="space-y-4">
        <Label className="text-sm font-medium">Lifestyle Preferences</Label>

        <div className="space-y-2">
          <Label className="text-xs">Smoking</Label>
          <Select
            value={filters.lifestyle.smoking}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                lifestyle: { ...prev.lifestyle, smoking: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any preference</SelectItem>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="occasionally">Occasionally</SelectItem>
              <SelectItem value="regularly">Regularly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Drinking</Label>
          <Select
            value={filters.lifestyle.drinking}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                lifestyle: { ...prev.lifestyle, drinking: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any preference</SelectItem>
              <SelectItem value="never">Never</SelectItem>
              <SelectItem value="socially">Socially</SelectItem>
              <SelectItem value="regularly">Regularly</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label className="text-xs">Exercise</Label>
          <Select
            value={filters.lifestyle.exercise}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                lifestyle: { ...prev.lifestyle, exercise: value },
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Any frequency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any frequency</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="few-times-week">Few times a week</SelectItem>
              <SelectItem value="occasionally">Occasionally</SelectItem>
              <SelectItem value="rarely">Rarely</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Interests */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Shared Interests</Label>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <Badge
              key={interest}
              variant={filters.interests.includes(interest) ? "default" : "outline"}
              className="cursor-pointer hover:bg-accent/80 transition-colors text-xs"
              onClick={() => toggleInterest(interest)}
            >
              {interest}
              {filters.interests.includes(interest) && <X className="w-3 h-3 ml-1" />}
            </Badge>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-4 border-t border-border/50">
        <Button onClick={applyFilters} className="w-full ai-glow">
          Apply Filters
        </Button>
        <Button onClick={resetFilters} variant="outline" className="w-full bg-transparent">
          Reset All
        </Button>
      </div>
    </div>
  )
}

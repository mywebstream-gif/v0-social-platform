"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    location: "",
    phone: "",
    agreeToTerms: false,
    agreeToPrivacy: false,
    ageConfirmation: false,
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    // Password validation
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Age validation
    if (formData.dateOfBirth) {
      const birthDate = new Date(formData.dateOfBirth)
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDiff = today.getMonth() - birthDate.getMonth()

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }

      if (age < 16) {
        newErrors.dateOfBirth = "You must be at least 16 years old to join"
      }
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    if (!phoneRegex.test(formData.phone.replace(/[\s\-$$$$]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    console.log("[v0] Signup form submitted:", formData)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user data in localStorage for demo purposes
      localStorage.setItem(
        "userData",
        JSON.stringify({
          ...formData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        }),
      )

      // Navigate to profile setup
      router.push("/profile/setup")
    } catch (error) {
      setErrors({ submit: "Failed to create account. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors.submit && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errors.submit}</AlertDescription>
        </Alert>
      )}

      {/* Personal Information */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            type="text"
            value={formData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          className={errors.email ? "border-red-500" : ""}
          required
        />
        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className={errors.password ? "border-red-500" : ""}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </Button>
        </div>
        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
          className={errors.confirmPassword ? "border-red-500" : ""}
          required
        />
        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
      </div>

      {/* Date of Birth */}
      <div className="space-y-2">
        <Label htmlFor="dateOfBirth">Date of Birth</Label>
        <Input
          id="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
          className={errors.dateOfBirth ? "border-red-500" : ""}
          required
        />
        {errors.dateOfBirth && <p className="text-sm text-red-500">{errors.dateOfBirth}</p>}
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={formData.gender} onValueChange={(value) => handleInputChange("gender", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Phone */}
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+1 (555) 123-4567"
          className={errors.phone ? "border-red-500" : ""}
          required
        />
        {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          type="text"
          value={formData.location}
          onChange={(e) => handleInputChange("location", e.target.value)}
          placeholder="City, State/Country"
          required
        />
      </div>

      {/* Agreements */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ageConfirmation"
            checked={formData.ageConfirmation}
            onCheckedChange={(checked) => handleInputChange("ageConfirmation", checked as boolean)}
          />
          <Label htmlFor="ageConfirmation" className="text-sm">
            I confirm that I am 16 years of age or older
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToTerms"
            checked={formData.agreeToTerms}
            onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
          />
          <Label htmlFor="agreeToTerms" className="text-sm">
            I agree to the{" "}
            <a href="/terms" className="text-accent hover:underline">
              Terms of Service
            </a>
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="agreeToPrivacy"
            checked={formData.agreeToPrivacy}
            onCheckedChange={(checked) => handleInputChange("agreeToPrivacy", checked as boolean)}
          />
          <Label htmlFor="agreeToPrivacy" className="text-sm">
            I agree to the{" "}
            <a href="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </a>
          </Label>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full ai-glow"
        disabled={!formData.agreeToTerms || !formData.agreeToPrivacy || !formData.ageConfirmation || isLoading}
      >
        {isLoading ? "Creating Account..." : "Create Account"}
        {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
      </Button>
    </form>
  )
}

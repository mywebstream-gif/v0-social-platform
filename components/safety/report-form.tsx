"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, AlertTriangle, CheckCircle } from "lucide-react"

const REPORT_CATEGORIES = [
  { value: "harassment", label: "Harassment or Bullying", urgent: true },
  { value: "inappropriate-content", label: "Inappropriate Content", urgent: false },
  { value: "fake-profile", label: "Fake or Misleading Profile", urgent: false },
  { value: "spam", label: "Spam or Scam", urgent: false },
  { value: "threats", label: "Threats or Violence", urgent: true },
  { value: "underage", label: "Underage User", urgent: true },
  { value: "privacy", label: "Privacy Violation", urgent: false },
  { value: "other", label: "Other Safety Concern", urgent: false },
]

export function ReportForm() {
  const [formData, setFormData] = useState({
    reportedUser: "",
    category: "",
    description: "",
    evidence: [] as File[],
    anonymous: false,
    contactMe: true,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
      console.log("[v0] Safety report submitted:", formData)
    }, 2000)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData((prev) => ({ ...prev, evidence: [...prev.evidence, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      evidence: prev.evidence.filter((_, i) => i !== index),
    }))
  }

  if (submitted) {
    return (
      <Card className="border-[color:var(--success)]/20 bg-[color:var(--success)]/5">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-12 h-12 text-[color:var(--success)] mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Report Submitted Successfully</h3>
          <p className="text-muted-foreground mb-4">
            Thank you for helping keep our community safe. Our safety team will review your report within 24 hours.
          </p>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Report ID: #SR-{Date.now().toString().slice(-6)}</p>
            <p>You'll receive updates via email if you opted to be contacted.</p>
          </div>
          <Button className="mt-4" onClick={() => window.history.back()}>
            Return to Safety Center
          </Button>
        </CardContent>
      </Card>
    )
  }

  const selectedCategory = REPORT_CATEGORIES.find((cat) => cat.value === formData.category)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Reported User */}
      <div className="space-y-2">
        <Label htmlFor="reportedUser">User Being Reported</Label>
        <Input
          id="reportedUser"
          value={formData.reportedUser}
          onChange={(e) => setFormData((prev) => ({ ...prev, reportedUser: e.target.value }))}
          placeholder="Enter username or profile name"
          required
        />
        <p className="text-xs text-muted-foreground">
          If you don't know their exact username, provide as much identifying information as possible.
        </p>
      </div>

      {/* Report Category */}
      <div className="space-y-2">
        <Label>Type of Safety Concern</Label>
        <Select
          value={formData.category}
          onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select the type of issue" />
          </SelectTrigger>
          <SelectContent>
            {REPORT_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                <div className="flex items-center gap-2">
                  {category.label}
                  {category.urgent && (
                    <Badge variant="destructive" className="text-xs">
                      Urgent
                    </Badge>
                  )}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedCategory?.urgent && (
          <div className="flex items-center gap-2 p-2 bg-destructive/10 rounded border border-destructive/20">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <p className="text-xs text-destructive">
              This is marked as an urgent safety concern and will be prioritized.
            </p>
          </div>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Detailed Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Please describe what happened, including dates, times, and specific behaviors or content that concern you..."
          className="min-h-32"
          required
        />
        <p className="text-xs text-muted-foreground">
          The more details you provide, the better we can investigate and address the issue.
        </p>
      </div>

      {/* Evidence Upload */}
      <div className="space-y-3">
        <Label>Evidence (Optional)</Label>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Upload screenshots, messages, or other evidence to support your report
          </p>
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.txt"
            onChange={handleFileUpload}
            className="hidden"
            id="evidence-upload"
          />
          <Button type="button" variant="outline" onClick={() => document.getElementById("evidence-upload")?.click()}>
            Choose Files
          </Button>
        </div>

        {formData.evidence.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Uploaded Files:</p>
            {formData.evidence.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                <span className="text-sm truncate">{file.name}</span>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Privacy Options */}
      <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
        <h3 className="font-medium">Privacy & Contact Preferences</h3>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="anonymous"
            checked={formData.anonymous}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, anonymous: checked as boolean }))}
          />
          <Label htmlFor="anonymous" className="text-sm">
            Submit this report anonymously
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="contactMe"
            checked={formData.contactMe}
            onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, contactMe: checked as boolean }))}
          />
          <Label htmlFor="contactMe" className="text-sm">
            Allow our safety team to contact me for additional information
          </Label>
        </div>

        <p className="text-xs text-muted-foreground">
          Anonymous reports are still investigated, but we may not be able to provide updates or ask follow-up
          questions.
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting || !formData.reportedUser || !formData.category || !formData.description}
        className="w-full"
      >
        {isSubmitting ? "Submitting Report..." : "Submit Safety Report"}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.
        False reports may result in account restrictions.
      </p>
    </form>
  )
}

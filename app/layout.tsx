import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "ConnectAI - AI-Powered Social Connections",
  description:
    "Discover meaningful connections through AI-driven matching. Safe, authentic, and designed for genuine relationships.",
  generator: "v0.app",
  keywords: ["AI dating", "social connections", "AI matching", "safe dating", "authentic relationships"],
  authors: [{ name: "ConnectAI Team" }],
  openGraph: {
    title: "ConnectAI - AI-Powered Social Connections",
    description: "Discover meaningful connections through AI-driven matching",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}

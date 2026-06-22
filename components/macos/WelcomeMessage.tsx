"use client"

import { useEffect, useState } from "react"
import { Sparkles } from "lucide-react"

export function WelcomeMessage() {
  const [visible, setVisible] = useState(true)
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Bonjour")
    else if (hour < 18) setGreeting("Bon après-midi")
    else setGreeting("Bonsoir")

    // Hide after 5 seconds
    const timer = setTimeout(() => setVisible(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  if (!visible) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-20">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
          <h1 className="text-7xl font-light text-white drop-shadow-2xl">
            {greeting}
          </h1>
          <Sparkles className="w-12 h-12 text-primary animate-pulse" />
        </div>
        <p className="text-2xl text-white/90 drop-shadow-xl font-light">
          Bienvenue sur mon portfolio
        </p>
        <p className="text-lg text-white/70 drop-shadow-lg mt-2">
          Double-cliquez sur les icônes pour découvrir mon parcours
        </p>
      </div>
    </div>
  )
}

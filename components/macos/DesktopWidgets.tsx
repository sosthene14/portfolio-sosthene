"use client"

import { useState, useEffect } from "react"
import { Cloud, MapPin, Github, Globe, Mail } from "lucide-react"

export function DesktopWidgets() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  return (
    <div className="fixed hidden md:grid top-20 right-6  grid-cols-2 gap-4 z-10 pointer-events-none w-[660px]">
      {/* Date & Time Widget */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-white/20 pointer-events-auto">
        <div className="flex flex-col gap-4">
          <div>
            <div className="text-5xl font-extralight text-white mb-1">{formatTime(time)}</div>
            <div className="text-sm text-white/60 capitalize">
              {formatDate(time).split(' ').slice(0, 2).join(' ')}
            </div>
          </div>
          
          {/* Weather */}
          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Cloud className="w-8 h-8 text-white/80" />
              <div>
                <div className="text-2xl font-light text-white">24°</div>
                <div className="text-xs text-white/60 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  Dakar
                </div>
              </div>
            </div>
            <div className="text-right text-white/50 text-sm">
              Ensoleillé
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Widget */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-white/20 pointer-events-auto">
        <h3 className="text-sm font-medium text-white/80 mb-3">Liens rapides</h3>
        <div className="space-y-2">
          <a
            href="https://github.com/sosthene14"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center">
              <Github className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">GitHub</div>
              <div className="text-xs text-white/50 truncate">@sosthene14</div>
            </div>
          </a>
          
          <a
            href="https://sosthenemounsambote.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center">
              <Globe className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">Portfolio</div>
              <div className="text-xs text-white/50 truncate">sosthenemounsambote.com</div>
            </div>
          </a>

          <a
            href="mailto:sosthenemounsambote14@gmail.com"
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-all group"
          >
            <div className="w-8 h-8 bg-white/20 backdrop-blur-xl rounded-lg flex items-center justify-center">
              <Mail className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white">Email</div>
              <div className="text-xs text-white/50">Contact direct</div>
            </div>
          </a>
        </div>
      </div>

      {/* Stats Widget */}
      <div className="bg-white/10 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl border border-white/20 pointer-events-auto col-span-2">
        <h3 className="text-sm font-medium text-white/80 mb-4">Aperçu</h3>
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-extralight text-white mb-1">3+</div>
            <div className="text-xs text-white/60">Années</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-extralight text-white mb-1">15+</div>
            <div className="text-xs text-white/60">Technos</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-extralight text-white mb-1">CDI</div>
            <div className="text-xs text-white/60">GatsMapping</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl font-extralight text-white mb-1">M1</div>
            <div className="text-xs text-white/60">IPD Dakar</div>
          </div>
        </div>
      </div>
    </div>
  )
}

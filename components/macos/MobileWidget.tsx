"use client"

import { useState, useEffect } from "react"
import { Cloud, Github, Globe, Mail } from "lucide-react"

export function MobileWidgets() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) =>
    date.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })

  const formatDay = (date: Date) =>
    date.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" })

  const glass = {
    background: "rgba(16, 16, 20, 0.75)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    border: "1px solid rgba(255,255,255,0.07)",
    borderRadius: "12px",
  } as React.CSSProperties

  return (
    <div
      className="md:hidden fixed z-10 flex mt-18 md:mt-40 flex-col items-end gap-1.5 pointer-events-none"
      style={{ top: "36px", right: "8px" }}
    >
      {/* Clock */}
      <div className="flex items-center gap-2 px-3 py-1.5 pointer-events-auto" style={glass}>
        <span className="text-sm font-light text-white tabular-nums">{formatTime(time)}</span>
        <span className="text-md" style={{ color: "rgba(255,255,255,0.35)" }}>{formatDay(time)}</span>
      </div>

      {/* Weather */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 pointer-events-auto" style={glass}>
        <Cloud className="w-3.5 h-3.5" style={{ color: "#a8c7fa" }} />
        <span className="text-md text-white">24° · Dakar</span>
      </div>

      {/* Links */}
      {[
        { href: "https://github.com/sosthene14", icon: Github, label: "GitHub", external: true },
        { href: "https://sosthenemounsambote.com", icon: Globe, label: "Portfolio", external: true },
        { href: "mailto:sosthenemounsambote14@gmail.com", icon: Mail, label: "Email", external: false },
      ].map(({ href, icon: Icon, label, external }) => (
          <a
          key={label}
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className="flex items-center gap-1.5 px-3 py-1.5 pointer-events-auto"
          style={{ ...glass, textDecoration: "none" }}
        >
          <Icon className="w-3.5 h-3.5" style={{ color: "#a8c7fa" }} />
          <span className="text-md text-white">{label}</span>
        </a>
      ))}
    </div>
  )
}
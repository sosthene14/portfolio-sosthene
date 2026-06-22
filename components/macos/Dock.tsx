"use client"

import { useState } from "react"
import {
  Folder,
  Globe,
  Mail,
  Calendar,
  MessageSquare,
  Camera,
  Settings,
  Terminal,
  FileText,
  Map,
} from "lucide-react"

interface DockItemProps {
  icon: React.ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
  color?: string
}

function DockItem({ icon, label, isActive, onClick, color = "#1e1e22" }: DockItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="relative group flex-shrink-0">
      {/* Tooltip */}
      <div
        className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(4px)",
          transition: "opacity 0.15s, transform 0.15s",
        }}
      >
        <div
          className="px-2.5 py-1 rounded-md text-xs font-medium"
          style={{
            background: "#2a2a32",
            color: "#eeeef2",
            border: "1px solid #3a3a45",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
          }}
        >
          {label}
        </div>
      </div>

      {/* Icon */}
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-center justify-center text-white transition-all duration-200"
        style={{
          width: "44px",
          height: "44px",
          borderRadius: "12px",
          background: color,
          transform: isHovered ? "scale(1.2) translateY(-6px)" : "scale(1) translateY(0)",
          transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          boxShadow: isHovered
            ? "0 8px 24px rgba(0,0,0,0.5)"
            : "0 2px 8px rgba(0,0,0,0.3)",
        }}
      >
        {icon}
      </button>

      {/* Active dot */}
      {isActive && (
        <div
          className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "#a8c7fa" }}
        />
      )}
    </div>
  )
}

interface DockProps {
  onOpenFinder: () => void
  onOpenApp: (appName: string) => void
  onOpenWallpaperSettings: () => void
  minimizedWindows: Array<{ id: string; title: string; type: string }>
  onRestoreWindow: (id: string) => void
}

export function Dock({ onOpenFinder, onOpenApp, onOpenWallpaperSettings, minimizedWindows, onRestoreWindow }: DockProps) {
  const apps = [
    {
      icon: <Folder className="w-6 h-6" />,
      label: "Finder",
      color: "#1e4a8a",
      isActive: true,
      onClick: onOpenFinder,
    },
    {
      icon: <Globe className="w-6 h-6" />,
      label: "Safari",
      color: "#1a3a5c",
      onClick: () => onOpenApp("Safari"),
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Mail",
      color: "#1a3560",
      onClick: () => onOpenApp("Mail"),
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      label: "Messages",
      color: "#1a4a2a",
      onClick: () => onOpenApp("Messages"),
    },
    {
      icon: <Map className="w-6 h-6" />,
      label: "Plans",
      color: "#1a3d20",
      onClick: () => onOpenApp("Plans"),
    },
    {
      icon: <Camera className="w-6 h-6" />,
      label: "Photos",
      color: "#3a2040",
      onClick: () => onOpenApp("Photos"),
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      label: "Calendrier",
      color: "#4a1a1a",
      onClick: () => onOpenApp("Calendrier"),
    },
    {
      icon: <FileText className="w-6 h-6" />,
      label: "Notes",
      color: "#3a3010",
      onClick: () => onOpenApp("Notes"),
    },
    {
      icon: (
        <img src="/spotify.png" alt="Spotify" className="w-6 h-6" />
      ),
      label: "Spotify",
      color: "#0f3320",
      onClick: () => onOpenApp("Spotify"),
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      label: "Terminal",
      color: "#1a1a1a",
      onClick: () => onOpenApp("Terminal"),
    },
    {
      icon: <Settings className="w-6 h-6" />,
      label: "Préférences",
      color: "#252528",
      onClick: onOpenWallpaperSettings,
    },
  ]

  const Separator = () => (
    <div
      className="flex-shrink-0 self-stretch my-1"
      style={{ width: "1px", background: "#2e2e38" }}
    />
  )

  return (
    <div
      className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40"
      style={{ maxWidth: "calc(100vw - 24px)" }}
    >
      {/* Scrollable container — scrollbar hidden */}
      <div
        className="overflow-x-auto"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        } as React.CSSProperties}
      >
        <style>{`.dock-scroll::-webkit-scrollbar { display: none; }`}</style>

        <div
          className="dock-scroll flex items-end gap-1.5 px-3 py-2.5 rounded-2xl"
          style={{
            background: "rgba(22, 22, 26, 0.85)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid #2a2a32",
            boxShadow: "0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.04)",
            width: "max-content",
          }}
        >
          {/* Main apps */}
          {apps.slice(0, 6).map((app) => (
            <DockItem
              key={app.label}
              icon={app.icon}
              label={app.label}
              color={app.color}
              isActive={app.isActive}
              onClick={app.onClick}
            />
          ))}

          <Separator />

          {apps.slice(6).map((app) => (
            <DockItem
              key={app.label}
              icon={app.icon}
              label={app.label}
              color={app.color}
              onClick={app.onClick}
            />
          ))}

          {/* Minimized windows */}
          {minimizedWindows.length > 0 && (
            <>
              <Separator />
              {minimizedWindows.map((win) => (
                <DockItem
                  key={win.id}
                  icon={
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center text-xs font-bold"
                      style={{
                        background: "#1e1e22",
                        border: "1px solid #27272d",
                        color: "#a8c7fa",
                        fontFamily: "'SF Mono', monospace",
                      }}
                    >
                      {win.title.charAt(0)}
                    </div>
                  }
                  label={win.title}
                  color="#1e1e22"
                  onClick={() => onRestoreWindow(win.id)}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
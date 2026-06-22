"use client"

import { useState } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  isMobile?: boolean
  onClick?: () => void
  onDoubleClick?: () => void
}

function DesktopIcon({ icon, label, isMobile, onClick, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)
  // Pas de surlignage persistant sur mobile (un tap ouvre directement)
  const showSelected = isSelected && !isMobile

  return (
    <button
      onClick={(e) => {
        if (isMobile) {
          ;(e.currentTarget as HTMLButtonElement).blur()
        } else {
          setIsSelected(true)
        }
        onClick?.()
      }}
      onDoubleClick={onDoubleClick}
      onBlur={() => setIsSelected(false)}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-20 focus:outline-none ${
        showSelected ? "bg-macos-blue/30" : "hover:bg-foreground/5"
      }`}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <span
        className={`text-xs text-center leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
          showSelected ? "bg-macos-blue px-1.5 py-0.5 rounded" : ""
        }`}
      >
        {label}
      </span>
    </button>
  )
}

interface DesktopIconsProps {
  onOpenSection: (section: string) => void
}

const desktopApps = [
  { 
    id: "about", 
    name: "À propos", 
    icon: "/person.png"
  },
  { 
    id: "experience", 
    name: "Expériences", 
    icon: "/briefcase.png"
  },
  { 
    id: "education", 
    name: "Formation", 
    icon: "/education.png"
  },
  { 
    id: "skills", 
    name: "Compétences", 
    icon: "/code.png"
  },
  { 
    id: "projects", 
    name: "Projets", 
    icon: "/project.png"
  },
  { 
    id: "contact", 
    name: "Contact", 
    icon: "/contact.png"
  },
  { 
    id: "game",
    name: "Aviator",
    icon: "/aviator.png"
  },
  { 
    id: "cv", 
    name: "Mon CV", 
    icon: "/document.png"
  },
]

export function DesktopIcons({ onOpenSection }: DesktopIconsProps) {
  const isMobile = useIsMobile()

  return (
    <div className="fixed top-12 mt-10 md:mt-0 bottom-28 md:bottom-auto left-0 right-0 md:right-auto md:left-6 z-10 overflow-y-auto md:overflow-visible pb-4">
      <div className="grid grid-cols-2 w-max content-start items-start gap-2">
        {desktopApps.map((app) => (
          <DesktopIcon
            key={app.id}
            icon={
              <img
                src={app.icon}
                alt={app.name}
                className="w-16 h-16 drop-shadow-lg"
              />
            }
            label={app.name}
            isMobile={isMobile}
            // Mobile : ouvre au simple tap ; Desktop : double-clic (style macOS)
            onClick={isMobile ? () => onOpenSection(app.id) : undefined}
            onDoubleClick={() => onOpenSection(app.id)}
          />
        ))}
      </div>
    </div>
  )
}

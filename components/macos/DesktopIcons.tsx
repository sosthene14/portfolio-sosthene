"use client"

import { useState } from "react"

interface DesktopIconProps {
  icon: React.ReactNode
  label: string
  onClick?: () => void
  onDoubleClick?: () => void
}

function DesktopIcon({ icon, label, onClick, onDoubleClick }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false)

  return (
    <button
      onClick={() => {
        setIsSelected(true)
        onClick?.()
      }}
      onDoubleClick={onDoubleClick}
      onBlur={() => setIsSelected(false)}
      className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-20 ${
        isSelected ? "bg-macos-blue/30" : "hover:bg-foreground/5"
      }`}
    >
      <div className="w-16 h-16 flex items-center justify-center">
        {icon}
      </div>
      <span
        className={`text-xs text-center leading-tight text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] ${
          isSelected ? "bg-macos-blue px-1.5 py-0.5 rounded" : ""
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
    name: "Snake", 
    icon: "/snake.png"
  },
  { 
    id: "cv", 
    name: "Mon CV", 
    icon: "/document.png"
  },
]

export function DesktopIcons({ onOpenSection }: DesktopIconsProps) {
  return (
    <div className="fixed top-12 mt-10 md:mt-0 left-0 md:left-6 grid grid-cols-2 items-center gap-2 z-10">
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
          onDoubleClick={() => onOpenSection(app.id)}
        />
      ))}
    </div>
  )
}

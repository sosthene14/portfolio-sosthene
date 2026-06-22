import { useState, useCallback } from "react"
import { MenuBar } from "@/components/macos/MenuBar"
import { Dock } from "@/components/macos/Dock"
import { Window } from "@/components/macos/Window"
import { FinderWindow } from "@/components/macos/FinderWindow"
import { DesktopIcons } from "@/components/macos/DesktopIcons"
import { TerminalWindow } from "@/components/macos/TerminalWindow"
import { NotesWindow } from "@/components/macos/NotesWindow"
import { AboutWindow } from "@/components/macos/AboutWindow"
import { ExperienceWindow } from "@/components/macos/ExperienceWindow"
import { EducationWindow } from "@/components/macos/EducationWindow"
import { SkillsWindow } from "@/components/macos/SkillsWindow"
import { ContactWindow } from "@/components/macos/ContactWindow"
import { SpotifyWindow } from "@/components/macos/SpotifyWindow"
import { CalendarWindow } from "@/components/macos/CalendarWindow"
import { PhotosWindow } from "@/components/macos/PhotosWindow"
import { ProjectsWindow } from "@/components/macos/ProjectsWindow"
import { GameWindow } from "@/components/macos/GameWindow"
import { WallpaperSettings } from "@/components/macos/WallpaperSettings"
import { DesktopWidgets } from "@/components/macos/DesktopWidgets"
import { WelcomeMessage } from "@/components/macos/WelcomeMessage"
import { useWallpaper } from "@/hooks/use-wallpaper"
import { Settings } from "lucide-react"
import { MobileWidgets } from "@/components/macos/MobileWidget"

interface OpenWindow {
  id: string
  title: string
  type: "finder" | "terminal" | "notes" | "about" | "experience" | "education" | "skills" | "contact" | "cv" | "spotify" | "calendar" | "photos" | "projects" | "game" | "app"
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized?: boolean
}

function App() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([])
  const [focusedWindow, setFocusedWindow] = useState<string>("")
  const [isWallpaperSettingsOpen, setIsWallpaperSettingsOpen] = useState(false)
  
  const { wallpaper, updateWallpaper, getWallpaperStyle } = useWallpaper()

  const openWindow = useCallback((type: OpenWindow["type"], title: string) => {
    // Check if window of this type already exists
    const existingWindow = openWindows.find((w) => w.type === type)
    if (existingWindow) {
      setFocusedWindow(existingWindow.id)
      return
    }

    const id = `${type}-${Date.now()}`
    const offset = openWindows.length * 30
    
    let size = { width: 900, height: 600 }
    if (type === "terminal") {
      size = { width: 700, height: 450 }
    } else if (type === "notes") {
      size = { width: 900, height: 550 }
    } else if (type === "about" || type === "contact") {
      size = { width: 1000, height: 650 }
    } else if (type === "experience" || type === "education") {
      size = { width: 950, height: 700 }
    } else if (type === "skills") {
      size = { width: 1100, height: 700 }
    } else if (type === "projects") {
      size = { width: 1150, height: 750 }
    } else if (type === "game") {
      size = { width: 800, height: 900 }
    } else if (type === "cv") {
      // Open CV in new tab
      window.open("/CV_Sosthene_Mounsambote.pdf", "_blank")
      return
    }
    
    setOpenWindows((prev) => [
      ...prev,
      {
        id,
        title,
        type,
        position: { x: 50 + offset, y: 40 + offset },
        size,
      },
    ])
    setFocusedWindow(id)
  }, [openWindows])

  const closeWindow = useCallback((id: string) => {
    setOpenWindows((prev) => prev.filter((w) => w.id !== id))
    const remaining = openWindows.filter((w) => w.id !== id)
    setFocusedWindow(remaining[remaining.length - 1]?.id || "")
  }, [openWindows])

  const minimizeWindow = useCallback((id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: true } : w))
    )
  }, [])

  const restoreWindow = useCallback((id: string) => {
    setOpenWindows((prev) =>
      prev.map((w) => (w.id === id ? { ...w, isMinimized: false } : w))
    )
    setFocusedWindow(id)
  }, [])

  const handleOpenSection = useCallback((section: string) => {
    const titles: Record<string, string> = {
      about: "À propos de moi",
      experience: "Expériences",
      education: "Formation",
      skills: "Compétences",
      projects: "Mes Projets",
      contact: "Contact",
      game: "Snake Game 🐍",
      cv: "Mon CV",
    }
    openWindow(section as OpenWindow["type"], titles[section] || section)
  }, [openWindow])

  const handleOpenFinder = useCallback(() => {
    const existingFinder = openWindows.find((w) => w.type === "finder")
    if (existingFinder) {
      setFocusedWindow(existingFinder.id)
    } else {
      openWindow("finder", "Finder")
    }
  }, [openWindows, openWindow])

  const handleOpenApp = useCallback((appName: string) => {
    if (appName === "Terminal") {
      openWindow("terminal", "Terminal")
    } else if (appName === "Notes") {
      openWindow("notes", "Notes")
    } else if (appName === "Spotify") {
      openWindow("spotify", "Spotify")
    } else if (appName === "Calendrier") {
      openWindow("calendar", "Calendrier")
    } else if (appName === "Photos") {
      openWindow("photos", "Photos")
    } else {
      // Generic app placeholder
      openWindow("app", appName)
    }
  }, [openWindow])

  const getWindowZIndex = (id: string) => {
    if (id === focusedWindow) return 50
    const index = openWindows.findIndex((w) => w.id === id)
    return 10 + index
  }

  const renderWindowContent = (window: OpenWindow) => {
    switch (window.type) {
      case "finder":
        return <FinderWindow />
      case "terminal":
        return <TerminalWindow />
      case "notes":
        return <NotesWindow />
      case "about":
        return <AboutWindow />
      case "experience":
        return <ExperienceWindow />
      case "education":
        return <EducationWindow />
      case "skills":
        return <SkillsWindow />
      case "projects":
        return <ProjectsWindow />
      case "contact":
        return <ContactWindow />
      case "spotify":
        return <SpotifyWindow />
      case "calendar":
        return <CalendarWindow />
      case "photos":
        return <PhotosWindow />
      case "game":
        return <GameWindow />
      case "app":
        return (
          <div className="flex items-center justify-center h-full bg-macos-window text-muted-foreground">
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <p className="text-lg font-medium">{window.title}</p>
              <p className="text-sm">Cette application n&apos;est pas encore disponible</p>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden select-none relative"
      style={getWallpaperStyle()}
    >
      {/* Menu Bar */}
      <MenuBar />
       <WelcomeMessage />
      <div className="mt-10 md:mt-0">
          {/* Welcome Message */}
     

      {/* Desktop Icons */}
      <DesktopIcons onOpenSection={handleOpenSection} />
    <MobileWidgets />
      </div>

      {/* Desktop Widgets */}
      <DesktopWidgets />

       


      {/* Wallpaper Settings Button */}
      <button
        onClick={() => setIsWallpaperSettingsOpen(true)}
        className="fixed bottom-24 right-6 w-12 h-12 bg-macos-window/80 hover:bg-macos-window macos-glass backdrop-blur-xl rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 z-40"
        title="Modifier le fond d'écran"
      >
        <Settings className="w-5 h-5 text-foreground" />
      </button>

      {/* Wallpaper Settings Modal */}
      <WallpaperSettings
        isOpen={isWallpaperSettingsOpen}
        onClose={() => setIsWallpaperSettingsOpen(false)}
        onWallpaperChange={updateWallpaper}
        currentWallpaper={wallpaper}
      />

      {/* Windows */}
      {openWindows.map((window) => (
        <Window
          key={window.id}
          title={window.title}
          isOpen={!window.isMinimized}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => minimizeWindow(window.id)}
          initialPosition={window.position}
          initialSize={window.size}
          zIndex={getWindowZIndex(window.id)}
          onFocus={() => setFocusedWindow(window.id)}
        >
          {renderWindowContent(window)}
        </Window>
      ))}

      {/* Dock */}
      <Dock 
        onOpenFinder={handleOpenFinder} 
        onOpenApp={handleOpenApp}
        onOpenWallpaperSettings={() => setIsWallpaperSettingsOpen(true)}
        minimizedWindows={openWindows.filter(w => w.isMinimized).map(w => ({ id: w.id, title: w.title, type: w.type }))}
        onRestoreWindow={restoreWindow}
      />
    </div>
  )
}

export default App

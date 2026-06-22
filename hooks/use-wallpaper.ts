import { useState, useEffect } from "react"

export interface WallpaperConfig {
  type: "gradient" | "color" | "image"
  value: string
}

const DEFAULT_WALLPAPER: WallpaperConfig = {
  type: "color",
  value: "#000000",
}

const STORAGE_KEY = "macos-wallpaper"

export function useWallpaper() {
  const [wallpaper, setWallpaper] = useState<WallpaperConfig>(DEFAULT_WALLPAPER)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setWallpaper(parsed)
      } catch (error) {
        console.error("Failed to parse wallpaper config:", error)
      }
    }
  }, [])

  // Save to localStorage when wallpaper changes
  const updateWallpaper = (newWallpaper: WallpaperConfig) => {
    setWallpaper(newWallpaper)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newWallpaper))
  }

  // Get CSS style for the wallpaper
  const getWallpaperStyle = (): React.CSSProperties => {
    switch (wallpaper.type) {
      case "gradient":
        return { background: wallpaper.value }
      case "color":
        return { backgroundColor: wallpaper.value }
      case "image":
        return {
          backgroundImage: `url(${wallpaper.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      default:
        return {}
    }
  }

  return {
    wallpaper,
    updateWallpaper,
    getWallpaperStyle,
  }
}

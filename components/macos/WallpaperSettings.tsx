"use client"

import { useState, useEffect } from "react"
import { X, Image, Palette } from "lucide-react"

interface WallpaperSettingsProps {
  isOpen: boolean
  onClose: () => void
  onWallpaperChange: (wallpaper: WallpaperConfig) => void
  currentWallpaper: WallpaperConfig
}

export interface WallpaperConfig {
  type: "gradient" | "color" | "image"
  value: string
}

const presetGradients = [
  {
    name: "Sonoma (Default)",
    value:
      "linear-gradient(135deg, oklch(0.75 0.15 280) 0%, oklch(0.7 0.18 320) 25%, oklch(0.8 0.12 35) 50%, oklch(0.75 0.15 200) 75%, oklch(0.7 0.18 250) 100%)",
  },
  {
    name: "Ventura",
    value:
      "linear-gradient(135deg, oklch(0.7 0.2 250) 0%, oklch(0.75 0.15 200) 50%, oklch(0.8 0.1 150) 100%)",
  },
  {
    name: "Monterey",
    value:
      "linear-gradient(135deg, oklch(0.6 0.25 280) 0%, oklch(0.7 0.2 220) 50%, oklch(0.75 0.15 180) 100%)",
  },
  {
    name: "Big Sur",
    value:
      "linear-gradient(135deg, oklch(0.5 0.3 200) 0%, oklch(0.65 0.25 250) 50%, oklch(0.8 0.15 300) 100%)",
  },
]

const presetColors = [
  { name: "Bleu", value: "#0066CC" },
  { name: "Violet", value: "#8B5CF6" },
  { name: "Rose", value: "#EC4899" },
  { name: "Vert", value: "#10B981" },
  { name: "Orange", value: "#F97316" },
  { name: "Noir", value: "#000000" },
]

export function WallpaperSettings({
  isOpen,
  onClose,
  onWallpaperChange,
  currentWallpaper,
}: WallpaperSettingsProps) {
  const [activeTab, setActiveTab] = useState<"gradient" | "color" | "image">("gradient")
  const [imageUrl, setImageUrl] = useState("")
  const [customColor, setCustomColor] = useState("#0066CC")

  if (!isOpen) return null

  const handleGradientSelect = (gradient: string) => {
    onWallpaperChange({ type: "gradient", value: gradient })
  }

  const handleColorSelect = (color: string) => {
    onWallpaperChange({ type: "color", value: color })
  }

  const handleImageUrlSubmit = () => {
    if (imageUrl.trim()) {
      onWallpaperChange({ type: "image", value: imageUrl })
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64 = reader.result as string
        onWallpaperChange({ type: "image", value: base64 })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-100 flex items-center justify-center">
      <div className="bg-macos-window macos-glass macos-window-shadow rounded-xl mx-4 w-[400px] md:w-[600px] max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border/50">
          <h2 className="text-lg font-semibold">Personnaliser le fond d'écran</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border/50">
          <button
            onClick={() => setActiveTab("gradient")}
            className={`flex-1 px-4 py-3 font-medium transition-colors ${
              activeTab === "gradient"
                ? "bg-muted text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette className="w-4 h-4 hidden sm:inline mr-2" />
            Dégradés
          </button>
          <button
            onClick={() => setActiveTab("color")}
            className={`flex-1 px-4 py-3 font-medium transition-colors ${
              activeTab === "color"
                ? "bg-muted text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Palette className="w-4 h-4  hidden sm:inline mr-2" />
            Couleurs
          </button>
          <button
            onClick={() => setActiveTab("image")}
            className={`flex-1 px-4 py-3 font-medium transition-colors ${
              activeTab === "image"
                ? "bg-muted text-foreground border-b-2 border-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Image className="w-4 h-4 hidden sm:inline mr-2" />
            Image
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[calc(80vh-120px)] overflow-y-auto">
          {activeTab === "gradient" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choisissez un dégradé inspiré des versions de macOS
              </p>
              <div className="grid grid-cols-2 gap-4">
                {presetGradients.map((gradient) => (
                  <button
                    key={gradient.name}
                    onClick={() => handleGradientSelect(gradient.value)}
                    className={`h-32 rounded-lg border-2 transition-all hover:scale-105 ${
                      currentWallpaper.type === "gradient" &&
                      currentWallpaper.value === gradient.value
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                    style={{ background: gradient.value }}
                  >
                    <div className="h-full flex items-end p-3">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-sm font-medium">
                        {gradient.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {activeTab === "color" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Choisissez une couleur unie pour votre fond d'écran
              </p>
              <div className="grid grid-cols-3 gap-4">
                {presetColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => handleColorSelect(color.value)}
                    className={`h-24 rounded-lg border-2 transition-all hover:scale-105 ${
                      currentWallpaper.type === "color" &&
                      currentWallpaper.value === color.value
                        ? "border-primary ring-2 ring-primary/50"
                        : "border-border/50 hover:border-primary/50"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="h-full flex items-end p-3">
                      <span className="bg-black/50 text-white px-2 py-1 rounded text-xs font-medium">
                        {color.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="pt-4 border-t border-border/50">
                <label className="block text-sm font-medium mb-2">Couleur personnalisée</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    className="w-16 h-10 rounded border border-border/50 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={customColor}
                    onChange={(e) => setCustomColor(e.target.value)}
                    placeholder="#0066CC"
                    className="flex-1 px-3 py-2 bg-muted border border-border/50 rounded text-sm"
                  />
                  <button
                    onClick={() => handleColorSelect(customColor)}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "image" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">URL de l'image</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://exemple.com/image.jpg"
                    className="flex-1 px-3 py-2 bg-muted border border-border/50 rounded text-sm"
                  />
                  <button
                    onClick={handleImageUrlSubmit}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors"
                  >
                    Appliquer
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-macos-window px-2 text-muted-foreground">Ou</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Télécharger une image</label>
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border/50 rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                  <Image className="w-8 h-8 text-muted-foreground mb-2" />
                  <span className="text-sm text-muted-foreground">
                    Cliquez pour sélectionner une image
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>

              {currentWallpaper.type === "image" && (
                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm font-medium mb-2">Aperçu actuel :</p>
                  <div
                    className="h-32 rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${currentWallpaper.value})` }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

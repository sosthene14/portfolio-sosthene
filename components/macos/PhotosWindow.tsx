"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Grid3x3, Image as ImageIcon, Heart, Share2, Search, Camera, X, Circle } from "lucide-react"

interface Photo {
  id: string
  title: string
  category: string
  url: string
  date: string
  description?: string
}

export function PhotosWindow() {
  const [selectedCategory, setSelectedCategory] = useState("Tous les projets")
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)

  // --- Caméra (webcam) ---
  const [cameraOpen, setCameraOpen] = useState(false)
  const [camError, setCamError] = useState<string | null>(null)
  const [shots, setShots] = useState<string[]>([])
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  const openCamera = useCallback(async () => {
    setCamError(null)
    setCameraOpen(true)
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play().catch(() => {})
      }
    } catch {
      setCamError(
        "Impossible d'accéder à la caméra. Autorise l'accès dans ton navigateur (et utilise une connexion sécurisée)."
      )
    }
  }, [])

  const closeCamera = useCallback(() => {
    stopCamera()
    setCameraOpen(false)
    setCamError(null)
  }, [stopCamera])

  const takeShot = useCallback(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas || !video.videoWidth) return
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    ctx.drawImage(video, 0, 0)
    setShots((prev) => [canvas.toDataURL("image/jpeg", 0.9), ...prev])
  }, [])

  // Ré-attache le flux à la vidéo si besoin, et nettoie au démontage
  useEffect(() => {
    if (cameraOpen && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current
    }
  }, [cameraOpen])

  useEffect(() => () => stopCamera(), [stopCamera])

  // Placeholder photos - vous pouvez remplacer par vos vrais projets
  const photos: Photo[] = [
    {
      id: "1",
      title: "Portfolio macOS",
      category: "Web Development",
      url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
      date: "Juin 2026",
      description: "Recréation complète de l'interface macOS avec React et TypeScript"
    },
    {
      id: "2",
      title: "Dashboard Analytics",
      category: "Web Development",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
      date: "Mai 2026",
      description: "Dashboard d'analyse de données avec graphiques interactifs"
    },
    {
      id: "3",
      title: "E-commerce Platform",
      category: "Web Development",
      url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800",
      date: "Avril 2026",
      description: "Plateforme e-commerce complète avec paiement intégré"
    },
    {
      id: "4",
      title: "Mobile Banking App",
      category: "Mobile",
      url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
      date: "Mars 2026",
      description: "Application bancaire mobile avec React Native"
    },
    {
      id: "5",
      title: "Task Manager",
      category: "Productivity",
      url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800",
      date: "Février 2026",
      description: "Gestionnaire de tâches moderne avec Drag & Drop"
    },
    {
      id: "6",
      title: "Social Media Dashboard",
      category: "Web Development",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      date: "Janvier 2026",
      description: "Dashboard de gestion des réseaux sociaux"
    },
  ]

  const categories = ["Tous les projets", "Web Development", "Mobile", "Productivity", "Design"]

  const filteredPhotos = selectedCategory === "Tous les projets"
    ? photos
    : photos.filter(p => p.category === selectedCategory)

  return (
    <div className="h-full bg-macos-window flex">
      {/* Sidebar */}
      <div className="hidden md:flex w-56 bg-macos-sidebar border-r border-border/30 flex-col p-4">
        <div className="mb-6">
          <div className="relative mb-4">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher"
              className="w-full h-8 pl-8 pr-3 text-sm bg-foreground/5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Bibliothèque</div>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 text-primary text-sm font-medium">
            <ImageIcon className="w-4 h-4" />
            <span>Photos</span>
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-foreground/5 text-sm">
            <Heart className="w-4 h-4" />
            <span>Favoris</span>
          </button>
        </div>

        <div className="mt-6 space-y-1">
          <div className="text-xs font-semibold text-muted-foreground uppercase mb-2">Catégories</div>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                selectedCategory === cat
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-foreground/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-border/30 flex items-center justify-between px-6">
          <h2 className="text-lg font-semibold truncate">{selectedCategory}</h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={openCamera}
              className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-colors text-sm font-medium flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span className="hidden sm:inline">Caméra</span>
            </button>
            <button className="p-2 hover:bg-foreground/10 rounded transition-colors hidden sm:block">
              <Grid3x3 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-foreground/10 rounded transition-colors hidden sm:block">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Photos grid */}
        <div className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {/* Photos prises avec la caméra */}
            {selectedCategory === "Tous les projets" &&
              shots.map((src, i) => (
                <button
                  key={`shot-${i}`}
                  onClick={() => setSelectedPhoto({ id: `shot-${i}`, title: "Ma photo", category: "Caméra", url: src, date: "À l'instant" })}
                  className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
                >
                  <img src={src} alt="Photo prise" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-black/60 text-white text-[10px] flex items-center gap-1">
                    <Camera className="w-3 h-3" /> Caméra
                  </span>
                </button>
              ))}
            {filteredPhotos.map(photo => (
              <button
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="font-medium">{photo.title}</div>
                    <div className="text-xs text-white/80">{photo.date}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Camera modal */}
      {cameraOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-2xl flex flex-col">
            <div className="flex items-center justify-between text-white mb-3">
              <span className="font-semibold flex items-center gap-2">
                <Camera className="w-5 h-5" /> Caméra
              </span>
              <button onClick={closeCamera} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex items-center justify-center">
              {camError ? (
                <p className="text-white/80 text-sm text-center px-6">{camError}</p>
              ) : (
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
              )}
            </div>
            <canvas ref={canvasRef} className="hidden" />

            {!camError && (
              <div className="flex items-center justify-center gap-6 mt-4">
                <button
                  onClick={takeShot}
                  className="w-16 h-16 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
                  title="Prendre la photo"
                >
                  <Circle className="w-12 h-12 text-black" strokeWidth={2.5} />
                </button>
              </div>
            )}

            {shots.length > 0 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
                {shots.slice(0, 8).map((src, i) => (
                  <img key={i} src={src} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0 border border-white/20" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Photo detail modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="max-w-5xl max-h-full flex flex-col bg-macos-window rounded-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <div>
                <h3 className="font-semibold text-lg">{selectedPhoto.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedPhoto.category} • {selectedPhoto.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-foreground/10 rounded transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-foreground/10 rounded transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="p-2 hover:bg-foreground/10 rounded transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="w-full h-auto rounded-lg"
              />
              {selectedPhoto.description && (
                <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-semibold mb-2">Description</h4>
                  <p className="text-sm text-muted-foreground">{selectedPhoto.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

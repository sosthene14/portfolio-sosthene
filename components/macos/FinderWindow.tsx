"use client"

import { useState } from "react"
import {
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  Columns,
  Search,
  Folder,
  File,
  Image,
  FileText,
  Music,
  Video,
  Archive,
  HardDrive,
  Cloud,
  Clock,
  Star,
  Download,
  Home,
  Monitor,
  Tag,
} from "lucide-react"

interface FileItem {
  name: string
  type: "folder" | "file" | "image" | "document" | "music" | "video" | "archive"
  size?: string
  modified?: string
}

interface FinderWindowProps {
  onNavigate?: (path: string) => void
}

const sidebarItems = [
  { icon: <Star className="w-4 h-4" />, label: "Favoris", isHeader: true },
  { icon: <Clock className="w-4 h-4 text-blue-500" />, label: "Récents" },
  { icon: <Home className="w-4 h-4 text-blue-500" />, label: "Maison" },
  { icon: <Monitor className="w-4 h-4 text-blue-500" />, label: "Bureau" },
  { icon: <Download className="w-4 h-4 text-blue-500" />, label: "Téléchargements" },
  { icon: <Folder className="w-4 h-4 text-blue-500" />, label: "Documents" },
  { icon: <Image className="w-4 h-4 text-blue-500" />, label: "Images" },
  { icon: <Music className="w-4 h-4 text-pink-500" />, label: "Musique" },
  { icon: <Video className="w-4 h-4 text-purple-500" />, label: "Films" },
  
  { icon: <Cloud className="w-4 h-4" />, label: "iCloud", isHeader: true },
  { icon: <Cloud className="w-4 h-4 text-blue-500" />, label: "iCloud Drive" },
  
  { icon: <HardDrive className="w-4 h-4" />, label: "Emplacements", isHeader: true },
  { icon: <HardDrive className="w-4 h-4 text-gray-500" />, label: "Macintosh HD" },
  
  { icon: <Tag className="w-4 h-4" />, label: "Tags", isHeader: true },
  { icon: <div className="w-3 h-3 rounded-full bg-red-500" />, label: "Rouge" },
  { icon: <div className="w-3 h-3 rounded-full bg-orange-500" />, label: "Orange" },
  { icon: <div className="w-3 h-3 rounded-full bg-yellow-500" />, label: "Jaune" },
  { icon: <div className="w-3 h-3 rounded-full bg-green-500" />, label: "Vert" },
  { icon: <div className="w-3 h-3 rounded-full bg-blue-500" />, label: "Bleu" },
]

const files: FileItem[] = [
  { name: "Documents", type: "folder", modified: "Aujourd'hui" },
  { name: "Bureau", type: "folder", modified: "Hier" },
  { name: "Téléchargements", type: "folder", modified: "Aujourd'hui" },
  { name: "Images", type: "folder", modified: "La semaine dernière" },
  { name: "Musique", type: "folder", modified: "Le mois dernier" },
  { name: "Films", type: "folder", modified: "Le mois dernier" },
  { name: "Applications", type: "folder", modified: "Il y a 2 semaines" },
  { name: "Projet Final.pdf", type: "document", size: "2.4 Mo", modified: "Aujourd'hui" },
  { name: "Photo vacances.jpg", type: "image", size: "4.2 Mo", modified: "Hier" },
  { name: "Présentation.key", type: "document", size: "15.8 Mo", modified: "Hier" },
  { name: "Notes de réunion.txt", type: "document", size: "12 Ko", modified: "Il y a 3 jours" },
  { name: "Archive 2024.zip", type: "archive", size: "1.2 Go", modified: "La semaine dernière" },
  { name: "Podcast.mp3", type: "music", size: "45 Mo", modified: "Il y a 2 semaines" },
  { name: "Tutoriel.mp4", type: "video", size: "250 Mo", modified: "Le mois dernier" },
]

function getFileIcon(type: FileItem["type"]) {
  switch (type) {
    case "folder":
      return <Folder className="w-12 h-12 text-blue-500 fill-blue-400/30" />
    case "image":
      return <Image className="w-12 h-12 text-pink-500" />
    case "document":
      return <FileText className="w-12 h-12 text-blue-600" />
    case "music":
      return <Music className="w-12 h-12 text-red-500" />
    case "video":
      return <Video className="w-12 h-12 text-purple-500" />
    case "archive":
      return <Archive className="w-12 h-12 text-gray-500" />
    default:
      return <File className="w-12 h-12 text-gray-400" />
  }
}

export function FinderWindow({ onNavigate }: FinderWindowProps) {
  const [selectedItem, setSelectedItem] = useState<string | null>(null)
  const [selectedSidebar, setSelectedSidebar] = useState("Maison")
  const [viewMode, setViewMode] = useState<"grid" | "list" | "columns">("grid")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex h-full bg-macos-window">
      {/* Sidebar */}
      <div className="w-56 bg-macos-sidebar border-r border-border/30 overflow-y-auto">
        <div className="py-2">
          {sidebarItems.map((item, index) => (
            <div key={index}>
              {item.isHeader ? (
                <div className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide mt-2 first:mt-0">
                  {item.label}
                </div>
              ) : (
                <button
                  onClick={() => setSelectedSidebar(item.label)}
                  className={`w-full flex items-center gap-2 px-4 py-1.5 text-[13px] hover:bg-foreground/5 transition-colors ${
                    selectedSidebar === item.label
                      ? "bg-macos-blue/15 text-macos-blue"
                      : "text-foreground/80"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="h-11 border-b border-border/30 flex items-center justify-between px-3 bg-macos-sidebar/50">
          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 hover:bg-foreground/10 rounded transition-colors text-muted-foreground">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 hover:bg-foreground/10 rounded transition-colors text-muted-foreground">
              <ChevronRight className="w-4 h-4" />
            </button>
            <span className="ml-2 text-sm font-medium">{selectedSidebar}</span>
          </div>

          {/* View controls and search */}
          <div className="flex items-center gap-2">
            <div className="flex bg-foreground/5 rounded-md p-0.5">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "grid" ? "bg-foreground/10" : "hover:bg-foreground/5"
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "list" ? "bg-foreground/10" : "hover:bg-foreground/5"
                }`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("columns")}
                className={`p-1.5 rounded transition-colors ${
                  viewMode === "columns" ? "bg-foreground/10" : "hover:bg-foreground/5"
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>

            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 h-7 pl-8 pr-3 text-sm bg-foreground/5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-macos-blue/50"
              />
            </div>
          </div>
        </div>

        {/* File grid/list */}
        <div className="flex-1 overflow-y-auto p-4">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-6 gap-4">
              {filteredFiles.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedItem(file.name)}
                  onDoubleClick={() => file.type === "folder" && onNavigate?.(file.name)}
                  className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                    selectedItem === file.name
                      ? "bg-macos-blue/20"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  {getFileIcon(file.type)}
                  <span
                    className={`text-xs mt-2 text-center line-clamp-2 ${
                      selectedItem === file.name ? "bg-macos-blue text-white px-1 rounded" : ""
                    }`}
                  >
                    {file.name}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-0.5">
              {/* List header */}
              <div className="grid grid-cols-12 gap-4 px-3 py-2 text-xs font-medium text-muted-foreground border-b border-border/30">
                <div className="col-span-6">Nom</div>
                <div className="col-span-2">Modifié</div>
                <div className="col-span-2">Taille</div>
                <div className="col-span-2">Type</div>
              </div>
              {filteredFiles.map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedItem(file.name)}
                  onDoubleClick={() => file.type === "folder" && onNavigate?.(file.name)}
                  className={`w-full grid grid-cols-12 gap-4 px-3 py-2 text-sm rounded transition-colors ${
                    selectedItem === file.name
                      ? "bg-macos-blue text-white"
                      : "hover:bg-foreground/5"
                  }`}
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <div className="w-5 h-5 flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                    <span className="truncate">{file.name}</span>
                  </div>
                  <div className="col-span-2 text-muted-foreground">{file.modified}</div>
                  <div className="col-span-2 text-muted-foreground">{file.size || "—"}</div>
                  <div className="col-span-2 text-muted-foreground capitalize">{file.type}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="h-6 border-t border-border/30 flex items-center justify-between px-4 text-xs text-muted-foreground bg-macos-sidebar/30">
          <span>{filteredFiles.length} éléments</span>
          <span>12,5 Go disponibles</span>
        </div>
      </div>
    </div>
  )
}

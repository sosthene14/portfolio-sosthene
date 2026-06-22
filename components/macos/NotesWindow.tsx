"use client"

import { useState } from "react"
import { Search, Plus, Folder, FileText, Pin, Trash2 } from "lucide-react"

interface Note {
  id: string
  title: string
  content: string
  folder: string
  date: string
  isPinned?: boolean
}

const initialNotes: Note[] = [
  {
    id: "1",
    title: "Liste de courses",
    content: "- Lait\n- Pain\n- Fromage\n- Fruits\n- Légumes",
    folder: "Personnel",
    date: "Aujourd'hui",
    isPinned: true,
  },
  {
    id: "2",
    title: "Idées de projet",
    content: "Application de gestion de tâches\n- Interface moderne\n- Synchronisation cloud\n- Mode hors ligne",
    folder: "Travail",
    date: "Hier",
  },
  {
    id: "3",
    title: "Notes de réunion",
    content: "Réunion du 1er juin 2026\n\nPoints abordés:\n1. Revue du sprint\n2. Planification Q3\n3. Objectifs annuels",
    folder: "Travail",
    date: "Aujourd'hui",
  },
  {
    id: "4",
    title: "Recette cookies",
    content: "Ingrédients:\n- 200g de farine\n- 100g de beurre\n- 150g de sucre\n- 2 œufs\n- Pépites de chocolat",
    folder: "Personnel",
    date: "La semaine dernière",
  },
]

const folders = ["Toutes les notes", "Personnel", "Travail", "Récemment supprimées"]

export function NotesWindow() {
  const [notes, setNotes] = useState(initialNotes)
  const [selectedFolder, setSelectedFolder] = useState("Toutes les notes")
  const [selectedNote, setSelectedNote] = useState<Note | null>(notes[0])
  const [searchQuery, setSearchQuery] = useState("")

  const filteredNotes = notes.filter((note) => {
    const matchesFolder = selectedFolder === "Toutes les notes" || note.folder === selectedFolder
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFolder && matchesSearch
  })

  const pinnedNotes = filteredNotes.filter((note) => note.isPinned)
  const unpinnedNotes = filteredNotes.filter((note) => !note.isPinned)

  return (
    <div className="flex h-full bg-macos-window">
      {/* Folders sidebar */}
      <div className="w-48 bg-macos-sidebar border-r border-border/30 flex flex-col">
        <div className="p-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-7 pl-8 pr-3 text-sm bg-foreground/5 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-macos-blue/50"
            />
          </div>
        </div>
        
        <div className="flex-1 py-2">
          {folders.map((folder) => (
            <button
              key={folder}
              onClick={() => setSelectedFolder(folder)}
              className={`w-full flex items-center gap-2 px-4 py-1.5 text-[13px] hover:bg-foreground/5 transition-colors ${
                selectedFolder === folder
                  ? "bg-macos-blue/15 text-macos-blue"
                  : "text-foreground/80"
              }`}
            >
              {folder === "Récemment supprimées" ? (
                <Trash2 className="w-4 h-4" />
              ) : (
                <Folder className="w-4 h-4 text-yellow-500 fill-yellow-400/30" />
              )}
              <span>{folder}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Notes list */}
      <div className="w-64 border-r border-border/30 flex flex-col bg-macos-sidebar/50">
        <div className="p-3 border-b border-border/30 flex items-center justify-between">
          <span className="text-sm font-medium">{filteredNotes.length} notes</span>
          <button className="p-1 hover:bg-foreground/10 rounded transition-colors text-macos-blue">
            <Plus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {pinnedNotes.length > 0 && (
            <>
              <div className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                <Pin className="w-3 h-3" />
                Épinglées
              </div>
              {pinnedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isSelected={selectedNote?.id === note.id}
                  onClick={() => setSelectedNote(note)}
                />
              ))}
            </>
          )}
          
          {unpinnedNotes.length > 0 && (
            <>
              {pinnedNotes.length > 0 && (
                <div className="px-4 py-2 text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
                  Notes
                </div>
              )}
              {unpinnedNotes.map((note) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  isSelected={selectedNote?.id === note.id}
                  onClick={() => setSelectedNote(note)}
                />
              ))}
            </>
          )}
        </div>
      </div>

      {/* Note content */}
      <div className="flex-1 flex flex-col bg-[#fffef5]">
        {selectedNote ? (
          <>
            <div className="p-4 border-b border-border/20">
              <div className="text-xs text-muted-foreground mb-2">{selectedNote.date}</div>
              <input
                type="text"
                value={selectedNote.title}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, title: e.target.value })
                }
                className="text-xl font-semibold bg-transparent border-none outline-none w-full text-foreground"
              />
            </div>
            <div className="flex-1 p-4">
              <textarea
                value={selectedNote.content}
                onChange={(e) =>
                  setSelectedNote({ ...selectedNote, content: e.target.value })
                }
                className="w-full h-full bg-transparent border-none outline-none resize-none text-foreground/80 leading-relaxed"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <FileText className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p>Sélectionnez une note</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function NoteItem({
  note,
  isSelected,
  onClick,
}: {
  note: Note
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 border-b border-border/20 transition-colors ${
        isSelected ? "bg-macos-blue text-white" : "hover:bg-foreground/5"
      }`}
    >
      <div className="font-medium text-sm truncate">{note.title}</div>
      <div className={`text-xs mt-1 truncate ${isSelected ? "text-white/70" : "text-muted-foreground"}`}>
        {note.date} · {note.content.substring(0, 30)}...
      </div>
    </button>
  )
}

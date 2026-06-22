"use client"

import { useMemo, useState } from "react"
import {
  ExternalLink,
  Folder,
  FolderOpen,
  Globe,
  LayoutGrid,
  ChevronDown,
  ChevronLeft,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"
import { useIsMobile } from "@/hooks/use-mobile"

interface ProjectsWindowProps {
  onClose?: () => void
}

type Project = {
  id: number
  name: string
  description: string
  technologies: string[]
  category: string
  link: string
  image?: string
}

// Apparence par catégorie (icône + couleur d'accent)
const categoryConfig: Record<string, { icon: LucideIcon; color: string }> = {
  "Web Development": { icon: Globe, color: "#5b9bf3" },
  Productivity: { icon: Folder, color: "#c4b5fd" },
}

export function ProjectsWindow({ onClose }: ProjectsWindowProps) {
  const projects = portfolioData.projects as Project[]
  const isMobile = useIsMobile()

  const [active, setActive] = useState<string>("all")
  const [sort, setSort] = useState<"recent" | "name">("recent")

  const fontStack =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif"

  // Catégories + comptages
  const categories = useMemo(() => {
    const map = new Map<string, number>()
    projects.forEach((p) => map.set(p.category, (map.get(p.category) ?? 0) + 1))
    return Array.from(map.entries()).map(([name, count]) => ({ name, count }))
  }, [projects])

  const visible = useMemo(() => {
    let list = active === "all" ? projects : projects.filter((p) => p.category === active)
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    return list
  }, [projects, active, sort])

  /* ---------- Sidebar ---------- */
  const navItems = [
    { id: "all", label: "Tous les projets", icon: LayoutGrid, count: projects.length },
    ...categories.map((c) => ({
      id: c.name,
      label: c.name,
      icon: categoryConfig[c.name]?.icon ?? Folder,
      count: c.count,
    })),
  ]

  const Sidebar = (
    <div
      className="flex flex-col h-full w-full md:w-[280px] md:flex-shrink-0"
      style={{ background: "#161619", borderRight: "1px solid #232329" }}
    >
      <div className="flex-1 overflow-auto p-3">
        {navItems.map((nav) => {
          const isActive = active === nav.id
          const Icon = nav.icon
          return (
            <button
              key={nav.id}
              onClick={() => setActive(nav.id)}
              className="w-full flex items-center gap-3 rounded-xl px-3.5 py-3 mb-1 transition-colors"
              style={{ background: isActive ? "#222230" : "transparent" }}
              onMouseEnter={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = "#1d1d22"
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  (e.currentTarget as HTMLElement).style.background = "transparent"
              }}
            >
              <Icon
                className="w-[18px] h-[18px] flex-shrink-0"
                style={{ color: isActive ? "#5b9bf3" : "#8a8a96" }}
              />
              <span
                className="flex-1 text-left text-[15px] font-medium truncate"
                style={{ color: isActive ? "#f0f0f2" : "#b4b4be" }}
              >
                {nav.label}
              </span>
              <span className="text-[13px]" style={{ color: "#6b6b75" }}>
                {nav.count}
              </span>
            </button>
          )
        })}
      </div>

      <div
        className="flex items-center gap-3 px-4 py-3.5"
        style={{ borderTop: "1px solid #232329" }}
      >
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: "#1d2636", border: "1px solid #2a3a52" }}
        >
          <FolderOpen className="w-[18px] h-[18px]" style={{ color: "#5b9bf3" }} />
        </div>
        <div className="min-w-0">
          <p className="text-[14px] font-medium" style={{ color: "#e8e8ec" }}>
            {projects.length} projets
          </p>
          <p className="text-[12px]" style={{ color: "#6b6b75" }}>
            Des solutions concrètes à des problèmes réels.
          </p>
        </div>
      </div>
    </div>
  )

  /* ---------- Project card ---------- */
  const Card = ({ project }: { project: Project }) => {
    const conf = categoryConfig[project.category] ?? { icon: Folder, color: "#8a8a96" }
    const CatIcon = conf.icon
    const [imgOk, setImgOk] = useState(true)

    return (
      <div
        className="flex flex-col rounded-2xl overflow-hidden transition-colors"
        style={{ background: "#141418", border: "1px solid #1f1f25" }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "#2e2e38")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLElement).style.borderColor = "#1f1f25")
        }
      >
        {/* Thumbnail */}
        <div className="relative" style={{ aspectRatio: "16 / 9" }}>
          {project.image && imgOk ? (
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center px-3 text-center"
              style={{
                background: `linear-gradient(135deg, ${conf.color}22, #15151a 70%)`,
              }}
            >
              <span
                className="text-base font-bold"
                style={{ color: `${conf.color}cc`, letterSpacing: "-0.01em" }}
              >
                {project.name}
              </span>
            </div>
          )}

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
              style={{
                background: "rgba(20,20,24,0.7)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(40,40,48,0.85)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.background = "rgba(20,20,24,0.7)")
              }
            >
              <ExternalLink className="w-4 h-4" style={{ color: "#e8e8ec" }} />
            </a>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-3.5">
          <h3
            className="text-[15px] font-semibold mb-1"
            style={{ color: "#f4f4f6", letterSpacing: "-0.01em" }}
          >
            {project.name}
          </h3>
          <p className="text-[13px] leading-snug mb-2.5" style={{ color: "#9a9aa4" }}>
            {project.description}
          </p>
          <div className="flex items-center gap-1.5 mb-3">
            <CatIcon className="w-3.5 h-3.5" style={{ color: conf.color }} />
            <span className="text-[12px] font-medium" style={{ color: conf.color }}>
              {project.category}
            </span>
          </div>

          <div className="h-px w-full mb-3 mt-auto" style={{ background: "#1f1f25" }} />

          <div className="flex flex-wrap gap-1.5">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] rounded-md"
                style={{
                  background: "#1c1c22",
                  color: "#b4b4be",
                  border: "1px solid #2a2a31",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  /* ---------- Main ---------- */
  const Main = (
    <div className="flex flex-col h-full flex-1 min-w-0" style={{ background: "#111114" }}>
      <div className="flex-1 overflow-auto px-5 md:px-8 py-6 md:py-8">
        {/* Mobile back */}
        {isMobile && active !== "all" && (
          <button
            onClick={() => setActive("all")}
            className="flex items-center gap-1 mb-5 text-[15px]"
            style={{ color: "#a8c7fa" }}
          >
            <ChevronLeft className="w-5 h-5" />
            Tous les projets
          </button>
        )}

        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
          <div className="flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #1d2636, #15151a)",
                border: "1px solid #2a3a52",
              }}
            >
              <FolderOpen className="w-6 h-6" style={{ color: "#5b9bf3" }} />
            </div>
            <div>
              <h1
                className="text-2xl md:text-[26px] font-bold tracking-tight"
                style={{ color: "#f4f4f6", letterSpacing: "-0.02em" }}
              >
                Mes projets
              </h1>
              <p className="text-[15px] mt-1" style={{ color: "#8a8a96" }}>
                Une sélection de projets personnels et professionnels.
              </p>
            </div>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2.5">
            <span className="text-[14px]" style={{ color: "#8a8a96" }}>
              Trier par
            </span>
            <div
              className="relative flex items-center rounded-lg"
              style={{ background: "#1c1c22", border: "1px solid #2a2a31" }}
            >
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as "recent" | "name")}
                className="appearance-none bg-transparent outline-none text-[14px] pl-3.5 pr-9 py-2 cursor-pointer"
                style={{ color: "#e8e8ec" }}
              >
                <option value="recent" style={{ background: "#1c1c22" }}>
                  Plus récents
                </option>
                <option value="name" style={{ background: "#1c1c22" }}>
                  Nom (A–Z)
                </option>
              </select>
              <ChevronDown
                className="w-4 h-4 absolute right-3 pointer-events-none"
                style={{ color: "#8a8a96" }}
              />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
        >
          {visible.map((project) => (
            <Card key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        className="flex items-center justify-end gap-3 px-5 md:px-8 py-4"
        style={{ borderTop: "1px solid #1f1f25", background: "#131316" }}
      >
        <button
          onClick={onClose}
          className="px-5 py-2 text-[15px] font-medium rounded-lg transition-colors"
          style={{ background: "#26262d", color: "#e8e8ec", border: "1px solid #303039" }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#2e2e36")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.background = "#26262d")
          }
        >
          Fermer
        </button>
      </div>
    </div>
  )

  return (
    <div
      className="flex h-full w-full overflow-hidden"
      style={{ background: "#111114", fontFamily: fontStack }}
    >
      {isMobile ? (
        active === "all" ? (
          <div className="flex flex-col h-full w-full">
            <div
              className="flex gap-2 overflow-x-auto px-3 py-3 flex-shrink-0"
              style={{ background: "#161619", borderBottom: "1px solid #232329" }}
            >
              {navItems.map((nav) => {
                const Icon = nav.icon
                return (
                  <button
                    key={nav.id}
                    onClick={() => setActive(nav.id)}
                    className="flex items-center gap-2 rounded-lg px-3 py-2 flex-shrink-0"
                    style={{ background: "#202026", border: "1px solid #2a2a31" }}
                  >
                    <Icon className="w-4 h-4" style={{ color: "#8a8a96" }} />
                    <span className="text-[14px]" style={{ color: "#d4d4dc" }}>
                      {nav.label}
                    </span>
                    <span className="text-[12px]" style={{ color: "#6b6b75" }}>
                      {nav.count}
                    </span>
                  </button>
                )
              })}
            </div>
            {Main}
          </div>
        ) : (
          Main
        )
      ) : (
        <>
          {Sidebar}
          {Main}
        </>
      )}
    </div>
  )
}

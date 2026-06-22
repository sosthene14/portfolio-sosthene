"use client"

import { useState } from "react"
import {
  Code2,
  Monitor,
  Server,
  Database,
  Wrench,
  Network,
  LayoutGrid,
  Sparkles,
  ChevronLeft,
  type LucideIcon,
} from "lucide-react"
import type { IconType } from "react-icons"
import * as SiIcons from "react-icons/si"
import * as FaIcons from "react-icons/fa"
import { portfolioData } from "@/data/portfolio-data"
import { useIsMobile } from "@/hooks/use-mobile"

type SkillItem = {
  name: string
  mono: string
  color: string
  level: number
  icon?: string
}

// Résout "si:SiTypescript" / "fa:FaJava" vers le composant react-icons,
// avec retour au monogramme si le logo n'existe pas.
function resolveIcon(icon?: string): IconType | null {
  if (!icon) return null
  const [pack, name] = icon.split(":")
  const set = pack === "fa" ? (FaIcons as Record<string, IconType>) : (SiIcons as Record<string, IconType>)
  return set[name] ?? null
}
type SkillCategory = { id: string; label: string; icon: string; items: SkillItem[] }

const MAX_LEVEL = 5
const VISIBLE_IN_ALL = 5

const iconMap: Record<string, LucideIcon> = {
  code: Code2,
  monitor: Monitor,
  server: Server,
  database: Database,
  wrench: Wrench,
  network: Network,
}

export function SkillsWindow() {
  const categories = portfolioData.skillCategories as SkillCategory[]
  const isMobile = useIsMobile()

  const [active, setActive] = useState<string>("all")
  const total = categories.reduce((n, c) => n + c.items.length, 0)

  const fontStack =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif"

  /* ---------- Sub-components ---------- */
  const LevelDots = ({ level, color }: { level: number; color: string }) => (
    <div className="flex gap-1 mt-1.5">
      {Array.from({ length: MAX_LEVEL }).map((_, i) => (
        <span
          key={i}
          className="w-[6px] h-[6px] rounded-full"
          style={{ background: i < level ? color : "#2e2e35" }}
        />
      ))}
    </div>
  )

  const IconBadge = ({ item }: { item: SkillItem }) => {
    const Logo = resolveIcon(item.icon)
    return (
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-[12px]"
        style={{
          background: `${item.color}1a`,
          border: `1px solid ${item.color}33`,
          color: item.color,
        }}
      >
        {Logo ? <Logo className="w-[19px] h-[19px]" /> : item.mono}
      </div>
    )
  }

  const SkillChip = ({ item }: { item: SkillItem }) => (
    <div
      className="flex items-center gap-3 rounded-xl px-3.5 py-3 transition-colors"
      style={{ background: "#16161b", border: "1px solid #232329" }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "#33333c")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLElement).style.borderColor = "#232329")
      }
    >
      <IconBadge item={item} />
      <div className="min-w-0">
        <p className="text-[15px] font-medium truncate" style={{ color: "#e8e8ec" }}>
          {item.name}
        </p>
        <LevelDots level={item.level} color={item.color} />
      </div>
    </div>
  )

  const MoreChip = ({ count, catId }: { count: number; catId: string }) => (
    <button
      onClick={() => setActive(catId)}
      className="flex items-center justify-center rounded-xl px-3.5 py-3 text-[15px] font-medium transition-colors"
      style={{ background: "#15151a", border: "1px dashed #2e2e36", color: "#7a7a85" }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLElement).style.color = "#a8c7fa"
        ;(e.currentTarget as HTMLElement).style.borderColor = "#3a3a45"
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLElement).style.color = "#7a7a85"
        ;(e.currentTarget as HTMLElement).style.borderColor = "#2e2e36"
      }}
    >
      +{count}
    </button>
  )

  const CategorySection = ({
    cat,
    truncate,
  }: {
    cat: SkillCategory
    truncate: boolean
  }) => {
    const Icon = iconMap[cat.icon] ?? Code2
    const shown = truncate ? cat.items.slice(0, VISIBLE_IN_ALL) : cat.items
    const hidden = cat.items.length - shown.length

    return (
      <div>
        <div className="flex items-center gap-2 mb-3.5">
          <Icon className="w-[18px] h-[18px]" style={{ color: "#8a8a96" }} />
          <h3 className="text-[16px] font-semibold" style={{ color: "#e8e8ec" }}>
            {cat.label}
          </h3>
        </div>
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))" }}
        >
          {shown.map((item) => (
            <SkillChip key={item.name} item={item} />
          ))}
          {truncate && hidden > 0 && <MoreChip count={hidden} catId={cat.id} />}
        </div>
      </div>
    )
  }

  /* ---------- Sidebar ---------- */
  const navItems = [
    { id: "all", label: "Toutes", icon: LayoutGrid, count: total },
    ...categories.map((c) => ({
      id: c.id,
      label: c.label,
      icon: iconMap[c.icon] ?? Code2,
      count: c.items.length,
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
                className="flex-1 text-left text-[15px] font-medium"
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

    
    </div>
  )

  /* ---------- Main content ---------- */
  const shownCategories =
    active === "all" ? categories : categories.filter((c) => c.id === active)

  const Main = (
    <div className="flex flex-col h-full flex-1 min-w-0" style={{ background: "#111114" }}>
      <div className="flex-1 overflow-auto px-5 md:px-8 py-6 md:py-8">
        {/* Mobile back button */}
        {isMobile && active !== "all" && (
          <button
            onClick={() => setActive("all")}
            className="flex items-center gap-1 mb-5 text-[15px]"
            style={{ color: "#a8c7fa" }}
          >
            <ChevronLeft className="w-5 h-5" />
            Toutes
          </button>
        )}

        {/* Header */}
        <div className="flex items-start gap-4 mb-7">
          <div
            className="w-12 h-12 rounded-xl hidden md:flex items-center justify-center flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #1d2636, #15151a)",
              border: "1px solid #2a3a52",
            }}
          >
            <Sparkles className="w-6 h-6 hidden md:block" style={{ color: "#5b9bf3" }} />
          </div>
          <div>
            <h1
              className="text-2xl md:text-[26px] font-bold tracking-tight"
              style={{ color: "#f4f4f6", letterSpacing: "-0.02em" }}
            >
              Mes compétences
            </h1>
            <p className="text-[15px] mt-1" style={{ color: "#8a8a96" }}>
              Un aperçu de mes compétences techniques et outils que j'utilise au quotidien.
            </p>
          </div>
        </div>

        {/* Big card with sections */}
        <div
          className="rounded-2xl p-5 md:p-7 space-y-7"
          style={{ background: "#141418", border: "1px solid #1f1f25" }}
        >
          {shownCategories.map((cat, i) => (
            <div key={cat.id}>
              {i > 0 && (
                <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />
              )}
              <CategorySection cat={cat} truncate={active === "all"} />
            </div>
          ))}
        </div>
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
            {/* compact category bar */}
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

"use client"

import { useState } from "react"
import { GraduationCap, Calendar, School, Search, ChevronLeft, Target } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"
import { useIsMobile } from "@/hooks/use-mobile"

interface EducationWindowProps {
  onClose?: () => void
}

export function EducationWindow({ onClose }: EducationWindowProps) {
  const { education } = portfolioData
  const isMobile = useIsMobile()

  const [selectedId, setSelectedId] = useState<number>(education[0]?.id)
  const [query, setQuery] = useState("")
  const [showDetailMobile, setShowDetailMobile] = useState(false)

  const statusConfig: Record<string, string> = {
    "En cours": "text-[#a8c7fa] bg-[#a8c7fa]/10 border-[#a8c7fa]/25",
    Obtenu: "text-[#94a3b8] bg-[#94a3b8]/10 border-[#94a3b8]/25",
  }

  const filtered = education.filter((edu) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      edu.degree.toLowerCase().includes(q) ||
      edu.school.toLowerCase().includes(q)
    )
  })

  const selected = education.find((e) => e.id === selectedId) ?? education[0]
  const statusStyle =
    statusConfig[selected?.status] ?? "text-[#8a8a96] bg-[#8a8a96]/10 border-[#8a8a96]/25"

  const handleSelect = (id: number) => {
    setSelectedId(id)
    setShowDetailMobile(true)
  }

  const fontStack =
    "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif"

  /* ---------- Sidebar list ---------- */
  const Sidebar = (
    <div
      className="flex flex-col h-full w-full md:w-[320px] md:flex-shrink-0"
      style={{ background: "#161619", borderRight: "1px solid #232329" }}
    >
      {/* Search */}
      <div className="p-3.5">
        <div
          className="flex items-center gap-2.5 px-3.5 h-10 rounded-lg"
          style={{ background: "#202026", border: "1px solid #2a2a31" }}
        >
          <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#6b6b75" }} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher..."
            className="flex-1 bg-transparent outline-none text-[15px]"
            style={{ color: "#e8e8ec" }}
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-auto px-2.5 pb-2">
        {filtered.map((edu) => {
          const active = edu.id === selectedId
          return (
            <button
              key={edu.id}
              onClick={() => handleSelect(edu.id)}
              className="w-full text-left flex items-center gap-3 rounded-xl px-3 py-3 mb-1 transition-colors relative"
              style={{ background: active ? "#222230" : "transparent" }}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.background = "#1d1d22"
              }}
              onMouseLeave={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.background = "transparent"
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                  style={{ background: "#3b82f6" }}
                />
              )}
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "#26262d", border: "1px solid #2f2f37" }}
              >
                <GraduationCap className="w-[18px] h-[18px]" style={{ color: "#9aa3b2" }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] mb-0.5" style={{ color: "#7a7a85" }}>
                  {edu.period}
                </p>
                <p
                  className="text-[15px] font-semibold leading-tight truncate"
                  style={{ color: "#f0f0f2" }}
                >
                  {edu.degree}
                </p>
                <p className="text-[13px] truncate" style={{ color: "#7a7a85" }}>
                  {edu.school}
                </p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Footer count */}
      <div
        className="px-4 py-3 text-center text-[13px]"
        style={{ color: "#6b6b75", borderTop: "1px solid #232329" }}
      >
        {education.length} diplômes
      </div>
    </div>
  )

  /* ---------- Detail pane ---------- */
  const Detail = selected && (
    <div className="flex flex-col h-full flex-1 min-w-0" style={{ background: "#111114" }}>
      <div className="flex-1 overflow-auto px-6 md:px-10 py-7 md:py-9">
        {/* Mobile back button */}
        {isMobile && (
          <button
            onClick={() => setShowDetailMobile(false)}
            className="flex items-center gap-1 mb-5 text-[15px]"
            style={{ color: "#a8c7fa" }}
          >
            <ChevronLeft className="w-5 h-5" />
            Formations
          </button>
        )}

        {/* Title */}
        <h1
          className="text-2xl md:text-[30px] font-bold tracking-tight mb-4"
          style={{ color: "#f4f4f6", letterSpacing: "-0.02em" }}
        >
          {selected.degree}
        </h1>

        {/* School */}
        <div className="flex items-center gap-2 mb-2.5">
          <School className="w-[18px] h-[18px]" style={{ color: "#7a7a85" }} />
          <span className="text-[16px] font-medium" style={{ color: "#5b9bf3" }}>
            {selected.school}
          </span>
        </div>

        {/* Period + status */}
        <div className="flex items-center gap-3 flex-wrap mb-7">
          <span className="flex items-center gap-2 text-[15px]" style={{ color: "#8a8a96" }}>
            <Calendar className="w-[18px] h-[18px]" style={{ color: "#7a7a85" }} />
            {selected.period}
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: "#3a3a42" }} />
          <span
            className={`px-3 py-1 text-[13px] font-medium rounded-full border ${statusStyle}`}
          >
            {selected.status}
          </span>
        </div>

        <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />

        {/* Description */}
        {"description" in selected && selected.description && (
          <>
            <p
              className="text-[16px] md:text-[17px] leading-relaxed mb-8"
              style={{ color: "#c4c4cc" }}
            >
              {selected.description}
            </p>
            <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />
          </>
        )}

        {/* Objectives */}
        {"objectives" in selected && selected.objectives?.length > 0 && (
          <>
            <h2
              className="text-[18px] font-semibold mb-4 flex items-center gap-2.5"
              style={{ color: "#f0f0f2" }}
            >
              <Target className="w-[18px] h-[18px]" style={{ color: "#5b9bf3" }} />
              Objectifs de formation
            </h2>
            <ul className="space-y-3">
              {selected.objectives.map((obj, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[16px] leading-relaxed"
                  style={{ color: "#c4c4cc" }}
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#5b9bf3" }}
                  />
                  {obj}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {/* Footer actions */}
      <div
        className="flex items-center justify-end gap-3 px-6 md:px-10 py-4"
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
        showDetailMobile ? (
          Detail
        ) : (
          Sidebar
        )
      ) : (
        <>
          {Sidebar}
          {Detail}
        </>
      )}
    </div>
  )
}

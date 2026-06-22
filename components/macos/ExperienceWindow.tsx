"use client"

import { useState } from "react"
import { Briefcase, Calendar, Building2, Search, ChevronLeft } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"
import { useIsMobile } from "@/hooks/use-mobile"

export function ExperienceWindow() {
  const { experiences } = portfolioData
  const isMobile = useIsMobile()

  const [selectedId, setSelectedId] = useState<number>(experiences[0]?.id)
  const [query, setQuery] = useState("")
  // On mobile we toggle between the list and the detail pane (list shown first)
  const [showDetailMobile, setShowDetailMobile] = useState(false)

  const typeConfig: Record<string, string> = {
    CDI: "text-[#a8c7fa] bg-[#a8c7fa]/10 border-[#a8c7fa]/25",
    CDD: "text-[#94a3b8] bg-[#94a3b8]/10 border-[#94a3b8]/25",
    Prestataire: "text-[#c4b5fd] bg-[#c4b5fd]/10 border-[#c4b5fd]/25",
    Freelance: "text-[#7dd3fc] bg-[#7dd3fc]/10 border-[#7dd3fc]/25",
  }

  const filtered = experiences.filter((exp) => {
    const q = query.trim().toLowerCase()
    if (!q) return true
    return (
      exp.title.toLowerCase().includes(q) ||
      exp.company.toLowerCase().includes(q) ||
      exp.technologies.some((t) => t.toLowerCase().includes(q))
    )
  })

  const selected = experiences.find((e) => e.id === selectedId) ?? experiences[0]
  const typeStyle =
    typeConfig[selected?.type] ?? "text-[#8a8a96] bg-[#8a8a96]/10 border-[#8a8a96]/25"

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
        {filtered.map((exp) => {
          const active = exp.id === selectedId
          return (
            <button
              key={exp.id}
              onClick={() => handleSelect(exp.id)}
              className="w-full text-left flex items-center gap-3 rounded-xl px-3 py-3 mb-1 transition-colors relative"
              style={{
                background: active ? "#222230" : "transparent",
              }}
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
                <Briefcase className="w-[18px] h-[18px]" style={{ color: "#9aa3b2" }} />
              </div>
              <div className="min-w-0">
                <p className="text-[13px] mb-0.5" style={{ color: "#7a7a85" }}>
                  {exp.period}
                </p>
                <p
                  className="text-[15px] font-semibold leading-tight truncate"
                  style={{ color: "#f0f0f2" }}
                >
                  {exp.title}
                </p>
                <p className="text-[13px] truncate" style={{ color: "#7a7a85" }}>
                  {exp.company}
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
        {experiences.length} expériences
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
            Expériences
          </button>
        )}

        {/* Title */}
        <h1
          className="text-2xl md:text-[30px] font-bold tracking-tight mb-4"
          style={{ color: "#f4f4f6", letterSpacing: "-0.02em" }}
        >
          {selected.title}
        </h1>

        {/* Company */}
        <div className="flex items-center gap-2 mb-2.5">
          <Building2 className="w-[18px] h-[18px]" style={{ color: "#7a7a85" }} />
          <span className="text-[16px] font-medium" style={{ color: "#5b9bf3" }}>
            {selected.company}
          </span>
        </div>

        {/* Period + type */}
        <div className="flex items-center gap-3 flex-wrap mb-7">
          <span className="flex items-center gap-2 text-[15px]" style={{ color: "#8a8a96" }}>
            <Calendar className="w-[18px] h-[18px]" style={{ color: "#7a7a85" }} />
            {selected.period}
          </span>
          <span className="w-1 h-1 rounded-full" style={{ background: "#3a3a42" }} />
          <span
            className={`px-3 py-1 text-[13px] font-medium rounded-full border ${typeStyle}`}
          >
            {selected.type}
          </span>
        </div>

        <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />

        {/* Description */}
        <p
          className="text-[16px] md:text-[17px] leading-relaxed mb-8"
          style={{ color: "#c4c4cc" }}
        >
          {selected.description}
        </p>

        <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />

        {/* Technologies */}
        <h2 className="text-[18px] font-semibold mb-4" style={{ color: "#f0f0f2" }}>
          Technologies
        </h2>
        <div className="flex flex-wrap gap-2.5 mb-8">
          {selected.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3.5 py-1.5 text-[14px] rounded-lg"
              style={{
                background: "#1e1e24",
                color: "#c2c2cc",
                border: "1px solid #2a2a31",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Responsibilities */}
        {"responsibilities" in selected && selected.responsibilities?.length > 0 && (
          <>
            <div className="h-px w-full mb-7" style={{ background: "#1f1f25" }} />
            <h2 className="text-[18px] font-semibold mb-4" style={{ color: "#f0f0f2" }}>
              Responsabilités
            </h2>
            <ul className="space-y-3">
              {selected.responsibilities.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[16px] leading-relaxed"
                  style={{ color: "#c4c4cc" }}
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "#5b9bf3" }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </>
        )}
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

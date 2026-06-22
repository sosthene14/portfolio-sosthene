"use client"

import { Briefcase, Calendar, Building2 } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function ExperienceWindow() {
  const { experiences } = portfolioData

  const typeConfig: Record<string, { label: string; color: string }> = {
    CDI: { label: "CDI", color: "text-[#a8c7fa] bg-[#a8c7fa]/8 border-[#a8c7fa]/20" },
    CDD: { label: "CDD", color: "text-[#94a3b8] bg-[#94a3b8]/8 border-[#94a3b8]/20" },
    Prestataire: { label: "Prestataire", color: "text-[#c4b5fd] bg-[#c4b5fd]/8 border-[#c4b5fd]/20" },
    Freelance: { label: "Freelance", color: "text-[#7dd3fc] bg-[#7dd3fc]/8 border-[#7dd3fc]/20" },
  }

  return (
    <div
      className="h-full overflow-auto "
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "#1e1e22", border: "1px solid #2a2a2f" }}
          >
            <Briefcase className="w-5 h-5" style={{ color: "#a8c7fa" }} />
          </div>
          <div>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ color: "#f0f0f2", letterSpacing: "-0.01em" }}
            >
              Expériences
            </h1>
            <p className="text-sm" style={{ color: "#5a5a65" }}>
              {experiences.length} postes
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div
            className="absolute top-2 bottom-2"
            style={{
              left: "7px",
              width: "1px",
              background: "linear-gradient(to bottom, transparent, #2a2a2f 8%, #2a2a2f 92%, transparent)",
            }}
          />

          <div className="space-y-4">
            {experiences.map((exp, index) => {
              const typeStyle = typeConfig[exp.type] ?? {
                label: exp.type,
                color: "text-[#5a5a65] bg-[#5a5a65]/8 border-[#5a5a65]/20",
              }

              return (
                <div key={exp.id} className="relative flex gap-6">
                  {/* Dot */}
                  <div className="relative flex-shrink-0 flex items-start pt-[22px]">
                    <div
                      className="w-[15px] h-[15px] rounded-full flex-shrink-0"
                      style={{
                        background: index === 0 ? "#a8c7fa" : "#1e1e22",
                        border: index === 0 ? "2px solid #a8c7fa" : "1.5px solid #2e2e35",
                        boxShadow: index === 0 ? "0 0 10px #a8c7fa33" : "none",
                      }}
                    />
                  </div>

                  {/* Card */}
                  <div
                    className="flex-1 mb-3 rounded-xl p-6 transition-all duration-200"
                    style={{
                      background: "#16161a",
                      border: "1px solid #1f1f25",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = "#1a1a1f"
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#2a2a32"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background = "#16161a"
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#1f1f25"
                    }}
                  >
                    {/* Top row */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <h3
                            className="text-base font-semibold leading-snug"
                            style={{ color: "#eeeef2", letterSpacing: "-0.01em" }}
                          >
                            {exp.title}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${typeStyle.color}`}
                            style={{ letterSpacing: "0.02em" }}
                          >
                            {typeStyle.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-4 flex-wrap">
                          <span
                            className="flex items-center gap-1.5 text-sm"
                            style={{ color: "#6b6b75" }}
                          >
                            <Building2 className="w-3.5 h-3.5" />
                            {exp.company}
                          </span>
                          <span
                            className="flex items-center gap-1.5 text-sm"
                            style={{ color: "#6b6b75" }}
                          >
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.period}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className="text-sm leading-relaxed mb-4 text-white/70"
                     
                    >
                      {exp.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 text-xs rounded-md"
                          style={{
                            background: "#1e1e22",
                            color: "#8888a0",
                            border: "1px solid #27272d",
                            fontFamily: "'SF Mono', 'JetBrains Mono', monospace",
                            letterSpacing: "0.01em",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
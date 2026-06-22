"use client"

import { GraduationCap, Calendar, School } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function EducationWindow() {
  const { education } = portfolioData

  const statusConfig: Record<string, { color: string }> = {
    "En cours": { color: "text-[#a8c7fa] bg-[#a8c7fa]/8 border-[#a8c7fa]/20" },
    "Obtenu": { color: "text-[#94a3b8] bg-[#94a3b8]/8 border-[#94a3b8]/20" },
  }

  const objectives = [
    "Maîtrise approfondie des architectures logicielles modernes",
    "Expertise en méthodologies Agile et DevOps",
    "Développement de solutions scalables et performantes",
  ]

  return (
    <div
      className="h-full overflow-auto"
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
            <GraduationCap className="w-5 h-5" style={{ color: "#a8c7fa" }} />
          </div>
          <div>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ color: "#f0f0f2", letterSpacing: "-0.01em" }}
            >
              Formation
            </h1>
            <p className="text-sm" style={{ color: "#5a5a65" }}>
              {education.length} diplômes
            </p>
          </div>
        </div>

        {/* Education cards */}
        <div className="space-y-3 mb-6">
          {education.map((edu, index) => {
            const statusStyle = statusConfig[edu.status] ?? {
              color: "text-[#5a5a65] bg-[#5a5a65]/8 border-[#5a5a65]/20",
            }

            return (
              <div
                key={edu.id}
                className="rounded-xl p-6 transition-all duration-200"
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
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">

                    {/* Degree + status */}
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <h3
                        className="text-base font-semibold leading-snug"
                        style={{ color: "#eeeef2", letterSpacing: "-0.01em" }}
                      >
                        {edu.degree}
                      </h3>
                      <span
                        className={`px-2.5 py-0.5 text-xs font-medium rounded-md border ${statusStyle.color}`}
                        style={{ letterSpacing: "0.02em" }}
                      >
                        {edu.status}
                      </span>
                    </div>

                    {/* School */}
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <School className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#5a5a65" }} />
                      <span className="text-sm" style={{ color: "#6b6b75" }}>
                        {edu.school}
                      </span>
                    </div>

                    {/* Period */}
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "#5a5a65" }} />
                      <span className="text-sm" style={{ color: "#6b6b75" }}>
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: index === 0 ? "#1e2a3a" : "#1e1e22",
                      border: `1px solid ${index === 0 ? "#a8c7fa22" : "#27272d"}`,
                    }}
                  >
                    <GraduationCap
                      className="w-5 h-5"
                      style={{ color: index === 0 ? "#a8c7fa" : "#5a5a65" }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Objectifs */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "#16161a",
            border: "1px solid #1f1f25",
          }}
        >
          <h3
            className="text-sm font-semibold mb-4 flex items-center gap-2"
            style={{ color: "#eeeef2" }}
          >
            <span
              className="w-5 h-5 rounded flex items-center justify-center text-[10px]"
              style={{ background: "#1e2a3a", color: "#a8c7fa" }}
            >
              ◎
            </span>
            Objectifs de formation
          </h3>
          <ul className="space-y-3">
            {objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-1 w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: "#a8c7fa", marginTop: "8px" }}
                />
                <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {obj}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}
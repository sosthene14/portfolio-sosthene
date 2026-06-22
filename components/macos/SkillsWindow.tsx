"use client"

import { Code2, Server, Database, Wrench } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function SkillsWindow() {
  const { skills } = portfolioData

  const sectionConfig = [
    { title: "Front-end", icon: Code2, key: "frontend" as const },
    { title: "Back-end", icon: Server, key: "backend" as const },
    { title: "Bases de données", icon: Database, key: "databases" as const },
    { title: "DevOps & Infrastructure", icon: Wrench, key: "devops" as const },
  ]

  const SkillBar = ({ name, level }: { name: string; level: number }) => (
    <div className="flex items-center gap-3">
      <span
        className="text-sm w-32 flex-shrink-0 truncate"
        style={{ color: "#eeeef2" }}
      >
        {name}
      </span>
      <div
        className="flex-1 h-[3px] rounded-full overflow-hidden"
        style={{ background: "#27272d" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${level}%`,
            background: level >= 80
              ? "#a8c7fa"
              : level >= 60
              ? "#8888a0"
              : "#3a3a45",
          }}
        />
      </div>
      <span
        className="text-xs w-8 text-right flex-shrink-0"
        style={{
          color: "#5a5a65",
          fontFamily: "'SF Mono', monospace",
        }}
      >
        {level}
      </span>
    </div>
  )

  const allTechs = [
    ...skills.frontend.map((s) => s.name),
    ...skills.backend.map((s) => s.name),
    ...skills.databases.map((s) => s.name),
    ...skills.devops.map((s) => s.name),
  ]

  return (
    <div
      className="h-full overflow-auto"
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className=" mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "#1e1e22", border: "1px solid #2a2a2f" }}
          >
            <Code2 className="w-5 h-5" style={{ color: "#a8c7fa" }} />
          </div>
          <div>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ color: "#f0f0f2", letterSpacing: "-0.01em" }}
            >
              Compétences
            </h1>
            <p className="text-sm" style={{ color: "#5a5a65" }}>
              {allTechs.length} technologies
            </p>
          </div>
        </div>

        {/* Skill sections grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {sectionConfig.map(({ title, icon: Icon, key }) => (
            <div
              key={key}
              className="rounded-xl p-5 transition-all duration-200"
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
              {/* Section header */}
              <div className="flex items-center gap-2 mb-5">
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center"
                  style={{ background: "#1e2a3a", border: "1px solid #a8c7fa22" }}
                >
                  <Icon className="w-3.5 h-3.5" style={{ color: "#a8c7fa" }} />
                </div>
                <h3
                  className="text-sm font-semibold"
                  style={{ color: "#eeeef2" }}
                >
                  {title}
                </h3>
              </div>

              {/* Skill bars */}
              <div className="space-y-3.5">
                {skills[key].map((skill, i) => (
                  <SkillBar key={i} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div
          className="rounded-xl p-6"
          style={{
            background: "#16161a",
            border: "1px solid #1f1f25",
          }}
        >
          <h3
            className="text-sm font-semibold mb-4"
            style={{ color: "#eeeef2" }}
          >
            Stack complète
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTechs.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md transition-all duration-150"
                style={{
                  background: "#1e1e22",
                  color: "#8888a0",
                  border: "1px solid #27272d",
                  fontFamily: "'SF Mono', 'JetBrains Mono', monospace",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = "#a8c7fa"
                  ;(e.currentTarget as HTMLElement).style.borderColor = "#a8c7fa22"
                  ;(e.currentTarget as HTMLElement).style.background = "#1e2a3a"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = "#8888a0"
                  ;(e.currentTarget as HTMLElement).style.borderColor = "#27272d"
                  ;(e.currentTarget as HTMLElement).style.background = "#1e1e22"
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
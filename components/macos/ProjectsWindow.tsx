"use client"

import { ExternalLink } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function ProjectsWindow() {
  const { projects } = portfolioData

  return (
    <div className="h-full overflow-auto pb-20"
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-light mb-2 text-white">Projets Récents</h1>
          <p className="text-white/60">
            Une sélection de mes projets publiques
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-medium text-white mb-1">
                    {project.name}
                  </h3>
                  <span className="text-xs text-white/40 font-medium uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>
                <a href={project.link} target="_blank">
                                    <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">

                    <ExternalLink className="w-4 h-4 text-white/60" />
                    </button>
                </a>
                
              </div>

              {/* Description */}
              <p className="text-sm text-white/70 mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

     
      </div>
    </div>
  )
}

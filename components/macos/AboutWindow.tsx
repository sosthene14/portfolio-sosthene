"use client"

import { Mail, Phone, Globe, Github, ExternalLink } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function AboutWindow() {
  const { profile } = portfolioData

  return (
    <div
      className="h-full overflow-auto"
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        {/* Header avec photo */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 mb-8 text-center sm:text-left">
          <img
            src="/me.png"
            alt={profile.name}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover shadow-xl border-2 border-white/20 shrink-0"
          />
          <div className="flex-1 w-full">
            <h1 className="text-3xl sm:text-4xl font-light mb-1 text-white">{profile.name}</h1>
            <p className="text-lg sm:text-xl text-white/90 font-light mb-4">{profile.title}</p>

            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="truncate">{profile.email}</span>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                {profile.phone}
              </a>
              <a
                href={`https://${profile.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <Globe className="w-4 h-4 shrink-0" />
                {profile.website}
              </a>
               <a
                href={`https://${profile.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center sm:justify-start gap-2 text-sm text-white/90 hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 shrink-0" />
                {profile.github.replace("github.com/", "")}
              </a>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-5 sm:p-6 mb-6 border border-white/10">
          <h2 className="text-lg font-medium mb-3 text-white">À propos</h2>
          <p className="text-sm leading-relaxed text-white/90">{profile.bio}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl sm:text-4xl font-extralight mb-1 sm:mb-2 text-white">3+</div>
            <div className="text-xs sm:text-sm text-white/60">Années d'expérience</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl sm:text-4xl font-extralight mb-1 sm:mb-2 text-white">15+</div>
            <div className="text-xs sm:text-sm text-white/60">Technologies maîtrisées</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 sm:p-6 border border-white/10 hover:bg-white/10 transition-all">
            <div className="text-3xl sm:text-4xl font-extralight mb-1 sm:mb-2 text-white">12+</div>
            <div className="text-xs sm:text-sm text-white/60">Projets réalisés</div>
          </div>
        </div>

        {/* Download CV Button */}
        <div className="mt-6 sm:mt-8 flex justify-center">
          <a
            href="/CV_Sosthene_Mounsambote.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 text-white rounded-xl hover:bg-white/20 transition-all shadow-lg text-sm sm:text-base"
          >
            <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
            Voir mon CV
          </a>
        </div>
      </div>
    </div>
  )
}
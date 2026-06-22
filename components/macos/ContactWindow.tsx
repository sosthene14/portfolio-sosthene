"use client"

import { useState } from "react"
import { Mail, Send, User, MessageSquare, Globe, Github, Phone } from "lucide-react"
import { portfolioData } from "@/data/portfolio-data"

export function ContactWindow() {
  const { profile } = portfolioData
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [status, setStatus] = useState<"idle" | "success">("idle")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = `Contact depuis le portfolio - ${formData.name}`
    const body = `Nom: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0A%0D%0AMessage:%0D%0A${formData.message}`
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus("success")
    setTimeout(() => {
      setStatus("idle")
      setFormData({ name: "", email: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const contactItems = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail },
    { label: "Téléphone", value: profile.phone, href: `tel:${profile.phone}`, icon: Phone },
    { label: "Site Web", value: profile.website, href: `https://${profile.website}`, icon: Globe, external: true },
    { label: "GitHub", value: profile.github, href: `https://${profile.github}`, icon: Github, external: true },
  ]

  const inputStyle = {
    background: "#111114",
    border: "1px solid #27272d",
    color: "#eeeef2",
    borderRadius: "8px",
    padding: "10px 14px",
    fontSize: "14px",
    width: "100%",
    outline: "none",
    fontFamily: "inherit",
    transition: "border-color 0.15s",
  }

  return (
    <div
      className="h-full overflow-auto"
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-5xl mx-auto px-8 py-10">

        {/* Header */}
        <div className="flex items-center gap-3 mb-10">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: "#1e1e22", border: "1px solid #2a2a2f" }}
          >
            <Mail className="w-5 h-5" style={{ color: "#a8c7fa" }} />
          </div>
          <div>
            <h1
              className="text-xl font-semibold tracking-tight"
              style={{ color: "#f0f0f2", letterSpacing: "-0.01em" }}
            >
              Contact
            </h1>
            <p className="text-sm" style={{ color: "#5a5a65" }}>
              Disponible pour collaborations
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">

          {/* Left col */}
          <div className="space-y-3">

            {/* Infos de contact */}
            <div
              className="rounded-xl p-5"
              style={{ background: "#16161a", border: "1px solid #1f1f25" }}
            >
              <h3 className="text-sm font-semibold mb-4" style={{ color: "#eeeef2" }}>
                Informations
              </h3>
              <div className="space-y-3">
  {contactItems.map(({ label, value, href, icon: Icon, external }) => (
    <div key={label} className="text-white">
      <div className="flex gap-2">
                <Icon className="w-3.5 h-3.5 flex-shrink-0"  />
      <p className="text-xs mb-1 " >{label}</p>

      </div>
      

      
        {value}
     
    </div>
  ))}
</div>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: "#16161a", border: "1px solid #1f1f25" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: "#a8c7fa", boxShadow: "0 0 6px #a8c7fa55" }}
                />
                <h3 className="text-sm font-semibold" style={{ color: "#eeeef2" }}>
                  Disponibilité
                </h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                Actuellement en poste chez{" "}
                <span style={{ color: "#eeeef2", fontWeight: 500 }}>GatsMapping</span>{" "}
                mais ouvert aux opportunités et collaborations freelance.
              </p>
            </div>
          </div>

          {/* Right col — Form */}
          <div
            className="rounded-xl p-5"
            style={{ background: "#16161a", border: "1px solid #1f1f25" }}
          >
            <h3 className="text-sm font-semibold mb-5" style={{ color: "#eeeef2" }}>
              Envoyer un message
            </h3>

            {status === "success" && (
              <div
                className="mb-4 p-3 rounded-lg text-sm"
                style={{
                  background: "#1e2a3a",
                  border: "1px solid #a8c7fa22",
                  color: "#a8c7fa",
                }}
              >
                ✓ Votre client email va s'ouvrir avec votre message pré-rempli.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div>
                <label
                  htmlFor="name"
                  className="flex items-center gap-1.5 text-xs mb-1.5"
                  style={{ color: "#6b6b75" }}
                >
                  <User className="w-3 h-3" />
                  Nom
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom"
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.target.style.borderColor = "#a8c7fa55")}
                  onBlur={(e) => (e.target.style.borderColor = "#27272d")}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center gap-1.5 text-xs mb-1.5"
                  style={{ color: "#6b6b75" }}
                >
                  <Mail className="w-3 h-3" />
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                  style={{ ...inputStyle }}
                  onFocus={(e) => (e.target.style.borderColor = "#a8c7fa55")}
                  onBlur={(e) => (e.target.style.borderColor = "#27272d")}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="flex items-center gap-1.5 text-xs mb-1.5"
                  style={{ color: "#6b6b75" }}
                >
                  <MessageSquare className="w-3 h-3" />
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Votre message..."
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={(e) => (e.target.style.borderColor = "#a8c7fa55")}
                  onBlur={(e) => (e.target.style.borderColor = "#27272d")}
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 text-sm font-medium rounded-lg transition-all duration-150"
                style={{
                  background: "#1e2a3a",
                  border: "1px solid #a8c7fa33",
                  color: "#a8c7fa",
                  padding: "10px 16px",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "#243347"
                  ;(e.currentTarget as HTMLElement).style.borderColor = "#a8c7fa55"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.background = "#1e2a3a"
                  ;(e.currentTarget as HTMLElement).style.borderColor = "#a8c7fa33"
                }}
              >
                <Send className="w-4 h-4" />
                Envoyer le message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
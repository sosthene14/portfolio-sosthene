import { useEffect, useRef, useState } from "react"
import { annotate } from "rough-notation"
import {
  BriefcaseBusiness,
  Code2,
  Download,
  ExternalLink,
  Folder,
  Hand,
  Lightbulb,
  Mail,
  Menu,
  Rocket,
  ShipWheel,
  UserRound,
} from "lucide-react"
import {
  SiDocker,
  SiDjango,
  SiFacebook,
  SiGit,
  SiGithub,
  SiInstagram,
  SiKubernetes,
  SiMongodb,
  SiNestjs,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSpringboot,
  SiTiktok,
  SiX,
  SiYoutube,
} from "react-icons/si"
import { FaLinkedin, FaWhatsapp } from "react-icons/fa"
import { Infinity as InfinityIcon } from "lucide-react"
import { portfolioData } from "../../../data/portfolio-data"

const navItems = [
  { id: "accueil", label: "Accueil", icon: ShipWheel },
  { id: "a-propos", label: "A propos", icon: UserRound },
  { id: "competences", label: "Competences", icon: Code2 },
  { id: "liste-projets", label: "Projets", icon: Folder },
  { id: "experience", label: "Experience", icon: BriefcaseBusiness },
  { id: "contact", label: "Contact", icon: Mail },
]

const socials = [
  {
    name: "YouTube",
    account: "Zotamine",
    followers: "4,7K",
    count: 4700,
    url: "https://www.youtube.com/@zotamine",
    label: "youtube.com/@zotamine",
    icon: SiYoutube,
    color: "#ff0000",
    bg: "#ffe3e3",
  },
  {
    name: "TikTok",
    account: "@zotamine",
    followers: "4",
    count: 4,
    url: "https://www.tiktok.com/@zotamine",
    label: "tiktok.com/@zotamine",
    icon: SiTiktok,
    color: "#111111",
    bg: "#e6e6e6",
  },
  {
    name: "Instagram",
    account: "@zota_mine",
    followers: "4",
    count: 4,
    url: "https://www.instagram.com/zota_mine/",
    label: "instagram.com/zota_mine",
    icon: SiInstagram,
    color: "#d6336c",
    bg: "#fde0e6",
  },
  {
    name: "Facebook",
    account: "Zotamine",
    followers: "0",
    count: 0,
    url: "https://www.facebook.com/profile.php?id=61596371925533",
    label: "facebook.com/profile.php?id=61596371925533",
    icon: SiFacebook,
    color: "#1877f2",
    bg: "#dbe5ff",
  },
]

const skills = [
  { name: "React", icon: SiReact, color: "#61dafb" },
  { name: "Next.js", icon: SiNextdotjs, color: "#111111" },
  { name: "NestJS", icon: SiNestjs, color: "#e0234e" },
  { name: "Django", icon: SiDjango, color: "#0c4b33" },
  { name: "Spring Boot", icon: SiSpringboot, color: "#6db33f" },
  { name: "Node.js", icon: SiNodedotjs, color: "#5fa04e" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
  { name: "Docker", icon: SiDocker, color: "#2496ed" },
  { name: "Git", icon: SiGit, color: "#f05032" },
  { name: "Kubernetes", icon: SiKubernetes, color: "#326ce5" },
  { name: "CI/CD", icon: InfinityIcon, color: "#1f61ca" },
]

function Tape({ className = "" }: { className?: string }) {
  return (
    <span
      className={`absolute -top-[16px] left-1/2 h-[28px] w-[84px] -translate-x-1/2 bg-[#e6d3a8]/80 shadow-[0_1px_2px_rgba(0,0,0,.08)] ${className}`}
    />
  )
}

function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <h2 className={`font-hand text-[40px] font-bold leading-[1.15] text-[#1b2540] dark:text-[#f1ead8] max-[560px]:text-[32px] ${className}`}>
      <span className="relative inline-block pb-[8px]">
        {children}
        <svg className="absolute bottom-0 left-0 h-[9px] w-full" viewBox="0 0 300 9" preserveAspectRatio="none" fill="none" aria-hidden="true">
          <path d="M2 6 C 70 1, 190 2, 298 5" stroke="#1f61ca" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </span>
    </h2>
  )
}

function ProjectCover({ name, image }: { name: string; image?: string }) {
  const [imageFailed, setImageFailed] = useState(false)

  if (image && !imageFailed) {
    return (
      <div className="relative h-[150px] w-full overflow-hidden rounded-[8px] border-[1.5px] border-[#27334e]/20">
        <img className="h-full w-full object-cover" src={image} alt="" onError={() => setImageFailed(true)} />
      </div>
    )
  }

  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase())
    .join("")

  return (
    <div className="relative h-[150px] w-full overflow-hidden rounded-[8px] border-[1.5px] border-[#27334e]/20 bg-[#dbe5ff]">
      <div className="absolute inset-x-[22px] bottom-0 top-[18px] rounded-t-[10px] border-[1.5px] border-[#27334e] bg-white">
        <div className="flex h-[20px] items-center gap-[5px] border-b-[1.5px] border-[#27334e] px-[10px]">
          <span className="h-[7px] w-[7px] rounded-full border border-[#27334e]" />
          <span className="h-[7px] w-[7px] rounded-full border border-[#27334e]" />
          <span className="h-[7px] w-[7px] rounded-full bg-[#1f61ca]" />
        </div>
        <div className="flex gap-[14px] p-[12px]">
          <div className="grid h-[54px] w-[54px] shrink-0 place-items-center rounded-[12px] bg-[#1f61ca] font-hand text-[26px] font-bold text-white">
            {initials}
          </div>
          <div className="flex flex-1 flex-col gap-[8px] pt-[4px]">
            <span className="h-[8px] w-[85%] rounded-full bg-[#27334e]/70" />
            <span className="h-[6px] w-full rounded-full bg-[#27334e]/15" />
            <span className="h-[6px] w-[70%] rounded-full bg-[#27334e]/15" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function Dashboard() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(
    () => typeof window !== "undefined" && window.localStorage.getItem("portfolio-theme") === "dark",
  )
  const [, setIsMobileViewport] = useState(
    () => typeof window !== "undefined" && window.innerWidth <= 860,
  )
  const [activeSection, setActiveSection] = useState("accueil")
  const nameRef = useRef<HTMLSpanElement>(null)
  const visibleSections = useRef(new Map<string, number>())
  const pendingNavigation = useRef<string | null>(null)
  const navigationUnlock = useRef<number | null>(null)
  const aboutCardRef = useRef<HTMLDivElement>(null)
  const skillsCardRef = useRef<HTMLDivElement>(null)
  const projectsCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateMobileViewport = () => setIsMobileViewport(window.innerWidth <= 860)
    window.addEventListener("resize", updateMobileViewport)
    return () => window.removeEventListener("resize", updateMobileViewport)
  }, [])

  useEffect(() => {
    window.localStorage.setItem("portfolio-theme", isDarkMode ? "dark" : "light")
  }, [isDarkMode])

  useEffect(() => {
    if (!nameRef.current) return
    const annotation = annotate(nameRef.current, {
      type: "underline",
      color: "#1d62cc",
      strokeWidth: 3,
      iterations: 2,
      padding: 4,
    })
    annotation.show()
    return () => annotation.remove()
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibleSections.current.set(
            entry.target.id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          )
        })

        if (pendingNavigation.current) {
          const targetRatio = visibleSections.current.get(pendingNavigation.current) ?? 0
          if (targetRatio > 0) {
            setActiveSection(pendingNavigation.current)
            pendingNavigation.current = null
            if (navigationUnlock.current !== null) {
              window.clearTimeout(navigationUnlock.current)
              navigationUnlock.current = null
            }
          }
          return
        }

        const mostVisible = [...visibleSections.current.entries()]
          .filter(([, ratio]) => ratio > 0)
          .sort((a, b) => b[1] - a[1])[0]

        if (mostVisible) setActiveSection(mostVisible[0])
      },
      { rootMargin: "-15% 0px -20% 0px", threshold: [0.1, 0.25, 0.5] },
    )

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => {
      observer.disconnect()
      if (navigationUnlock.current !== null) window.clearTimeout(navigationUnlock.current)
    }
  }, [])

  const navigate = (id: string) => {
    setActiveSection(id)
    pendingNavigation.current = id
    if (navigationUnlock.current !== null) window.clearTimeout(navigationUnlock.current)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    navigationUnlock.current = window.setTimeout(() => {
      pendingNavigation.current = null
      navigationUnlock.current = null
    }, 1800)
    setMenuOpen(false)
  }

  const cardBase =
    "relative min-h-[300px] cursor-grab rounded-[14px_10px_16px_10px/10px_16px_10px_14px] border-[1.5px] border-[#27334e]/15 px-[26px] pb-[22px] pt-[30px] transition-colors duration-200 hover:bg-[#f4f0e5] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#f1ead8] dark:hover:bg-[#353a49] active:cursor-grabbing"
  const titleClass =
    "mb-[18px] flex items-center gap-[12px] font-hand text-[26px] font-bold text-[#1b2540] dark:text-[#f1ead8]"

  return (
    <div
      className={`${isDarkMode ? "dark" : ""} min-h-screen bg-[#fbf8f1] bg-[length:26px_26px] font-note text-[#27334e] transition-colors duration-300 dark:bg-[#171923] dark:text-[#eee7d7]`}
      style={{
        backgroundImage: isDarkMode
          ? "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)"
          : "linear-gradient(rgba(39,51,78,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(39,51,78,.06) 1px, transparent 1px)",
      }}
    >
      <button
        className="fixed right-3 top-3 z-[25] hidden h-11 w-11 place-items-center rounded-xl border border-[#d9dee8] bg-white shadow-[0_5px_18px_rgba(55,65,85,.12)] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#eee7d7] max-[860px]:grid"
        type="button"
        aria-label="Ouvrir le menu"
        onClick={() => setMenuOpen(true)}
      >
        <Menu />
      </button>
      <button
        className="fixed right-[64px] top-3 z-[25] hidden h-11 w-11 place-items-center rounded-xl border border-[#d9dee8] bg-white text-[#1b2540] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#f3d982] max-[767px]:grid"
        type="button"
        onClick={() => setIsDarkMode((current) => !current)}
        aria-label={isDarkMode ? "Activer le thème clair" : "Activer le thème sombre"}
        aria-pressed={isDarkMode}
        title={isDarkMode ? "Activer le thème clair" : "Activer le thème sombre"}
      >
        <Lightbulb className="h-[24px] w-[24px]" />
      </button>

      {menuOpen && (
        <button
          className="fixed inset-0 z-[29] border-0 bg-[#232b3a]/30"
          aria-label="Fermer le menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-30 flex w-[215px] flex-col items-center overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden border-r border-[#27334e]/10 bg-[#fbf7ee] pb-[48px] pl-[34px] pr-[14px] pt-[30px] transition-colors duration-300 dark:border-white/10 dark:bg-[#222530] max-[860px]:w-[230px] max-[860px]:transition-transform ${
          menuOpen ? "max-[860px]:translate-x-0" : "max-[860px]:-translate-x-[105%]"
        }`}
      >
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 w-[30px]"
          style={{
            backgroundImage: "radial-gradient(circle at 12px 50%, #8f8c85 0 3px, #cfccc4 3.5px 8px, transparent 8.5px)",
            backgroundSize: "30px 42px",
            backgroundRepeat: "repeat-y",
            backgroundPosition: "0 10px",
          }}
          aria-hidden="true"
        />
        <button
          className="flex w-full cursor-pointer flex-col items-center border-0 bg-transparent"
          type="button"
          onClick={() => navigate("accueil")}
          aria-label="Retour à l'accueil"
        >
          <span className="font-hand text-[34px] font-bold leading-none text-[#1b2540] dark:text-[#f1ead8]">Sosthène</span>
          <span className="mt-[8px] text-center font-note text-[15px] leading-[1.25] text-[#1b2540] dark:text-[#d3ccbb]">
            Ingénieur logiciel<br />IoT · Cloud · DevOps · QA
          </span>
        </button>

        <nav className="mt-[22px] grid w-full gap-[5px]" aria-label="Navigation principale">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              type="button"
              key={id}
              onClick={() => navigate(id)}
              aria-current={activeSection === id ? "location" : undefined}
              className={`flex h-[46px] items-center gap-[11px] rounded-[12px] px-[12px] text-left font-note text-[18px] transition-colors duration-150 hover:bg-[#dfeafa] hover:text-[#1f61ca] ${
                activeSection === id
                  ? "bg-[#dfeafa] text-[#1f61ca] dark:bg-[#34415a] dark:text-[#a8c7fa]"
                  : "bg-transparent text-[#1b2540] dark:text-[#e8dfcb]"
              }`}
            >
              <Icon className="h-[21px] w-[21px] shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="mb-[22px] mt-auto flex w-full flex-col items-center max-[860px]:hidden">
          <span className="mb-[14px] h-[2px] w-[130px] bg-gradient-to-r from-transparent via-[#d9b97a] to-transparent" />
          <p className="-rotate-[4deg] text-center font-note text-[17px] leading-[1.35] text-[#1b2540] dark:text-[#e8dfcb]">
            Construire<br />
            des solutions utiles,<br />
            pour une <span className="relative inline-block">Afrique
              <svg className="absolute -bottom-[4px] left-0 h-[6px] w-full" viewBox="0 0 100 6" preserveAspectRatio="none" fill="none">
                <path d="M1 4 C 25 1, 70 1, 99 3" stroke="#1f61ca" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </span><br />
            plus connectée.
          </p>
          <svg className="mt-[8px] h-[8px] w-[110px] -rotate-[4deg]" viewBox="0 0 110 8" preserveAspectRatio="none" fill="none">
            <path d="M2 5 C 30 2, 80 2, 108 4" stroke={isDarkMode ? "#e8dfcb" : "#1b2540"} strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex items-center gap-[16px] text-[#1b2540] dark:text-[#e8dfcb] max-[860px]:mt-[28px]">
          <a className="transition-colors hover:text-[#1f61ca]" href={`https://${portfolioData.profile.github}`} target="_blank" rel="noreferrer" aria-label="GitHub"><SiGithub className="h-[24px] w-[24px]" /></a>
          <a className="transition-colors hover:text-[#1f61ca]" href="https://www.linkedin.com/in/sosthene-mounsambote/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin className="h-[24px] w-[24px]" /></a>
          <a className="transition-colors hover:text-[#1f61ca]" href="https://x.com/elonmusk" target="_blank" rel="noreferrer" aria-label="X"><SiX className="h-[22px] w-[22px]" /></a>
          <a className="transition-colors hover:text-[#1f61ca]" href="https://www.youtube.com/@zotamine" target="_blank" rel="noreferrer" aria-label="YouTube"><SiYoutube className="h-[26px] w-[26px]" /></a>
        </div>
      </aside>

      <main className="ml-[215px] min-h-screen overflow-hidden px-[38px] pb-[70px] pt-[28px] max-[860px]:ml-0 max-[860px]:px-[14px]">
        <section
          id="accueil"
          className="relative grid min-h-[480px] grid-cols-1 items-center gap-[clamp(24px,4vw,70px)] px-[clamp(20px,4vw,56px)] py-[28px] text-[#1b2540] dark:text-[#f1ead8] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,.9fr)]"
        >
          <div className="relative z-[2] w-full max-w-[720px]">
            <div className="relative mb-[22px] inline-block">
              <div className="-rotate-[4deg] bg-[#fde68a] px-[22px] py-[10px] font-hand text-[26px] shadow-[2px_5px_10px_rgba(0,0,0,.12)] dark:text-gray-600">
                Bonjour !
                <Hand className="ml-1 inline-block h-[26px] w-[26px] origin-[70%_80%] animate-[hand-wave_1.8s_ease-in-out_infinite]" strokeWidth={2.2} />
              </div>
            </div>

            <h1 className="m-0 font-hand text-[clamp(44px,5vw,68px)] font-bold leading-[1.1] tracking-[-1px] dark:text-[#f1ead8] max-[560px]:text-[38px]">
              Je suis{" "}
              <span className="relative inline-block text-[#1f61ca]" ref={nameRef}>
                Sosthène
              </span>
            </h1>

            <h2 className="mb-[16px] mt-[30px] max-w-[640px] font-note text-[clamp(20px,2vw,27px)] leading-[1.4] dark:text-[#e8dfcb]">
              Ingénieur logiciel | IoT &amp; Cloud DevOps |<br />
              Tests logiciels &amp; QA
            </h2>

            <p className="max-w-[540px] font-note text-[clamp(17px,1.5vw,21px)] leading-[1.55] text-[#27334e] dark:text-[#d3ccbb]">
              Passionné par la technologie, je conçois des applications modernes, performantes et utiles.
            </p>

            <div className="mt-[34px] flex gap-[16px] max-[560px]:flex-col">
              <a href="#projets" className="flex min-h-[48px] items-center justify-center gap-[9px] rounded-[255px_14px_225px_14px/14px_225px_14px_255px] bg-[#1f61ca] px-[22px] font-note text-[18px] text-white shadow-[0_7px_18px_rgba(31,97,202,.25)] transition-colors duration-200 hover:bg-[#184fae]">
                <Rocket className="h-[18px] w-[18px]" /> Voir mes projets <b>→</b>
              </a>
              <a href="/CV_Sosthene_Mounsambote.pdf" download className="flex min-h-[48px] items-center justify-center gap-[9px] rounded-[14px_255px_14px_225px/225px_14px_255px_14px] border-[1.5px] border-[#27334e] bg-white/70 px-[20px] font-note text-[18px] transition-colors duration-200 hover:bg-[#e8eef8] dark:text-black">
                <Download className="h-[18px] w-[18px]" /> Télécharger mon CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto hidden h-[420px] w-full max-w-[520px] md:block">
            <button
              type="button"
              onClick={() => setIsDarkMode((current) => !current)}
              aria-label={isDarkMode ? "Activer le thème clair" : "Activer le thème sombre"}
              aria-pressed={isDarkMode}
              title={isDarkMode ? "Activer le thème clair" : "Activer le thème sombre"}
              className="absolute left-[34%] top-0 grid h-[96px] w-[96px] cursor-pointer place-items-center border-0 bg-transparent p-0 transition-colors hover:text-[#1f61ca] dark:text-[#f3d982]"
            >
              <svg className="h-full w-full" viewBox="0 0 96 96" fill={isDarkMode ? "#f3d982" : "#fff"} stroke={isDarkMode ? "#f3d982" : "#1b2540"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M48 22 C 34 22, 28 34, 34 46 C 38 53, 40 56, 40 62 H 56 C 56 56, 58 53, 62 46 C 68 34, 62 22, 48 22 Z" />
                <path d="M41 68 H55 M43 74 H53" fill="none" />
                <g fill="none">
                  <path d="M48 6 V12" /><path d="M20 20 L25 25" /><path d="M76 20 L71 25" />
                </g>
              </svg>
            </button>

            <img
              className="absolute bottom-[16px] left-[2%] h-[260px] w-[78%] -rotate-[2deg] object-contain mix-blend-multiply dark:mix-blend-normal"
              src="/computer.webp"
              alt="Ordinateur portable"
            />

            <div className="absolute right-0 top-[40px] w-[170px] rotate-[3deg] bg-[#fde68a] px-[20px] pb-[16px] pt-[26px] font-hand text-[24px] leading-[1.25] shadow-[3px_8px_14px_rgba(0,0,0,.14)] dark:text-gray-600">
              Coder<br />Innover<br />
              <span className="inline-block border-b-2 border-[#1b2540]">Partager</span>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-[1.05fr_.95fr_1fr] items-start gap-[26px] pb-[25px] pt-[24px] max-[1180px]:grid-cols-2 max-[860px]:grid-cols-1">
            <div ref={aboutCardRef} className="w-full">
            <section id="a-propos" className={`${cardBase} -rotate-[1deg] bg-[#fbf7ee]`}>
              <Tape className="-rotate-[3deg]" />
              <h3 className={titleClass}>
                <UserRound className="h-[30px] w-[30px] text-[#1f61ca]" />
                <span>A propos de moi</span>
              </h3>
              <p className="mt-[22px] font-note text-[17px] leading-[1.65] dark:text-[#d3ccbb]">{portfolioData.profile.bio}</p>
              <a href="#experience" className="mt-[18px] inline-flex min-h-[40px] items-center gap-2 rounded-full border-[1.5px] border-[#27334e]/60 bg-white/70 px-[18px] font-note text-[15px] transition-colors duration-200 hover:bg-[#e8eef8] hover:text-[#1f61ca] dark:border-white/30 dark:bg-[#20232c] dark:text-[#eee7d7] dark:hover:bg-[#34415a]">
                En savoir plus <b>→</b>
              </a>
            </section>
            </div>

            <div ref={skillsCardRef} className="w-full">
            <section id="competences" className={`${cardBase} rotate-[.8deg] bg-white`}>
              <Tape className="rotate-[2deg]" />
              <h3 className={titleClass}>
                <Code2 className="h-[30px] w-[30px]" />
                <span>Mes compétences</span>
              </h3>
              <div className="mt-[22px] flex flex-wrap gap-[10px_8px]">
                {skills.map(({ name, icon: Icon, color }) => (
                  <span key={name} className="inline-flex min-h-[40px] items-center gap-[8px] rounded-full border border-[#27334e]/15 bg-white px-[14px] font-note text-[15px] shadow-[0_2px_4px_rgba(0,0,0,.05)] transition-colors duration-200 hover:bg-[#e8eef8] dark:border-white/15 dark:bg-[#20232c] dark:text-[#eee7d7] dark:hover:bg-[#34415a]">
                    <Icon className="h-[18px] w-[18px]" style={{ color }} />
                    {name}
                  </span>
                ))}
              </div>
            </section>
            </div>

            <div ref={projectsCardRef} className="w-full max-[1180px]:col-span-2 max-[860px]:col-span-1">
            <section id="projets" className={`${cardBase} rotate-[1.2deg] bg-[#fde9a2]`}>
              <Tape className="-rotate-[2deg]" />
              <h3 className={titleClass}>
                <Folder className="h-[30px] w-[30px]" />
                <span>Mes projets</span>
              </h3>
              <div className="mt-[20px] grid gap-[14px]">
                {portfolioData.projects.slice(0, 3).map((project) => (
                  <a key={project.id} href={project.link || undefined} target={project.link ? "_blank" : undefined} rel={project.link ? "noreferrer" : undefined} className="grid min-h-[50px] grid-cols-[34px_1fr_18px] items-center gap-[12px] transition-colors duration-200 hover:text-[#1f61ca]">
                    <span className="grid h-[32px] w-[32px] place-items-center rounded-full bg-white/70"><Folder className="h-[16px] w-[16px] text-[#1f61ca]" /></span>
                    <span className="min-w-0">
                      <b className="block font-note text-[17px] font-normal leading-[1.2] dark:text-white">{project.name}</b>
                      <small className="block truncate font-note text-[14px]">{project.description}</small>
                    </span>
                    {project.link && <ExternalLink className="h-[18px] w-[18px]" />}
                  </a>
                ))}
              </div>
              <a href="#liste-projets" className="mx-auto mt-[22px] flex w-max items-center gap-2 font-note text-[17px] transition-colors duration-200 hover:text-[#1f61ca]">
                <span className="border-b-2 border-[#1f61ca]">Voir tous les projets</span> <b>→</b>
              </a>
            </section>
            </div>
        </div>

        <section id="liste-projets" className="scroll-mt-5 pb-[20px] pt-[70px]">
          <SectionHeading className="mb-[34px]">Mes projets professionnels</SectionHeading>
          <div className="grid grid-cols-3 gap-[26px] max-[860px]:grid-cols-2 max-[560px]:grid-cols-1">
            {portfolioData.projects.map((project) => (
              <article key={project.id} className="relative flex min-h-[320px] flex-col rounded-[14px_10px_16px_10px/10px_16px_10px_14px] border-[1.5px] border-[#27334e]/15 bg-[#fffdf7] p-[18px] pt-[22px] text-[#27334e] transition-colors duration-200 hover:bg-[#f4f0e5] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#eee7d7] dark:hover:bg-[#353a49] odd:-rotate-[.6deg] even:rotate-[.8deg]">
                <span className="absolute -top-[13px] left-1/2 h-[24px] w-[72px] -translate-x-1/2 -rotate-[3deg] bg-[#e6d3a8]/80" />
                <ProjectCover name={project.name} image={project.image} />
                <h3 className="mb-[6px] mt-[16px] font-hand text-[22px] font-bold text-[#1b2540] dark:text-white">{project.name}</h3>
                <p className="min-h-[58px] font-note text-[16px] leading-[1.45]">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-[6px] pt-[14px]">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <span key={technology} className="rounded-full border border-[#9ab0d4] bg-white/70 px-[10px] py-[2px] font-note text-[13px] text-[#315da1] dark:border-[#526788] dark:bg-[#20232c] dark:text-[#a8c7fa]">
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

  <section id="experience" className="scroll-mt-5 pb-[20px] pt-[70px]">
  <SectionHeading className="mb-[40px]">Expérience</SectionHeading>

  <div className="relative pl-[38px] max-[560px]:pl-[26px]">
    {/* Frise verticale en pointillés */}
    <span className="absolute bottom-[10px] left-[11px] top-[10px] w-0 border-l-[2.5px] border-dashed border-[#27334e]/35 max-[560px]:left-[6px]" />

    <div className="grid gap-[34px]">
      {portfolioData.experiences.map((experience) => (
        <div key={experience.id} className="relative">
          {/* Point de la frise */}
          <span className="absolute -left-[37px] top-[26px] grid h-[24px] w-[24px] place-items-center rounded-full border-[2.5px] border-[#1f61ca] bg-[#fbf8f1] max-[560px]:-left-[27px] max-[560px]:h-[20px] max-[560px]:w-[20px]">
            <span className="h-[8px] w-[8px] rounded-full bg-[#1f61ca]" />
          </span>

          <article className="relative grid grid-cols-[160px_1fr] gap-[22px] rounded-[14px_10px_16px_10px/10px_16px_10px_14px] border-[1.5px] border-[#27334e]/15 bg-[#fffdf7] p-[22px] pt-[26px] text-[#27334e] transition-colors duration-200 hover:bg-[#f4f0e5] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#eee7d7] dark:hover:bg-[#353a49] odd:-rotate-[.4deg] even:rotate-[.5deg] max-[760px]:grid-cols-1">
            {/* Scotch */}
            <span className="absolute -top-[13px] left-[60px] h-[24px] w-[72px] -rotate-[3deg] bg-[#e6d3a8]/80" />

            {/* Période en post-it */}
            <div className="self-start">
              <time className="inline-block rotate-[-2deg] bg-[#fde68a] px-[14px] py-[8px] font-note text-[17px] leading-[1.25] text-[#1b2540]">
                {experience.period}
              </time>
            </div>

            <div className="min-w-0">
              <h3 className="mb-[6px] font-hand text-[23px] font-bold leading-[1.2] text-[#1b2540] dark:text-white">
                {experience.title}
              </h3>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <b className="font-hand text-[18px] text-[#1f61ca] dark:text-[#a8c7fa]">{experience.company}</b>
                <span className="rounded-full border border-[#27334e]/40 bg-white/70 px-[12px] py-[1px] font-note text-[14px] text-[#27334e]">
                  {experience.type}
                </span>
              </div>

              <p className="mt-[12px] font-note text-[17px] leading-[1.55] text-[#27334e] dark:text-[#d3ccbb]">
                {experience.description}
              </p>

              <ul className="mt-[14px] space-y-[8px]">
                {experience.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="flex items-start gap-[10px] font-note text-[16px] leading-[1.5] text-[#1b2540] dark:text-[#eee7d7]">
                    <svg className="mt-[5px] h-[16px] w-[16px] shrink-0" viewBox="0 0 16 16" fill="none" stroke="#1f61ca" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 9 L6 13 L14 3" />
                    </svg>
                    <span>{responsibility}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-[16px] flex flex-wrap gap-[7px]">
                {experience.technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#9ab0d4] bg-white/70 px-[10px] py-[2px] font-note text-[14px] text-[#315da1] dark:border-[#526788] dark:bg-[#20232c] dark:text-[#a8c7fa]"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      ))}
    </div>
  </div>
</section>

        <section id="reseaux" className="scroll-mt-5 pb-[20px] pt-[70px]">
          <SectionHeading className="mb-[14px]">Réseaux sociaux &amp; création de contenu</SectionHeading>
          <p className="mb-[40px] max-w-[640px] font-note text-[19px] leading-[1.55] text-[#27334e] dark:text-white">
            Je partage des tutos autour du développement, du DevOps et de l’IA.
          </p>
          <div className="grid grid-cols-4 gap-[26px] max-[1100px]:grid-cols-2 max-[560px]:grid-cols-1">
            {socials.map(({ name, account, followers, count, url, label, icon: Icon, color, bg }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noreferrer"
                className="relative flex min-h-[230px] flex-col border-[1.5px] border-[#27334e]/15 bg-[#fffdf7] px-[22px] pb-[20px] pt-[28px] text-[#27334e] transition-colors duration-200 hover:bg-[#f4f0e5] dark:border-white/15 dark:bg-[#292d3a] dark:text-[#eee7d7] dark:hover:bg-[#353a49] odd:-rotate-[.6deg] even:rotate-[.8deg] max-[560px]:items-center max-[560px]:text-center"
              >
                <span className="absolute -top-[13px] left-1/2 h-[24px] w-[72px] -translate-x-1/2 -rotate-[3deg] bg-[#e6d3a8]/80" />
                <span className="grid h-[48px] w-[48px] place-items-center rounded-full border-[1.5px] border-[#27334e]/20" style={{ background: bg }}>
                  <Icon className="h-[24px] w-[24px]" style={{ color }} />
                </span>
                <h3 className="mt-[14px] font-hand text-[24px] font-bold leading-[1.2] text-[#1b2540] dark:text-[#f1ead8]">{name}</h3>
                <p className="font-note text-[17px] text-[#27334e] dark:text-[#d3ccbb]">{account}</p>
                <div className="mt-[14px] flex items-baseline gap-[8px]">
                  <span className="font-hand text-[38px] font-bold leading-none" style={{ color }}>{followers}</span>
                  <span className="font-note text-[16px] text-[#27334e] dark:text-[#d3ccbb]">{count === 1 ? "abonné" : "abonnés"}</span>
                </div>
                <span className="mt-auto break-all pt-[14px] font-note text-[14px] text-[#315da1]">
                  <span className="border-b-2 border-[#1f61ca]/60">{label}</span> →
                </span>
              </a>
            ))}
          </div>
        </section>

        <section id="contact" className="mt-[60px] min-h-[300px] rounded-[255px_20px_225px_20px/20px_225px_20px_255px] border-[1.5px] border-[#e1dfd5] bg-[#fff7d9]/90 text-center transition-colors duration-300 dark:border-white/15 dark:bg-[#292d3a]">
          <SectionHeading className="mb-[30px] mt-[50px]">Travaillons ensemble</SectionHeading>
          <p className="mb-[24px] font-note text-[16px] dark:text-[#d3ccbb]">Une idee, un projet ou simplement envie d'en discuter ? Ecrivez-moi.</p>
          <div className="flex flex-wrap justify-center gap-[12px]">
            <a className="flex min-h-[46px] w-max items-center justify-center gap-[9px] rounded-[255px_14px_225px_14px/14px_225px_14px_255px] bg-[#1f61ca] px-5 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-[#184fae]" href={`mailto:${portfolioData.profile.email}`}>
              <Mail /> Ecrire à Sosthene
            </a>
            <a className="flex min-h-[46px] w-max items-center justify-center gap-[9px] rounded-[255px_14px_225px_14px/14px_225px_14px_255px] bg-[#25d366] px-5 text-[14px] font-bold text-white transition-colors duration-200 hover:bg-[#1da851]" href="https://wa.me/221773101160" target="_blank" rel="noreferrer">
              <FaWhatsapp className="h-[18px] w-[18px]" /> WhatsApp · +221 77 310 11 60
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}

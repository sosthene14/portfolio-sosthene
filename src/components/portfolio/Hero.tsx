import { portfolioData } from "../../../data/portfolio-data"
import Draggable from "react-draggable"
import { useEffect, useRef } from "react"
import { annotate } from "rough-notation"

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 120 70" aria-hidden="true">
      <path pathLength="1" d="M8 10C40-4 96 6 106 52" />
      <path pathLength="1" d="M94 44L106 54L110 38" />
    </svg>
  )
}

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!titleRef.current) return
    const annotation = annotate(titleRef.current, {
      type: "underline",
      color: "var(--margin)",
      strokeWidth: 2,
      iterations: 2,
      padding: 8,
    })
    annotation.show()
    return () => annotation.remove()
  }, [])

  return (
    <header className="hero">
      <div>
        <h1 ref={titleRef}>Bonjour, moi c'est Sosthene.</h1>
        <p className="lead">
          Je cree des applications web et mobiles, je les mets en ligne et je veille
          a ce qu'elles tiennent bon. Vous m'expliquez votre idee avec vos mots,
          je m'occupe du reste.
        </p>
        <div className="cta">
          <a className="btn" href="#contact">Ecrivez-moi</a>
          <Arrow />
          <span className="note">on en parle ?</span>
        </div>
      </div>
      <div className="desk">
        <Draggable bounds="parent" cancel="a,button">
          <article className="pi desk-card desk-a">
            <span className="tape" />
            <h3>{portfolioData.profile.title}</h3>
            <p>Je m'occupe aussi de tout ce qui fait tourner l'application en coulisses.</p>
          </article>
        </Draggable>
        <Draggable bounds="parent" cancel="a,button">
          <article className="pi desk-card desk-b">
            <span className="tape" />
            <h3>Dakar, Senegal</h3>
            <p>Je travaille avec des clients d'ici et d'ailleurs.</p>
          </article>
        </Draggable>
        <Draggable bounds="parent" cancel="a,button">
          <article className="pi desk-card desk-d">
            <span className="tape" />
            <h3>Licence & master</h3>
            <p>Genie informatique, puis genie logiciel a l'IPD de Dakar.</p>
          </article>
        </Draggable>
        <span className="stamp">Disponible pour de nouveaux projets</span>
      </div>
    </header>
  )
}

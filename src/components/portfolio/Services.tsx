import { useEffect, useRef } from "react"
import { annotate } from "rough-notation"

export function Services() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!titleRef.current) return
    const annotation = annotate(titleRef.current, { type: "box", color: "var(--stamp2)", strokeWidth: 2, padding: 10 })
    annotation.show()
    return () => annotation.remove()
  }, [])

  return (
    <section aria-labelledby="services-title">
      <h2 id="services-title" ref={titleRef}>Ce que je peux faire pour vous</h2>
      <p className="intro">Pas de grands mots : voici, simplement, ce que je prends en charge.</p>
      <div className="trio">
        <article className="pi"><span className="tape" /><h3>Creer votre application</h3><p>Site web, application mobile ou plateforme en ligne : je dessine et je programme ce dont vous avez besoin, etape par etape.</p></article>
        <article className="pi"><span className="tape" /><h3>La mettre en ligne et veiller dessus</h3><p>Je prepare les serveurs, les deploiements et la surveillance pour que tout tourne sans que vous y pensiez.</p></article>
        <article className="pi"><span className="tape" /><h3>La proteger</h3><p>Donnees, acces et sauvegardes : je m'occupe de la securite serieusement, sans vous noyer sous les mots compliques.</p></article>
      </div>
    </section>
  )
}

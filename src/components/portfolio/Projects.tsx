import { useEffect, useRef } from "react"
import { annotate } from "rough-notation"
import Draggable from "react-draggable"
import { portfolioData } from "../../../data/portfolio-data"

export function Projects() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!titleRef.current) return
    const annotation = annotate(titleRef.current, { type: "highlight", color: "var(--y)", iterations: 2, multiline: true })
    annotation.show()
    return () => annotation.remove()
  }, [])

  return (
    <section aria-labelledby="projects-title">
      <h2 id="projects-title" ref={titleRef}>Quelques pages de mon carnet</h2>
      <p className="intro">Des projets sur lesquels j'ai travaille, racontes simplement.</p>
      <div className="cards">
        {portfolioData.projects.slice(0, 6).map((project) => (
          <Draggable bounds="parent" cancel="a,img" key={project.id}>
            <article className="card">
              {project.image && <img className="project-image" src={project.image} alt="" />}
              <span className="tape" />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tags">{project.technologies.slice(0, 3).map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div>
              {project.link && <a className="project-link" href={project.link} target="_blank" rel="noreferrer">Voir le projet</a>}
            </article>
          </Draggable>
        ))}
      </div>
    </section>
  )
}

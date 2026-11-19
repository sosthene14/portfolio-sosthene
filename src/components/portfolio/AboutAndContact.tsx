import { portfolioData } from "../../../data/portfolio-data"

export function AboutAndContact() {
  return (
    <>
      <section aria-labelledby="tools-title">
        <h2 id="tools-title">Dans ma trousse</h2>
        <div className="chips">{["React", "Next.js", "React Native", "TypeScript", "Node.js", "Python", "Docker", "Kubernetes", "GitLab CI/CD", "Tailwind"].map((skill) => <span className="chip" key={skill}>{skill}</span>)}</div>
        <div className="aside">
          <svg className="arrow" viewBox="0 0 120 70" aria-hidden="true"><path pathLength="1" d="M8 10C40-4 96 6 106 52" /><path pathLength="1" d="M94 44L106 54L110 38" /></svg>
          <span className="note">inutile de tout comprendre, c'est mon travail !</span>
        </div>
      </section>

      <section aria-labelledby="about-title">
        <h2 id="about-title">Un peu plus sur moi</h2>
        <div className="about">
          <div><p>{portfolioData.profile.bio}</p><p>Quand j'ai un moment, je partage aussi ce que j'apprends dans des tutoriels video en francais.</p></div>
          <span className="stamp made-in">Fait a Dakar</span>
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title">
        <div className="pi contact-card">
          <span className="pin" />
          <h2 id="contact-title">Parlons de votre projet</h2>
          <p>Racontez-moi votre idee, meme si elle n'est pas encore claire. Je vous reponds simplement.</p>
          <ul className="links">
            <li><em>Par e-mail</em><a href={`mailto:${portfolioData.profile.email}`}>{portfolioData.profile.email}</a></li>
            <li><em>Par telephone</em><a href={`tel:${portfolioData.profile.phone.replace(/\s/g, "")}`}>{portfolioData.profile.phone}</a></li>
            <li><em>Mon code</em><a href={`https://${portfolioData.profile.github}`} target="_blank" rel="noreferrer">{portfolioData.profile.github}</a></li>
          </ul>
        </div>
        <div className="sign"><span className="stamp">Sans jargon, promis</span></div>
      </section>
      <footer>&copy; 2026 Sosthene Mounsambote, Dakar</footer>
    </>
  )
}

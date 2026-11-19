import { useEffect, useRef, useState } from "react"
import { annotate } from "rough-notation"

const steps = [
  { title: "On discute", text: "Vous me racontez votre idee, meme floue. Je pose les questions simples." },
  { title: "Je vous propose un plan", text: "Ce qu'on fait, dans quel ordre, et en combien de temps." },
  { title: "Vous voyez le projet avancer", text: "Des points reguliers et des versions a tester. Pas de surprise a la fin." },
  { title: "Je livre, et je reste la", text: "Mise en ligne, explications, et un coup de main quand vous en avez besoin." },
]

export function Method() {
  const [completedSteps, setCompletedSteps] = useState(() => steps.map(() => false))
  const titleRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => {
    if (!titleRef.current) return
    const annotation = annotate(titleRef.current, { type: "underline", color: "var(--margin)", strokeWidth: 2, iterations: 3, padding: 8 })
    annotation.show()
    return () => annotation.remove()
  }, [])
  const toggleStep = (index: number) => setCompletedSteps((current) =>
    current.map((checked, stepIndex) => (stepIndex === index ? !checked : checked)),
  )
  const allStepsDone = completedSteps.every(Boolean)

  return (
    <section aria-labelledby="method-title">
      <h2 id="method-title" ref={titleRef}>Comment on travaille ensemble</h2>
      <p className="intro">Cochez les etapes au fil de votre lecture.</p>
      <div className="split">
        <ul className="todo">
          {steps.map((step, index) => (
            <li key={step.title}>
              <button type="button" aria-pressed={completedSteps[index]} onClick={() => toggleStep(index)}>
                <svg className="box" viewBox="0 0 40 40" aria-hidden="true"><path d="M7 8L33 6L34 33L6 34Z" /><path className="ck" pathLength="1" d="M10 21L18 30L34 6" /></svg>
                <span><b>{step.title}</b><span>{step.text}</span></span>
              </button>
            </li>
          ))}
        </ul>
        <span className={`stamp ready ${allStepsDone ? "on" : ""}`} aria-live="polite">Pret, on y va !</span>
      </div>
    </section>
  )
}

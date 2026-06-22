"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Wallet, TrendingUp, RotateCcw, Plane } from "lucide-react"

type Phase = "idle" | "flying" | "crashed" | "cashed"

const START_BALANCE = 1000
const GROWTH = 0.18 // vitesse de montée du multiplicateur

// Point de crash aléatoire (queue lourde, ~3% de crash instantané)
function genCrashPoint(): number {
  if (Math.random() < 0.03) return 1.0
  const r = Math.random()
  const c = 0.99 / (1 - r)
  return Math.max(1.01, Math.min(50, Math.round(c * 100) / 100))
}

export function GameWindow() {
  const [balance, setBalance] = useState<number>(() => {
    if (typeof window === "undefined") return START_BALANCE
    const saved = localStorage.getItem("aviatorBalance")
    return saved ? parseFloat(saved) : START_BALANCE
  })
  const [best, setBest] = useState<number>(() => {
    if (typeof window === "undefined") return 0
    const saved = localStorage.getItem("aviatorBest")
    return saved ? parseFloat(saved) : 0
  })

  const [bet, setBet] = useState(50)
  const [phase, setPhase] = useState<Phase>("idle")
  const [multiplier, setMultiplier] = useState(1)
  const [cashedAt, setCashedAt] = useState<number | null>(null)
  const [activeStake, setActiveStake] = useState(0)
  const [history, setHistory] = useState<number[]>([])

  const crashRef = useRef(1)
  const startRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const phaseRef = useRef<Phase>("idle")

  const persist = (b: number, bst: number) => {
    localStorage.setItem("aviatorBalance", b.toFixed(2))
    localStorage.setItem("aviatorBest", bst.toFixed(2))
  }

  const stopLoop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = null
  }

  const endRound = useCallback((crashValue: number) => {
    setHistory((h) => [crashValue, ...h].slice(0, 12))
  }, [])

  const tick = useCallback(() => {
    const elapsed = (performance.now() - startRef.current) / 1000
    const m = Math.exp(GROWTH * elapsed)
    if (m >= crashRef.current) {
      setMultiplier(crashRef.current)
      setPhase("crashed")
      phaseRef.current = "crashed"
      stopLoop()
      endRound(crashRef.current)
      return
    }
    setMultiplier(m)
    rafRef.current = requestAnimationFrame(tick)
  }, [endRound])

  const placeBet = () => {
    if (phase === "flying") return
    const stake = Math.min(bet, balance)
    if (stake < 1) return
    const newBalance = Math.round((balance - stake) * 100) / 100
    setBalance(newBalance)
    setActiveStake(stake)
    persist(newBalance, best)
    crashRef.current = genCrashPoint()
    startRef.current = performance.now()
    setCashedAt(null)
    setMultiplier(1)
    setPhase("flying")
    phaseRef.current = "flying"
    stopLoop()
    rafRef.current = requestAnimationFrame(tick)
  }

  const cashOut = () => {
    if (phaseRef.current !== "flying") return
    stopLoop()
    const m = multiplier
    const winnings = activeStake * m
    const newBalance = Math.round((balance + winnings) * 100) / 100
    const newBest = Math.max(best, m)
    setBalance(newBalance)
    setBest(newBest)
    persist(newBalance, newBest)
    setCashedAt(m)
    setPhase("cashed")
    phaseRef.current = "cashed"
    endRound(m)
  }

  const resetBalance = () => {
    setBalance(START_BALANCE)
    persist(START_BALANCE, best)
  }

  useEffect(() => () => stopLoop(), [])

  // Progression visuelle de l'avion (0 → 1)
  const progress = Math.min(1, Math.log(multiplier) / Math.log(10))
  const planeX = 6 + progress * 80 // %
  const planeY = 82 - progress * 70 // % (haut = petit)

  const color =
    phase === "crashed" ? "#ef4444" : phase === "cashed" ? "#22c55e" : "#f4f4f6"

  const chipColor = (m: number) =>
    m < 1.5 ? "#7a7a85" : m < 2 ? "#5b9bf3" : m < 5 ? "#22c55e" : "#f59e0b"

  const stake = Math.min(bet, balance)

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: "#0d0d10",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        {/* Header + stats */}
        <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2">
            <Plane className="w-6 h-6" style={{ color: "#ef4444" }} />
            Aviator
          </h1>
          <div className="flex gap-2">
            <div
              className="px-3.5 py-2 rounded-xl flex items-center gap-2"
              style={{ background: "#16161b", border: "1px solid #232329" }}
            >
              <Wallet className="w-4 h-4" style={{ color: "#5b9bf3" }} />
              <span className="text-[13px]" style={{ color: "#8a8a96" }}>
                Solde
              </span>
              <span className="text-[15px] font-semibold text-white tabular-nums">
                {balance.toFixed(2)}
              </span>
            </div>
            <div
              className="px-3.5 py-2 rounded-xl flex items-center gap-2"
              style={{ background: "#16161b", border: "1px solid #232329" }}
            >
              <TrendingUp className="w-4 h-4" style={{ color: "#22c55e" }} />
              <span className="text-[15px] font-semibold text-white tabular-nums">
                {best.toFixed(2)}x
              </span>
            </div>
          </div>
        </div>

        {/* History */}
        <div className="flex gap-1.5 mb-3 overflow-x-auto pb-1">
          {history.length === 0 && (
            <span className="text-[13px]" style={{ color: "#5a5a65" }}>
              Aucune partie pour l'instant
            </span>
          )}
          {history.map((m, i) => (
            <span
              key={i}
              className="px-2 py-0.5 rounded-md text-[12px] font-semibold flex-shrink-0 tabular-nums"
              style={{ background: `${chipColor(m)}22`, color: chipColor(m) }}
            >
              {m.toFixed(2)}x
            </span>
          ))}
        </div>

        {/* Playfield */}
        <div
          className="relative rounded-2xl overflow-hidden mb-4"
          style={{
            height: 220,
            background:
              "radial-gradient(120% 120% at 10% 90%, #1a1326 0%, #0d0d10 60%)",
            border: "1px solid #232329",
          }}
        >
          {/* Courbe */}
          <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path
              d={`M6,82 Q ${(6 + planeX) / 2},${82} ${planeX},${planeY}`}
              fill="none"
              stroke={color}
              strokeWidth="0.8"
              opacity="0.7"
            />
            <path
              d={`M6,82 Q ${(6 + planeX) / 2},${82} ${planeX},${planeY} L ${planeX},100 L 6,100 Z`}
              fill={color}
              opacity="0.08"
            />
          </svg>

          {/* Avion */}
          <div
            className="absolute"
            style={{
              left: `${planeX}%`,
              top: `${planeY}%`,
              transform: `translate(-50%,-50%) ${
                phase === "crashed" ? "translate(40px,-40px)" : ""
              }`,
              opacity: phase === "crashed" ? 0 : 1,
              transition: phase === "crashed" ? "all 0.5s ease-in" : "none",
            }}
          >
            <img
              src="/aviator.png"
              alt="Avion"
              className="w-12 h-12 object-contain drop-shadow-lg select-none"
              draggable={false}
            />
          </div>

          {/* Multiplicateur central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div
              className="text-5xl sm:text-6xl font-bold tabular-nums"
              style={{ color, textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}
            >
              {multiplier.toFixed(2)}x
            </div>
            {phase === "crashed" && (
              <div className="mt-2 text-lg font-semibold" style={{ color: "#ef4444" }}>
                Envolé ! 💥
              </div>
            )}
            {phase === "cashed" && cashedAt && (
              <div className="mt-2 text-lg font-semibold" style={{ color: "#22c55e" }}>
                +{(activeStake * cashedAt).toFixed(2)} retirés 🎉
              </div>
            )}
            {phase === "idle" && (
              <div className="mt-2 text-[14px]" style={{ color: "#8a8a96" }}>
                Place ta mise et décolle
              </div>
            )}
          </div>
        </div>

        {/* Bet controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center mb-4">
          <div
            className="flex items-center rounded-xl overflow-hidden flex-1"
            style={{ background: "#16161b", border: "1px solid #232329" }}
          >
            <button
              onClick={() => setBet((b) => Math.max(1, Math.round(b / 2)))}
              disabled={phase === "flying"}
              className="px-4 py-3 text-white/80 hover:bg-white/5 disabled:opacity-40 text-lg"
            >
              ½
            </button>
            <div className="flex-1 text-center">
              <span className="text-[12px] block" style={{ color: "#8a8a96" }}>
                Mise
              </span>
              <span className="text-[17px] font-semibold text-white tabular-nums">
                {stake}
              </span>
            </div>
            <button
              onClick={() => setBet((b) => Math.min(balance, b * 2 || 1))}
              disabled={phase === "flying"}
              className="px-4 py-3 text-white/80 hover:bg-white/5 disabled:opacity-40 text-lg"
            >
              2×
            </button>
          </div>

          {phase === "flying" ? (
            <button
              onClick={cashOut}
              className="px-6 py-3 rounded-xl font-semibold text-white text-[16px] transition-colors"
              style={{ background: "#16a34a" }}
            >
              Retirer {(activeStake * multiplier).toFixed(2)}
            </button>
          ) : (
            <button
              onClick={placeBet}
              disabled={stake < 1}
              className="px-6 py-3 rounded-xl font-semibold text-white text-[16px] transition-colors disabled:opacity-40"
              style={{ background: "#dc2626" }}
            >
              Parier {stake}
            </button>
          )}
        </div>

        {/* Quick bets + reset */}
        <div className="flex items-center gap-2 flex-wrap">
          {[10, 50, 100, 250].map((q) => (
            <button
              key={q}
              onClick={() => setBet(Math.min(balance, q))}
              disabled={phase === "flying"}
              className="px-3 py-1.5 rounded-lg text-[13px] text-white/80 disabled:opacity-40"
              style={{ background: "#16161b", border: "1px solid #232329" }}
            >
              {q}
            </button>
          ))}
          <button
            onClick={resetBalance}
            disabled={phase === "flying"}
            className="ml-auto px-3 py-1.5 rounded-lg text-[13px] text-white/70 flex items-center gap-1.5 disabled:opacity-40"
            style={{ background: "#16161b", border: "1px solid #232329" }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Réinitialiser le solde
          </button>
        </div>

        
      </div>
    </div>
  )
}

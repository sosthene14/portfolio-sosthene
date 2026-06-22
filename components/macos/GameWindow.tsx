"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Play, Pause, RotateCcw, Trophy, Zap } from "lucide-react"

type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT"
type Position = { x: number; y: number }

const GRID_SIZE = 20
const INITIAL_SPEED = 150
const SPEED_INCREMENT = 5

export function GameWindow() {
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<Position>({ x: 15, y: 15 })
  const [direction, setDirection] = useState<Direction>("RIGHT")
  const [nextDirection, setNextDirection] = useState<Direction>("RIGHT")
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    if (typeof window === "undefined") return 0
    const saved = localStorage.getItem("snakeHighScore")
    return saved ? parseInt(saved) : 0
  })
  const [gameOver, setGameOver] = useState(false)
  const [speed, setSpeed] = useState(INITIAL_SPEED)
  const [cellSize, setCellSize] = useState(20)

  const gameLoopRef = useRef<ReturnType<typeof requestAnimationFrame>>(null)
  const boardRef = useRef<HTMLDivElement>(null)

  // Calcule la cellSize selon la largeur disponible du board
  useEffect(() => {
    const updateCellSize = () => {
      if (boardRef.current) {
        const available = boardRef.current.clientWidth
        setCellSize(Math.floor(available / GRID_SIZE))
      }
    }
    updateCellSize()
    window.addEventListener("resize", updateCellSize)
    return () => window.removeEventListener("resize", updateCellSize)
  }, [])

  const generateFood = useCallback((snakeBody: Position[]) => {
    let newFood: Position
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      }
    } while (snakeBody.some(segment => segment.x === newFood.x && segment.y === newFood.y))
    return newFood
  }, [])

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }]
    setSnake(initialSnake)
    setFood(generateFood(initialSnake))
    setDirection("RIGHT")
    setNextDirection("RIGHT")
    setScore(0)
    setGameOver(false)
    setSpeed(INITIAL_SPEED)
    setIsPlaying(false)
  }, [generateFood])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying && !gameOver) return
      const keyMap: Record<string, Direction> = {
        ArrowUp: "UP", ArrowDown: "DOWN", ArrowLeft: "LEFT", ArrowRight: "RIGHT",
        w: "UP", s: "DOWN", a: "LEFT", d: "RIGHT",
      }
      const newDirection = keyMap[e.key]
      if (!newDirection) return
      e.preventDefault()
      const opposites: Record<Direction, Direction> = {
        UP: "DOWN", DOWN: "UP", LEFT: "RIGHT", RIGHT: "LEFT",
      }
      if (opposites[direction] !== newDirection) setNextDirection(newDirection)
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlaying, gameOver, direction])

  useEffect(() => {
    if (!isPlaying || gameOver) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current)
      return
    }
    //@ts-ignore
    gameLoopRef.current = setInterval(() => {
      setDirection(nextDirection)
      setSnake(currentSnake => {
        const head = currentSnake[0]
        const newHead = { ...head }
        switch (nextDirection) {
          case "UP": newHead.y -= 1; break
          case "DOWN": newHead.y += 1; break
          case "LEFT": newHead.x -= 1; break
          case "RIGHT": newHead.x += 1; break
        }
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true); setIsPlaying(false); return currentSnake
        }
        if (currentSnake.some(s => s.x === newHead.x && s.y === newHead.y)) {
          setGameOver(true); setIsPlaying(false); return currentSnake
        }
        const newSnake = [newHead, ...currentSnake]
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore(s => {
            const newScore = s + 10
            if (newScore > highScore) {
              setHighScore(newScore)
              localStorage.setItem("snakeHighScore", newScore.toString())
            }
            return newScore
          })
          setSpeed(s => Math.max(50, s - SPEED_INCREMENT))
          setFood(generateFood(newSnake))
          return newSnake
        }
        newSnake.pop()
        return newSnake
      })
    }, speed)
    return () => { if (gameLoopRef.current) clearInterval(gameLoopRef.current) }
  }, [isPlaying, gameOver, nextDirection, food, speed, highScore, generateFood])

  const boardSize = cellSize * GRID_SIZE

  return (
    <div
      className="h-full overflow-auto pb-20"
      style={{
        background: "#111114",
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
    >
      <div className="max-w-3xl mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <h1 className="text-3xl sm:text-4xl font-light text-white">Snake Game 🐍</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          {[
            { icon: <Zap className="w-4 h-4 text-white/60" />, label: "Score", value: score },
            { icon: <Trophy className="w-4 h-4 text-white/60" />, label: "Meilleur", value: highScore },
            { icon: null, label: "Longueur", value: snake.length },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white/5 backdrop-blur-xl rounded-xl p-3 sm:p-4 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                {icon}
                <span className="text-xs text-white/60">{label}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-light text-white">{value}</div>
            </div>
          ))}
        </div>

        {/* Game Board — s'adapte à la largeur disponible */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-3 sm:p-6 border border-white/10 mb-4 sm:mb-6">
          {/* boardRef mesure la largeur disponible */}
          <div ref={boardRef} className="w-full">
            <div
              className="relative mx-auto bg-black/40 rounded-xl overflow-hidden border border-white/10"
              style={{ width: boardSize, height: boardSize }}
            >
              {/* Grid */}
              <div
                className="absolute inset-0 grid"
                style={{
                  gridTemplateColumns: `repeat(${GRID_SIZE}, ${cellSize}px)`,
                  gridTemplateRows: `repeat(${GRID_SIZE}, ${cellSize}px)`,
                }}
              >
                {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => (
                  <div key={i} className="border border-white/5" />
                ))}
              </div>

              {/* Snake */}
              {snake.map((segment, index) => (
                <div
                  key={index}
                  className="absolute transition-all duration-100"
                  style={{
                    left: segment.x * cellSize,
                    top: segment.y * cellSize,
                    width: cellSize,
                    height: cellSize,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-sm ${
                      index === 0
                        ? "bg-gradient-to-br from-green-400 to-green-600"
                        : "bg-gradient-to-br from-green-500/80 to-green-700/80"
                    }`}
                  />
                </div>
              ))}

              {/* Food */}
              <div
                className="absolute transition-all duration-200"
                style={{
                  left: food.x * cellSize,
                  top: food.y * cellSize,
                  width: cellSize,
                  height: cellSize,
                }}
              >
                <div className="w-full h-full bg-gradient-to-br from-red-400 to-red-600 rounded-full animate-pulse" />
              </div>

              {/* Game Over Overlay */}
              {gameOver && (
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">💀</div>
                    <div className="text-xl sm:text-2xl font-light text-white mb-2">Game Over!</div>
                    <div className="text-white/60 mb-4 text-sm sm:text-base">Score: {score}</div>
                    <button
                      onClick={resetGame}
                      className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all text-sm"
                    >
                      Rejouer
                    </button>
                  </div>
                </div>
              )}

              {/* Start Overlay */}
              {!isPlaying && !gameOver && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center px-4">
                    <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎮</div>
                    <div className="text-lg sm:text-xl font-light text-white mb-2">Prêt à jouer ?</div>
                    <div className="text-xs sm:text-sm text-white/60">
                      Flèches ou WASD • Boutons tactiles ci-dessous
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contrôles tactiles mobile (D-pad) */}
        <div className="flex sm:hidden flex-col items-center gap-2 mb-4">
          <button
            onTouchStart={() => direction !== "DOWN" && setNextDirection("UP")}
            className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white text-xl active:bg-white/20"
          >
            ↑
          </button>
          <div className="flex gap-2">
            <button
              onTouchStart={() => direction !== "RIGHT" && setNextDirection("LEFT")}
              className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white text-xl active:bg-white/20"
            >
              ←
            </button>
            <div className="w-14 h-14" />
            <button
              onTouchStart={() => direction !== "LEFT" && setNextDirection("RIGHT")}
              className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white text-xl active:bg-white/20"
            >
              →
            </button>
          </div>
          <button
            onTouchStart={() => direction !== "UP" && setNextDirection("DOWN")}
            className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 flex items-center justify-center text-white text-xl active:bg-white/20"
          >
            ↓
          </button>
        </div>

        {/* Controls */}
        <div className="flex gap-3 justify-center mb-4 sm:mb-6">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={gameOver}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            {isPlaying ? <><Pause className="w-4 h-4 sm:w-5 sm:h-5" />Pause</> : <><Play className="w-4 h-4 sm:w-5 sm:h-5" />{gameOver ? "Nouvelle partie" : "Commencer"}</>}
          </button>
          <button
            onClick={resetGame}
            className="px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl border border-white/20 transition-all flex items-center gap-2 text-sm sm:text-base"
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
            Reset
          </button>
        </div>

        {/* Instructions */}
        <div className="bg-white/5 backdrop-blur-xl rounded-xl p-4 border border-white/10">
          <p className="text-sm font-medium text-white mb-2">Comment jouer :</p>
          <ul className="text-white/60 space-y-1 text-xs sm:text-sm">
            <li>• <span className="hidden sm:inline">Flèches directionnelles ou WASD</span><span className="sm:hidden">D-pad tactile ci-dessus</span> pour déplacer le serpent</li>
            <li>• Mange les points rouges pour grandir et marquer des points</li>
            <li>• Évite les murs et ne te mords pas la queue !</li>
            <li>• Le serpent accélère à chaque point mangé 🚀</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
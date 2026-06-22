"use client"

import { useState, useRef, useEffect } from "react"

interface WindowProps {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onClose: () => void
  onMinimize?: () => void
  initialPosition?: { x: number; y: number }
  initialSize?: { width: number; height: number }
  zIndex?: number
  onFocus?: () => void
}

const MOBILE_BREAKPOINT = 768
const MIN_WIDTH = 420
const MIN_HEIGHT = 320
const TOP_LIMIT = 0

export function Window({
  title,
  children,
  isOpen,
  onClose,
  onMinimize,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: 800, height: 500 },
  zIndex = 10,
  onFocus,
}: WindowProps) {
  const [position, setPosition] = useState(initialPosition)
  const [size, setSize] = useState(initialSize)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const windowRef = useRef<HTMLDivElement>(null)
  const previousState = useRef({ position, size })

  // Interaction state kept in refs so dragging never triggers React re-renders
  const mode = useRef<"none" | "drag" | "resize">("none")
  const start = useRef({ px: 0, py: 0, x: 0, y: 0, w: 0, h: 0 })
  const rafId = useRef<number | null>(null)
  const live = useRef({ x: position.x, y: position.y, w: size.width, h: size.height })

  // Détection mobile + resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Fermeture au clic en dehors
  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
      if (mode.current !== "none") return
      if (windowRef.current && !windowRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside)
    }, 100)
    return () => {
      clearTimeout(timer)
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Nettoyage rAF au démontage
  useEffect(() => {
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current)
    }
  }, [])

  const beginInteraction = (e: React.PointerEvent, nextMode: "drag" | "resize") => {
    if (isMobile || isMaximized) return
    e.preventDefault()
    e.stopPropagation()
    onFocus?.()
    mode.current = nextMode
    start.current = {
      px: e.clientX,
      py: e.clientY,
      x: position.x,
      y: position.y,
      w: size.width,
      h: size.height,
    }
    live.current = { x: position.x, y: position.y, w: size.width, h: size.height }
    const el = windowRef.current
    if (el) {
      el.style.willChange = nextMode === "drag" ? "left, top" : "width, height"
      try {
        el.setPointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }
    document.body.style.userSelect = "none"
  }

  const handleTitlePointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest(".window-controls")) return
    beginInteraction(e, "drag")
  }

  const handleResizePointerDown = (e: React.PointerEvent) => {
    beginInteraction(e, "resize")
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (mode.current === "none") return
    if (rafId.current) return // throttle: une mise à jour par frame
    const cx = e.clientX
    const cy = e.clientY
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null
      const el = windowRef.current
      if (!el) return
      if (mode.current === "drag") {
        const nx = start.current.x + (cx - start.current.px)
        const ny = Math.max(TOP_LIMIT, start.current.y + (cy - start.current.py))
        live.current.x = nx
        live.current.y = ny
        el.style.left = `${nx}px`
        el.style.top = `${ny}px`
      } else if (mode.current === "resize") {
        const nw = Math.max(MIN_WIDTH, start.current.w + (cx - start.current.px))
        const nh = Math.max(MIN_HEIGHT, start.current.h + (cy - start.current.py))
        live.current.w = nw
        live.current.h = nh
        el.style.width = `${nw}px`
        el.style.height = `${nh}px`
      }
    })
  }

  const endInteraction = (e: React.PointerEvent) => {
    if (mode.current === "none") return
    const wasMode = mode.current
    mode.current = "none"
    if (rafId.current) {
      cancelAnimationFrame(rafId.current)
      rafId.current = null
    }
    const el = windowRef.current
    if (el) {
      el.style.willChange = ""
      try {
        el.releasePointerCapture(e.pointerId)
      } catch {
        /* noop */
      }
    }
    document.body.style.userSelect = ""
    // Commit final values to state once
    if (wasMode === "drag") {
      setPosition({ x: live.current.x, y: live.current.y })
    } else if (wasMode === "resize") {
      setSize({ width: live.current.w, height: live.current.h })
    }
  }

  const handleMaximize = () => {
    if (isMobile) return
    if (isMaximized) {
      setPosition(previousState.current.position)
      setSize(previousState.current.size)
    } else {
      previousState.current = { position, size }
    }
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setTimeout(() => {
      setIsMinimized(false)
      onMinimize?.()
    }, 250)
  }

  if (!isOpen) return null

  // Barre basse persistante avec bouton Fermer (toutes les fenêtres)
  const footerBar = (
    <div className="flex items-center justify-end px-2.5 py-1.5 md:px-4 md:py-2.5 shrink-0 border-t border-border/30 bg-macos-sidebar">
      <button
        onClick={onClose}
        className="px-3 py-1 text-xs md:px-4 md:py-1.5 md:text-sm font-medium rounded-lg text-foreground/90 bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      >
        Fermer
      </button>
    </div>
  )

  // Sur mobile : plein écran fixe, pas de drag, pas de resize
  if (isMobile) {
    return (
      <div
        ref={windowRef}
        className={`fixed inset-x-3 top-10 bottom-24 rounded-2xl macos-window-shadow flex flex-col transition-[transform,opacity] duration-200 ${
          isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ zIndex }}
        onClick={onFocus}
      >
        {/* Wrapper interne SANS backdrop-filter => le border-radius découpe bien les enfants */}
        <div className="flex flex-col h-full w-full rounded-2xl overflow-hidden border border-white/10 bg-macos-window">
          <div className="h-12 bg-macos-sidebar flex items-center px-4 gap-3 select-none shrink-0 border-b border-border/30">
            <div className="window-controls flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-3 h-3 rounded-full bg-macos-red hover:brightness-90 transition-all group relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover:opacity-100">
                  ×
                </span>
              </button>
              <button
                onClick={handleMinimize}
                className="w-3 h-3 rounded-full bg-macos-yellow hover:brightness-90 transition-all group relative"
              >
                <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100">
                  −
                </span>
              </button>
              <div className="w-3 h-3 rounded-full bg-macos-green opacity-30 cursor-not-allowed" />
            </div>

            <div className="flex-1 text-center">
              <span className="text-sm font-medium text-foreground/80">{title}</span>
            </div>

            <div className="w-14" />
          </div>

          <div className="flex-1 min-h-0 overflow-hidden">{children}</div>

          {footerBar}
        </div>
      </div>
    )
  }

  // Desktop
  return (
    <div
      ref={windowRef}
      onPointerMove={handlePointerMove}
      onPointerUp={endInteraction}
      onPointerCancel={endInteraction}
      className={`fixed bg-macos-window macos-glass rounded-xl macos-window-shadow overflow-hidden flex flex-col transition-[transform,opacity] duration-200 ${
        isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? TOP_LIMIT : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100vh - 108px)" : size.height,
        zIndex,
      }}
      onMouseDown={onFocus}
    >
      <div
        className="h-12 bg-macos-sidebar flex items-center px-4 gap-4 select-none shrink-0 border-b border-border/30"
        style={{ cursor: isMaximized ? "default" : "grab", touchAction: "none" }}
        onPointerDown={handleTitlePointerDown}
        onDoubleClick={handleMaximize}
      >
        <div className="window-controls flex items-center gap-2">
          <button
            onClick={onClose}
            className="w-3 h-3 rounded-full bg-macos-red hover:brightness-90 transition-all group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-red-900 opacity-0 group-hover:opacity-100">
              ×
            </span>
          </button>
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-macos-yellow hover:brightness-90 transition-all group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[8px] text-yellow-900 opacity-0 group-hover:opacity-100">
              −
            </span>
          </button>
          <button
            onClick={handleMaximize}
            className="w-3 h-3 rounded-full bg-macos-green hover:brightness-90 transition-all group relative"
          >
            <span className="absolute inset-0 flex items-center justify-center text-[6px] text-green-900 opacity-0 group-hover:opacity-100">
              ⤢
            </span>
          </button>
        </div>

        <div className="flex-1 text-center">
          <span className="text-sm font-medium text-foreground/80">{title}</span>
        </div>

        <div className="w-14" />
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">{children}</div>

      {footerBar}

      {/* Poignée de redimensionnement (coin bas-droit) */}
      {!isMaximized && (
        <div
          onPointerDown={handleResizePointerDown}
          className="absolute bottom-0 right-0 w-4 h-4 z-10"
          style={{ cursor: "nwse-resize", touchAction: "none" }}
        />
      )}
    </div>
  )
}

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
  const [isDragging, setIsDragging] = useState(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const dragOffset = useRef({ x: 0, y: 0 })
  const previousState = useRef({ position, size })
  const windowRef = useRef<HTMLDivElement>(null)

  // Détection mobile + resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized && !isMobile) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: Math.max(28, e.clientY - dragOffset.current.y),
        })
      }
    }
    const handleMouseUp = () => setIsDragging(false)

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isMaximized, isMobile])

  useEffect(() => {
    if (!isOpen) return
    const handleClickOutside = (e: MouseEvent) => {
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

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMobile) return
    if ((e.target as HTMLElement).closest(".window-controls")) return
    setIsDragging(true)
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    }
    onFocus?.()
  }

  const handleMaximize = () => {
    if (isMobile) return
    if (isMaximized) {
      setPosition(previousState.current.position)
      setSize(previousState.current.size)
    } else {
      previousState.current = { position, size }
      setPosition({ x: 0, y: 28 })
      setSize({ width: window.innerWidth, height: window.innerHeight - 28 - 80 })
    }
    setIsMaximized(!isMaximized)
  }

  const handleMinimize = () => {
    setIsMinimized(true)
    setTimeout(() => {
      setIsMinimized(false)
      onMinimize?.()
    }, 300)
  }

  if (!isOpen) return null

  // Sur mobile : plein écran fixe, pas de drag, pas de resize
  if (isMobile) {
    return (
      <div
        ref={windowRef}
        className={`fixed mx-4 h-[550px] mt-10 rounded-md  inset-0 bg-macos-window macos-glass flex flex-col transition-all duration-200 ${
          isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        style={{ zIndex }}
        onClick={onFocus}
      >
        {/* Title bar mobile */}
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
            {/* Bouton maximize désactivé sur mobile */}
            <div className="w-3 h-3 rounded-full bg-macos-green opacity-30 cursor-not-allowed" />
          </div>

          <div className="flex-1 text-center">
            <span className="text-sm font-medium text-foreground/80">{title}</span>
          </div>

          <div className="w-14" />
        </div>

        <div className="flex-1 overflow-hidden">{children}</div>
      </div>
    )
  }

  // Desktop : comportement original
  return (
    <div
      ref={windowRef}
      className={`fixed -mt-5 bg-macos-window macos-glass rounded-xl macos-window-shadow overflow-hidden flex flex-col transition-all duration-200 ${
        isMinimized ? "scale-0 opacity-0" : "scale-100 opacity-100"
      }`}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 28 : position.y,
        width: isMaximized ? "100%" : size.width,
        height: isMaximized ? "calc(100vh - 108px)" : size.height,
        zIndex,
      }}
      onClick={onFocus}
    >
      <div
        className="h-12 bg-macos-sidebar flex items-center px-4 gap-4 cursor-default select-none shrink-0 border-b border-border/30"
        onMouseDown={handleMouseDown}
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

      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  )
}
"use client"

import { useState, useRef, useEffect } from "react"

interface TerminalLine {
  type: "input" | "output"
  content: string
}

export function TerminalWindow() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Last login: dim.  1 juin 2026 10:30:45 sur ttys001" },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [lines])

  const handleCommand = (command: string) => {
    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `user@macbook ~ % ${command}` },
    ]

    // Simulate some basic commands
    if (command === "ls") {
      newLines.push({
        type: "output",
        content: "Applications  Desktop  Documents  Downloads  Library  Movies  Music  Pictures  Public",
      })
    } else if (command === "pwd") {
      newLines.push({ type: "output", content: "/Users/user" })
    } else if (command === "whoami") {
      newLines.push({ type: "output", content: "user" })
    } else if (command === "date") {
      newLines.push({ type: "output", content: new Date().toString() })
    } else if (command === "clear") {
      setLines([])
      setCurrentInput("")
      return
    } else if (command.startsWith("echo ")) {
      newLines.push({ type: "output", content: command.substring(5) })
    } else if (command === "neofetch" || command === "screenfetch") {
      newLines.push({
        type: "output",
        content: `                    'c.          user@macbook
                 ,xNMM.          ---------------
               .OMMMMo           OS: macOS Sonoma 14.5
               OMMM0,            Host: MacBook Pro
     .;loddo:' loolloddol;.      Kernel: Darwin 23.5.0
   cKMMMMMMMMMMNWMMMMMMMMMM0:    Uptime: 2 days, 5 hours
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.    Packages: 156 (brew)
 XMMMMMMMMMMMMMMMMMMMMMMMX.      Shell: zsh 5.9
;MMMMMMMMMMMMMMMMMMMMMMMM:       Resolution: 2560x1600
:MMMMMMMMMMMMMMMMMMMMMMMM:       DE: Aqua
.MMMMMMMMMMMMMMMMMMMMMMMMX.      WM: Quartz Compositor
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.    Terminal: Terminal.app
 .XMMMMMMMMMMMMMMMMMMMMMMMMMMk   CPU: Apple M3 Pro
  .XMMMMMMMMMMMMMMMMMMMMMMMMK.   GPU: Apple M3 Pro
    kMMMMMMMMMMMMMMMMMMMMMMd     Memory: 8192MiB / 18432MiB
     ;KMMMMMMMWXXWMMMMMMMk.
       .coeli;,  .,clic.`,
      })
    } else if (command === "help") {
      newLines.push({
        type: "output",
        content: `Available commands:
  ls        - List directory contents
  pwd       - Print working directory
  whoami    - Print current user
  date      - Print current date and time
  echo      - Print arguments
  clear     - Clear the terminal
  neofetch  - Display system info
  help      - Show this help message`,
      })
    } else if (command.trim() !== "") {
      newLines.push({
        type: "output",
        content: `zsh: command not found: ${command}`,
      })
    }

    setLines(newLines)
    setCurrentInput("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(currentInput)
    }
  }

  return (
    <div
      ref={containerRef}
      className="h-full bg-[#1e1e1e] text-green-400 font-mono text-sm p-4 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map((line, index) => (
        <div key={index} className="whitespace-pre-wrap">
          {line.type === "input" ? (
            <span className="text-white">{line.content}</span>
          ) : (
            <span className="text-gray-300">{line.content}</span>
          )}
        </div>
      ))}
      
      {/* Current input line */}
      <div className="flex items-center">
        <span className="text-white">user@macbook ~ % </span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white caret-white"
          autoFocus
        />
      </div>
    </div>
  )
}

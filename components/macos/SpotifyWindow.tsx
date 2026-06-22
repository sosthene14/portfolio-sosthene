"use client"

import { Play, Heart, SkipBack, SkipForward, Shuffle, Repeat, Volume2, Pause } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export function SpotifyWindow() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.75)
  const audioRef = useRef<HTMLAudioElement>(null)

  const songs = [
    { 
      title: "Blinding Lights", 
      artist: "The Weeknd", 
      album: "After Hours", 
      file: "/blind.mp3",
      color: "from-purple-500 to-pink-600"
    },
    { 
      title: "Levitating", 
      artist: "Dua Lipa", 
      album: "Future Nostalgia", 
      file: "/dua.mp3",
      color: "from-blue-500 to-purple-600"
    },
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      // Auto play next track
      if (currentTrack < songs.length - 1) {
        setCurrentTrack(currentTrack + 1)
      }
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("loadedmetadata", updateDuration)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("loadedmetadata", updateDuration)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentTrack, songs.length])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }, [isPlaying, currentTrack])

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playTrack = (index: number) => {
    setCurrentTrack(index)
    setIsPlaying(true)
    setCurrentTime(0)
  }

  const nextTrack = () => {
    if (currentTrack < songs.length - 1) {
      playTrack(currentTrack + 1)
    }
  }

  const prevTrack = () => {
    if (currentTime > 3) {
      // Si plus de 3 secondes, recommence le morceau
      if (audioRef.current) audioRef.current.currentTime = 0
    } else if (currentTrack > 0) {
      playTrack(currentTrack - 1)
    }
  }

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current
    if (!audio || !duration) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audio.currentTime = percentage * duration
  }

  const changeVolume = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const newVolume = Math.max(0, Math.min(1, x / rect.width))
    setVolume(newVolume)
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const playlists = [
    { name: "Liked Songs", tracks: "2 songs", color: "from-purple-600 to-purple-800" },
    { name: "Chill Vibes", tracks: "48 songs", color: "from-blue-600 to-blue-800" },
    { name: "Coding Zone", tracks: "127 songs", color: "from-green-600 to-green-800" },
    { name: "Workout", tracks: "89 songs", color: "from-red-600 to-red-800" },
  ]

  const currentSong = songs[currentTrack]

  return (
    <div className="h-full bg-[#121212] text-white flex flex-col">
      {/* Hidden audio element */}
      <audio ref={audioRef} src={currentSong.file} />

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-60 bg-black p-6 flex flex-col gap-6">
          <div className="space-y-4">
            <button className="flex items-center gap-4 text-white/70 hover:text-white transition-colors w-full text-left">
              <div className="w-6 h-6">🏠</div>
              <span className="font-semibold">Home</span>
            </button>
            <button className="flex items-center gap-4 text-white/70 hover:text-white transition-colors w-full text-left">
              <div className="w-6 h-6">🔍</div>
              <span className="font-semibold">Search</span>
            </button>
            <button className="flex items-center gap-4 text-white/70 hover:text-white transition-colors w-full text-left">
              <div className="w-6 h-6">📚</div>
              <span className="font-semibold">Your Library</span>
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <button className="flex items-center gap-4 text-white/70 hover:text-white transition-colors w-full text-left mb-4">
              <div className="w-6 h-6">➕</div>
              <span className="font-semibold">Create Playlist</span>
            </button>
            <button className="flex items-center gap-4 text-white hover:text-white transition-colors w-full text-left">
              <div className="w-6 h-6">💜</div>
              <span className="font-semibold">Liked Songs</span>
            </button>
          </div>

          {/* Playlists */}
          <div className="flex-1 overflow-auto space-y-2">
            {playlists.map((playlist, i) => (
              <button
                key={i}
                className="text-white/60 hover:text-white transition-colors text-sm w-full text-left"
              >
                {playlist.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main View */}
        <div className="flex-1 overflow-auto">
          {/* Header with gradient */}
          <div className={`h-64 bg-gradient-to-b ${currentSong.color} to-transparent p-6 flex items-end`}>
            <div className="flex items-end gap-6">
              <div className={`w-56 h-56 bg-gradient-to-br ${currentSong.color} rounded shadow-2xl flex items-center justify-center`}>
                <Heart className="w-24 h-24 text-white" fill="white" />
              </div>
              <div>
                <div className="text-xs font-semibold mb-2">PLAYLIST</div>
                <h1 className="text-7xl font-bold mb-6">Liked Songs</h1>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">Sosthène Mounsambote</span>
                  <span>•</span>
                  <span>{songs.length} songs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-gradient-to-b from-black/40 to-[#121212] p-6">
            <div className="flex items-center gap-6 mb-6">
              <button 
                onClick={togglePlay}
                className="w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-black" fill="black" />
                ) : (
                  <Play className="w-6 h-6 text-black ml-1" fill="black" />
                )}
              </button>
              <button className="text-white/60 hover:text-white transition-colors">
                <Heart className="w-8 h-8" />
              </button>
            </div>

            {/* Track List */}
            <div className="space-y-1">
              {songs.map((song, i) => (
                <button
                  key={i}
                  onClick={() => playTrack(i)}
                  className={`grid grid-cols-[40px_1fr_1fr_80px] gap-4 px-4 py-2 rounded transition-colors group w-full text-left ${
                    currentTrack === i && isPlaying ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-center text-white/60 group-hover:text-white">
                    {currentTrack === i && isPlaying ? (
                      <div className="flex gap-0.5 items-end">
                        <div className="w-0.5 h-3 bg-[#1db954] animate-pulse" />
                        <div className="w-0.5 h-2 bg-[#1db954] animate-pulse" style={{ animationDelay: "0.2s" }} />
                        <div className="w-0.5 h-4 bg-[#1db954] animate-pulse" style={{ animationDelay: "0.4s" }} />
                      </div>
                    ) : (
                      i + 1
                    )}
                  </div>
                  <div>
                    <div className={`font-medium ${currentTrack === i && isPlaying ? "text-[#1db954]" : ""}`}>
                      {song.title}
                    </div>
                    <div className="text-sm text-white/60">{song.artist}</div>
                  </div>
                  <div className="flex items-center text-sm text-white/60">{song.album}</div>
                  <div className="flex items-center justify-end text-sm text-white/60">
                    {currentTrack === i ? formatTime(duration) : "--:--"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Bar */}
      <div className="h-24 bg-[#181818] border-t border-white/10 px-4 flex items-center justify-between">
        {/* Current Track */}
        <div className="flex items-center gap-4 w-80">
          <div className={`w-14 h-14 bg-gradient-to-br ${currentSong.color} rounded`} />
          <div className="flex-1 min-w-0">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-sm text-white/60 truncate">{currentSong.artist}</div>
          </div>
          <button className="text-white/60 hover:text-white transition-colors">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <button className="text-white/60 hover:text-white transition-colors">
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={prevTrack} className="text-white/60 hover:text-white transition-colors">
              <SkipBack className="w-5 h-5" />
            </button>
            <button 
              onClick={togglePlay}
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-105 transition-transform"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-black" fill="black" />
              ) : (
                <Play className="w-4 h-4 text-black ml-0.5" fill="black" />
              )}
            </button>
            <button onClick={nextTrack} className="text-white/60 hover:text-white transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button className="text-white/60 hover:text-white transition-colors">
              <Repeat className="w-4 h-4" />
            </button>
          </div>
          {/* Progress Bar */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-xs text-white/60">{formatTime(currentTime)}</span>
            <div 
              onClick={seekTo}
              className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group"
            >
              <div 
                className="h-full bg-white rounded-full group-hover:bg-[#1db954] transition-colors relative"
                style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
            <span className="text-xs text-white/60">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center gap-2 w-80 justify-end">
          <Volume2 className="w-4 h-4 text-white/60" />
          <div 
            onClick={changeVolume}
            className="w-24 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer group"
          >
            <div 
              className="h-full bg-white rounded-full group-hover:bg-[#1db954] transition-colors relative"
              style={{ width: `${volume * 100}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

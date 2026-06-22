"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Plus, Clock } from "lucide-react"

interface Event {
  id: string
  title: string
  date: Date
  startTime: string
  endTime: string
  color: string
}

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
]

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

export function CalendarWindow() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())

  const [events] = useState<Event[]>([
    {
      id: "1",
      title: "Réunion d'équipe",
      date: new Date(2026, 5, 12, 10, 0), // 12 juin 2026
      startTime: "10:00",
      endTime: "11:00",
      color: "bg-blue-500"
    },
    {
      id: "2",
      title: "Déjeuner client",
      date: new Date(2026, 5, 12, 12, 30),
      startTime: "12:30",
      endTime: "14:00",
      color: "bg-green-500"
    },
    {
      id: "3",
      title: "Présentation projet",
      date: new Date(2026, 5, 15, 15, 0),
      startTime: "15:00",
      endTime: "16:30",
      color: "bg-purple-500"
    },
    {
      id: "4",
      title: "Code review",
      date: new Date(2026, 5, 16, 14, 0),
      startTime: "14:00",
      endTime: "15:00",
      color: "bg-orange-500"
    },
  ])

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Jours du mois précédent
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Jours du mois actuel
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }

    return days
  }

  const isSameDay = (date1: Date, date2: Date | null) => {
    if (!date2) return false
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    )
  }

  const isToday = (date: Date | null) => {
    if (!date) return false
    return isSameDay(new Date(), date)
  }

  const getEventsForDate = (date: Date | null) => {
    if (!date) return []
    return events.filter(event => isSameDay(event.date, date))
  }

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const goToToday = () => {
    const today = new Date()
    setCurrentDate(today)
    setSelectedDate(today)
  }

  const days = getDaysInMonth(currentDate)
  const selectedDayEvents = getEventsForDate(selectedDate)

  return (
    <div className="h-full bg-macos-window flex">
      {/* Sidebar */}
      <div className="w-64 bg-macos-sidebar border-r border-border/30 flex flex-col p-4">
        {/* Mini Calendar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <div className="flex gap-1">
              <button
                onClick={previousMonth}
                className="p-1 hover:bg-foreground/10 rounded transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1 hover:bg-foreground/10 rounded transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Mini calendar grid */}
          <div className="grid grid-cols-7 gap-1 text-xs">
            {DAYS.map(day => (
              <div key={day} className="text-center font-medium text-muted-foreground py-1">
                {day[0]}
              </div>
            ))}
            {days.map((day, i) => {
              const hasEvents = day && getEventsForDate(day).length > 0
              return (
                <button
                  key={i}
                  onClick={() => day && setSelectedDate(day)}
                  disabled={!day}
                  className={`aspect-square flex items-center justify-center rounded text-xs transition-colors ${
                    !day
                      ? "text-transparent"
                      : isSameDay(selectedDate, day)
                      ? "bg-red-500 text-white font-semibold"
                      : isToday(day)
                      ? "bg-red-500/20 text-red-600 font-semibold"
                      : "hover:bg-foreground/10"
                  }`}
                >
                  {day?.getDate()}
                  {hasEvents && (
                    <div className="absolute w-1 h-1 bg-primary rounded-full mt-5" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Today button */}
        <button
          onClick={goToToday}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium text-sm mb-4"
        >
          Aujourd'hui
        </button>

        {/* Calendars list */}
        <div className="flex-1">
          <div className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Calendriers</div>
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-foreground/5 px-2 py-1 rounded">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span>Personnel</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-foreground/5 px-2 py-1 rounded">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>Travail</span>
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-foreground/5 px-2 py-1 rounded">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
              <div className="w-3 h-3 bg-green-500 rounded" />
              <span>Famille</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main calendar */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 border-b border-border/30 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <button
              onClick={goToToday}
              className="px-3 py-1 hover:bg-foreground/10 rounded transition-colors text-sm"
            >
              Aujourd'hui
            </button>
            <div className="flex items-center gap-2">
              <button onClick={previousMonth} className="p-1 hover:bg-foreground/10 rounded transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextMonth} className="p-1 hover:bg-foreground/10 rounded transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold ml-2">
                {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvel événement
            </button>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex-1 p-4 overflow-auto">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {DAYS.map(day => (
              <div key={day} className="text-center font-semibold text-sm text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1" style={{ gridAutoRows: "minmax(100px, 1fr)" }}>
            {days.map((day, i) => {
              const dayEvents = day ? getEventsForDate(day) : []
              return (
                <button
                  key={i}
                  onClick={() => day && setSelectedDate(day)}
                  className={`border border-border/30 rounded-lg p-2 text-left hover:bg-foreground/5 transition-colors ${
                    !day ? "bg-transparent" : isSameDay(selectedDate, day) ? "bg-red-500/10 border-red-500/30" : ""
                  }`}
                >
                  {day && (
                    <>
                      <div className={`text-sm font-medium mb-1 ${
                        isToday(day) 
                          ? "w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center" 
                          : currentDate.getMonth() !== day.getMonth()
                          ? "text-muted-foreground"
                          : ""
                      }`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs ${event.color} text-white px-1.5 py-0.5 rounded truncate`}
                          >
                            {event.startTime} {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 3} autres
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected day events detail */}
          {selectedDayEvents.length > 0 && (
            <div className="mt-6 p-4 bg-muted/30 rounded-xl border border-border/50">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Événements du {selectedDate.getDate()} {MONTHS[selectedDate.getMonth()]}
              </h3>
              <div className="space-y-2">
                {selectedDayEvents.map(event => (
                  <div key={event.id} className="flex items-start gap-3 p-3 bg-macos-window rounded-lg">
                    <div className={`w-1 h-full ${event.color} rounded-full`} />
                    <div className="flex-1">
                      <div className="font-medium">{event.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {event.startTime} - {event.endTime}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

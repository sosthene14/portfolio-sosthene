"use client";

import { useState, useEffect } from "react";
import {
  Apple,
  Wifi,
  Battery,
  Search,
  Volume2,
  Sun,
} from "lucide-react";

export function MenuBar() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  const menuItems = ["Finder", "Fichier", "Édition", "Présentation", "Aller", "Fenêtre", "Aide"];

  return (
    <div className="fixed top-0 left-0 right-0 bg-macos-menubar macos-glass z-50 overflow-x-auto scrollbar-hide">
      <div className="h-12 md:h-7 flex items-center justify-between px-4 text-[13px] font-medium text-foreground/90 min-w-max">
        {/* Left side - Apple menu and app menus */}
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            className="hover:bg-foreground/10 rounded px-1.5 py-1 md:py-0.5 transition-colors flex-shrink-0"
            onClick={() => setActiveMenu(activeMenu === "apple" ? null : "apple")}
          >
            <Apple className="w-4 h-4" />
          </button>
          
          {menuItems.map((item, index) => (
            <button
              key={item}
              className={`hover:bg-foreground/10 rounded px-1.5 py-1 md:py-0.5 transition-colors flex-shrink-0 whitespace-nowrap ${
                index === 0 ? "font-semibold" : ""
              }`}
              onClick={() => setActiveMenu(activeMenu === item ? null : item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Right side - Status icons */}
        <div className="flex items-center gap-2 md:gap-3">
          <button className="hover:bg-foreground/10 rounded p-1 transition-colors flex-shrink-0">
            <Sun className="w-4 h-4" />
          </button>
          <button className="hover:bg-foreground/10 rounded p-1 transition-colors flex-shrink-0">
            <Volume2 className="w-4 h-4" />
          </button>
          <button className="hover:bg-foreground/10 rounded p-1 transition-colors flex-shrink-0">
            <Wifi className="w-4 h-4" />
          </button>
          <button className="hover:bg-foreground/10 rounded p-1 transition-colors flex-shrink-0">
            <Battery className="w-4 h-4" />
          </button>
          <button className="hover:bg-foreground/10 rounded p-1 transition-colors flex-shrink-0">
            <Search className="w-4 h-4" />
          </button>
          <div className="flex flex-col items-end ml-1 flex-shrink-0">
            <span className="text-[11px] md:text-[13px] leading-tight">{formatTime(currentTime)}</span>
            <span className="text-[9px] md:hidden text-foreground/60">{formatDate(currentTime)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
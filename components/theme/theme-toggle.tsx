"use client";

import { useEffect, useState } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

type Theme = "day" | "night";

const storageKey = "sparekart-theme";

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") {
    return "day";
  }

  const savedTheme = window.localStorage.getItem(storageKey);

  if (savedTheme === "day" || savedTheme === "night") {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day";
}

function applyTheme(theme: Theme) {
  const isNight = theme === "night";

  document.documentElement.classList.toggle("dark", isNight);
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = isNight ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day");

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const preferredTheme = getPreferredTheme();
      setTheme(preferredTheme);
      applyTheme(preferredTheme);
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isNight = theme === "night";

  function toggleTheme() {
    const nextTheme = isNight ? "day" : "night";
    setTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
    applyTheme(nextTheme);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="group inline-flex h-11 items-center gap-2 rounded-2xl border border-white/70 bg-white/70 px-3 text-sm font-black text-amber-600 shadow-sm transition hover:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400/60 dark:border-white/10 dark:bg-white/10 dark:text-sky-200 dark:hover:bg-white/15"
      aria-label={isNight ? "Switch to day theme" : "Switch to night theme"}
      title={isNight ? "Switch to day theme" : "Switch to night theme"}
    >
      {isNight ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
      <span className="hidden sm:inline">{isNight ? "Night" : "Day"}</span>
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute("data-theme", stored);
    } else {
      const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setTheme(prefers ? "dark" : "light");
    }
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "light" ? "Mode sombre" : "Mode clair"}
      className="h-8 w-8 shrink-0 rounded-sm border border-border bg-secondary flex items-center justify-center text-[14px] transition-colors hover:border-foreground/30"
    >
      {theme === "light" ? "🌙" : "☀️"}
    </button>
  );
}

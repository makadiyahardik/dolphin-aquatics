"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const themes = {
  1: {
    // Original Dark Theme
    name: "Sky Blue Dark",
    primary: "#38bdf8",
    primaryLight: "#7dd3fc",
    primaryDark: "#0284c7",
    background: "#020617",
    backgroundAlt: "#0c1929",
    card: "#0f172a",
    foreground: "#f5f5f5",
    foregroundMuted: "#cbd5e1",
    isLight: false,
    layout: "default",
  },
  2: {
    // New Light Pool Water Theme
    name: "Pool Water Light",
    primary: "#0284c7",
    primaryLight: "#0ea5e9",
    primaryDark: "#075985",
    background: "#f0f9ff",
    backgroundAlt: "#e0f2fe",
    card: "#ffffff",
    foreground: "#0f172a",
    foregroundMuted: "#475569",
    isLight: true,
    layout: "default",
  },
};

const ThemeContext = createContext(themes[1]);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState(themes[1]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const v = searchParams.get("v");
    const themeNum = parseInt(v) || 1;
    const selectedTheme = themes[themeNum] || themes[1];
    setTheme(selectedTheme);

    document.documentElement.style.setProperty("--primary", selectedTheme.primary);
    document.documentElement.style.setProperty("--primary-light", selectedTheme.primaryLight);
    document.documentElement.style.setProperty("--primary-dark", selectedTheme.primaryDark);
    document.documentElement.style.setProperty("--bg", selectedTheme.background);
    document.documentElement.style.setProperty("--bg-alt", selectedTheme.backgroundAlt);
    document.documentElement.style.setProperty("--card", selectedTheme.card);
    document.documentElement.style.setProperty("--foreground", selectedTheme.foreground);
    document.documentElement.style.setProperty("--foreground-muted", selectedTheme.foregroundMuted);
    document.body.style.backgroundColor = selectedTheme.background;
    document.body.style.color = selectedTheme.foreground;
  }, [searchParams]);

  if (!mounted) {
    return <div style={{ background: "#0a0a0f", minHeight: "100vh" }} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export { themes };

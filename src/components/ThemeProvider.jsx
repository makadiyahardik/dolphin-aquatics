"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const themes = {
  "1": {
    // Midnight Black - Pure black, ocean blue accents, premium dark
    name: "Midnight Black",
    primary: "#2E86AB",
    primaryLight: "#5BA4C4",
    primaryDark: "#1D5A75",
    background: "#000000",
    backgroundAlt: "#0D0D0D",
    card: "#141414",
    foreground: "#FFFFFF",
    foregroundMuted: "#A0A0A0",
    buttonText: "#FFFFFF",
    isLight: false,
    layout: "default",
  },
  "2": {
    // Pure White - Clean white, ocean blue accents
    name: "Pure White",
    primary: "#2E86AB",
    primaryLight: "#5BA4C4",
    primaryDark: "#1D5A75",
    background: "#FFFFFF",
    backgroundAlt: "#F7F7F7",
    card: "#FFFFFF",
    foreground: "#000000",
    foregroundMuted: "#555555",
    buttonText: "#FFFFFF",
    isLight: true,
    layout: "default",
  },
  "3": {
    // Ocean Blue - Blue AS the background (bold statement)
    name: "Ocean Blue",
    primary: "#FFFFFF",
    primaryLight: "#FFFFFF",
    primaryDark: "#D0E8F0",
    background: "#1A6B8C",
    backgroundAlt: "#155A77",
    card: "#0D4A64",
    foreground: "#FFFFFF",
    foregroundMuted: "#B8DCE9",
    buttonText: "#1A6B8C",
    isLight: false,
    layout: "default",
  },
  "4": {
    // Azure Sky - Light vibrant blue, fresh & energetic
    name: "Azure Sky",
    primary: "#0D4A64",
    primaryLight: "#1A6B8C",
    primaryDark: "#083344",
    background: "#5BAACC",
    backgroundAlt: "#4A99BB",
    card: "#3D8AAD",
    foreground: "#FFFFFF",
    foregroundMuted: "#E0F4FC",
    buttonText: "#FFFFFF",
    isLight: false,
    layout: "default",
  },
  "5": {
    // Deep Sea - Very dark navy, luxurious depth
    name: "Deep Sea",
    primary: "#5BAACC",
    primaryLight: "#7BC0DC",
    primaryDark: "#3D8AAD",
    background: "#061820",
    backgroundAlt: "#0A2533",
    card: "#0D3347",
    foreground: "#FFFFFF",
    foregroundMuted: "#8CBDD4",
    buttonText: "#061820",
    isLight: false,
    layout: "default",
  },
};

const ThemeContext = createContext(themes["1"]);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const searchParams = useSearchParams();
  const [theme, setTheme] = useState(themes["1"]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const v = searchParams.get("v");
    const themeKey = v || "1";
    const selectedTheme = themes[themeKey] || themes["1"];
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
    return <div style={{ background: "#000000", minHeight: "100vh" }} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export { themes };

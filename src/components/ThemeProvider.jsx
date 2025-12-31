"use client";

import { createContext, useContext, useEffect, useState } from "react";

const theme = {
  // Azure Sky Refined - Main theme
  name: "Azure Sky Refined",
  primary: "#083040",
  primaryLight: "#0D5068",
  primaryDark: "#041820",
  background: "#5BAACC",
  backgroundAlt: "#4A99BB",
  card: "#3580A0",
  headerBackground: "#062535",
  foreground: "#FFFFFF",
  foregroundMuted: "#FFF8F0",
  buttonText: "#FFFFFF",
  border: "#2A6580",
  isLight: false,
  layout: "default",
  useAlternatingBg: true,
  // Section-specific backgrounds
  sectionWhite: "#FFFFFF",
  sectionDark: "#062535",
  sectionWater: "#5BAACC",
  // Text colors for white sections
  darkText: "#083040",
  darkTextMuted: "#3580A0",
};

// Hero Background Variations (accessed via ?hero=1-5 URL param)
// Modern 2025 design trends: diagonal wave splits, ocean gradients
export const heroVariations = {
  // Variation 1: Full screen vertical beams - cyan/teal/navy
  1: {
    name: "Vertical Beams",
    background: "#0077B6",
    waveStyle: "diagonal-right",
    waveColor1: "#00B4D8", // Bright cyan
    waveColor2: "#0077B6", // Medium blue
    waveColor3: "#023E8A", // Deep navy
    lightTop: false, // Dark background
    // Bright colors for dark background
    textGradient: "linear-gradient(135deg, #48CAE4 0%, #90E0EF 50%, #FFFFFF 100%)",
    headingColor: "#FFFFFF", // White for "Dive Into"
    subheadingColor: "#CAF0F8", // Light cyan for description
  },
  // Variation 2: Deep Ocean Gradient - Rich diagonal gradient
  2: {
    name: "Deep Ocean",
    background: "#023E8A",
    waveStyle: "ocean-gradient",
    waveColor1: "#0077B6",
    waveColor2: "#0096C7",
    waveColor3: "#00B4D8",
    // Bright colors for dark background
    textGradient: "linear-gradient(135deg, #90E0EF 0%, #48CAE4 50%, #FFFFFF 100%)",
    headingColor: "#FFFFFF", // White for "Dive Into"
    subheadingColor: "#CAF0F8", // Very light cyan for description
  },
  // Variation 3: 3D Holographic Beams - Futuristic depth effect
  3: {
    name: "3D Holographic Beams",
    background: "#020818",
    waveStyle: "3d-beams",
    waveColor1: "#00B4D8", // Bright cyan
    waveColor2: "#0077B6", // Medium blue
    waveColor3: "#023E8A", // Deep blue
    waveColor4: "#03045E", // Dark navy
    lightTop: false,
    textGradient: "linear-gradient(135deg, #00B4D8 0%, #48CAE4 50%, #FFFFFF 100%)",
    headingColor: "#FFFFFF",
    subheadingColor: "#90E0EF",
  },
  // Variation 4: Layered Waves - Multiple horizontal waves
  4: {
    name: "Layered Waves",
    background: "#FFFFFF",
    waveStyle: "layered-horizontal",
    waveColor1: "#48CAE4", // Light cyan
    waveColor2: "#00B4D8", // Bright cyan
    waveColor3: "#0077B6", // Medium blue
    waveColor4: "#023E8A", // Deep navy
    lightTop: true,
    textGradient: "linear-gradient(135deg, #023E8A 0%, #0077B6 50%, #00B4D8 100%)",
    headingColor: "#023E8A",
    subheadingColor: "#0077B6",
  },
  // Variation 5: Ocean Depth - Dramatic vertical gradient with wave accent
  5: {
    name: "Ocean Depth",
    background: "#03045E",
    waveStyle: "ocean-depth",
    waveColor1: "#0077B6",
    waveColor2: "#00B4D8",
    waveColor3: "#48CAE4",
    // Bright colors for dark background
    textGradient: "linear-gradient(135deg, #48CAE4 0%, #90E0EF 50%, #FFFFFF 100%)",
    headingColor: "#FFFFFF", // White for "Dive Into"
    subheadingColor: "#90E0EF", // Light cyan for description
  },
};

const ThemeContext = createContext(theme);

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    document.documentElement.style.setProperty("--primary", theme.primary);
    document.documentElement.style.setProperty("--primary-light", theme.primaryLight);
    document.documentElement.style.setProperty("--primary-dark", theme.primaryDark);
    document.documentElement.style.setProperty("--bg", theme.background);
    document.documentElement.style.setProperty("--bg-alt", theme.backgroundAlt);
    document.documentElement.style.setProperty("--card", theme.card);
    document.documentElement.style.setProperty("--foreground", theme.foreground);
    document.documentElement.style.setProperty("--foreground-muted", theme.foregroundMuted);
    document.documentElement.style.setProperty("--border", theme.border);
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.foreground;
  }, []);

  if (!mounted) {
    return <div style={{ background: "#5BAACC", minHeight: "100vh" }} />;
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export { theme };

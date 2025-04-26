// tamagui.config.ts
import { createTamagui } from "tamagui";
import { createInterFont } from "@tamagui/font-inter";
import { shorthands } from "@tamagui/shorthands";
import { themes as tamaguiThemes, tokens } from "@tamagui/themes";
import { createTheme } from "tamagui";

const interFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 36,
    11: 40,
    12: 48,
  },
  weight: {
    4: "300",
    5: "400",
    6: "500",
    7: "600",
    8: "700",
    9: "800",
  },
});

// Create a custom dark theme with a refined professional color palette
const dark = createTheme({
  background: "#0f172a", // Rich dark blue background
  backgroundHover: "#1e293b",
  backgroundPress: "#334155",
  backgroundFocus: "#1e293b",
  backgroundStrong: "#020617", // Nearly black blue for contrast
  backgroundTransparent: "rgba(15,23,42,0.85)",

  color1: "#1e293b", // Card background
  color2: "#0f172a", // Label background
  color3: "#334155",
  color4: "#475569",
  color5: "#64748b",
  color6: "#94a3b8",
  color7: "#cbd5e1",
  color8: "#e2e8f0",
  color9: "#f1f5f9",
  color10: "#f8fafc",
  color11: "#ffffff",
  color12: "#ffffff",

  borderColor: "rgba(148,163,184,0.1)",
  borderColorHover: "rgba(148,163,184,0.15)",
  borderColorPress: "rgba(148,163,184,0.2)",
  borderColorFocus: "rgba(148,163,184,0.2)",

  shadowColor: "#000000",
  shadowColorHover: "rgba(0,0,0,0.3)",

  // Modern vibrant accent colors
  blue1: "#38bdf8", // Bright sky blue
  blue2: "#0ea5e9",
  blue3: "#0284c7",
  blue4: "#0369a1",

  // Alternative accent colors
  green1: "#4ade80", // Fresh mint green
  orange1: "#fb923c", // Warm orange
  purple1: "#a78bfa", // Soft lavender
  red1: "#f43f5e", // Vibrant rose red
  yellow1: "#facc15", // Sunshine yellow
  teal1: "#2dd4bf", // Refreshing teal
});

// Create a custom theme map combining the built-in themes and our custom theme
const themes = {
  ...tamaguiThemes,
  dark,
};

const config = createTamagui({
  fonts: {
    heading: interFont,
    body: interFont,
  },
  tokens,
  themes,
  shorthands,
  defaultTheme: "dark",
});

export default config;
export type AppConfig = typeof config;

"use client";

import { createContext, useContext, useState } from "react";
import { THEMES, THEME_ORDER, type InvitationTheme } from "./themes";

interface ThemeContextValue {
  theme: InvitationTheme;
  themeId: string;
  cycleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: THEMES["ivory-blush"],
  themeId: "ivory-blush",
  cycleTheme: () => {},
});

export function ThemeProvider({ children, initialTheme = "ivory-blush" }: { children: React.ReactNode; initialTheme?: string }) {
  const [themeId, setThemeId] = useState(THEMES[initialTheme] ? initialTheme : "ivory-blush");

  function cycleTheme() {
    setThemeId(prev => {
      const idx = THEME_ORDER.indexOf(prev);
      return THEME_ORDER[(idx + 1) % THEME_ORDER.length];
    });
  }

  const theme = THEMES[themeId];

  return (
    <ThemeContext.Provider value={{ theme, themeId, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

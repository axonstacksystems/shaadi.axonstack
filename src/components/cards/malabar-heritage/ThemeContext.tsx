"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { InvitationTheme } from "./themes";

interface ThemeContextValue {
  theme: InvitationTheme;
  themeId: string;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  themes,
  initialThemeId,
  children,
}: {
  themes: Record<string, InvitationTheme>;
  initialThemeId: string;
  children: ReactNode;
}) {
  const [themeId, setThemeId] = useState(
    themes[initialThemeId] ? initialThemeId : Object.keys(themes)[0],
  );
  const theme = themes[themeId] ?? Object.values(themes)[0];

  return (
    <ThemeContext.Provider value={{ theme, themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

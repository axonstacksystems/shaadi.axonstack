"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface ThemeContextValue<T> {
  theme: T;
  themeId: string;
  setThemeId: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextValue<any> | null>(null);

export function ThemeProvider<T>({
  themes,
  initialThemeId,
  children,
}: {
  themes: Record<string, T>;
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

export function useTheme<T>(): ThemeContextValue<T> {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx as ThemeContextValue<T>;
}

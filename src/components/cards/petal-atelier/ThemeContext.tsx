"use client";

export { ThemeProvider } from "../shared/ThemeContext";
import { useTheme as useThemeGeneric } from "../shared/ThemeContext";
import type { InvitationTheme } from "./themes";

export function useTheme() {
  return useThemeGeneric<InvitationTheme>();
}

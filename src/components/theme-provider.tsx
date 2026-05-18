"use client";

import { createContext, type ReactNode, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  mounted: boolean;
  setTheme: (theme: Theme) => void;
}>({ theme: "light", mounted: false, setTheme: () => undefined });

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    window.queueMicrotask(() => {
      const savedTheme = (window.localStorage.getItem("theme") as Theme | null) ?? "light";
      setThemeState(savedTheme);
      setMounted(true);
      applyTheme(savedTheme);
    });
  }, []);

  useEffect(() => {
    if (!mounted) return;
    applyTheme(theme);
  }, [mounted, theme]);

  const value = useMemo(
    () => ({
      theme,
      mounted,
      setTheme: (nextTheme: Theme) => {
        window.localStorage.setItem("theme", nextTheme);
        setThemeState(nextTheme);
        applyTheme(nextTheme);
      }
    }),
    [mounted, theme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

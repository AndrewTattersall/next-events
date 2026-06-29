import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

export const STORAGE_KEY = "theme";

export function getSystemTheme() {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function getStoredTheme() {
  if (typeof window === "undefined") {
    return null;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return stored === "light" || stored === "dark" ? stored : null;
}

export function getInitialTheme() {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initialTheme = getInitialTheme();
    setThemeState(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    applyTheme(theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setThemeState((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  };

  const setTheme = (nextTheme) => {
    if (nextTheme === "light" || nextTheme === "dark") {
      setThemeState(nextTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}

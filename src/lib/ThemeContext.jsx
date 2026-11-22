import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext(null);

// Keeps the dark / light choice in localStorage, exactly like the PHP project's
// js/script.js does, so the choice survives a page reload.
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  // On first render in the browser, read the saved choice.
  useEffect(() => {
    const saved = localStorage.getItem("mirchi-theme");
    if (saved === "dark") setTheme("dark");
  }, []);

  // Whenever the theme changes, put the "dark" class on <html> and save it.
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("mirchi-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
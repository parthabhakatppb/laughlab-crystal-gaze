
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = 
  | "calm-blue"
  | "midnight-noir"
  | "retro-terminal"
  | "futuristic-neon"
  | "forest-green"
  | "soft-pastels"
  | "minimal-light";

interface ThemeContextType {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Try to load the saved theme from localStorage
    const savedTheme = localStorage.getItem("laughlab-theme") as Theme;
    return savedTheme || "calm-blue";
  });

  // Apply the theme class to the root element
  useEffect(() => {
    const root = document.documentElement;
    const previousTheme = localStorage.getItem("laughlab-theme");

    // Remove previous theme class if it exists
    if (previousTheme) {
      root.classList.remove(`theme-${previousTheme}`);
    }
    
    // Add the new theme class
    root.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem("laughlab-theme", theme);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

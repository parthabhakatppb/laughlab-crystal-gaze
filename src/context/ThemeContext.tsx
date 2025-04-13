
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
    
    // Remove all theme classes first
    const themeClasses = [
      "theme-calm-blue",
      "theme-midnight-noir",
      "theme-retro-terminal",
      "theme-futuristic-neon",
      "theme-forest-green",
      "theme-soft-pastels",
      "theme-minimal-light"
    ];
    
    themeClasses.forEach(themeClass => {
      root.classList.remove(themeClass);
    });
    
    // Add the new theme class
    root.classList.add(`theme-${theme}`);
    
    // Save to localStorage
    localStorage.setItem("laughlab-theme", theme);
    
    console.log(`Theme changed to: theme-${theme}`);
  }, [theme]);

  const changeTheme = (newTheme: Theme) => {
    console.log(`Changing theme to: ${newTheme}`);
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

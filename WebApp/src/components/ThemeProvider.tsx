import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  teamTheme: any;
  setTeamTheme: (theme: any) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

interface ThemeProviderProps {
  children: React.ReactNode;
  teamTheme: any;
  setTeamTheme: (theme: any) => void;
}

export function ThemeProvider({ children, teamTheme, setTeamTheme }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true); // Default to dark mode

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // Apply team accent colors as CSS variables
    if (teamTheme) {
      root.style.setProperty('--team-accent', teamTheme.primary);
      root.style.setProperty('--team-accent-foreground', '#ffffff');
      root.style.setProperty('--team-accent-rgb', teamTheme.rgb);
      root.style.setProperty('--team-gradient', teamTheme.gradient);
    }
  }, [isDarkMode, teamTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode, teamTheme, setTeamTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
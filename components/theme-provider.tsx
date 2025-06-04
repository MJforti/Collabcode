"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Theme = "light" | "dark" | "system"

interface ThemeContextProps {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: "system",
  setTheme: () => {},
})

// Move getSystemTheme outside the component
const getSystemTheme = (): Theme => {
  if (typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark"
  }
  return "light"
}

export const ThemeProvider = ({
  children,
  attribute = "data-theme",
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: {
  children: React.ReactNode
  attribute?: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("theme") as Theme | null
      if (storedTheme) {
        return storedTheme
      } else if (enableSystem) {
        return getSystemTheme()
      }
    }
    return defaultTheme
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme)
      const resolvedTheme = theme === "system" ? getSystemTheme() : theme
      document.documentElement.setAttribute(attribute, resolvedTheme)
    }
  }, [theme, attribute])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  return useContext(ThemeContext)
}

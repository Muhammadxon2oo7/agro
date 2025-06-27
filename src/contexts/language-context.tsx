"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = {
  code: string
  name: string
  flag: string
  nativeName: string
}

const languages: Language[] = [
  {
    code: "uz",
    name: "Uzbek",
    nativeName: "O'zbek",
    flag: "🇺🇿",
  },
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇬🇧",
  },
  {
    code: "ru",
    name: "Russian",
    nativeName: "Русский",
    flag: "🇷🇺",
  },
]

type LanguageContextType = {
  currentLanguage: Language
  setLanguage: (code: string) => void
  languages: Language[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const lang = languages.find((l) => l.code === savedLanguage)
      if (lang) setCurrentLanguage(lang)
    }
    setIsClient(true)
  }, [])

  const setLanguage = (code: string) => {
    const language = languages.find((l) => l.code === code)
    if (language) {
      setCurrentLanguage(language)
      localStorage.setItem("language", language.code)
    }
  }

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, languages }}>{children}</LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

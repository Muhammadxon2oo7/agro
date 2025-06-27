"use client"

import { useState, useEffect } from "react"
import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

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

export function LanguageSelector() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0])
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch by only rendering on client
  useEffect(() => {
    // Check if there's a saved language preference in localStorage
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage) {
      const lang = languages.find((l) => l.code === savedLanguage)
      if (lang) setCurrentLanguage(lang)
    }
    setIsClient(true)
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem("language", language.code)

    // In a real application, you would update the app's language context here
    // For example: i18n.changeLanguage(language.code)

    // For demonstration, we'll just log the language change
    console.log(`Language changed to: ${language.name}`)
  }

  if (!isClient) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-9 gap-1 px-2">
          <span className="text-base mr-1">{currentLanguage.flag}</span>
          <span className="hidden sm:inline text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
          <Globe className="h-3.5 w-3.5 text-muted-foreground ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className={`flex items-center gap-2 ${currentLanguage.code === language.code ? "bg-muted" : ""}`}
            onClick={() => handleLanguageChange(language)}
          >
            <span className="text-base">{language.flag}</span>
            <span className="flex-1">{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

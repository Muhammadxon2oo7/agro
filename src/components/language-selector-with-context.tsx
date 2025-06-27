"use client"

import { Globe } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function LanguageSelector() {
  const { currentLanguage, setLanguage, languages } = useLanguage()

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
            onClick={() => setLanguage(language.code)}
          >
            <span className="text-base">{language.flag}</span>
            <span className="flex-1">{language.nativeName}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

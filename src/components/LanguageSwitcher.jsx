"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Globe, ChevronDown } from "lucide-react"
import "./LanguageSwitcher.css"

const languages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
]

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation("common")
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[0]

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode)
    setIsOpen(false)
  }

  return (
    <div className="language-switcher">
      <button className="language-button" onClick={() => setIsOpen(!isOpen)} aria-label="Change language">
        <Globe size={18} />
        <span className="current-language">{currentLanguage.name}</span>
        <ChevronDown size={16} className={`chevron ${isOpen ? "open" : ""}`} />
      </button>

      {isOpen && (
        <div className="language-dropdown">
          <div className="language-list">
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${i18n.language === language.code ? "active" : ""}`}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpen && <div className="language-overlay" onClick={() => setIsOpen(false)} />}
    </div>
  )
}

"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import LanguageSwitcher from "./LanguageSwitcher"
import "./Navbar.css"

export default function Navbar() {
  const { t } = useTranslation("common")
  const [isMenuOpen, setIsMenuOpen] = useState(false) 
  const [langMenuOpened, setLangMenuOpened] = useState(false) 

  const menuItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
  ]

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const toggleOverflowForLangMenu = () => {
    if (!langMenuOpened) {
      document.querySelector(".mobile-menu").style.overflow = "visible"
    } else {
      document.querySelector(".mobile-menu").style.overflow = "hidden"
    }
    setLangMenuOpened((prev) => !prev)
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="Logo" className="logo-image" />
        </div>

        <div className="desktop-menu">
          <LanguageSwitcher />
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path} className="nav-link">
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
          <Link to="/auth" className="login-button">
            {t("navigation.login")}
          </Link>
        </div>

        <button onClick={toggleMenu} className="hamburger" aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {menuItems.map((item) => (
            <Link key={item.key} to={item.path} className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              {t(`navigation.${item.key}`)}
            </Link>
          ))}
          <div className="mobile-language-switcher" onClick={() => toggleOverflowForLangMenu()}>
            <LanguageSwitcher />
          </div>
          <Link to="/auth" className="mobile-login-button" onClick={() => setIsMenuOpen(false)}>
            {t("navigation.login")}
          </Link>
        </div>
      </div>
    </nav>
  )
}

"use client"

import { useState, useRef, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { Menu, X, User, LogOut } from "lucide-react"
import { Link } from "react-router-dom"
import LanguageSwitcher from "./LanguageSwitcher"
import { isLoggedIn } from "../utils/common"
import "./Navbar.css"

export default function Navbar() {
  const { t } = useTranslation("common")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [langMenuOpened, setLangMenuOpened] = useState(false)
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const dropdownRef = useRef(null)

  const menuItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
  ]

  // Check login status on component mount and when needed
  useEffect(() => {
    isLoggedIn().then((status) => {setUserLoggedIn(Boolean(status));console.log(userLoggedIn ? "User is logged in" : "User is not logged in")})
  }, [isLoggedIn])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsAccountDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

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

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen((prev) => !prev)
  }

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "POST",
        credentials: "include", // Include cookies if using session-based auth
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.message) // "Logged out successfully"

        // Update login status
        setUserLoggedIn(false)
        setIsAccountDropdownOpen(false)

        // You might want to clear any stored tokens or user data here
        // localStorage.removeItem('token') // if using localStorage
        // or trigger a global state update
      } else {
        console.error("Logout failed")
      }
    } catch (error) {
      console.error("Error during logout:", error)
    } finally {
      setIsLoggingOut(false)
    }
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

          {userLoggedIn ? (
            <div className="account-dropdown-container" ref={dropdownRef}>
              <button onClick={toggleAccountDropdown} className="account-icon" aria-label="Account menu">
                <User size={20} />
              </button>

              {isAccountDropdownOpen && (
                <div className="account-dropdown">
                  <button onClick={handleLogout} className="logout-button" disabled={isLoggingOut}>
                    <LogOut size={16} />
                    {isLoggingOut ? "Logging out..." : t("navigation.logout")}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/auth" className="login-button">
              {t("navigation.login")}
            </Link>
          )}
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

          {userLoggedIn ? (
            <div className="mobile-account-section">
              <button onClick={handleLogout} className="mobile-logout-button" disabled={isLoggingOut}>
                <LogOut size={16} />
                {isLoggingOut ? "Logging out..." : t("navigation.logout")}
              </button>
            </div>
          ) : (
            <Link to="/auth" className="mobile-login-button" onClick={() => setIsMenuOpen(false)}>
              {t("navigation.login")}
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

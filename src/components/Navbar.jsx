"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import "./Navbar.css"

const menuItems = ["Home", "About", "Contact"]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/src/assets/logo.png" alt="Logo" className="logo-image" />
        </div>

        <div className="desktop-menu">
          {menuItems.map((item) => (
            <Link key={item} to={item === "Home" ? "/" : `/${item.toLowerCase()}`} className="nav-link">
              {item}
            </Link>
          ))}
          <Link to="/auth" className="login-button">
            Login
          </Link>
        </div>

        <button onClick={toggleMenu} className="hamburger" aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="mobile-menu-content">
          {menuItems.map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              className="mobile-nav-link"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </Link>
          ))}
          <Link to="/auth" className="mobile-login-button" onClick={() => setIsMenuOpen(false)}>
            Login
          </Link>
        </div>
      </div>
    </nav>
  )
}

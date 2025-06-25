"use client"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect } from "react"
import ScrollToTop from "./components/ScrollToTop"
import HomePage from "./pages/HomePage"
import AuthPage from "./pages/AuthPage"
import AdminPage from "./pages/AdminPage"
import AdminLoginPage from "./pages/AdminLoginPage"
import ContactPage from "./pages/ContactPage"
import AboutPage from "./pages/AboutPage"
import "./App.css"
import "./i18n"

function App() {
  useEffect(() => {
    // Set document direction based on language
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem("i18nextLng") || "en"
      document.documentElement.lang = currentLang
      // Add RTL support if needed in future
      document.documentElement.dir = "ltr"
    }

    handleLanguageChange()
    window.addEventListener("languagechange", handleLanguageChange)

    return () => {
      window.removeEventListener("languagechange", handleLanguageChange)
    }
  }, [])

  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

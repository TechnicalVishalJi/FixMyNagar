"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import "./AuthPage.css"

export default function AuthPage() {
  const { t } = useTranslation("auth")
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", { email, isLogin })
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="auth-page">
      {/* Mobile View */}
      <div className="mobile-auth">
        <div className="auth-container">
          {/* Logo */}
          <div className="logo-section">
            <div className="logo-icon">
              <img src="/src/assets/logo.png" alt="Logo" className="auth-logo-image" />
            </div>
          </div>

          {/* Header */}
          <div className="auth-header">
            <h1>{isLogin ? t("welcomeBack") : t("createAccount")}</h1>
            {!isLogin && <p>{t("joinCommunity")}</p>}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Google Button */}
            <button type="button" className="google-button">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              {t("continueWithGoogle")}
            </button>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">{t("or")}</span>
              <div className="divider-line"></div>
            </div>

            {/* Email Input */}
            <input
              type="email"
              placeholder={t("emailPlaceholder")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
              required
            />

            {/* Continue Button */}
            <button type="submit" className="continue-button">
              {t("continue")}
            </button>
          </form>

          {/* Terms */}
          <p className="terms-text">
            {t("terms")} <a href="#">{t("termsOfService")}</a> {t("and")} <a href="#">{t("privacyPolicy")}</a>.
          </p>

          {/* Toggle Login/Signup */}
          <p className="toggle-text">
            {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}{" "}
            <button type="button" onClick={toggleMode} className="toggle-button">
              {isLogin ? t("signup") : t("login")}
            </button>
          </p>
        </div>
      </div>

      {/* Desktop View */}
      <div className="desktop-auth">
        {/* Left Side - Form */}
        <div className="desktop-form-side">
          <div className="desktop-auth-container">
            {/* Logo */}
            <div className="desktop-logo-section">
              <div className="desktop-logo-icon">
                <img src="/src/assets/logo.png" alt="Logo" className="auth-logo-image-desktop" />
              </div>
            </div>

            {/* Header */}
            <div className="desktop-auth-header">
              <h1>{isLogin ? t("welcomeBack") : t("createAccount")}</h1>
              {!isLogin && <p>{t("joinCommunity")}</p>}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="desktop-auth-form">
              {/* Google Button */}
              <button type="button" className="desktop-google-button">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t("continueWithGoogle")}
              </button>

              {/* Divider */}
              <div className="desktop-divider">
                <div className="desktop-divider-line"></div>
                <span className="desktop-divider-text">{t("or")}</span>
                <div className="desktop-divider-line"></div>
              </div>

              {/* Email Input */}
              <input
                type="email"
                placeholder={t("emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="desktop-email-input"
                required
              />

              {/* Continue Button */}
              <button type="submit" className="desktop-continue-button">
                {t("continue")}
              </button>
            </form>

            {/* Terms */}
            <p className="desktop-terms-text">
              {t("terms")} <a href="#">{t("termsOfService")}</a> {t("and")} <a href="#">{t("privacyPolicy")}</a>.
            </p>

            {/* Toggle Login/Signup */}
            <p className="desktop-toggle-text">
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}{" "}
              <button type="button" onClick={toggleMode} className="desktop-toggle-button">
                {isLogin ? t("signup") : t("login")}
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Branding */}
        <div className="desktop-branding-side">
          <div className="branding-content">
            <h2>{t("joinThousands")}</h2>
            <p>{t("connectCommunity")}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

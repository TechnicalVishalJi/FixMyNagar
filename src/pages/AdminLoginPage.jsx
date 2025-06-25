"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Eye, EyeOff, Shield, Lock, User, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import "./AdminLoginPage.css"

export default function AdminLoginPage() {
  const { t } = useTranslation(["admin", "common"])
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.username.trim()) {
      newErrors.username = t("admin:login.username") + " is required"
    }

    if (!formData.password) {
      newErrors.password = t("admin:login.password") + " is required"
    } else if (formData.password.length < 6) {
      newErrors.password = t("admin:login.password") + " must be at least 6 characters"
    }

    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))
      console.log("Admin login:", formData)
      // Redirect to admin dashboard on success
      // window.location.href = '/admin'
    } catch (error) {
      setErrors({ general: t("admin:login.invalidCredentials") })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="admin-login-page">
      {/* Background Pattern */}
      <div className="admin-bg-pattern"></div>

      <div className="admin-login-container">
        {/* Left Side - Branding */}
        <div className="admin-branding-side">
          <div className="admin-branding-content">
            <div className="admin-logo-section">
              <div className="admin-logo-icon">
                <Shield size={32} />
              </div>
              <h1>{t("common:appName")}</h1>
              <span className="admin-badge">{t("admin:login.adminPortal")}</span>
            </div>

            <div className="admin-features">
              <h2>{t("admin:login.administrativeDashboard")}</h2>
              <p>{t("admin:login.manageDescription")}</p>

              <div className="feature-list">
                <div className="feature-item">
                  <span>{t("admin:login.realTimeAnalytics")}</span>
                </div>
                <div className="feature-item">
                  <span>{t("admin:login.interactiveMaps")}</span>
                </div>
                <div className="feature-item">
                  <span>{t("admin:login.quickActions")}</span>
                </div>
                <div className="feature-item">
                  <span>{t("admin:login.secureAccess")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="admin-form-side">
          <div className="admin-form-container">
            <div className="admin-form-header">
              <div className="admin-form-icon">
                <Lock size={24} />
              </div>
              <h2>{t("admin:login.title")}</h2>
              <p>{t("admin:login.subtitle")}</p>
            </div>

            {errors.general && (
              <div className="error-banner">
                <AlertCircle size={16} />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username">{t("admin:login.username")}</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder={t("admin:login.usernamePlaceholder")}
                    disabled={isLoading}
                  />
                </div>
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">{t("admin:login.password")}</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder={t("admin:login.passwordPlaceholder")}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span className="error-text">{errors.password}</span>}
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <span className="checkbox-custom"></span>
                  {t("admin:login.rememberMe")}
                </label>

                <Link to="/admin/forgot-password" className="forgot-link">
                  {t("admin:login.forgotPassword")}
                </Link>
              </div>

              <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    {t("admin:login.signingIn")}
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    {t("common:buttons.signIn")}
                  </>
                )}
              </button>
            </form>

            <div className="admin-form-footer">
              <p>
                {t("admin:login.needHelp")} <Link to="/contact">{t("admin:login.contactSupport")}</Link>
              </p>
              <Link to="/" className="back-to-site">
                ← {t("common:buttons.backToSite")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

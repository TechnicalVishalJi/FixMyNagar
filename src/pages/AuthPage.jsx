"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Mail, User, Shield, Send, Check, X, Eye, EyeOff } from "lucide-react"
import "./AuthPage.css"
import { isLoggedIn } from "../utils/common"

export default function AuthPage() {
  const { t } = useTranslation("auth")
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
  })
  const [otpSent, setOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState("")
  const [showOtp, setShowOtp] = useState(false)
  
  useEffect(() => {
    isLoggedIn().then((status) => {
      if(Boolean(status)){navigate("/")};
    });
  }, [navigate])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
    if (errors.general) {
      setErrors({ ...errors, general: "" })
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = t("auth:validation.emailRequired")
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("auth:validation.emailInvalid")
    }

    if (!isLogin && !formData.name.trim()) {
      newErrors.name = t("auth:validation.nameRequired")
    }

    return newErrors
  }

  const validateOtp = () => {
    if (!formData.otp.trim()) {
      setErrors({ otp: t("auth:validation.otpRequired") })
      return false
    }
    if (formData.otp.length !== 6) {
      setErrors({ otp: t("auth:validation.otpInvalid") })
      return false
    }
    return true
  }

  const sendOtp = async () => {
    const validationErrors = validateForm()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setOtpLoading(true)
    setErrors({})

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup"
      const payload = isLogin ? { email: formData.email } : { name: formData.name, email: formData.email }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      const result = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setSuccessMessage(t("auth:otpSent"))
        setTimeout(() => setSuccessMessage(""), 3000)
      } else {
        setErrors({ general: result.error || t("auth:errors.otpSendFailed") })
      }
    } catch (error) {
      console.error("Error sending OTP:", error)
      setErrors({ general: t("auth:errors.networkError") })
    } finally {
      setOtpLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateOtp()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const endpoint = isLogin ? "/auth/login/verify" : "/auth/signup/verify"
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          otp: formData.otp,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        setSuccessMessage(isLogin ? t("auth:loginSuccess") : t("auth:signupSuccess"))
        // Redirect to homepage after successful authentication
        setTimeout(() => {
          navigate("/")
        }, 1500)
      } else {
        setErrors({ general: result.error || t("auth:errors.verificationFailed") })
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      setErrors({ general: t("auth:errors.networkError") })
    } finally {
      setIsLoading(false)
    }
  }

  const toggleMode = () => {
    setIsLogin(!isLogin)
    setFormData({ name: "", email: "", otp: "" })
    setOtpSent(false)
    setErrors({})
    setSuccessMessage("")
  }

  const resendOtp = () => {
    setFormData({ ...formData, otp: "" })
    setOtpSent(false)
    setErrors({})
    sendOtp()
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

          {/* Success Message */}
          {successMessage && (
            <div className="success-banner">
              <Check size={16} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {errors.general && (
            <div className="error-banner">
              <X size={16} />
              <span>{errors.general}</span>
            </div>
          )}

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

            {/* Name Input (Signup only) */}
            {!isLogin && (
              <div className="input-group">
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    placeholder={t("namePlaceholder")}
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`form-input ${errors.name ? "error" : ""}`}
                    disabled={isLoading || otpLoading}
                  />
                </div>
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? "error" : ""}`}
                  disabled={isLoading || otpLoading || otpSent}
                />
              </div>
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>

            {/* OTP Input */}
            <div className="input-group">
              <div className="otp-container">
                <div className="input-wrapper otp-input-wrapper">
                  <Shield size={18} className="input-icon" />
                  <input
                    type={showOtp ? "text" : "password"}
                    name="otp"
                    placeholder={t("otpPlaceholder")}
                    value={formData.otp}
                    onChange={handleInputChange}
                    className={`form-input otp-input ${errors.otp ? "error" : ""}`}
                    disabled={isLoading || otpLoading || !otpSent}
                    maxLength="6"
                  />
                  <button
                    type="button"
                    className="otp-toggle"
                    onClick={() => setShowOtp(!showOtp)}
                    disabled={!formData.otp}
                  >
                    {showOtp ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={sendOtp}
                  disabled={otpLoading || isLoading || (!isLogin && !formData.name.trim()) || !formData.email.trim()}
                  className={`otp-button ${otpSent ? "sent" : ""}`}
                >
                  {otpLoading ? (
                    <div className="spinner-small"></div>
                  ) : otpSent ? (
                    <Check size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                  {otpLoading ? t("sending") : otpSent ? t("otpSent") : t("sendOtp")}
                </button>
              </div>
              {errors.otp && <span className="error-text">{errors.otp}</span>}
              {otpSent && (
                <div className="otp-info">
                  <p className="otp-sent-message">{t("otpSentMessage")}</p>
                  <button type="button" onClick={resendOtp} className="resend-link" disabled={otpLoading}>
                    {t("resendOtp")}
                  </button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="continue-button"
              disabled={isLoading || otpLoading || !otpSent || !formData.otp.trim()}
            >
              {isLoading ? (
                <>
                  <div className="spinner-small"></div>
                  {isLogin ? t("signingIn") : t("signingUp")}
                </>
              ) : (
                <>
                  <Shield size={20} />
                  {isLogin ? t("signIn") : t("signUp")}
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="terms-text">
            {t("terms")} <a href="#">{t("termsOfService")}</a> {t("and")} <a href="#">{t("privacyPolicy")}</a>.
          </p>

          {/* Toggle Login/Signup */}
          <p className="toggle-text">
            {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}{" "}
            <button type="button" onClick={toggleMode} className="toggle-button" disabled={isLoading || otpLoading}>
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

            {/* Success Message */}
            {successMessage && (
              <div className="desktop-success-banner">
                <Check size={16} />
                <span>{successMessage}</span>
              </div>
            )}

            {/* Error Message */}
            {errors.general && (
              <div className="desktop-error-banner">
                <X size={16} />
                <span>{errors.general}</span>
              </div>
            )}

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

              {/* Name Input (Signup only) */}
              {!isLogin && (
                <div className="desktop-input-group">
                  <div className="desktop-input-wrapper">
                    <User size={18} className="desktop-input-icon" />
                    <input
                      type="text"
                      name="name"
                      placeholder={t("namePlaceholder")}
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`desktop-form-input ${errors.name ? "error" : ""}`}
                      disabled={isLoading || otpLoading}
                    />
                  </div>
                  {errors.name && <span className="desktop-error-text">{errors.name}</span>}
                </div>
              )}

              {/* Email Input */}
              <div className="desktop-input-group">
                <div className="desktop-input-wrapper">
                  <Mail size={18} className="desktop-input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder={t("emailPlaceholder")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`desktop-form-input ${errors.email ? "error" : ""}`}
                    disabled={isLoading || otpLoading || otpSent}
                  />
                </div>
                {errors.email && <span className="desktop-error-text">{errors.email}</span>}
              </div>

              {/* OTP Input */}
              <div className="desktop-input-group">
                <div className="desktop-otp-container">
                  <div className="desktop-input-wrapper desktop-otp-input-wrapper">
                    <Shield size={18} className="desktop-input-icon" />
                    <input
                      type={showOtp ? "text" : "password"}
                      name="otp"
                      placeholder={t("otpPlaceholder")}
                      value={formData.otp}
                      onChange={handleInputChange}
                      className={`desktop-form-input desktop-otp-input ${errors.otp ? "error" : ""}`}
                      disabled={isLoading || otpLoading || !otpSent}
                      maxLength="6"
                    />
                    <button
                      type="button"
                      className="desktop-otp-toggle"
                      onClick={() => setShowOtp(!showOtp)}
                      disabled={!formData.otp}
                    >
                      {showOtp ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={sendOtp}
                    disabled={otpLoading || isLoading || (!isLogin && !formData.name.trim()) || !formData.email.trim()}
                    className={`desktop-otp-button ${otpSent ? "sent" : ""}`}
                  >
                    {otpLoading ? (
                      <div className="spinner-small"></div>
                    ) : otpSent ? (
                      <Check size={16} />
                    ) : (
                      <Send size={16} />
                    )}
                    {otpLoading ? t("sending") : otpSent ? t("otpSent") : t("sendOtp")}
                  </button>
                </div>
                {errors.otp && <span className="desktop-error-text">{errors.otp}</span>}
                {otpSent && (
                  <div className="desktop-otp-info">
                    <p className="desktop-otp-sent-message">{t("otpSentMessage")}</p>
                    <button type="button" onClick={resendOtp} className="desktop-resend-link" disabled={otpLoading}>
                      {t("resendOtp")}
                    </button>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="desktop-continue-button"
                disabled={isLoading || otpLoading || !otpSent || !formData.otp.trim()}
              >
                {isLoading ? (
                  <>
                    <div className="spinner-small"></div>
                    {isLogin ? t("signingIn") : t("signingUp")}
                  </>
                ) : (
                  <>
                    <Shield size={20} />
                    {isLogin ? t("signIn") : t("signUp")}
                  </>
                )}
              </button>
            </form>

            {/* Terms */}
            <p className="desktop-terms-text">
              {t("terms")} <a href="#">{t("termsOfService")}</a> {t("and")} <a href="#">{t("privacyPolicy")}</a>.
            </p>

            {/* Toggle Login/Signup */}
            <p className="desktop-toggle-text">
              {isLogin ? t("dontHaveAccount") : t("alreadyHaveAccount")}{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="desktop-toggle-button"
                disabled={isLoading || otpLoading}
              >
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

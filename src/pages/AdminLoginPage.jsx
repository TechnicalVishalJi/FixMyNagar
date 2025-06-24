"use client"

import { useState } from "react"
import { Eye, EyeOff, Shield, Lock, User, AlertCircle } from "lucide-react"
import { Link } from "react-router-dom"
import "./AdminLoginPage.css"

export default function AdminLoginPage() {
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
      newErrors.username = "Username is required"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
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
      setErrors({ general: "Invalid credentials. Please try again." })
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
              <h1>FixMyNagar</h1>
              <span className="admin-badge">Admin Portal</span>
            </div>

            <div className="admin-features">
              <h2>Administrative Dashboard</h2>
              <p>Manage community reports, monitor city issues, and coordinate with local authorities.</p>

              <div className="feature-list">
                <div className="feature-item">
                  {/* <div className="feature-icon">📊</div> */}
                  <span>Real-time Analytics</span>
                </div>
                <div className="feature-item">
                  {/* <div className="feature-icon">🗺️</div> */}
                  <span>Interactive Maps</span>
                </div>
                <div className="feature-item">
                  {/* <div className="feature-icon">⚡</div> */}
                  <span>Quick Actions</span>
                </div>
                <div className="feature-item">
                  {/* <div className="feature-icon">🔒</div> */}
                  <span>Secure Access</span>
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
              <h2>Admin Login</h2>
              <p>Enter your credentials to access the admin dashboard</p>
            </div>

            {errors.general && (
              <div className="error-banner">
                <AlertCircle size={16} />
                <span>{errors.general}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="admin-login-form">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-wrapper">
                  <User size={18} className="input-icon" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder="Enter your username"
                    disabled={isLoading}
                  />
                </div>
                {errors.username && <span className="error-text">{errors.username}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrapper">
                  <Lock size={18} className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Enter your password"
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
                  Remember me
                </label>

                <Link to="/admin/forgot-password" className="forgot-link">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" className={`login-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="spinner"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <Shield size={18} />
                    Sign In
                  </>
                )}
              </button>
            </form>

            <div className="admin-form-footer">
              <p>
                Need help? <Link to="/contact">Contact Support</Link>
              </p>
              <Link to="/" className="back-to-site">
                ← Back to Main Site
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

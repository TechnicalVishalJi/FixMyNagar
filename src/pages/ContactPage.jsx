"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Mail, Phone, MapPin, Send, Check, X } from "lucide-react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "./ContactPage.css"

// Helper function to get current date and time
const getCurrentDateTime = () => {
  const now = new Date()
  return now.toLocaleString()
}

export default function ContactPage() {
  const { t } = useTranslation(["contact", "common"])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null) // 'success', 'error', or null

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    // Clear submission status when user starts typing again
    if (submissionStatus) {
      setSubmissionStatus(null)
    }
  }

  const sendMessage = async () => {
    const emailData = {
      uname: formData.name,
      email: formData.email,
      message: formData.message,
      time: getCurrentDateTime(),
      fromContactForm: true,
    }

    emailData["message"] += "<br><br>" + "From : FixMyNagar Contact Form"

    try {
      const response = await fetch(import.meta.env.VITE_CONTACT_URL + "/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailData),
      })

      const result = await response.json()
      if (result.success) {
        setSubmissionStatus("success")
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({ name: "", email: "", message: "" })
          setSubmissionStatus(null)
        }, 3000)
      } else {
        setSubmissionStatus("error")
        setTimeout(() => setSubmissionStatus(null), 5000)
      }
    } catch (error) {
      setSubmissionStatus("error")
      setTimeout(() => setSubmissionStatus(null), 5000)
      console.error("Error:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setSubmissionStatus("validation")
      setTimeout(() => setSubmissionStatus(null), 3000)
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)

    await sendMessage()
    setIsSubmitting(false)
  }

  const getButtonContent = () => {
    if (isSubmitting) {
      return (
        <>
          <div className="spinner"></div>
          {t("contact:form.sending")}
        </>
      )
    }

    switch (submissionStatus) {
      case "success":
        return (
          <>
            <Check size={20} />
            {t("contact:form.sent")}
          </>
        )
      case "error":
        return (
          <>
            <X size={20} />
            {t("contact:form.failed")}
          </>
        )
      case "validation":
        return (
          <>
            <X size={20} />
            {t("contact:form.fillRequired")}
          </>
        )
      default:
        return (
          <>
            <Send size={20} />
            {t("common:buttons.sendMessage")}
          </>
        )
    }
  }

  const getButtonClass = () => {
    const baseClass = "submit-button"

    switch (submissionStatus) {
      case "success":
        return `${baseClass} success`
      case "error":
      case "validation":
        return `${baseClass} error`
      default:
        return baseClass
    }
  }

  return (
    <div className="contact-page">
      <Navbar />

      {/* Contact Content */}
      <div className="contact-content">
        <div className="container">
          <div className="contact-header">
            <h1>{t("contact:title")}</h1>
            <p>{t("contact:subtitle")}</p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>{t("contact:contactInfo")}</h2>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>{t("contact:email")}</h3>
                    <p>{t("common:footer.email")}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>{t("contact:phone")}</h3>
                    <p>{t("common:footer.phone")}</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>{t("contact:address")}</h3>
                    <p>{t("common:footer.address")}</p>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <h3>{t("contact:joinMovement")}</h3>
                <p>{t("contact:joinDescription")}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>{t("contact:sendMessage")}</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">
                    {t("contact:form.name")} {t("contact:form.required")}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">
                    {t("contact:form.email")} {t("contact:form.required")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    {t("contact:form.message")} {t("contact:form.required")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows="6"
                    className="form-textarea"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  className={getButtonClass()}
                  disabled={isSubmitting || submissionStatus === "success"}
                >
                  {getButtonContent()}
                </button>
              </form>

              {/* Success Message */}
              {submissionStatus === "success" && (
                <div className="form-success-message">
                  <div className="success-icon">
                    <Check size={24} />
                  </div>
                  <div className="success-content">
                    <h3>{t("contact:form.successTitle")}</h3>
                    <p>{t("contact:form.successMessage")}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

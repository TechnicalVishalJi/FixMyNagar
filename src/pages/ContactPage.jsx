"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "./ContactPage.css"

export default function ContactPage() {
  const { t } = useTranslation(["contact", "common"])
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Contact form submitted:", formData)
    // Handle form submission here
    setFormData({ name: "", email: "", message: "" })
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
                  />
                </div>

                <button type="submit" className="submit-button">
                  <Send size={20} />
                  {t("common:buttons.sendMessage")}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Menu, X, Mail, Phone, MapPin, Send } from "lucide-react"
import Footer from "../components/Footer"
import "./ContactPage.css"

const menuItems = ["Home", "About", "Contact"]

export default function ContactPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

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
      {/* Navigation Bar */}
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

      {/* Contact Content */}
      <div className="contact-content">
        <div className="container">
          <div className="contact-header">
            <h1>Get in Touch</h1>
            <p>Have feedback or collaboration ideas? We'd love to hear from you.</p>
          </div>

          <div className="contact-grid">
            {/* Contact Information */}
            <div className="contact-info">
              <h2>Contact Information</h2>
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">
                    <Mail size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>contact@fixmynagar.org</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <Phone size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p>+91 98765 43210</p>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">
                    <MapPin size={24} />
                  </div>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>
                      Tech Hub, Innovation District
                      <br />
                      Bangalore, Karnataka 560001
                    </p>
                  </div>
                </div>
              </div>

              <div className="contact-cta">
                <h3>Join the Movement</h3>
                <p>Together, we can build more responsive cities. Partner with us to bring FixMyNagar to your city.</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Name *</label>
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
                  <label htmlFor="email">Email *</label>
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
                  <label htmlFor="message">Message *</label>
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
                  Send Message
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

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import "./Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="/src/assets/logo.png" alt="Logo" className="footer-logo-image" />
            </div>
            <p className="footer-description">
              FixMyNagar platform is connecting communities and solving problems together.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <Facebook size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Instagram size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                    Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                    About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                    Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-heading">Support</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/#heroSection" className="footer-link">
                  Report Issue
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>fixmynagar@example.com</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>+91 1234567890</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>123 Vijay Nagar, Ghaziabad, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 FixMyNagar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

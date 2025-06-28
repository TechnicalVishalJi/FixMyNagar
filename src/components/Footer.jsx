import { useTranslation } from "react-i18next"
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react"
import "./Footer.css"
import { Link } from "react-router-dom"

export default function Footer() {
  const { t } = useTranslation("common")

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src="../assets/logo.png" alt="Logo" className="footer-logo-image" />
            </div>
            <p className="footer-description">{t("footer.description")}</p>
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
            <h4 className="footer-heading">{t("footer.quickLinks")}</h4>
            <ul className="footer-links">
              <li>
                <Link to="/" className="footer-link">
                  {t("navigation.home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  {t("navigation.about")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">
                  {t("navigation.contact")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4 className="footer-heading">{t("footer.support")}</h4>
            <ul className="footer-links">
              <li>
                <a href="#" className="footer-link">
                  {t("footer.helpCenter")}
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  {t("footer.privacyPolicy")}
                </a>
              </li>
              <li>
                <a href="#" className="footer-link">
                  {t("footer.termsOfService")}
                </a>
              </li>
              <li>
                <a href="/#heroSection" className="footer-link">
                  {t("footer.reportIssue")}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-heading">{t("footer.contact")}</h4>
            <div className="contact-info">
              <div className="contact-item">
                <Mail size={16} />
                <span>{t("footer.email")}</span>
              </div>
              <div className="contact-item">
                <Phone size={16} />
                <span>{t("footer.phone")}</span>
              </div>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{t("footer.address")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}

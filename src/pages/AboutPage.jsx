"use client"

import { useTranslation } from "react-i18next"
import { Target, Users, Lightbulb, Shield, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "./AboutPage.css"

export default function AboutPage() {
  const { t } = useTranslation(["about", "common"])

  return (
    <div className="about-page">
      <Navbar />

      {/* About Content */}
      <div className="about-content">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="container">
            <div className="hero-content">
              <h1>{t("about:title")}</h1>
              <p className="hero-subtitle">{t("about:hero.subtitle")}</p>
              <p className="hero-description">{t("about:hero.description")}</p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="section-header">
              <Target size={35} style={{ transform: "translate(0px, -14px)" }} />
              <h2>{t("about:mission.title")}</h2>
            </div>
            <p className="mission-text">{t("about:mission.description")}</p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="problem-section">
          <div className="container">
            <h2>{t("about:problem.title")}</h2>
            <p>{t("about:problem.description")}</p>
            <div className="problem-grid">
              <div className="problem-item">
                <div className="problem-icon">❓</div>
                <p>{t("about:problem.issues.reporting")}</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">⏳</div>
                <p>{t("about:problem.issues.response")}</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">🔍</div>
                <p>{t("about:problem.issues.transparency")}</p>
              </div>
            </div>
            <p className="problem-conclusion">{t("about:problem.conclusion")}</p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="container">
            <h2>{t("about:howItWorks.title")}</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>{t("about:howItWorks.steps.capture.title")}</h3>
                  <p>{t("about:howItWorks.steps.capture.description")}</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>{t("about:howItWorks.steps.classification.title")}</h3>
                  <p>{t("about:howItWorks.steps.classification.description")}</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>{t("about:howItWorks.steps.community.title")}</h3>
                  <p>{t("about:howItWorks.steps.community.description")}</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>{t("about:howItWorks.steps.tracking.title")}</h3>
                  <p>{t("about:howItWorks.steps.tracking.description")}</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>{t("about:howItWorks.steps.escalation.title")}</h3>
                  <p>{t("about:howItWorks.steps.escalation.description")}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2>{t("about:values.title")}</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">
                  <Shield size={32} />
                </div>
                <h3>{t("about:values.transparency.title")}</h3>
                <p>{t("about:values.transparency.description")}</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <Users size={32} />
                </div>
                <h3>{t("about:values.community.title")}</h3>
                <p>{t("about:values.community.description")}</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <Lightbulb size={32} />
                </div>
                <h3>{t("about:values.innovation.title")}</h3>
                <p>{t("about:values.innovation.description")}</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <CheckCircle size={32} />
                </div>
                <h3>{t("about:values.accountability.title")}</h3>
                <p>{t("about:values.accountability.description")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <h2>{t("about:story.title")}</h2>
            <p>{t("about:story.description")}</p>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2>{t("about:team.title")}</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">VS</div>
                <h3>{t("about:team.members.vishal.name")}</h3>
                <p className="member-bio">{t("about:team.members.vishal.role")}</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">PG</div>
                <h3>{t("about:team.members.payal.name")}</h3>
                <p className="member-bio">{t("about:team.members.payal.role")}</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">APS</div>
                <h3>{t("about:team.members.aditya.name")}</h3>
                <p className="member-bio">{t("about:team.members.aditya.role")}</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">AS</div>
                <h3>{t("about:team.members.aditi.name")}</h3>
                <p className="member-bio">{t("about:team.members.aditi.role")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>{t("about:cta.title")}</h2>
            <p>{t("about:cta.subtitle")}</p>
            <div className="cta-actions">
              <div className="cta-item">
                <h3>{t("about:cta.actions.joinApp")}</h3>
                <p>{t("about:cta.actions.joinAppDesc")}</p>
              </div>
              <div className="cta-item">
                <h3>{t("about:cta.actions.reportIssues")}</h3>
                <p>{t("about:cta.actions.reportIssuesDesc")}</p>
              </div>
              <div className="cta-item">
                <h3>{t("about:cta.actions.engage")}</h3>
                <p>{t("about:cta.actions.engageDesc")}</p>
              </div>
              <div className="cta-item">
                <h3>{t("about:cta.actions.partner")}</h3>
                <p>{t("about:cta.actions.partnerDesc")}</p>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/" className="cta-button primary">
                {t("about:cta.buttons.startReporting")}
              </Link>
              <Link to="/contact" className="cta-button secondary">
                {t("about:cta.buttons.partnerWithUs")}
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

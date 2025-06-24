"use client"

import { Target, Users, Lightbulb, Shield, CheckCircle, Building, MapPin, Wrench } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import "./AboutPage.css"

export default function AboutPage() {
  return (
    <div className="about-page">
      <Navbar />

      {/* About Content */}
      <div className="about-content">
        {/* Hero Section */}
        <div className="about-hero">
          <div className="container">
            <div className="hero-content">
              <h1>About FixMyNagar</h1>
              <p className="hero-subtitle">
                Empowering citizens to build safer, cleaner, and well-maintained cities through collective action
              </p>
              <p className="hero-description">
                We believe everyone deserves a city that works for them. Join us in creating responsive urban
                communities.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="container">
            <div className="section-header">
              <Target size={35} style={{transform:"translate(0px, -14px)"}}/>
              <h2>ur Mission</h2>
            </div>
            <p className="mission-text">
              At FixMyNagar, we believe everyone deserves a safer, cleaner, and well-maintained city. Our mission is to
              empower citizens to identify and resolve public issues—potholes, broken streetlights, sewage leaks, and
              more—through simple reporting and collective action.
            </p>
          </div>
        </section>

        {/* Problem Section */}
        <section className="problem-section">
          <div className="container">
            <h2>The Problem We Solve</h2>
            <p>Cities around India face recurring civic issues that go unnoticed or unaddressed:</p>
            <div className="problem-grid">
              <div className="problem-item">
                <div className="problem-icon">❓</div>
                <p>People don't know where to report problems</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">⏳</div>
                <p>Authorities respond only when enough complaints accumulate</p>
              </div>
              <div className="problem-item">
                <div className="problem-icon">🔍</div>
                <p>There's no transparency or tracking of resolutions</p>
              </div>
            </div>
            <p className="problem-conclusion">FixMyNagar exists to eliminate these barriers.</p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <div className="container">
            <h2>How FixMyNagar Works</h2>
            <div className="steps-grid">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Capture & Report</h3>
                  <p>Upload a photo & location of an issue in seconds—no forms, no hassle.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Smart Classification</h3>
                  <p>Our AI identifies the category (e.g., road damage, sanitation, lighting).</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Community Map</h3>
                  <p>View reported issues in your neighborhood, upvote concerns you share.</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Real-Time Tracking</h3>
                  <p>Authorities mark issues "Pending", "In Progress", or "Resolved".</p>
                </div>
              </div>
              <div className="step-item">
                <div className="step-number">5</div>
                <div className="step-content">
                  <h3>Escalation & Transparency</h3>
                  <p>Popular issues auto-escalate to local management bodies, keeping you informed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="container">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value-item">
                <div className="value-icon">
                  <Shield size={32} />
                </div>
                <h3>Transparency</h3>
                <p>Public visibility of all reports and their progress.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <Users size={32} />
                </div>
                <h3>Community Voice</h3>
                <p>Empowering collective civic action through upvotes and feedback.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <Lightbulb size={32} />
                </div>
                <h3>Innovation</h3>
                <p>Seamless AI + geolocation for faster, smarter civic reporting.</p>
              </div>
              <div className="value-item">
                <div className="value-icon">
                  <CheckCircle size={32} />
                </div>
                <h3>Accountability</h3>
                <p>Ensuring authorities take action, every time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="story-section">
          <div className="container">
            <h2>Our Story</h2>
            <p>
              Born from frustration and ambition, FixMyNagar started as a simple idea: "What if civic issues could be
              fixed as fast as we notice them?" As engineering students passionate about urban innovation, we built this
              platform to connect citizens, AI, and authorities in one intuitive ecosystem.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="container">
            <h2>Meet the Team</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">VS</div>
                <h3>Vishal Singh</h3>
                <p className="member-bio">AI specialist & full-stack developer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">PG</div>
                <h3>Payal Goswami</h3>
                <p className="member-bio">Full Stack Developer</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">TL</div>
                <h3>Aditya Pratap Singh</h3>
                <p className="member-bio">Machine Learning</p>
              </div>
              <div className="team-member">
                <div className="member-avatar">AS</div>
                <h3>Aditi Sharma</h3>
                <p className="member-bio">Frontend Developer</p>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        {/* <section className="impact-section">
          <div className="container">
            <h2>Early Impact</h2>
            <div className="impact-stats">
              <div className="stat-item">
                <div className="stat-icon">
                  <Building size={32} />
                </div>
                <div className="stat-content">
                  <h3>Authority Integration</h3>
                  <p>Successfully integrated with local ward authorities</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <MapPin size={32} />
                </div>
                <div className="stat-content">
                  <h3>Community Reports</h3>
                  <p>Over 500+ community reports logged and tracked</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Wrench size={32} />
                </div>
                <div className="stat-content">
                  <h3>Issues Resolved</h3>
                  <p>Several local issues resolved within days</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <h2>Join the Movement</h2>
            <p>Together, we can build more responsive cities.</p>
            <div className="cta-actions">
              <div className="cta-item">
                <h3>Join the web app today</h3>
                <p>Start reporting issues in your area</p>
              </div>
              <div className="cta-item">
                <h3>Report issues in your area</h3>
                <p>Make your voice heard in your community</p>
              </div>
              <div className="cta-item">
                <h3>Engage with your community</h3>
                <p>Support and upvote important issues</p>
              </div>
              <div className="cta-item">
                <h3>Partner with us</h3>
                <p>Bring FixMyNagar to your city</p>
              </div>
            </div>
            <div className="cta-buttons">
              <Link to="/" className="cta-button primary">
                Start Reporting
              </Link>
              <Link to="/contact" className="cta-button secondary">
                Partner With Us
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}

"use client"
import { Link } from 'react-router-dom';
import { useState } from "react"
import { Menu, X, MessageCircle, ChevronUp, Flag, CheckCircle, Clock } from "lucide-react"
import Footer from "../components/Footer"
import "./HomePage.css"

const mockPosts = [
  {
    id: 1,
    image: "https://picsum.photos/400/300?random=1",
    title: "Broken Street Light on Main Street",
    address: "123 Main Street, Downtown",
    upvotes: 124,
    comments: 23,
    isUpvoted: false,
    status: "resolved",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/250?random=2",
    title: "Pothole Needs Immediate Repair",
    address: "456 Oak Avenue, Uptown",
    upvotes: 89,
    comments: 15,
    isUpvoted: true,
    status: "unresolved",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/350?random=3",
    title: "Graffiti Removal Required",
    address: "789 Pine Road, Midtown",
    upvotes: 256,
    comments: 42,
    isUpvoted: false,
    status: "resolved",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/280?random=4",
    title: "Damaged Park Bench",
    address: "321 Elm Street, Suburbs",
    upvotes: 67,
    comments: 8,
    isUpvoted: false,
    status: "unresolved",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/320?random=5",
    title: "Overflowing Trash Bin",
    address: "654 Maple Drive, City Center",
    upvotes: 198,
    comments: 31,
    isUpvoted: true,
    status: "resolved",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/290?random=6",
    title: "Broken Sidewalk Tiles",
    address: "987 Cedar Lane, East Side",
    upvotes: 145,
    comments: 19,
    isUpvoted: false,
    status: "unresolved",
  },
]

const menuItems = ["Home", "About", "Contact"]

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [posts, setPosts] = useState(mockPosts)

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev)
  }

  const handleUpvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isUpvoted: !post.isUpvoted,
              upvotes: post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1,
            }
          : post,
      ),
    )
  }

  const toggleStatus = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              status: post.status === "resolved" ? "unresolved" : "resolved",
            }
          : post,
      ),
    )
  }

  return (
    <div className="homepage">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo */}
          <div className="logo">
            <img src="/src/assets/logo.png" alt="Logo" className="logo-image" />
          </div>

          {/* Desktop Menu */}
          <div className="desktop-menu">
            {menuItems.map((item) => (
              <a key={item} href="#" className="nav-link">
                {item}
              </a>
            ))}
            <Link to="/auth" className="login-button">Login</Link>
          </div>

          {/* Mobile Hamburger */}
          <button onClick={toggleMenu} className="hamburger" aria-label="Toggle menu">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
          <div className="mobile-menu-content">
            {menuItems.map((item) => (
              <a key={item} href="#" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Desktop Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Modern Social</h1>
          <p className="hero-subtitle">
            Discover amazing content, connect with others, and share your thoughts in our modern community platform.
          </p>
          <button className="hero-button">
            <Flag size={20} />
            Report Issue
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <div className="container">
          <h2 className="posts-title">Latest Posts</h2>

          <div className="posts-grid">
            {posts.map((post) => (
              <div key={post.id} className="post-card">
                {/* Post Image */}
                <div className="post-image">
                  <img src={post.image || "/placeholder.svg"} alt={post.title} />
                </div>

                {/* Post Content */}
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-address">{post.address}</p>
                </div>

                {/* Post Actions */}
                <div className="post-actions">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className={`action-button upvote-button ${post.isUpvoted ? "upvoted" : ""}`}
                  >
                    <ChevronUp size={18} className={post.isUpvoted ? "filled" : ""} />
                    <span>{post.upvotes}</span>
                  </button>

                  <button
                    onClick={() => toggleStatus(post.id)}
                    className={`action-button status-button ${post.status}`}
                  >
                    {post.status === "resolved" ? <CheckCircle size={18} /> : <Clock size={18} />}
                    <span>{post.status}</span>
                  </button>

                  <button className="action-button comment-button">
                    <MessageCircle size={18} />
                    <span>{post.comments}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Sticky Report Button */}
      <div className="mobile-report-button">
        <button className="report-button">
          <Flag size={20} />
          Report Issue
        </button>
      </div>

      <Footer />
    </div>
  )
}

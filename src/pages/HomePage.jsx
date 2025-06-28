"use client"


import { useState, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { MessageCircle, ChevronUp, Flag, CheckCircle, Clock } from "lucide-react"
import { Link } from "react-router-dom"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ReportIssueModal from "../components/ReportIssueModal"
import CommentBox from "../components/CommentBox"
import "./HomePage.css"

// Loading Skeleton Component
const PostSkeleton = () => {
  return (
    <div className="post-card skeleton-card">
      {/* Skeleton Image */}
      <div className="post-image skeleton-image">
        <div className="skeleton-shimmer"></div>
      </div>

      {/* Skeleton Content */}
      <div className="post-content">
        <div className="skeleton-title">
          <div className="skeleton-line skeleton-line-long"></div>
        </div>
        <div className="skeleton-address">
          <div className="skeleton-line skeleton-line-medium"></div>
        </div>
      </div>

      {/* Skeleton Actions */}
      <div className="post-actions">
        <div className="skeleton-button">
          <div className="skeleton-icon"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="skeleton-button">
          <div className="skeleton-icon"></div>
          <div className="skeleton-text"></div>
        </div>
        <div className="skeleton-button">
          <div className="skeleton-icon"></div>
          <div className="skeleton-text"></div>
        </div>
      </div>
    </div>
  )
}

// Loading Grid Component
const LoadingGrid = () => {
  return (
    <div className="posts-grid">
      {[...Array(6)].map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  )
}

export default function HomePage() {
  const { t } = useTranslation(["homepage", "common"])
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState(null)
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [openComments, setOpenComments] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [showStickyButton, setShowStickyButton] = useState(false)
  const mobileHeroRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Scroll detection for sticky button visibility
  useEffect(() => {
    const handleScroll = () => {
      if (mobileHeroRef.current && isMobile) {
        const heroRect = mobileHeroRef.current.getBoundingClientRect()
        const heroBottom = heroRect.bottom

        // Show sticky button when hero section is scrolled out of view
        setShowStickyButton(heroBottom < 200)
      } else if (!isMobile) {
        // Always show sticky button on desktop since there's no mobile hero
        setShowStickyButton(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  const handleUpvote = async (postId) => {
    // Update the upvote state for the post on backend
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${postId}/upvote`, {
      method: "POST",
      credentials: "include", // if you use cookie-based auth
    })

    if (!res.ok) {
      throw new Error("Failed to upvote post")
    }

    const data = await res.json()
    console.log(data)
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isUpvoted: data.isUpvoted,
              upvotes: data.upvotes,
            }
          : post,
      ),
    )
  }

  const toggleComments = (postId) => {
    setOpenComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  useEffect(() => {
    // Fetch posts from the backend
    async function fetchPosts() {
      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/issues`, {
          method: "POST",
          headers: { Accept: "application/json" },
          credentials: "include", // if you use cookie-based auth
        })

        if (!res.ok) {
          setPostsError(res.status)
        }
        const json = await res.json()
        setPosts(json.posts)
      } catch (err) {
        console.error(err)
        setPostsError(err.message)
      } finally {
        setPostsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleAddComment = async (postId, text) => {
    // Update state or send to backend
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${postId}/comment`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: text }),
    })
    let newComments = []
    if (res.ok) {
      const data = await res.json()
      newComments = data.comments
    } else {
      throw new Error("Failed to add comment")
    }

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: newComments,
            }
          : p,
      ),
    )
  }

  return (
    <div className="homepage">
      <Navbar />

      {/* Mobile Hero Section */}
      <div className="mobile-hero-section" ref={mobileHeroRef}>
        <div className="mobile-hero-content">
          {/* Hero Icon */}
          <div className="hero-icon">
            <div className="icon-container">
              <img src="/src/assets/logo.png" alt="Logo" className="auth-logo-image" />
            </div>
          </div>

          {/* Hero Text */}
          <h1 className="mobile-hero-title">{t("homepage:mobileHero.title")}</h1>
          <p className="mobile-hero-subtitle">{t("homepage:mobileHero.subtitle")}</p>

          {/* Hero Buttons */}
          <div className="hero-buttons">
            <button className="primary-hero-button" onClick={() => setIsReportModalOpen(true)}>
              {t("homepage:mobileHero.buttons.reportNow")}
            </button>
            <Link to="/about" className="secondary-hero-button">
              {t("homepage:mobileHero.buttons.learnMore")}
              <ChevronUp size={16} className="rotate-90" />
            </Link>
          </div>
        </div>
      </div>

      {/* Desktop Hero Section */}
      <div id="heroSection" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">{t("homepage:hero.title")}</h1>
          <p className="hero-subtitle">{t("homepage:hero.subtitle")}</p>
          <p className="hero-description">{t("homepage:hero.description")}</p>
          <button className="hero-button" onClick={() => setIsReportModalOpen(true)}>
            <Flag size={20} />
            {t("common:buttons.reportIssue")}
          </button>
        </div>
      </div>

      {/* Posts Section */}
      <div className="posts-section">
        <div className="container">
          <div className="posts-header">
            <h2 className="posts-title">{t("homepage:posts.title")}</h2>
            <p className="posts-subtitle">{t("homepage:posts.subtitle")}</p>
          </div>

          {postsLoading ? (
            <LoadingGrid />
          ) : postsError ? (
            <div className="error-message">
              <p>Error Loading Posts: {postsError}</p>
            </div>
          ) : (
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

                    <button className={`action-button status-button ${post.status}`}>
                      {post.status === "resolved" ? <CheckCircle size={18} /> : <Clock size={18} />}
                      <span>{t(`common:status.${post.status}`)}</span>
                    </button>

                    <button className="action-button comment-button" onClick={() => toggleComments(post.id)}>
                      <MessageCircle size={18} />
                      <span>{post.comments.length}</span>
                    </button>
                  </div>
                  {openComments[post.id] && (
                    <CommentBox
                      isOpen={openComments[post.id]}
                      onClose={() => toggleComments(post.id)}
                      isMobile={isMobile}
                      newComments={post.comments}
                      onAddComment={(text) => handleAddComment(post.id, text)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sticky Report Button - Only show when hero button is out of view */}
      {isMobile && showStickyButton && (
        <div className="mobile-report-button">
          <button className="report-button" onClick={() => setIsReportModalOpen(true)}>
            <Flag size={20} />
            {t("common:buttons.reportIssue")}
          </button>
        </div>
      )}

      <ReportIssueModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

      <Footer />
    </div>
  )
}

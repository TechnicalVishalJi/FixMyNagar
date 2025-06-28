"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { CheckCircle, Clock, MessageCircle, ChevronUp, Filter } from "lucide-react"
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import CommentBox from "../components/CommentBox"
import "./AdminPage.css"
import { getAdminStatus } from "../utils/common"
import { useNavigate } from "react-router-dom"

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

export default function AdminPage() {
  const { t } = useTranslation(["admin", "common"])
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true)
  const [postsError, setPostsError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [openComments, setOpenComments] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const navigate = useNavigate()

  useEffect(() => {
      getAdminStatus().then((status) => {
        if(!Boolean(status)){
          setIsAdmin(false)
          console.log("Admin access not granted, redirecting to home");
          navigate("/")
        }else{
          setIsAdmin(true)
        }
      });
    }, [navigate])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleStatus = async (postId, currentStatus) => {
    const newStatus = currentStatus === "resolved" ? "unresolved" : "resolved"

    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/issues/${postId}/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ status: newStatus }),
    })

    if (res.ok) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId ? { ...post, status: newStatus } : post
        )
      )
    } else {
      console.error("Failed to update status")
    }
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
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/issues`, {
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

  useEffect(() => {
    if(!isAdmin){return;}
    // Prevent reinitialization if map already exists
    if (L.DomUtil.get('adminMap')?._leaflet_id) {
      L.DomUtil.get('adminMap')._leaflet_id = null;
    }

    const map = L.map('adminMap').setView([22.0, 79.0], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    }).addTo(map);

    posts.forEach(post => {
      if(post.location?.lat && post.location?.lng) {
        L.marker([post?.location?.lat, post?.location?.lng])
          .addTo(map)
          .bindPopup(`
            <strong>${post.category}</strong><br/>
            ${post.address}<br/>
            Votes: ${post.upvotes}
          `);
      }else{
        console.warn(`Post ${post.id} has no valid location data`, post); 
      }
    });
  }, [posts]);


  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true
    return post.status === filter
  })

  const resolvedCount = posts.filter((post) => post.status === "resolved").length
  const unresolvedCount = posts.filter((post) => post.status === "unresolved").length

  return isAdmin && (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <h1>{t("admin:dashboard")}</h1>
          <p>{t("admin:manageReports")}</p>
        </div>
      </div>

      <div className="admin-content">
        {/* Maps Section */}
        <div className="maps-section">
          <div id="adminMap" className="maps-container">
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-buttons">
            <button onClick={() => setFilter("all")} className={`filter-button ${filter === "all" ? "active" : ""}`}>
              <Filter size={18} />
              {t("admin:allPosts")} ({posts.length})
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`filter-button resolved ${filter === "resolved" ? "active" : ""}`}
            >
              <CheckCircle size={18} />
              {t("admin:resolved")} ({resolvedCount})
            </button>
            <button
              onClick={() => setFilter("unresolved")}
              className={`filter-button unresolved ${filter === "unresolved" ? "active" : ""}`}
            >
              <Clock size={18} />
              {t("admin:unresolved")} ({unresolvedCount})
            </button>
          </div>

          <div className="filter-stats">
            {t("admin:showing")} {filteredPosts.length} {t("admin:of")} {posts.length} {t("admin:posts")}
          </div>
        </div>

        {/* Posts Grid */}
        <div className="admin-posts-grid">
          {postsLoading ? (
            <LoadingGrid />
          ) : postsError ? (
            <div className="error-message">
              <p>Error Loading Posts: {postsError}</p>
            </div>
          ) : (filteredPosts.map((post) => (
            <div key={post.id} className="admin-post-card">
              {/* Post Image */}
              <div className="admin-post-image">
                <img src={post.image || "/placeholder.svg"} alt={post.title} />
              </div>

              {/* Post Content */}
              <div className="admin-post-content">
                <h3 className="admin-post-title">{post.title}</h3>
                <p className="admin-post-address">{post.address}</p>
              </div>

              {/* Post Actions */}
              <div className="admin-post-actions">
                <div className="action-row">
                  <button
                    className={`admin-action-button upvote ${post.isUpvoted ? "upvoted" : ""}`}
                  >
                    <ChevronUp size={16} className={post.isUpvoted ? "filled" : ""} />
                    <span>{post.upvotes}</span>
                  </button>

                  <button className="admin-action-button comment" onClick={() => toggleComments(post.id)}>
                    <MessageCircle size={16} />
                    <span>{post.comments.length}</span>
                  </button>
                </div>

                <button onClick={() => toggleStatus(post.id, post.status)} className={`status-toggle-button ${post.status}`}>
                  {post.status === "resolved" ? <CheckCircle size={18} /> : <Clock size={18} />}
                  {post.status === "resolved" ? t("common:status.markAsUnresolved") : t("common:status.markAsResolved")}
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
          )))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <div>{t("admin:noPostsFound")}</div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { CheckCircle, Clock, MessageCircle, ChevronUp, Filter } from "lucide-react"
import "./AdminPage.css"

const mockPosts = [
  {
    id: 1,
    image: "https://picsum.photos/400/300?random=7",
    title: "Broken Street Light on Main Street",
    address: "123 Main Street, Downtown",
    upvotes: 124,
    comments: 23,
    isUpvoted: false,
    status: "resolved",
    location: "Downtown",
  },
  {
    id: 2,
    image: "https://picsum.photos/400/250?random=8",
    title: "Pothole Needs Immediate Repair",
    address: "456 Oak Avenue, Uptown",
    upvotes: 89,
    comments: 15,
    isUpvoted: true,
    status: "unresolved",
    location: "Uptown",
  },
  {
    id: 3,
    image: "https://picsum.photos/400/350?random=9",
    title: "Graffiti Removal Required",
    address: "789 Pine Road, Midtown",
    upvotes: 256,
    comments: 42,
    isUpvoted: false,
    status: "resolved",
    location: "Midtown",
  },
  {
    id: 4,
    image: "https://picsum.photos/400/280?random=10",
    title: "Damaged Park Bench",
    address: "321 Elm Street, Suburbs",
    upvotes: 67,
    comments: 8,
    isUpvoted: false,
    status: "unresolved",
    location: "Suburbs",
  },
  {
    id: 5,
    image: "https://picsum.photos/400/320?random=11",
    title: "Overflowing Trash Bin",
    address: "654 Maple Drive, City Center",
    upvotes: 198,
    comments: 31,
    isUpvoted: true,
    status: "resolved",
    location: "City Center",
  },
  {
    id: 6,
    image: "https://picsum.photos/400/290?random=12",
    title: "Broken Sidewalk Tiles",
    address: "987 Cedar Lane, East Side",
    upvotes: 145,
    comments: 19,
    isUpvoted: false,
    status: "unresolved",
    location: "East Side",
  },
]

export default function AdminPage() {
  const [posts, setPosts] = useState(mockPosts)
  const [filter, setFilter] = useState("all")

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

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true
    return post.status === filter
  })

  const resolvedCount = posts.filter((post) => post.status === "resolved").length
  const unresolvedCount = posts.filter((post) => post.status === "unresolved").length

  return (
    <div className="admin-page">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <h1>Admin Dashboard</h1>
          <p>Manage and monitor community reports</p>
        </div>
      </div>

      <div className="admin-content">
        {/* Google Maps Section */}
        <div className="maps-section">
          <div className="maps-container">
            <div className="maps-placeholder">
              <div className="maps-content">
                <div className="maps-icon">
                  <svg width="32" height="32" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="maps-text">
                  <h3>Interactive Map View</h3>
                  <p>Google Maps integration would be displayed here</p>
                  <p className="maps-subtitle">This would show real-time locations of reported issues</p>
                </div>
              </div>

              {/* Mock map markers */}
              <div className="map-marker marker-1"></div>
              <div className="map-marker marker-2"></div>
              <div className="map-marker marker-3"></div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <div className="filter-buttons">
            <button onClick={() => setFilter("all")} className={`filter-button ${filter === "all" ? "active" : ""}`}>
              <Filter size={18} />
              All Posts ({posts.length})
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`filter-button resolved ${filter === "resolved" ? "active" : ""}`}
            >
              <CheckCircle size={18} />
              Resolved ({resolvedCount})
            </button>
            <button
              onClick={() => setFilter("unresolved")}
              className={`filter-button unresolved ${filter === "unresolved" ? "active" : ""}`}
            >
              <Clock size={18} />
              Unresolved ({unresolvedCount})
            </button>
          </div>

          <div className="filter-stats">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        </div>

        {/* Posts Grid */}
        <div className="admin-posts-grid">
          {filteredPosts.map((post) => (
            <div key={post.id} className="admin-post-card">
              {/* Post Image */}
              <div className="admin-post-image">
                <img src={post.image || "/placeholder.svg"} alt={post.title} />
                <div className="location-tag">{post.location}</div>
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
                    onClick={() => handleUpvote(post.id)}
                    className={`admin-action-button upvote ${post.isUpvoted ? "upvoted" : ""}`}
                  >
                    <ChevronUp size={16} className={post.isUpvoted ? "filled" : ""} />
                    <span>{post.upvotes}</span>
                  </button>

                  <button className="admin-action-button comment">
                    <MessageCircle size={16} />
                    <span>{post.comments}</span>
                  </button>
                </div>

                <button onClick={() => toggleStatus(post.id)} className={`status-toggle-button ${post.status}`}>
                  {post.status === "resolved" ? <CheckCircle size={18} /> : <Clock size={18} />}
                  Mark as {post.status === "resolved" ? "Unresolved" : "Resolved"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="no-posts">
            <div>No posts found for the selected filter</div>
          </div>
        )}
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { useTranslation } from "react-i18next"
import { MessageCircle, ChevronUp, Flag, CheckCircle, Clock } from "lucide-react"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import ReportIssueModal from "../components/ReportIssueModal"
import CommentBox from "../components/CommentBox"
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

export default function HomePage() {
  const { t } = useTranslation(["homepage", "common"])
  const [posts, setPosts] = useState([])
  const [postsLoading, setPostsLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [openComments, setOpenComments] = useState({})
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleUpvote = async (postId) => {
    // Update the upvote state for the post on backend
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${postId}/upvote`, {
      method: 'POST',
      credentials: 'include', // if you use cookie-based auth
    })
    
    if (!res.ok) {
      throw new Error('Failed to upvote post')
    }

    const data = await res.json();
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
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          credentials: 'include' // if you use cookie-based auth
        });

        if (!res.ok) {
          setPostsError(res.status)
        }
        const json = await res.json(); // parse JSON response :contentReference[oaicite:1]{index=1}
        setPosts(json.posts);         // store array
      } catch (err) {
        console.error(err);
        setPostsError(err.message);
      } finally {
        setPostsLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const handleAddComment = async (postId, text) => {
    // Update state or send to backend
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/issues/${postId}/comment`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: text })
    });
    let newComments = [];
    if (res.ok) {
      const data = await res.json();
      newComments = data.comments;
    }else{
      throw new Error('Failed to add comment');
    }

    setPosts(prev =>
      prev.map(p =>
        p.id === postId ? {
          ...p,
          comments: newComments,
        } : p
      )
    );
  };


  return (
    <div className="homepage">
      <Navbar />

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

          <div className="posts-grid">
            {postsLoading ? "<p>Loading posts...</p>" : postsError ? `<p>Error Loading Posts : ${postsError}</p>` : posts.map((post) => (
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
                    className={`action-button status-button ${post.status}`}
                  >
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
        </div>
      </div>

      {/* Mobile Sticky Report Button */}
      <div className="mobile-report-button">
        <button className="report-button" onClick={() => setIsReportModalOpen(true)}>
          <Flag size={20} />
          {t("common:buttons.reportIssue")}
        </button>
      </div>

      <ReportIssueModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />

      <Footer />
    </div>
  )
}

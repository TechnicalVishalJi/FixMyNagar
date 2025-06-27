"use client"

import { useState } from "react"
import { useTranslation } from "react-i18next"
import { X, Send } from "lucide-react"
import "./CommentBox.css"

const mockComments = [
  {
    id: 1,
    author: "John Doe",
    text: "I've seen this issue too. It's been like this for weeks!",
    time: "2 hours ago",
  },
  {
    id: 2,
    author: "Jane Smith",
    text: "Thanks for reporting this. I'll contact the local authorities.",
    time: "1 hour ago",
  },
]

export default function CommentBox({ isOpen, onClose, newComments, onAddComment, isMobile = false }) {
  const { t } = useTranslation("common")
  let comments = newComments.map((c, idx) => ({
    ...c,
    id: idx + 1
  }));
  let newComment = "";

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment)
      newComment = ""
    }
  }
  
  // Helper to format time as "x minutes/hours ago"
  function timeAgo(date) {
    const now = new Date();
    const then = new Date(date);
    const diff = Math.floor((now - then) / 1000);

    if (isNaN(diff) || diff < 0) return "";

    if (diff < 60) return `${diff} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  if (!isOpen) return null


  const CommentContent = () => (
    <div className={`comment-box ${isMobile ? "mobile" : "desktop"}`}>
      <div className="comment-header">
        <h3>Comments</h3>
        <button className="comment-close-button" onClick={onClose}>
          <X size={16} />
        </button>
      </div>

      <div className="comments-list">
        {comments.length > 0 ? comments.map((comment) => (
          <div className="comment-item" key={comment.id}>
            <div className="comment-author">{comment.userName}</div>
            <div className="comment-text">{comment.comment}</div>
            <div className="comment-time">{timeAgo(comment.time)}</div>
          </div>
        )) : <p>No comments yet!</p>}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          onChange={(e) => newComment = e.target.value}
          placeholder="Add a comment..."
          className="comment-input"
        />
        <button type="submit" className="comment-submit">
          <Send size={16} />
        </button>
      </form>
    </div>
  )

  if (isMobile) {
    return (
      <div className="comment-overlay" onClick={onClose}>
        <div onClick={(e) => e.stopPropagation()}>
          <CommentContent />
        </div>
      </div>
    )
  }

  return <CommentContent />
}

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

export default function CommentBox({ isOpen, onClose, isMobile = false }) {
  const { t } = useTranslation("common")
  const [newComment, setNewComment] = useState("")
  const [comments, setComments] = useState(mockComments)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        author: "You",
        text: newComment,
        time: "Just now",
      }
      setComments([...comments, comment])
      setNewComment("")
    }
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
        {comments.map((comment) => (
          <div key={comment.id} className="comment-item">
            <div className="comment-author">{comment.author}</div>
            <div className="comment-text">{comment.text}</div>
            <div className="comment-time">{comment.time}</div>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
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

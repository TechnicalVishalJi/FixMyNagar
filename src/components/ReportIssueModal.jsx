"use client"

import { useState, useRef } from "react"
import { X, Camera, Upload, MapPin } from "lucide-react"
import "./ReportIssueModal.css"

export default function ReportIssueModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    image: null,
    address: "",
    description: "",
  })
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const cameraInputRef = useRef(null)

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({ ...formData, image: file })
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Handle form submission here
    onClose()
    // Reset form
    setFormData({ image: null, address: "", description: "" })
    setImagePreview(null)
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Report an Issue</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <label className="form-label">Add Photo</label>
            <div className="image-upload-container">
              {imagePreview ? (
                <div className="image-preview">
                  <img src={imagePreview || "/placeholder.svg"} alt="Preview" />
                  <button
                    type="button"
                    className="remove-image"
                    onClick={() => {
                      setImagePreview(null)
                      setFormData({ ...formData, image: null })
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="upload-options">
                  <button type="button" className="upload-button" onClick={() => fileInputRef.current?.click()}>
                    <Upload size={20} />
                    Upload Photo
                  </button>
                  <button
                    type="button"
                    className="upload-button camera-button"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera size={20} />
                    Use Camera
                  </button>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden-input"
              />
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageUpload}
                className="hidden-input"
              />
            </div>
          </div>

          {/* Address Field */}
          <div className="form-section">
            <label className="form-label" htmlFor="address">
              <MapPin size={16} />
              Problem Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter the exact location of the issue"
              className="form-input"
              required
            />
          </div>

          {/* Description Field */}
          <div className="form-section">
            <label className="form-label" htmlFor="description">
              Description (Optional)
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe the issue in detail..."
              className="form-textarea"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Submit Report
          </button>
        </form>
      </div>
    </div>
  )
}

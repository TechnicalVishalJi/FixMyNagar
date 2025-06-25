"use client"

import { useState, useRef } from "react"
import { useTranslation } from "react-i18next"
import { X, Camera, Upload, MapPin, Navigation } from "lucide-react"
import "./ReportIssueModal.css"

export default function ReportIssueModal({ isOpen, onClose }) {
  const { t } = useTranslation(["homepage", "common"])
  const [formData, setFormData] = useState({
    image: null,
    address: "",
    description: "",
    lat: null,
    lng: null,
  })
  const [imagePreview, setImagePreview] = useState(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationError, setLocationError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState(null) // 'success', 'error', or null
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
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

  const getGPSLocation = () => {
    setIsGettingLocation(true)
    setLocationError("")

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser.")
      setIsGettingLocation(false)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setFormData((prev) => ({
          ...prev,
          lat: latitude,
          lng: longitude,
        }))
        setIsGettingLocation(false)

        // Optionally, you can reverse geocode to get address
        reverseGeocode(latitude, longitude)
      },
      (error) => {
        let errorMessage = "Unable to retrieve your location."
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied by user."
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable."
            break
          case error.TIMEOUT:
            errorMessage = "Location request timed out."
            break
        }
        setLocationError(errorMessage)
        setIsGettingLocation(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      },
    )
  }

  const reverseGeocode = async (lat, lng) => {
    try {
      // Using a simple reverse geocoding service (you can replace with your preferred service)
      const response = await fetch(
        `https://us1.locationiq.com/v1/reverse?key=pk.56165e5c63a920f9117d6314f063ca46&lat=${lat}&lon=${lng}&format=json&`,
      )
      const data = await response.json()
      const address = data.display_name
      setFormData((prev) => ({ ...prev, address }))
      console.log("Reverse geocoding result: ", lat, lng, data)
    } catch (error) {
      console.log("Reverse geocoding failed:", error)
      // Don't show error to user, just continue without auto-filling address
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.image) {
      setSubmissionStatus("error")
      return
    }

    if (!formData.address.trim()) {
      setSubmissionStatus("error")
      return
    }

    setIsSubmitting(true)
    setSubmissionStatus(null)

    try {
      const submitData = new FormData()

      // Add all form fields
      submitData.append("lat", formData.lat ? formData.lat.toString() : "")
      submitData.append("lng", formData.lng ? formData.lng.toString() : "")
      submitData.append("address", formData.address)
      submitData.append("description", formData.description ? formData.description.trim() : "")
      submitData.append("image", formData.image)

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/report`, {
        method: "POST",
        body: submitData,
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Report submitted successfully:", result)

      // Show success UI
      setSubmissionStatus("success")
      setShowSuccessMessage(true)

      // Auto close after 2 seconds
      setTimeout(() => {
        onClose()
        setFormData({ image: null, address: "", description: "", lat: null, lng: null })
        setImagePreview(null)
        setLocationError("")
        setSubmissionStatus(null)
        setShowSuccessMessage(false)
      }, 4000)
    } catch (error) {
      console.error("Error submitting report:", error)
      setSubmissionStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t("homepage:reportModal.title")}</h2>
          <button className="close-button" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          {/* Image Upload Section */}
          <div className="form-section">
            <label className="form-label">{t("homepage:reportModal.addPhoto")} *</label>
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
                    {t("homepage:reportModal.uploadPhoto")}
                  </button>
                  <button
                    type="button"
                    className="upload-button camera-button"
                    onClick={() => cameraInputRef.current?.click()}
                  >
                    <Camera size={20} />
                    {t("homepage:reportModal.useCamera")}
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
              {t("homepage:reportModal.problemAddress")} *
            </label>
            <div className="address-input-container">
              <div className="input-with-icon">
                <MapPin size={16} className="input-icon-left" />
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t("homepage:reportModal.addressPlaceholder")}
                  className="form-input with-icon"
                  required
                />
              </div>
              <button
                type="button"
                onClick={getGPSLocation}
                disabled={isGettingLocation}
                className="gps-button"
                title={t("homepage:reportModal.getLocation")}
              >
                <Navigation size={16} className={isGettingLocation ? "spinning" : ""} />
                {isGettingLocation ? t("homepage:reportModal.gettingLocation") : t("homepage:reportModal.getLocation")}
              </button>
            </div>
            {locationError && <span className="error-text">{locationError}</span>}
            {formData.lat && formData.lng && (
              <div className="location-info">
                <span className="location-coords">
                  📍 {formData.lat.toFixed(6)}, {formData.lng.toFixed(6)}
                </span>
              </div>
            )}
          </div>

          {/* Description Field */}
          <div className="form-section">
            <label className="form-label" htmlFor="description">
              {t("homepage:reportModal.description")}
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder={t("homepage:reportModal.descriptionPlaceholder")}
              className="form-textarea"
              rows="4"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting || !formData.image || submissionStatus === "success"}
          >
            {isSubmitting ? t("homepage:reportModal.submitting") : t("homepage:reportModal.submitReport")}
          </button>
        </form>

        {/* Success/Error Messages */}
        {submissionStatus === "success" && (
          <div className="submission-success">
            <div className="success-icon">✓</div>
            <h3>{t("homepage:reportModal.submitSuccess")}</h3>
            <p>{t("homepage:reportModal.submitSuccessDesc")}</p>
          </div>
        )}

        {submissionStatus === "error" && (
          <div className="submission-error">
            <div className="error-icon">⚠</div>
            <h3>{t("homepage:reportModal.submitError")}</h3>
            <p>
              {!formData.image
                ? t("homepage:reportModal.imageRequired")
                : !formData.address.trim()
                  ? t("homepage:reportModal.addressRequired")
                  : t("homepage:reportModal.submitErrorDesc")}
            </p>
            <button type="button" className="retry-button" onClick={() => setSubmissionStatus(null)}>
              {t("homepage:reportModal.tryAgain")}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

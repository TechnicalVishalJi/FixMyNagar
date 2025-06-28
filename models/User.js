const mongoose = require('mongoose');

// MongoDB user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  otpSecret: String,
  otpExpiresAt: Date,
  isVerified: { type: Boolean, default: false },
  verifiedAt: Date
});

module.exports = mongoose.model('User', userSchema);
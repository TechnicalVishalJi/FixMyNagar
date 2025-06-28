const mongoose = require('mongoose');

// const reportSchema = new mongoose.Schema({
//   imageUrl: String,
//   publicId: String,
//   category: String,
//   location: {
//     lat: Number,
//     lng: Number,
//     address: String
//   },
//   description: String,
//   votes: { type: Number, default: 0 },
//   comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
//   status: { type: String, default: 'Pending' },
//   timestamp: { type: Date, default: Date.now }
// });

// Location sub-schema
const LocationSchema = new mongoose.Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  address: { type: String, required: true }
});

// Main Post schema
const reportSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { type: String, required: true },
  location: { type: LocationSchema, required: true },
  description: { type: String, required: true },
  votes: [
    {
      userEmail: { type: String, required: true },
      time: { type: Date, default: Date.now }
    }
  ],
  status: {
    type: String,
    enum: ['unresolved', 'resolved'],
    default: 'unresolved'
  },
  comments: [
    {
      userName: { type: String, required: true },
      userEmail: { type: String, required: true },
      comment: { type: String, required: true },
      time: { type: Date, default: Date.now }
    }
  ],
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('post', reportSchema);

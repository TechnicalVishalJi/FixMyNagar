const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  imageUrl: String,
  publicId: String,
  category: String,
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  description: String,
  votes: { type: Number, default: 0 },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  status: { type: String, default: 'Pending' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);

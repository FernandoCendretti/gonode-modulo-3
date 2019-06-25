const mongoose = require('mongoose')

// Model Intenção de compra
const Purchase = new mongoose.Schema({
  ad: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ad',
    required: true
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  content: {
    type: String,
    required: true
  },

  created_at: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Purchase', Purchase)

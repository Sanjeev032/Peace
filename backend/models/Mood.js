const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    mood: {
      type: String,
      required: true,
      enum: ['happy', 'sad', 'anxious', 'calm'],
    },
  },
  {
    timestamps: true,
  }
);

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;

const mongoose = require('mongoose');

const moodConfigSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, 'Please add an id (e.g., calm)'],
      unique: true,
    },
    label: {
      type: String,
      required: [true, 'Please add a label'],
    },
    emoji: {
      type: String,
      required: [true, 'Please add an emoji'],
    },
    gradient: {
      type: String,
      required: [true, 'Please add a gradient string'],
    },
    solidColor: {
      type: String,
      required: [true, 'Please add a solid color hex'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('MoodConfig', moodConfigSchema);

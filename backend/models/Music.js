const mongoose = require('mongoose');

const musicSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    duration: {
      type: String,
      required: [true, 'Please add a duration'],
    },
    category: {
      type: String,
      required: [true, 'Please add a category'],
    },
    moods: {
      type: [String],
      required: [true, 'Please add at least one mood'],
    },
    fileUrl: {
      type: String,
      default: '', // Placeholder for actual file storage if needed
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Music', musicSchema);

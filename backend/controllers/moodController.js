const asyncHandler = require('express-async-handler');
const Mood = require('../models/Mood');

// @desc    Get all mood entries for a user
// @route   GET /api/mood
// @access  Private
const getMoods = asyncHandler(async (req, res) => {
  const moods = await Mood.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(moods);
});

// @desc    Create a new mood entry
// @route   POST /api/mood
// @access  Private
const createMood = asyncHandler(async (req, res) => {
  const { mood } = req.body;

  const moodEntry = await Mood.create({
    user: req.user._id,
    mood,
  });

  res.status(201).json(moodEntry);
});

module.exports = {
  getMoods,
  createMood,
};

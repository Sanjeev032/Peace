const asyncHandler = require('express-async-handler');
const musicData = require('../data/musicData');

// @desc    Get music tracks by mood
// @route   GET /api/music/:mood
// @access  Public
const getMusicByMood = asyncHandler(async (req, res) => {
  const { mood } = req.params;

  const tracks = musicData[mood.toLowerCase()];

  if (tracks) {
    res.json(tracks);
  } else {
    res.status(404);
    throw new Error('No music found for this mood');
  }
});

module.exports = {
  getMusicByMood,
};

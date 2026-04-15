const asyncHandler = require('express-async-handler');
const Mood = require('../models/Mood');

// @desc    Get mood analytics for the user
// @route   GET /api/analytics
// @access  Private
const getMoodAnalytics = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // 1. Mood Frequency
  const frequency = await Mood.aggregate([
    { $match: { user: userId } },
    {
      $group: {
        _id: '$mood',
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);

  // Transform frequency into a cleaner object
  const moodFrequency = frequency.reduce((acc, curr) => {
    acc[curr._id] = curr.count;
    return acc;
  }, {});

  // 2. Most Common Mood
  const mostCommonMood = frequency.length > 0 ? frequency[0]._id : null;

  // 3. Weekly Trend (Last 7 days)
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const weeklyTrend = await Mood.aggregate([
    {
      $match: {
        user: userId,
        createdAt: { $gte: sevenDaysAgo },
      },
    },
    {
      $group: {
        _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
        count: { $sum: 1 },
        moods: { $push: '$mood' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({
    moodFrequency,
    mostCommonMood,
    weeklyTrend,
  });
});

module.exports = {
  getMoodAnalytics,
};

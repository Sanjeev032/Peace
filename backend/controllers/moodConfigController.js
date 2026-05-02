const asyncHandler = require('express-async-handler');
const MoodConfig = require('../models/MoodConfig');

// @desc    Get all mood configurations
// @route   GET /api/mood-configs
// @access  Public
const getMoodConfigs = asyncHandler(async (req, res) => {
  const configs = await MoodConfig.find({});
  res.json(configs);
});

// @desc    Update a mood configuration
// @route   PUT /api/mood-configs/:id
// @access  Private/Admin
const updateMoodConfig = asyncHandler(async (req, res) => {
  const config = await MoodConfig.findOne({ id: req.params.id });

  if (config) {
    config.label = req.body.label || config.label;
    config.emoji = req.body.emoji || config.emoji;
    config.gradient = req.body.gradient || config.gradient;
    config.solidColor = req.body.solidColor || config.solidColor;
    config.description = req.body.description || config.description;

    const updatedConfig = await config.save();
    res.json(updatedConfig);
  } else {
    res.status(404);
    throw new Error('Mood configuration not found');
  }
});

// @desc    Create a mood configuration
// @route   POST /api/mood-configs
// @access  Private/Admin
const createMoodConfig = asyncHandler(async (req, res) => {
  const { id, label, emoji, gradient, solidColor, description } = req.body;

  const config = await MoodConfig.create({
    id,
    label,
    emoji,
    gradient,
    solidColor,
    description,
  });

  if (config) {
    res.status(201).json(config);
  } else {
    res.status(400);
    throw new Error('Invalid mood config data');
  }
});

// @desc    Delete a mood configuration
// @route   DELETE /api/mood-configs/:id
// @access  Private/Admin
const deleteMoodConfig = asyncHandler(async (req, res) => {
  const config = await MoodConfig.findOne({ id: req.params.id });

  if (config) {
    await config.deleteOne();
    res.json({ message: 'Mood configuration removed' });
  } else {
    res.status(404);
    throw new Error('Mood configuration not found');
  }
});

module.exports = {
  getMoodConfigs,
  updateMoodConfig,
  createMoodConfig,
  deleteMoodConfig,
};

const asyncHandler = require('express-async-handler');
const Music = require('../models/Music');

// @desc    Get music tracks by mood
// @route   GET /api/music/:mood
// @access  Public
const getMusicByMood = asyncHandler(async (req, res) => {
  const { mood } = req.params;

  const tracks = await Music.find({ moods: mood.toLowerCase() });

  if (tracks && tracks.length > 0) {
    res.json(tracks);
  } else {
    res.status(404);
    throw new Error('No music found for this mood');
  }
});

// @desc    Get all music tracks
// @route   GET /api/music
// @access  Private/Admin
const getAllMusic = asyncHandler(async (req, res) => {
  const tracks = await Music.find({});
  res.json(tracks);
});


// @desc    Create a new music track
// @route   POST /api/music
// @access  Private/Admin
const createMusicTrack = asyncHandler(async (req, res) => {
  const { title, description, duration, category, moods, fileUrl } = req.body;

  const track = await Music.create({
    title,
    description,
    duration,
    category,
    moods,
    fileUrl,
  });

  if (track) {
    res.status(201).json(track);
  } else {
    res.status(400);
    throw new Error('Invalid music track data');
  }
});

// @desc    Update a music track
// @route   PUT /api/music/:id
// @access  Private/Admin
const updateMusicTrack = asyncHandler(async (req, res) => {
  const track = await Music.findById(req.params.id);

  if (track) {
    track.title = req.body.title || track.title;
    track.description = req.body.description || track.description;
    track.duration = req.body.duration || track.duration;
    track.category = req.body.category || track.category;
    track.moods = req.body.moods || track.moods;
    track.fileUrl = req.body.fileUrl || track.fileUrl;

    const updatedTrack = await track.save();
    res.json(updatedTrack);
  } else {
    res.status(404);
    throw new Error('Track not found');
  }
});

// @desc    Delete a music track
// @route   DELETE /api/music/:id
// @access  Private/Admin
const deleteMusicTrack = asyncHandler(async (req, res) => {
  const track = await Music.findById(req.params.id);

  if (track) {
    await track.deleteOne();
    res.json({ message: 'Track removed' });
  } else {
    res.status(404);
    throw new Error('Track not found');
  }
});

module.exports = {
  getMusicByMood,
  getAllMusic,
  createMusicTrack,
  updateMusicTrack,
  deleteMusicTrack,
};


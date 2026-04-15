const asyncHandler = require('express-async-handler');
const Journal = require('../models/Journal');

// @desc    Get all journal entries for a user
// @route   GET /api/journal
// @access  Private
const getJournals = asyncHandler(async (req, res) => {
  const journals = await Journal.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(journals);
});

// @desc    Create a new journal entry
// @route   POST /api/journal
// @access  Private
const createJournal = asyncHandler(async (req, res) => {
  const { content, mood } = req.body;

  const journalEntry = await Journal.create({
    user: req.user._id,
    content,
    mood,
  });

  res.status(201).json(journalEntry);
});

// @desc    Update a journal entry
// @route   PUT /api/journal/:id
// @access  Private
const updateJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(404);
    throw new Error('Journal entry not found');
  }

  // Check for user ownership
  if (journal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const { content, mood } = req.body;

  const updatedJournal = await Journal.findByIdAndUpdate(
    req.params.id,
    { content, mood },
    { new: true }
  );

  res.json(updatedJournal);
});

// @desc    Delete a journal entry
// @route   DELETE /api/journal/:id
// @access  Private
const deleteJournal = asyncHandler(async (req, res) => {
  const journal = await Journal.findById(req.params.id);

  if (!journal) {
    res.status(404);
    throw new Error('Journal entry not found');
  }

  // Check for user ownership
  if (journal.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await journal.deleteOne();

  res.json({ message: 'Journal entry removed' });
});

module.exports = {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
};

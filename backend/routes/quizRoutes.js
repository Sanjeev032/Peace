const express = require('express');
const router = express.Router();
const QuizQuestion = require('../models/QuizQuestion');
const asyncHandler = require('express-async-handler');
const { protect, admin } = require('../middleware/authMiddleware');

// @desc    Get all quiz questions
// @route   GET /api/quiz
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
  const questions = await QuizQuestion.find({}).sort('order');
  res.json(questions);
}));

// @desc    Create a quiz question
// @route   POST /api/quiz
// @access  Private/Admin
router.post('/', protect, admin, asyncHandler(async (req, res) => {
  const { questionText, options, order } = req.body;

  const question = new QuizQuestion({
    questionText,
    options,
    order
  });

  const createdQuestion = await question.save();
  res.status(201).json(createdQuestion);
}));

// @desc    Update a quiz question
// @route   PUT /api/quiz/:id
// @access  Private/Admin
router.put('/:id', protect, admin, asyncHandler(async (req, res) => {
  const { questionText, options, order } = req.body;

  const question = await QuizQuestion.findById(req.params.id);

  if (question) {
    question.questionText = questionText || question.questionText;
    question.options = options || question.options;
    question.order = order !== undefined ? order : question.order;

    const updatedQuestion = await question.save();
    res.json(updatedQuestion);
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
}));

// @desc    Delete a quiz question
// @route   DELETE /api/quiz/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, asyncHandler(async (req, res) => {
  const question = await QuizQuestion.findById(req.params.id);

  if (question) {
    await QuizQuestion.deleteOne({ _id: question._id });
    res.json({ message: 'Question removed' });
  } else {
    res.status(404);
    throw new Error('Question not found');
  }
}));

module.exports = router;

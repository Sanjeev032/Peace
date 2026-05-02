const mongoose = require('mongoose');

const quizOptionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  moodImpact: {
    type: String,
    required: true, // e.g., "Calm", "Energetic", "Reflective", "Anxious", "Sad"
  },
  scoreValue: {
    type: Number,
    default: 1,
  }
});

const quizQuestionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
  },
  options: [quizOptionSchema],
  order: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

module.exports = QuizQuestion;

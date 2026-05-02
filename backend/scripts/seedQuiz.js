const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const QuizQuestion = require('../models/QuizQuestion');

dotenv.config({ path: path.join(__dirname, '../.env') });

const questions = [
  {
    questionText: "How would you describe your current energy levels?",
    order: 1,
    options: [
      { text: "Very high - I feel like I need to move", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Moderate - I'm feeling steady", moodImpact: "Calm", scoreValue: 1 },
      { text: "Low - I feel a bit drained", moodImpact: "Sad", scoreValue: 1 },
      { text: "Restless - I can't seem to settle", moodImpact: "Anxious", scoreValue: 2 }
    ]
  },
  {
    questionText: "How is your breathing right now?",
    order: 2,
    options: [
      { text: "Slow and deep", moodImpact: "Calm", scoreValue: 2 },
      { text: "Shallow or fast", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Heavy or sighed", moodImpact: "Sad", scoreValue: 1 },
      { text: "Normal", moodImpact: "Reflective", scoreValue: 1 }
    ]
  },
  {
    questionText: "What is your mind mostly focused on?",
    order: 3,
    options: [
      { text: "The present moment", moodImpact: "Calm", scoreValue: 2 },
      { text: "Worries about the future", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Memories of the past", moodImpact: "Reflective", scoreValue: 2 },
      { text: "I feel a bit foggy", moodImpact: "Sad", scoreValue: 1 }
    ]
  },
  {
    questionText: "If you could be anywhere right now, where would it be?",
    order: 4,
    options: [
      { text: "At a lively social gathering", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Alone in a quiet forest", moodImpact: "Calm", scoreValue: 2 },
      { text: "In a cozy room with a book", moodImpact: "Reflective", scoreValue: 2 },
      { text: "Under a warm blanket", moodImpact: "Sad", scoreValue: 1 }
    ]
  },
  {
    questionText: "How do you feel about the rest of your day?",
    order: 5,
    options: [
      { text: "Excited and ready", moodImpact: "Energetic", scoreValue: 2 },
      { text: "Peaceful and accepting", moodImpact: "Calm", scoreValue: 2 },
      { text: "A bit overwhelmed", moodImpact: "Anxious", scoreValue: 2 },
      { text: "Indifferent or unmotivated", moodImpact: "Sad", scoreValue: 2 }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding...');

    await QuizQuestion.deleteMany();
    console.log('Cleared existing quiz questions.');

    await QuizQuestion.insertMany(questions);
    console.log('Successfully seeded 5 quiz questions!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();

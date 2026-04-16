const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Music = require('../models/Music');
const MoodConfig = require('../models/MoodConfig');
const User = require('../models/User');

dotenv.config({ path: '../.env' });

const moodConfigs = [
  {
    id: 'calm',
    label: 'Calm',
    emoji: '😌',
    gradient: 'linear-gradient(135deg, #B4D4B4 0%, #D8E9D8 100%)',
    solidColor: '#B4D4B4',
    description: 'Peaceful and centered'
  },
  {
    id: 'happy',
    label: 'Happy',
    emoji: '😊',
    gradient: 'linear-gradient(135deg, #FFD4A3 0%, #FFF4E0 100%)',
    solidColor: '#FFD4A3',
    description: 'Joyful and energized'
  },
  {
    id: 'anxious',
    label: 'Anxious',
    emoji: '😰',
    gradient: 'linear-gradient(135deg, #A3D5FF 0%, #D4EBFF 100%)',
    solidColor: '#A3D5FF',
    description: 'Seeking relief'
  },
  {
    id: 'sad',
    label: 'Sad',
    emoji: '😔',
    gradient: 'linear-gradient(135deg, #C8B6E2 0%, #E6DFF0 100%)',
    solidColor: '#C8B6E2',
    description: 'Needing comfort'
  },
  {
    id: 'tired',
    label: 'Tired',
    emoji: '😴',
    gradient: 'linear-gradient(135deg, #B8B8B8 0%, #E0E0E0 100%)',
    solidColor: '#B8B8B8',
    description: 'Seeking rest'
  }
];

const musicTracks = [
  { 
    title: 'Ocean Wonders', 
    description: 'Gentle waves for deep calm and meditation', 
    duration: '6:12', 
    category: 'Nature Sounds', 
    moods: ['calm', 'anxious', 'tired'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' 
  },
  { 
    title: 'Morning Mist', 
    description: 'Refreshing sounds of the early morning forest', 
    duration: '7:05', 
    category: 'Nature Sounds', 
    moods: ['calm', 'happy'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3' 
  },
  { 
    title: 'Soft Rain', 
    description: 'Gentle rainfall for focus and relaxation', 
    duration: '5:48', 
    category: 'Ambient Sounds', 
    moods: ['calm', 'sad', 'tired'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' 
  },
  { 
    title: 'Golden Sunset', 
    description: 'Warm acoustic melodies for a happy heart', 
    duration: '7:22', 
    category: 'Acoustic Music', 
    moods: ['happy', 'calm'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3' 
  },
  { 
    title: 'Deep Relaxation', 
    description: 'Low-frequency tones and soothing pads', 
    duration: '6:45', 
    category: 'Binaural Beats', 
    moods: ['anxious', 'tired'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' 
  },
  { 
    title: 'Healing Waters', 
    description: 'Flowing water and soft synth textures', 
    duration: '6:30', 
    category: 'Meditation Music', 
    moods: ['calm', 'sad', 'anxious'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3' 
  },
  { 
    title: 'Mountain Echo', 
    description: 'Grand and uplifting symphonic atmospheres', 
    duration: '8:10', 
    category: 'Nature Sounds', 
    moods: ['happy'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3' 
  },
  { 
    title: 'Cloud Walking', 
    description: 'Light, airy piano for comfort and peace', 
    duration: '7:15', 
    category: 'Ambient Sounds', 
    moods: ['sad', 'tired'], 
    fileUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3' 
  }
];

const seedDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/peace');
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    await Music.deleteMany();
    await MoodConfig.deleteMany();

    await Music.insertMany(musicTracks);
    await MoodConfig.insertMany(moodConfigs);

    // Create an admin user if it doesn't exist
    const adminExists = await User.findOne({ email: 'admin@peace.app' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@peace.app',
        password: 'adminpassword123', // In a real app, this should be handled securely
        role: 'admin'
      });
      console.log('Admin user created');
    }

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (process.env.USE_MOCK_DB === 'true') {
      console.log('Starting mock MongoDB...');
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      const conn = await mongoose.connect(uri);
      console.log(`Mock MongoDB Connected: ${conn.connection.host}`);
      
      // Auto-seed mock database so it's ready to use
      try {
        console.log('Seeding mock database...');
        // Execute the seed script programmatically
        const { exec } = require('child_process');
        const path = require('path');
        const seedPath = path.join(__dirname, '../scripts/seedQuiz.js');
        exec(`node "${seedPath}"`, { env: { ...process.env, MONGODB_URI: uri } }, (err, stdout, stderr) => {
          if (err) console.error('Seed error:', err);
          else console.log('Seed output:', stdout);
        });
      } catch (e) {
        console.log('Seed warning:', e.message);
      }
    } else {
      const conn = await mongoose.connect(process.env.MONGODB_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security Middleware
app.use(helmet());
app.use(cors());

// Logging Middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const moodRoutes = require('./routes/moodRoutes');
const authRoutes = require('./routes/authRoutes');
const journalRoutes = require('./routes/journalRoutes');
const musicRoutes = require('./routes/musicRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const moodConfigRoutes = require('./routes/moodConfigRoutes');

// Basic Route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Peace API' });
});

// Resource Routes
app.use('/api/auth', authRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/mood-configs', moodConfigRoutes);


// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

const express = require('express');
const router = express.Router();
const { getMoodAnalytics } = require('../controllers/analyticsController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', protect, getMoodAnalytics);

module.exports = router;

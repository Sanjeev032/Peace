const express = require('express');
const router = express.Router();
const {
  getMoodConfigs,
  updateMoodConfig,
} = require('../controllers/moodConfigController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.get('/', getMoodConfigs);
router.put('/:id', protect, admin, updateMoodConfig);

module.exports = router;

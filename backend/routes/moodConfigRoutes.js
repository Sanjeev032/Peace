const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const {
  getMoodConfigs,
  createMoodConfig,
  updateMoodConfig,
  deleteMoodConfig,
} = require('../controllers/moodConfigController');

router.route('/')
  .get(getMoodConfigs)
  .post(protect, admin, createMoodConfig);

router.route('/:id')
  .put(protect, admin, updateMoodConfig)
  .delete(protect, admin, deleteMoodConfig);

module.exports = router;

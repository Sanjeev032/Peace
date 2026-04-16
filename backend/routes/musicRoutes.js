const express = require('express');
const router = express.Router();
const {
  getMusicByMood,
  getAllMusic,
  createMusicTrack,
  updateMusicTrack,
  deleteMusicTrack,
} = require('../controllers/musicController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.route('/').get(protect, admin, getAllMusic).post(protect, admin, createMusicTrack);
router.route('/:mood').get(getMusicByMood);

router
  .route('/:id')
  .put(protect, admin, updateMusicTrack)
  .delete(protect, admin, deleteMusicTrack);

module.exports = router;


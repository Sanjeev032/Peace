const express = require('express');
const router = express.Router();
const { getMoods, createMood } = require('../controllers/moodController');
const { protect } = require('../middleware/authMiddleware');

const validate = require('../middleware/validate');
const { moodSchema } = require('../validations/schemas');

// All mood routes are protected
router.use(protect);

router.route('/').get(getMoods).post(validate(moodSchema), createMood);

module.exports = router;

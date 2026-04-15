const express = require('express');
const router = express.Router();
const { getMusicByMood } = require('../controllers/musicController');

router.get('/:mood', getMusicByMood);

module.exports = router;

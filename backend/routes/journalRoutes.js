const express = require('express');
const router = express.Router();
const {
  getJournals,
  createJournal,
  updateJournal,
  deleteJournal,
} = require('../controllers/journalController');
const { protect } = require('../middleware/authMiddleware');

const validate = require('../middleware/validate');
const { journalSchema } = require('../validations/schemas');

// All journal routes are protected
router.use(protect);

router
  .route('/')
  .get(getJournals)
  .post(validate(journalSchema), createJournal);
router
  .route('/:id')
  .put(validate(journalSchema), updateJournal)
  .delete(deleteJournal);

module.exports = router;

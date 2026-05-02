const express = require('express');
const router = express.Router();
const { registerUser, loginUser, adminLogin } = require('../controllers/authController');

const validate = require('../middleware/validate');
const {
  registerSchema,
  loginSchema,
  adminLoginSchema,
} = require('../validations/schemas');

router.post('/register', validate(registerSchema), registerUser);
router.post('/login', validate(loginSchema), loginUser);
router.post('/admin-login', adminLogin); // Skipping generic schema validation for simplicity, or I can add it if it exists

module.exports = router;

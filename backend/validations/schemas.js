const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters long',
    'string.empty': 'Password is required',
  }),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().required().messages({
    'string.empty': 'Password is required',
  }),
});

const journalSchema = Joi.object({
  content: Joi.string().min(10).required().messages({
    'string.min': 'Journal content should be at least 10 characters long',
    'string.empty': 'Journal content is required',
  }),
  mood: Joi.string().required().messages({
    'string.empty': 'Mood is required',
  }),
});

const moodSchema = Joi.object({
  mood: Joi.string().valid('happy', 'sad', 'anxious', 'calm').required().messages({
    'any.only': 'Mood must be one of: happy, sad, anxious, calm',
    'string.empty': 'Mood is required',
  }),
});

module.exports = {
  registerSchema,
  loginSchema,
  journalSchema,
  moodSchema,
};

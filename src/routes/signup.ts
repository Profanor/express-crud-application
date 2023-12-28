import express from 'express';
import { body } from 'express-validator';
import authController from '../controllers/authController';

const router = express.Router();

// Validation middleware
const validateSignup = [
  body('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  body('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

//GET route for rendering the signup form
router.get('/signup', (req, res) => {
  res.render('signup', { title: 'Sign Up' });
});

// POST route for handling the form submission
router.post('/signup', validateSignup, authController.signup) 
export default router;
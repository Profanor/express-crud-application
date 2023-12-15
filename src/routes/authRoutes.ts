import { Router } from 'express';
import authController from '../controllers/authController';

const router = Router();

// Login route
router.get('/login', authController.login);
router.post('/login', authController.login);

// Signup route
router.get('/signup', authController.signup);
router.post('/signup', authController.signup);

export default router;
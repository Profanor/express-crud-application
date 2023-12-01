import express from 'express';
import userController from '../controllers/userController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

// Public routes (accessible without authentication)
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);

// Protected routes (require authentication)
router.use(authenticateUser); // Apply authentication middleware to all routes below

//define protected routes
router.post('/',  userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;

import express from 'express';
import authMiddleware from '../middleware/authMiddleware';
import authController from '../controllers/authController';

const router = express.Router();

router.get('/login', (req, res) => {
res.render('login', { title: 'Login' });
});

router.post('/login', authMiddleware.authenticateJWT, authController.login) 
  
export default router;
import express, { Response, Request } from 'express';
import User from '../models/User'
import authMiddleware from '../middleware/authMiddleware';
import productController from '../controllers/productController';


const router = express.Router();

router.use(authMiddleware.authenticateJWT);

const getUser = async (email: string): Promise<User | null> => {
        try {
            const user = await User.findOne({ where: { email } });
            return user;
        } catch(error) {
            console.error('error retrieving user from the database:', error);
            throw error;
        }
};
router.get('/profile', authMiddleware.authenticateJWT, async (req: Request, res: Response) => {

        try {
            const { email } = req.query;

            if (!email || typeof email !== 'string') {
                return res.status(400).json('Email parameter required');
            }
            const user = await getUser(email);

            if (!user) {
                return res.status(404).json('User not found');
            }

        // Retrieve the user's products
        const userWithProducts = await User.findByPk(user.id, { include: 'products' });

            res.render('profile', { title: 'My Profile', user: userWithProducts });
        } catch (error) {
            console.error(error);
            res.status(500).json('internal server error');
        }
});

// route for handling the product addition logic
router.post('/add-product', authMiddleware.authenticateJWT, productController.addProduct)

export default router
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
    console.log('Query Parameters:', req.query);
        try {
            const { email } = req.query;
            console.log('Email:', email);

            if (!email || typeof email !== 'string') {
                return res.status(400).json('Email parameter required');
            }
            const user = await getUser(email);
            console.log('User', user);

            if (!user) {
                return res.status(404).json('User not found');
            }

            res.render('profile', { title: 'My Profile', user });
        } catch (error) {
            console.error(error);
            res.status(500).json('internal server error');
        }
});

// route for handling the product addition logic
router.post('/add-product', authMiddleware.authenticateJWT, async (req: Request, res: Response)=>{
    try {
        const {productName, productDescription, productImage, productBrand, productCategory, productPrice, productCountInStock } = req.body;
        
        console.log('Received product data:', req.body);

        // Remove commas from numeric values
        const price = Number(productPrice.replace(/,/g, ''));
        const countInStock = Number(productCountInStock.replace(/,/g, ''));

        console.log('Parsed product data:', { productName, productDescription, productImage, productBrand, productCategory, price, countInStock });

        // Check if parsing was successful
        if (isNaN(price) || isNaN(countInStock)) {
            console.error('Invalid numeric values:', { productName, productDescription, productImage, productBrand, productCategory, productPrice, productCountInStock });
            return res.status(400).json({ error: 'Invalid numeric values for price or countInStock' });
        }

        await productController.addProduct( { productName, productDescription, productImage, productBrand, productCategory, price, countInStock } , req, res);
    } catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
export default router;
import express, { Response, Request } from 'express';
import Product from '../models/Product';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authenticateUser);

//display all products created by the logged-in user
router.get('/admin/products', async (req: Request, res: Response) => {
    try {
        const userId = req.session.user.id; // Assuming user ID is stored in the session
        if (!userId) {
            // Redirect to login or handle the case where user is not authenticated
            return res.redirect('/login');
        }
        const userProducts = await Product.findAll({ where: { userId: userId } });
        res.render('admin/products', { title: 'Your Products', products: userProducts });
    }   catch (error) {
        console.error('Error fetching user products:', error);
        res.render('error', { error: 'Internal server error' });
    }    
});
import express, { Response, Request } from 'express';
import Product from '../models/Product';

const router = express.Router();

// Display all products created by the logged-in user
router.get('/adminRoutes', async (req: Request, res: Response) => {
    try {
        const userId = req.session.user.id;
        if (!userId) {
            // Redirect to login or handle the case where the user is not authenticated
            return res.redirect('/login');
        }

        // Assuming you have a proper association between User and Product models
        const userProducts = await Product.findAll({ where: { userId } });

        res.render('admin', { title: 'Admin Dashboard', products: userProducts });
    } catch (error) {
        console.error('Error fetching user products:', error);
        res.render('error', { error: 'Internal server error' });
    }
});

export default router;

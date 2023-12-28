import express, { Response, Request } from 'express';
import User from '../models/User'; // Assuming you have a User model

const router = express.Router();

// Display all users registered on the eCommerce application
router.get('/adminRoutes', async (req: Request, res: Response) => {
    try {
        const users = await User.findAll(); // Retrieve all users

        res.render('admin', { title: 'Admin Dashboard', users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.render('error', { error: 'Internal server error' });
    }
});

export default router;

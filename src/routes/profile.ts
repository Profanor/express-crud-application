import express, { Response, Request } from 'express';
import { authenticateUser } from '../middleware/authMiddleware';

const router = express.Router();
router.use(authenticateUser);

interface AuthenticatedUser {
    id: number;
    fullname: string;
}

router.get('/profile', authenticateUser, (req: Request, res: Response) => {
    // User profile information
    const user = req.session.user as AuthenticatedUser;
    res.render('profile', { title: 'Your Profile', user });
});

export default router;
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import  authenticateUser from '../middleware/authMiddleware';
const router = express_1.default.Router();
// router.use(authenticateUser);
router.get('/profile', (req, res) => {
    const user = req.user;
    res.render('profile', { title: 'My Profile' });
});
// router.get('/profile', (req: Request, res: Response) => {
// try {
//check if user is authenticated
// if (!req.isAuthenticated()) {
//     throw new Error('user not authenticated');
// }
// User profile information
// const user = req.session.user as AuthenticatedUser;
// res.render('profile', { title: 'Your Profile', user });
// if (!user) {
//     throw new Error('user information not found in session');
// }  else {
//     console.log('user authenticated:', true);
//     console.log('User:', user);
//     res.render('profile', { title: 'Your Profile', user });
// } 
// } catch (error: any) {
//     console.error('Error accessing profile:', error.message);
//     res.redirect('/login');
// }   
// });
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
// import  authenticateUser from '../middleware/authMiddleware';
const router = express_1.default.Router();
// router.use(authenticateUser);
//display all products created by the logged-in user
router.get('/admin/products', async (req, res) => {
    try {
        const userId = req.session.user.id; // Assuming user ID is stored in the session
        if (!userId) {
            // Redirect to login or handle the case where user is not authenticated
            return res.redirect('/login');
        }
        const userProducts = await Product_1.default.findAll({ where: { userId: userId } });
        res.render('admin/products', { title: 'Your Products', products: userProducts });
    }
    catch (error) {
        console.error('Error fetching user products:', error);
        res.render('error', { error: 'Internal server error' });
    }
});

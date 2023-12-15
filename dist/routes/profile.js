"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const productController_1 = __importDefault(require("../controllers/productController"));
const router = express_1.default.Router();
router.use(authMiddleware_1.default.authenticateJWT);
const getUser = async (email) => {
    try {
        const user = await User_1.default.findOne({ where: { email } });
        return user;
    }
    catch (error) {
        console.error('error retrieving user from the database:', error);
        throw error;
    }
};
router.get('/profile', authMiddleware_1.default.authenticateJWT, async (req, res) => {
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
// route for handling the product addition logic
router.post('/add-product', authMiddleware_1.default.authenticateJWT, async (req, res) => {
    try {
        const { productName, productDescription, productImage, productBrand, productCategory, productPrice, productCountInStock } = req.body;
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
        await productController_1.default.addProduct({ productName, productDescription, productImage, productBrand, productCategory, price, countInStock }, req, res);
    }
    catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
exports.default = router;

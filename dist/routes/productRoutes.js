"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/productRoutes.js
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Get all products
router.get('/products', async (req, res) => {
    try {
        const allProducts = await Product_1.default.findAll();
        res.render('products', { title: 'All Products', products: allProducts });
    }
    catch (error) {
        console.error('Error fetching products:', error);
        res.render('error', { error: 'Internal server error' });
    }
});
router.post('/products', authMiddleware_1.authenticateUser, async (req, res) => {
    //assuming i have a logged-in user with userId stored in the session
    const userIdFromSession = req.session.user?.id;
    if (!userIdFromSession) {
        return res.status(401).json({ error: 'User not authenticated.' });
    }
    try {
        const { id, userId, name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const newProduct = await Product_1.default.create({
            userId: userIdFromSession,
            name: req.body.name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews,
            id,
        });
        return res.json({ success: true, product: newProduct });
    }
    catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});
router.put('/products/:id', authMiddleware_1.authenticateUser, async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product_1.default.update({
        // Update fields as needed
        }, {
            where: {
                id: productId,
            },
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.delete('/products/:id', authMiddleware_1.authenticateUser, async (req, res) => {
    try {
        const productId = req.params.id;
        await Product_1.default.destroy({
            where: {
                id: productId,
            },
        });
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = router;

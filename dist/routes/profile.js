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
        const userWithProducts = await User_1.default.findByPk(user.id, { include: 'products' });
        res.render('profile', { title: 'My Profile', user: userWithProducts });
    }
    catch (error) {
        console.error(error);
        res.status(500).json('internal server error');
    }
});
// route for handling the product addition logic
router.post('/add-product', authMiddleware_1.default.authenticateJWT, productController_1.default.addProduct);
exports.default = router;

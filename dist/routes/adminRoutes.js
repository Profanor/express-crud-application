"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Product_1 = __importDefault(require("../models/Product"));
const router = express_1.default.Router();
// Display all products created by the logged-in user
router.get('/adminRoutes', async (req, res) => {
    try {
        const userId = req.session.user.id;
        if (!userId) {
            // Redirect to login or handle the case where the user is not authenticated
            return res.redirect('/login');
        }
        // Assuming you have a proper association between User and Product models
        const userProducts = await Product_1.default.findAll({ where: { userId } });
        res.render('admin', { title: 'Admin Dashboard', products: userProducts });
    }
    catch (error) {
        console.error('Error fetching user products:', error);
        res.render('error', { error: 'Internal server error' });
    }
});
exports.default = router;

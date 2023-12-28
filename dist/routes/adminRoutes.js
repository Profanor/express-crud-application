"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User")); // Assuming you have a User model
const router = express_1.default.Router();
// Display all users registered on the eCommerce application
router.get('/adminRoutes', async (req, res) => {
    try {
        const users = await User_1.default.findAll(); // Retrieve all users
        res.render('admin', { title: 'Admin Dashboard', users });
    }
    catch (error) {
        console.error('Error fetching users:', error);
        res.render('error', { error: 'Internal server error' });
    }
});
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', authMiddleware_1.default.authenticateJWT, async (req, res) => {
    try {
        //extract form data from the req body
        const { email, password } = req.body;
        console.log('request body:', req.body); //debugging
        console.log({ email, password });
        //perform login logic
        const user = await User_1.default.findOne({ where: { email: email } });
        console.log({ user });
        if (user && bcrypt_1.default.compareSync(password, user.password)) {
            // Exclude the password field in the returned user
            const { password: _, ...userWithoutPassword } = user.toJSON();
            console.log({ userWithoutPassword });
            //generate jwt token 
            const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret');
            res.cookie('jwt', token, { httpOnly: true });
            //redirect to user profile
            res.redirect(`/profile?email=${user.email}`);
            console.log('logged in success');
        }
        else {
            res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        // Redirect back to the login page with an error message
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});
exports.default = router;

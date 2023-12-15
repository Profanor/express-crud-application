"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
//GET route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
// POST route for handling the form submission
router.post('/signup', async (req, res) => {
    try {
        //extract form data from the request body
        const { id, fullname, email, password, gender, phone, address } = req.body;
        // Check if the user already exists
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.render('signup', { title: 'Sign Up', error: 'User already exists' });
        }
        //hash the password before storing
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        const newUser = await User_1.default.create({
            id,
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
        });
        // Generate JWT token for the new user
        const token = jsonwebtoken_1.default.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET || 'default_secret');
        // Set the JWT token as a cookie
        res.cookie('jwt', token, { httpOnly: true });
        //redirect to the home page after successful signup
        res.redirect('/login');
    }
    catch (error) {
        console.error('error during signup:', error);
        //redirect back to the signup page with an error message
        res.render('signup', { title: 'Sign up', error: 'An error occured during signup' });
    }
});
exports.default = router;

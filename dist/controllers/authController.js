"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const password_1 = require("../utils/password");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const maxAge = 1 * 24 * 60 * 60; //define maxAge globally
// function to create a JWT token
const createToken = (userId, fullname) => {
    try {
        return jsonwebtoken_1.default.sign({ userId, fullname }, process.env.JWT_SECRET || 'default_secret', {
            expiresIn: maxAge
        });
    }
    catch (error) {
        console.error('Error creating JWT token:', error);
        throw error;
    }
};
const signup = async (req, res) => {
    try {
        const { id, fullname, password, gender, phone, email, address } = req.body;
        // Check if the email already exists
        const existingUser = await User_1.default.findOne({ where: { fullname } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Hash the password
        const hashedPassword = await (0, password_1.hashPassword)(password);
        // Create a new user
        const createdUser = await User_1.default.create({
            id,
            fullname,
            password: hashedPassword,
            gender,
            phone,
            email,
            address
        });
        // Generate JWT token for the new user
        const token = jsonwebtoken_1.default.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_SECRET || 'default_secret');
        // Set the JWT token as a cookie
        res.cookie('jwt', token, { httpOnly: true });
        //redirect to the home page after successful signup
        res.redirect('/login');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during signup' });
    }
};
//this is where i had redirect issues especially in session storage
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = await User_1.default.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Check if the password is correct
        const passwordMatch = await (0, password_1.comparePassword)(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //reuse the createToken function in the login
        const token = createToken(user.id, user.email);
        res.cookie('jwt', token, { httpOnly: true });
        // Set user information in the session
        req.session.user = {
            id: user.id,
            email: user.email,
        };
        res.redirect(`/profile?email=${user.email}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};
exports.default = { signup, login };

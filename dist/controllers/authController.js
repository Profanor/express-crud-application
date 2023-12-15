"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const maxAge = 1 * 24 * 60 * 60; //define maxAge globally
// function to create a JWT token
const createToken = (userId, fullname) => {
    return jsonwebtoken_1.default.sign({ userId, fullname }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: maxAge
    });
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
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
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
        // Generate a JWT token using the createToken function
        // const token = createToken(createdUser.id, createdUser.email)
        // Send the token in a cookie for subsequent requests
        // res.cookie('jwt', token);
        res.status(201).json({ success: 'User registered successfully', user: createdUser });
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
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        //reuse the createToken function in the login
        const token = createToken(user.id, user.email);
        // Set user information in the session
        req.session.user = {
            id: user.id,
            email: user.email,
        };
        // send the token and user information in the response
        // res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ success: true, user: req.session.user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};
exports.default = { signup, login };

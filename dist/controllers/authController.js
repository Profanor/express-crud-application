"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = async (req, res) => {
    try {
        const { id, fullname, password, gender, phone, email, address } = req.body;
        //check if the username already exists
        const existingUser = await User_1.default.findOne({ where: { fullname } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        //hash the password
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        //create a new user
        const createdUser = await User_1.default.create({
            id,
            fullname,
            password: hashedPassword,
            gender,
            phone,
            email,
            address
        });
        res.status(201).json({ success: true, user: createdUser });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during signup' });
    }
};
const login = async (req, res) => {
    try {
        const { fullname, password } = req.body;
        //find the user by username
        const user = await User_1.default.findOne({ where: { fullname } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        let tempUser = user.toJSON();
        //check if password is correct
        const passwordMatch = await bcrypt_1.default.compare(password, tempUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate a JWT token (adjust the secret and expiration as needed)
        const token = jsonwebtoken_1.default.sign({ userId: tempUser.id }, 'qrt87563.fjf/[a-z]/', { expiresIn: '1h' });
        //set user information in the session
        req.session.user = {
            id: tempUser.id,
            fullname: tempUser.fullname,
        };
        res.json({ success: true, user: req.session.user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};
exports.default = { signup, login };

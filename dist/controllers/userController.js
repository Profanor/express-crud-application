"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = async (req, res) => {
    try {
        //assuming user ID is available in req.params.id
        const users = await User_1.default.findAll();
        res.json({ success: true, users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        //find user by ID in the database
        const user = await User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const createUser = async (req, res) => {
    try {
        const { id, fullname, email, password, gender, phone, address } = req.body;
        // Validate that required fields are present
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Fullname, email, and password are required' });
        }
        // Check if the email is already in use
        const existingUser = await User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        // Create a new user
        const newUser = await User_1.default.create({
            id,
            fullname,
            email,
            password,
            gender,
            phone,
            address,
        });
        res.status(201).json({ success: true, message: 'User created successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const { id, fullname, email, password, gender, phone, address } = req.body;
        // Validate that required fields are present
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Fullname, email, and password are required' });
        }
        // Find the user by ID
        const user = await User_1.default.findByPk(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Update the user
        await user.update({
            id,
            fullname,
            email,
            password,
            gender,
            phone,
            address,
        });
        res.json({ success: true, message: 'User updated successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Find the user by ID
        const user = await User_1.default.findByPk(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Delete the user
        await user.destroy();
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

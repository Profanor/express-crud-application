"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //assuming user ID is available in req.params.id
        const users = yield User_1.default.findAll();
        res.json({ success: true, users });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        //find user by ID in the database
        const user = yield User_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ success: true, user });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, email, password, gender, phone, address } = req.body;
        // Validate that required fields are present
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Fullname, email, and password are required' });
        }
        // Check if the email is already in use
        const existingUser = yield User_1.default.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email is already in use' });
        }
        // Create a new user
        const newUser = yield User_1.default.create({
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
});
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const { fullname, email, password, gender, phone, address } = req.body;
        // Validate that required fields are present
        if (!fullname || !email || !password) {
            return res.status(400).json({ error: 'Fullname, email, and password are required' });
        }
        // Find the user by ID
        const user = yield User_1.default.findByPk(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Update the user
        yield user.update({
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
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        // Find the user by ID
        const user = yield User_1.default.findByPk(userId);
        // Check if the user exists
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Delete the user
        yield user.destroy();
        res.json({ success: true, message: 'User deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};

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
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, fullname, password, gender, phone, email, address } = req.body;
        //check if the username already exists
        const existingUser = yield User_1.default.findOne({ where: { fullname } });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        //hash the password
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        //create a new user
        const createdUser = yield User_1.default.create({
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
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullname, password } = req.body;
        //find the user by username
        const user = yield User_1.default.findOne({ where: { fullname } });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        let tempUser = user.toJSON();
        //check if password is correct
        const passwordMatch = yield bcrypt_1.default.compare(password, tempUser.password);
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
});
exports.default = { signup, login };

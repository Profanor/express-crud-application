"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/authRoutes.js
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
// Function to simulate user authentication
const authenticate = async (fullname, password) => {
    const user = await User_1.default.findOne({ where: { fullname: fullname } });
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        // Exclude the password field in the returned user
        const { password: _, ...userWithoutPassword } = user.toJSON();
        return userWithoutPassword;
    }
    return null;
};
//login route
router.post('/login', async (req, res) => {
    const { fullname, password } = req.body;
    // Validate username and password (implement your own validation logic)
    if (!fullname || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    // Authenticate user
    const authenticatedUser = await authenticate(fullname, password);
    if (!authenticatedUser) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // User authentication successful, store user data in session
    req.session.user = authenticatedUser;
    res.json({ success: true, user: authenticatedUser });
});
exports.default = router;

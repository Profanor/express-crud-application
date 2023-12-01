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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//routes/authRoutes.js
const authMiddleware_1 = require("../middleware/authMiddleware");
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Function to simulate user authentication
const authenticate = (fullname, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_1.default.findOne({ where: { fullname: fullname } });
    if (user && bcrypt_1.default.compareSync(password, user.password)) {
        // Exclude the password field in the returned user
        const _a = user.toJSON(), { password: _ } = _a, userWithoutPassword = __rest(_a, ["password"]);
        return userWithoutPassword;
    }
    return null;
});
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullname, password } = req.body;
    // Validate username and password (implement your own validation logic)
    if (!fullname || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }
    // Authenticate user
    const authenticatedUser = yield authenticate(fullname, password);
    if (!authenticatedUser) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }
    // User authentication successful, store user data in session
    req.session.user = authenticatedUser;
    res.json({ success: true, user: authenticatedUser });
}));
router.get('/profile', authMiddleware_1.authenticateUser, (req, res) => {
    // User profile information
    const user = req.session.user;
    res.json({ user });
});
exports.default = router;

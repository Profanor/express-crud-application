"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
// Validation middleware
const validateSignup = [
    (0, express_validator_1.body)('username').trim().isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
    (0, express_validator_1.body)('email').isEmail().normalizeEmail().withMessage('Invalid email address'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];
//GET route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
// POST route for handling the form submission
router.post('/signup', validateSignup, authController_1.default.signup);
exports.default = router;

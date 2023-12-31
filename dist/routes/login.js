"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const authController_1 = __importDefault(require("../controllers/authController"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', authMiddleware_1.default.authenticateJWT, authController_1.default.login);
exports.default = router;

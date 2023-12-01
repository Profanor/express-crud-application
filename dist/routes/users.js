"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
// Public routes (accessible without authentication)
router.get('/', userController_1.default.getAllUsers);
router.get('/:id', userController_1.default.getUserById);
// Protected routes (require authentication)
router.use(authMiddleware_1.authenticateUser); // Apply authentication middleware to all routes below
//define protected routes
router.post('/', userController_1.default.createUser);
router.put('/:id', userController_1.default.updateUser);
router.delete('/:id', userController_1.default.deleteUser);
exports.default = router;

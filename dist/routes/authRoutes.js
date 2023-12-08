"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = __importDefault(require("../controllers/authController"));
const router = (0, express_1.Router)();
// Login route
router.get('/login', authController_1.default.login);
router.post('/login', authController_1.default.login);
// Signup route
router.get('/login', authController_1.default.login);
router.post('/signup', authController_1.default.signup);
exports.default = router;

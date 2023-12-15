"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware to authenticate requests using JWT
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('JWT Token:', token);
    if (!token) {
        console.log('No token found.');
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || 'default_secret', (err, decoded) => {
        if (err || !decoded) {
            console.log('Invalid token:', err);
            res.clearCookie('jwt');
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('Valid token. Decoded:', decoded);
        req.user = decoded;
        next();
    });
};
// Middleware for authorization checks using session data
const authorize = (req, res, next) => {
    const user = req.session.user;
    if (!user) {
        return res.status(403).json({ error: 'Forbidden' });
    }
    // Perform authorization checks based on the user's information in the session
    if (user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden. Admins only.' });
    }
    const userIdFromSession = req.session.user.id;
    const productIdFromParams = req.params.productId; // Assuming you have productId in the route params
    if (userIdFromSession !== productIdFromParams) {
        return res.status(403).json({ error: 'Forbidden. You do not own this resource.' });
    }
    next();
};
exports.authorize = authorize;
exports.default = { authenticateJWT, authorize: exports.authorize };

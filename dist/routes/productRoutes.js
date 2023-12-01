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
//routes/productRoutes.js
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const Product_1 = require("../models/Product");
const router = express_1.default.Router();
// Get all products
router.get('/products', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allProducts = yield Product_1.Product.findAll();
        res.json(allProducts);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.post('/products', authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        const newProduct = yield Product_1.Product.create({
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews,
            id,
        });
        res.json(newProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
router.put('/products/:id', authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const updatedProduct = yield Product_1.Product.update({
        // Update fields as needed
        }, {
            where: {
                id: productId,
            },
        });
        res.json(updatedProduct);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// For demonstration purposes, let's assume successful update
const updatedProduct = { name: 'Updated Product', /* updated fields */ };
res: Response.json(updatedProduct);
router.delete('/products/:id', authMiddleware_1.authenticateUser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        yield Product_1.Product.destroy({
            where: {
                id: productId,
            },
        });
        res.json({ message: 'Product deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
// For demonstration purposes, let's assume successful deletion
res: Response.json({ message: 'Product deleted' });
exports.default = router;

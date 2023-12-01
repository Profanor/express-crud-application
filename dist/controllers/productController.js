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
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield Product_1.default.findAll();
        res.json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
        console.log(req.body);
        // Validate that required fields are present
        if (!name || !price || !countInStock) {
            return res.status(400).json({ error: 'Name, price, and countInStock are required' });
        }
        const newProduct = yield Product_1.default.create({
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
        res.status(201).json({ success: true, product: newProduct });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const { name, price, description } = req.body;
        const [rowsUpdated] = yield Product_1.default.update({ name, price, description }, { where: { id: productId } });
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Find the updated product
        const foundUpdatedProduct = yield Product_1.default.findByPk(productId);
        res.json({ success: true, product: foundUpdatedProduct });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.id;
        const rowsDeleted = yield Product_1.default.destroy({ where: { id: productId } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.default = {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
};

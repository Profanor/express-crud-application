"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.default.findAll();
        res.json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
const getProductsById = async (req, res) => {
    try {
        const productId = req.params.id;
        //find product by ID in the database
        const product = await Product_1.default.findByPk(productId);
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        res.json({ success: true, product });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
const addProduct = async (req, res, productData) => {
    try {
        const { id, name, image, brand, category, description, price, countInStock } = req.body;
        if (req.user && 'userId' in req.user) {
            const userId = req.user.userId;
            const newProduct = await Product_1.default.create({
                id,
                userId,
                name,
                image,
                brand,
                category,
                description,
                price,
                countInStock,
            });
            //Fetch the updated user data from the database
            const updatedUser = await User_1.default.findByPk(userId, {
                include: [{ model: Product_1.default, as: 'products' }],
            });
            if (!updatedUser) {
                throw new Error('Failed to retrieve updated user data');
            }
            // Update the session with the updated user data
            req.user = updatedUser;
            if (newProduct) {
                console.log(newProduct);
                res.status(201).send({ success: true, product: newProduct });
            }
            else {
                res.status(401).json({ error: 'Failed to create the product' });
            }
        }
        else {
            // Handle the case where req.user is undefined or doesn't have userId
            res.status(401).json({ error: 'User not authenticated or missing userId' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const { name, price, description } = req.body;
        const [rowsUpdated] = await Product_1.default.update({ name, price, description }, { where: { id: productId } });
        if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        // Find the updated product
        const foundUpdatedProduct = await Product_1.default.findByPk(productId);
        res.json({ success: true, product: foundUpdatedProduct });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const rowsDeleted = await Product_1.default.destroy({ where: { id: productId } });
        if (rowsDeleted === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.default = {
    getAllProducts,
    getProductsById,
    addProduct,
    updateProduct,
    deleteProduct
};

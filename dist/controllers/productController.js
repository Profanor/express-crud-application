"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
const getAllProducts = async (req, res) => {
    try {
        const products = await Product_1.default.findAll();
        res.json({ success: true, products });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
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
        res.status(500).json({ error: 'Internal server error' });
    }
};
const addProduct = async (productData, req, res) => {
    try {
        console.log('Received product data:', productData);
        //Validate that required fields are present
        if (!productData.productName || !productData.productPrice || !productData.productCountInStock) {
            return res.status(400).json({ error: 'Name, price, and countInStock are required' });
        }
        // Log the parsed values before creating the product
        const parsedProductData = {
            userId: productData.userId,
            name: productData.productName,
            image: productData.productImage,
            brand: productData.productBrand,
            category: productData.productCategory,
            description: productData.productDescription,
            price: parseFloat(productData.productPrice),
            countInStock: parseInt(productData.productCountInStock),
            rating: parseFloat(productData.productRating),
            numReviews: parseInt(productData.productNumReviews),
            id: productData.id,
        };
        console.log('Parsed product data:', parsedProductData);
        const newProduct = await Product_1.default.create(parsedProductData);
        res.status(201).json({ success: true, product: newProduct });
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

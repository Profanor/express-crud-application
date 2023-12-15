"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("./database/database"));
const Product_1 = __importDefault(require("./models/Product"));
const initializeDatabase = async (req) => {
    try {
        // Sync the models
        await database_1.default.sync({ alter: true });
        console.log('Connection to the database has been established successfully.');
        if (req.session && req.session.user) {
            console.log('User ID:', req.session.user.id);
            const userId = req.session.user.id;
            // Create a sample product if it doesn't exist
            const productCount = await Product_1.default.count();
            if (productCount === 0) {
                await Product_1.default.create({
                    id: 1,
                    userId,
                    name: 'smart-watch',
                    image: 'sample-image-url',
                    brand: 'hryfine',
                    category: 'Men accessories',
                    description: 'a small portable watch',
                    price: 19.99,
                    countInStock: 10,
                    rating: 4,
                    numReviews: 15,
                });
                console.log('Sample product inserted successfully.');
            }
        }
        else {
            console.log('Database already initialized with products.');
        }
    }
    catch (error) {
        console.error('Error during databse initialization:', error);
        console.error(error.stack);
    }
};
exports.default = initializeDatabase;

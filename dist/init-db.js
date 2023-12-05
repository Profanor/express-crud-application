"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// init-db.ts
const database_1 = __importDefault(require("./database/database"));
const Product_1 = __importDefault(require("./models/Product"));
const initializeDatabase = async (req) => {
    try {
        // Sync the models
        await database_1.default.sync({ alter: true });
        console.log('Connection to the database has been established successfully.');
        // Create a sample product if it doesn't exist
        const productCount = await Product_1.default.count();
        if (productCount === 0) {
            await Product_1.default.create({
                id: 1,
                userId: 1,
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
        else {
            console.log('Database already initialized with products.');
        }
    }
    catch (error) {
        console.error('Unable to connect to the database or initialize:', error);
        // Add additional error handling logic here (e.g., logging, sending alerts)
    }
};
exports.default = initializeDatabase;

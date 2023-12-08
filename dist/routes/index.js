"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = [
    { id: 1,
        name: 'Laptop',
        category: 'Electronics',
        price: 19.99,
        image: 'product1.jpeg'
    },
    { id: 2,
        name: 'Bike',
        category: 'Machine',
        price: 29.99,
        image: 'product2.jpeg'
    },
    // Add more products as needed
];
/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'IzzShopping', featuredProducts: products }));
exports.default = router;

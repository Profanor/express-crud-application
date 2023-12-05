"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const yourFeaturedProductsArray = [
    { id: 1, name: 'Featured Product 1', price: 19.99 },
    { id: 2, name: 'Featured Product 2', price: 29.99 },
    // Add more products as needed
];
/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'IzzShopping', featuredProducts: yourFeaturedProductsArray }));
exports.default = router;

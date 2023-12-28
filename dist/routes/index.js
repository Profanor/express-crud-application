"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const products = [
    {
        name: 'PlayStation5',
        category: 'Gaming Accessories',
        price: 439.99,
        imageUrl: 'https://www.techieyard.com/wp-content/uploads/2021/07/ishMfuW.jpg',
    },
    {
        name: 'Hisense Smart Tv',
        category: 'Electronics',
        price: 259.99,
        imageUrl: 'https://root-nation.com/wp-content/uploads/2020/09/hisense_u7qf-7-852x650.jpg',
    },
    {
        name: 'Homeflower Sound System',
        category: 'Electronics',
        price: 109.99,
        imageUrl: 'https://i.pinimg.com/originals/ee/07/0f/ee070fc28fd53841e2dd14fff55c3323.png',
    },
    {
        name: 'HiSense Air Conditioner',
        category: 'Electronics',
        price: 150.99,
        imageUrl: 'https://redwave.mv/wp-content/uploads/2020/11/I070355.jpg',
    },
    {
        name: 'Furniture',
        category: 'Household Furniture',
        price: 400.99,
        imageUrl: 'https://4.bp.blogspot.com/-Z6Z2qoFvpMw/UMIaBVxZgdI/AAAAAAAAbKI/E9-ms_s9CCE/s1600/Beautiful+modern+sofa+furniture+designs.+(2).jpg',
    },
];
/* GET home page. */
router.get('/', (req, res, next) => res.render('index', { title: 'IzzShopping', featuredProducts: products }));
exports.default = router;

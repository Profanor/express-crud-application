import express from 'express';
import { Response, Request, NextFunction } from "express";
const router = express.Router();

const products = [
  {  
    id: 1,
    name: 'PlayStation5', 
    category: 'Gaming Accessories',
    price: 439.99,
    imageUrl: 'https://www.techieyard.com/wp-content/uploads/2021/07/ishMfuW.jpg',  // Online image URL
  },
  { 
    id: 2, 
    name: 'Hisense Smart Tv', 
    category: 'Electronics',
    price: 259.99, 
    imageUrl: 'https://root-nation.com/wp-content/uploads/2020/09/hisense_u7qf-7-852x650.jpg',  // Online image URL
  },
];

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  res.render('index', { title: 'IzzShopping', featuredProducts: products }));

export default router;

import express from 'express';
import { Response, Request, NextFunction } from "express";
const router = express.Router();

const products = [
  {  id: 1,
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
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  res.render('index', { title: 'IzzShopping', featuredProducts: products }));
   
export default router;
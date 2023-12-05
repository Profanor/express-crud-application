import express from 'express';
import { Response, Request, NextFunction } from "express";
const router = express.Router();


const yourFeaturedProductsArray = [
  { id: 1, name: 'Featured Product 1', price: 19.99 },
  { id: 2, name: 'Featured Product 2', price: 29.99 },
  // Add more products as needed
];

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) =>
  res.render('index', { title: 'IzzShopping', featuredProducts: yourFeaturedProductsArray }));
   
export default router;
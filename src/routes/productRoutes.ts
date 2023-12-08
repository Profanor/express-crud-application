import express from 'express';
import productController from '../controllers/productController';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);

router.post('/', productController.addProduct);
router.post('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export default router;
import express from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);

router.post('/', productController.addProduct);
router.put('/:id', authMiddleware.authenticateJWT, productController.updateProduct);
router.delete('/:id', authMiddleware.authenticateJWT, productController.deleteProduct);

export default router;
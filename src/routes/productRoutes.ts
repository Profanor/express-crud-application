import express from 'express';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware.authenticateJWT);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductsById);

router.post('/', productController.addProduct);
router.post('/:id', authMiddleware.authorize, productController.updateProduct);
router.delete('/:id', authMiddleware.authorize, productController.deleteProduct);

export default router;
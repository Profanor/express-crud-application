"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productController_1 = __importDefault(require("../controllers/productController"));
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const router = express_1.default.Router();
router.get('/', productController_1.default.getAllProducts);
router.get('/:id', productController_1.default.getProductsById);
router.post('/', productController_1.default.addProduct);
router.put('/:id', authMiddleware_1.default.authenticateJWT, productController_1.default.updateProduct);
router.delete('/:id', authMiddleware_1.default.authenticateJWT, productController_1.default.deleteProduct);
exports.default = router;

//routes/productRoutes.js
import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { Response, Request } from 'express';
import { Product } from '../models/Product';

const router = express.Router();

 // Get all products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.findAll();
    res.json(allProducts);
  } catch(error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/products', authenticateUser, async(req, res) => {
  try {
    const { id, name,image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
    const newProduct = await Product.create({
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock,
      rating,
      numReviews,
      id,
    });
    res.json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/products/:id', authenticateUser, async(req, res) => {
  try {
    const productId = req.params.id;
    const updatedProduct = await Product.update(
      {
        // Update fields as needed
      },
      {
        where: {
          id: productId,
        },
      }
    );
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // For demonstration purposes, let's assume successful update
  const updatedProduct = { name: 'Updated Product', /* updated fields */ };
  res: Response.json(updatedProduct);

router.delete('/products/:id', authenticateUser, async(req, res) => {
  try {
    const productId = req.params.id;
    await Product.destroy({
      where: {
        id: productId,
      },
    });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// For demonstration purposes, let's assume successful deletion
  res: Response.json({ message: 'Product deleted' });

export default router;
//routes/productRoutes.js
import express from 'express';
import { authenticateUser } from '../middleware/authMiddleware';
import { Response, Request } from 'express';
import  Product  from '../models/Product';

const router = express.Router();

 // Get all products
router.get('/products', async (req: Request, res: Response) => {
  try {
    const allProducts = await Product.findAll();
    res.render('products', { title: 'All Products', products: allProducts });
  } catch(error) {
    console.error('Error fetching products:',error);
    res.render( 'error', { error: 'Internal server error' });
  }
});

router.post('/products', authenticateUser, async(req: Request, res: Response) => {
  //assuming i have a logged-in user with userId stored in the session
  const userIdFromSession = req.session.user?.id;

  if (!userIdFromSession) {
    return res.status(401).json({ error: 'User not authenticated.' });
  }

  try {
    const { id, userId, name,image, brand, category, description, price, countInStock, rating, numReviews } = req.body;
    const newProduct = await Product.create({
      userId: userIdFromSession,
      name: req.body.name,
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
    return res.json({ success: true, product: newProduct });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

router.put('/products/:id', authenticateUser, async(req: Request, res: Response) => {
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

router.delete('/products/:id', authenticateUser, async(req: Request, res: Response) => {
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

export default router;
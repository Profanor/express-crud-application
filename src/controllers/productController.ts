import { Response, Request } from "express"
import  Product from '../models/Product';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const { id, name, image, brand, category, description, price, countInStock, rating, numReviews } = req.body;

    console.log(req.body);

    // Validate that required fields are present
    if (!name || !price || !countInStock) {
      return res.status(400).json({ error: 'Name, price, and countInStock are required' });
    }

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

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const { name, price, description } = req.body;

    const [rowsUpdated] = await Product.update(
      { name, price, description },
      { where: { id: productId } }
);
    if (rowsUpdated === 0) {
    return res.status(404).json({ error: 'Product not found' });
}

    // Find the updated product
    const foundUpdatedProduct = await Product.findByPk(productId);

    res.json({ success: true, product: foundUpdatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const rowsDeleted = await Product.destroy({ where: { id: productId } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json({ success: true, message: 'Product deleted successfully'});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default { 
  getAllProducts, 
  addProduct, 
  updateProduct, 
  deleteProduct };

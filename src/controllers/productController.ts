import { Response, Request } from "express"
import User, { UserAttributes } from "../models/User";
import  Product from '../models/Product';

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};

const getProductsById = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    
     //find product by ID in the database
     const product = await Product.findByPk(productId);
     if (!product) {
      return res.status(404).json({ error: 'product not found' });
  }
     res.json({ success: true, product });
}   catch(error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
}
};

const addProduct = async (req: Request, res: Response, productData: any) => {
  try {
    const { id, name, image, brand, category, description, price, countInStock } = req.body;
      
    if( req.user && 'userId' in req.user ) {
      const userId: any = (req.user.userId as UserAttributes);
      
      const newProduct = await Product.create({ 
      id,
      userId,
      name,
      image,
      brand,
      category,
      description,
      price,
      countInStock, 
    });
    
    //Fetch the updated user data from the database
    const updatedUser = await User.findByPk(userId, {
      include: [{ model: Product, as: 'products' }],
    });

    if (!updatedUser) {
      throw new Error('Failed to retrieve updated user data');
    }

    // Update the session with the updated user data
    req.user = updatedUser;

    if (newProduct) {
      console.log(newProduct);
      
      res.status(201).send({ success: true, product: newProduct });
  } else {
      res.status(401).json({ error: 'Failed to create the product' });
  } 
 }  else {
    // Handle the case where req.user is undefined or doesn't have userId
    res.status(401).json({ error: 'User not authenticated or missing userId' });
}
} catch(error) {
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
  getProductsById, 
  addProduct, 
  updateProduct, 
  deleteProduct };
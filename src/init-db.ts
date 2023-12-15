import sequelize from './database/database';
import { Request } from 'express';
import Product from './models/Product';
import User from './models/User';

const initializeDatabase = async (req: Request) => {
  try {
    // Sync the models
    await sequelize.sync({ alter: true });

    console.log('Connection to the database has been established successfully.');
    if (req.session && req.session.user) {
      console.log('User ID:', req.session.user.id);

      const userId = req.session.user.id;

    // Create a sample product if it doesn't exist
    const productCount = await Product.count();
    if (productCount === 0) {
      await Product.create({
      id:1,
      userId,
      name: 'smart-watch',
      image: 'sample-image-url',
      brand: 'hryfine',
      category: 'Men accessories',
      description: 'a small portable watch',
      price: 19.99,
      countInStock: 10,
      rating: 4,
      numReviews: 15,
      });

      console.log('Sample product inserted successfully.');
  }
    } else {
      console.log('Database already initialized with products.');
    }
  } catch (error:any) {
    console.error('Error during databse initialization:', error);
    console.error(error.stack);
  }
};
export default initializeDatabase;
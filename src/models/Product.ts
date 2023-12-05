import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 
import User from './User';

interface productAttributes {
  id: number;
  userId: number;
  name: string;
  image: string;
  brand: string;
  category: string;
  description: string;
  price: number;
  countInStock: number ;
  rating: number;
  numReviews: number;
}

 class Product extends Model<productAttributes> {}

 console.log('Product model declared');

 Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
  },
  brand: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  countInStock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rating: {
    type: DataTypes.INTEGER,
  },
  numReviews: {
    type: DataTypes.INTEGER,
  }
 },
 {
  sequelize,
  modelName: 'Product',
}
);

console.log('Product model initialized');

// Associations
Product.belongsTo(User, { foreignKey: 'userId' });

console.log('Product associations defined');

export default Product;
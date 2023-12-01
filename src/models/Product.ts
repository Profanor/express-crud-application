import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 

interface productAttributes {
  id: number;
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

export class Product extends Model<productAttributes> {}

 Product.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true
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
    modelName: 'Product'
  });

export default Product;
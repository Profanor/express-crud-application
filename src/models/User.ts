import { DataTypes, Model } from 'sequelize';
import sequelize from '../utils/sequelize';
import Product from './Product';

interface UserAttributes {
  id: number;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  phone: string;
  address: string;
}

 class User extends Model<UserAttributes> {
  public id!: number;
  public fullname!: string;
  public email!: string;
  public password!: string;
  public gender!: string;
  public phone!: string;
  public address!: string;

  static associate() {
    User.hasMany(Product, { foreignKey: 'userId', as: 'products' });
   }
}

 User.init(
  { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, 
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING, 
      allowNull: true, 
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, 
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    }
 },
 {
  sequelize,
  modelName: 'User',
}
);

User.associate();

export default User;
export { UserAttributes };
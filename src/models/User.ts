import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 
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
}
console.log('User model declared');

 User.init(
  { 
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

console.log('User model initialized');

export default User;
export { UserAttributes };
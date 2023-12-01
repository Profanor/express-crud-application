import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database'; 

interface UserAttributes {
  id?: number;
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

 User.init(
  {
    fullname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING,
 },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
export { UserAttributes };

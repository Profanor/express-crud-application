"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database/database"));
class User extends sequelize_1.Model {
}
User.init({
    fullname: sequelize_1.DataTypes.STRING,
    email: sequelize_1.DataTypes.STRING,
    password: sequelize_1.DataTypes.STRING,
    gender: sequelize_1.DataTypes.STRING,
    phone: sequelize_1.DataTypes.STRING,
    address: sequelize_1.DataTypes.STRING,
}, {
    sequelize: database_1.default,
    modelName: 'User',
});
exports.default = User;

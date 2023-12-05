"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// database.ts
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: console.log,
});
console.log('Sequelize instance created');
exports.default = sequelize;

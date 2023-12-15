// database.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
  logging: false,
});

console.log('Sequelize instance created');

export default sequelize;
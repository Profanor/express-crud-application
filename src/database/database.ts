import { Sequelize } from 'sequelize';
 
// Option 1: Passing a connection URI
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
    logging: console.log, //log sql queries
  });

export default sequelize;
 
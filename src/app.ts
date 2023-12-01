require('dotenv').config();

import express from 'express';
import session  from 'express-session';
import path from 'path';
import logger from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import sequelize from './database/database';
import { Response, Request, NextFunction } from 'express';
import Product from './models/Product';

// Routes
import index from './routes/index'
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import users from './routes/users';
import login from './routes/login';
import signup from './routes/signup';

const app = express();

sequelize
  .sync({ force: process.env.FORCE_SYNC === 'false' })
  .then(()=>{
  console.log('Connection to the database has been established successfully.')
      
    // Add your data insertion code here
    return Product.create({
        id: 1,
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
    })
    .then((newProduct) => {
      console.log('Sample product inserted successfully:', newProduct);  
})
.catch((error)=>{
  console.error('Unable to connect to the database:', error);
});

const PORT = process.env.PORT || 3000; //reads and loads the port value from .env

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  // use the session middleware
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'default_secret',
      resave: false,
      saveUninitialized: true,
  })
);

  app.use(express.static(path.join(__dirname, 'public')));

  // use your routes
  app.use('/', index);
  app.use('/authRoutes', authRoutes);
  app.use('/users', users);
  app.use('/', productRoutes); 
  app.use('/', login);
  app.use('/', signup);

  // catch 404 and forward to error handler
  app.use((req, res, next) => {
    next(createError(404));
  });

  // error handler
  app.use((err:any, req: Request, res: Response, next: NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

export default app;
require('dotenv').config();

import express from 'express';
import session  from 'express-session';
import path from 'path';
import logger from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import { Response, Request, NextFunction } from 'express';
import initializeDatabase from './init-db';
import './models/User';
import './models/Product';

const app = express();

//Middleware to Initialize the database with sample data
app.use(async (req: Request, res: Response, next: NextFunction) => {
  await initializeDatabase(req);
  next();
});

 // use the session middleware
 app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
})
);

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(express.static(path.join(__dirname, 'public')));

  //other middleware 
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());


  // Routes
  import index from './routes/index'
  import authRoutes from './routes/authRoutes';
  import productRoutes from './routes/productRoutes';
  import users from './routes/userRoutes';
  import signup from './routes/signup';
  import login from './routes/login';
  import profile from './routes/profile';
  import adminRoutes from './routes/adminRoutes';
  import logout from './routes/logout';

  // use your routes
  app.use('/', index);
  app.use('/auth', authRoutes);
  app.use('/', adminRoutes);
  app.use('/users', users);
  app.use('/products', productRoutes); 
  app.use('/', login);
  app.use('/', logout);
  app.use('/', signup);
  app.use('/', profile);
  
 
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
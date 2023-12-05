require('dotenv').config();

import express from 'express';
import session  from 'express-session';
import path from 'path';
import logger from 'morgan';
import createError from 'http-errors';
import cookieParser from 'cookie-parser';
import { Response, Request, NextFunction } from 'express';
import initializeDatabase from './init-db';
import passport from 'passport';
import './models/User';
import './models/Product';


// Routes
import index from './routes/index'
import authRoutes from './routes/authRoutes';
import productRoutes from './routes/productRoutes';
import users from './routes/users';
import login from './routes/login';
import signup from './routes/signup';
import profile from './routes/profile';

const app = express();

// Initialize the database with sample data
app.use(async (req: Request, res: Response, next: NextFunction) => {
  await initializeDatabase(req);
  next();
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
  //passport initialization
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, 'public')));

  // use your routes
  app.use('/', index);
  app.use('/authRoutes', authRoutes);
  app.use('/users', users);
  app.use('/', productRoutes); 
  app.use('/', login);
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
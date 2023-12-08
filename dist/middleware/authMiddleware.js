"use strict";
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser';
// import express from 'express'
// const app = express();
// app.use(cookieParser());
//  const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
//   // Check if the token is present in the request headers or cookies
//   const token = req.headers.authorization || req.cookies.token;
//   if (!token) {
//     // Token is not present, send unauthorized response
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
//   try {
//     // Verify the token using your secret key (replace 'your_secret_key' with a strong secret)
//     const decoded = jwt.verify(token, 'your_secret_key') as { userId: number; fullname: string };
//     // Attach the decoded user information to the request for further use
//     req.user = decoded;
//     next();
//   } catch (error) {
//     // Token verification failed, send unauthorized response
//     return res.status(401).json({ error: 'Unauthorized' });
//   }
// };
// export default authenticateUser;

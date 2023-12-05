import { Response, Request, NextFunction } from "express";

export const authenticateUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next();
  } else {
    // res.render('login', { error: 'Unauthorized' });
    console.log(req.session.user)
    res.send("i am David");
    
  }
};
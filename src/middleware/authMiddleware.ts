import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Define the type for the decoded payload
interface DecodedToken extends JwtPayload {
  userId: number;
  email: string;
  role: string;
}

// Middleware to authenticate requests using JWT
const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.jwt;
  console.log('JWT Token:', token);
  
  if (!token) {
    console.log('No token found.');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET || 'default_secret',
    (err: any, decoded: Express.User | undefined) => {
      if (err || !decoded) {
        console.log('Invalid token:', err);
        res.clearCookie('jwt');
        return res.status(401).json({ error: 'Unauthorized' });
      }

      console.log('Valid token. Decoded:', decoded);
      req.user = decoded; 
      next();
    }
  );
};

// Middleware for authorization checks using session data
export const authorize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.session.user;

  if (!user) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Perform authorization checks based on the user's information in the session
  if (user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden. Admins only.' });
  }

  const userIdFromSession = req.session.user.id;
  const productIdFromParams = req.params.productId; // Assuming you have productId in the route params

  if (userIdFromSession !== productIdFromParams) {
    return res.status(403).json({ error: 'Forbidden. You do not own this resource.' });
  }
  next();
};

export default { authenticateJWT, authorize };
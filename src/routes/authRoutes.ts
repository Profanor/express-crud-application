//routes/authRoutes.js
import express, { Response, Request } from 'express';
import User, { UserAttributes } from '../models/User';
import bcrypt from 'bcrypt';

const router = express.Router();
 
// Function to simulate user authentication
const authenticate = async (fullname: string, password: string) => {
const user = await User.findOne({ where: { fullname: fullname } });
 
if (user && bcrypt.compareSync(password, user.password)) {
  // Exclude the password field in the returned user
  const { password: _, ...userWithoutPassword } = user.toJSON() as UserAttributes;
  return userWithoutPassword as AuthenticatedUser;
}
  return null;
};
 
interface AuthenticatedUser {
    id: number;
    fullname: string;
}
 
//login route
router.post('/login', async (req: Request, res: Response) => {
  const { fullname, password } = req.body;
 
  // Validate username and password (implement your own validation logic)
  if (!fullname || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }
 
  // Authenticate user
  const authenticatedUser = await authenticate(fullname, password);
 
  if (!authenticatedUser) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  // User authentication successful, store user data in session
  req.session.user = authenticatedUser;
 
  res.json({ success: true, user: authenticatedUser });
});
 
export default router;
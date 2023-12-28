import { Response, Request } from 'express';
import { comparePassword, hashPassword } from '../utils/password';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const maxAge = 1 * 24 * 60 * 60; //define maxAge globally

// function to create a JWT token
const createToken = (userId: number, fullname: string) => {
  try {
  return jwt.sign({ userId, fullname }, process.env.JWT_SECRET || 'default_secret', {
   expiresIn: maxAge
 });
} catch (error) {
  console.error('Error creating JWT token:', error);
  throw error;
 }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { id, fullname, password, gender, phone, email, address } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ where: { fullname } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create a new user
    const createdUser = await User.create({
      id,
      fullname,
      password: hashedPassword,
      gender,
      phone,
      email,
      address
    });

  // Generate JWT token for the new user
  const token = jwt.sign({ userId: createdUser.id, email: createdUser.email }, process.env.JWT_SECRET || 'default_secret');

  // Set the JWT token as a cookie
  res.cookie('jwt', token, { httpOnly: true });

  //redirect to the home page after successful signup
  res.redirect('/login');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
};


//this is where i had redirect issues especially in session storage
const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check if the password is correct
    const passwordMatch = await comparePassword(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    //reuse the createToken function in the login
    const token = createToken(user.id, user.email);

    res.cookie('jwt', token, { httpOnly: true });
    
    // Set user information in the session
    req.session.user = {
      id: user.id,
      email: user.email,
    };

    res.redirect(`/profile?email=${user.email}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

export default { signup, login };
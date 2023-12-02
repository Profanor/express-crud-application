import express, { Request, Response } from 'express';
import User from '../models/User';

const router = express.Router();

//GET route for rendering the signup form
router.get('/signup', (req: Request, res: Response) => {
  res.render('signup', { title: 'Sign Up' });
});

// POST route for handling the form submission
router.post('/signup', async (req: Request, res: Response)=> {
  try{
  //extract form data from the request body
  const { fullname, email, password, gender, phone, address } = req.body;

  //perform signup logic i.e save user to a database
  const newUser = await User.create({
    fullname,
    email, 
    password, 
    gender, 
    phone, 
    address,
  });

  //redirect to the home page after successful signup
  res.redirect('/login');
} catch(error) {
  console.log('error during signup:', error);
  //redirect back to the signup page with an error message
  res.redirect('/signup');
}
});
export default router;
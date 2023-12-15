import express, { Request, Response } from 'express';
import User, { UserAttributes } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import authMiddleware from '../middleware/authMiddleware';

const router = express.Router();

router.get('/login', (req:Request, res: Response) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', authMiddleware.authenticateJWT, async (req: Request, res:Response)=> {
    try {

        //extract form data from the req body
        const { email, password } = req.body;

        console.log('request body:', req.body); //debugging
        
        console.log({email, password});

        //perform login logic
        const user = await User.findOne({ where: { email: email  } });
        console.log({user});

        if (user && bcrypt.compareSync(password, user.password)) {
            // Exclude the password field in the returned user
            const { password: _, ...userWithoutPassword } = user.toJSON() as UserAttributes;

            console.log({userWithoutPassword});

            //generate jwt token 
            const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'default_secret');

            res.cookie('jwt', token, { httpOnly: true });

            //redirect to user profile
            res.redirect(`/profile?email=${user.email}`);
            console.log('logged in success')
        } else {
            res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
    } catch(error) {
        console.error('Error during login:', error);
    // Redirect back to the login page with an error message
    res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});

export default router;
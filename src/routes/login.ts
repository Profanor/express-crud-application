import express, { Request, Response } from 'express';
import User, { UserAttributes } from '../models/User';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/login', (req:Request, res: Response) => {
    res.render('login', { title: 'Login' });
});

router.post('/login', async (req: Request, res:Response)=> {
    try {
        //extract form data from the req body
        const { fullname, password } = req.body;
        console.log(fullname, password);

        //perform login logic
        const user = await User.findOne({ where: { fullname } });
        console.log({user});

        if (user && bcrypt.compareSync(password, user.password)) {
            // Exclude the password field in the returned user
            const { password: _, ...userWithoutPassword } = user.toJSON() as UserAttributes;

            //redirect to user profile
            res.redirect('/profile');
            console.log('logged in success')
        } else {
            res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
    } catch(error) {
        console.error('Error during login:', error);
    // Redirect back to the login page with an error message
    res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
})

export default router;
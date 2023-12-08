"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login' });
});
router.post('/login', async (req, res) => {
    try {
        //extract form data from the req body
        const { fullname, password } = req.body;
        console.log(fullname, password);
        //perform login logic
        const user = await User_1.default.findOne({ where: { fullname } });
        console.log({ user });
        if (user && bcrypt_1.default.compareSync(password, user.password)) {
            // Exclude the password field in the returned user
            const { password: _, ...userWithoutPassword } = user.toJSON();
            //redirect to user profile
            res.redirect('/profile');
            console.log('logged in success');
        }
        else {
            res.render('login', { title: 'Login', error: 'Invalid credentials' });
        }
    }
    catch (error) {
        console.error('Error during login:', error);
        // Redirect back to the login page with an error message
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    }
});
exports.default = router;

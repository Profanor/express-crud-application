"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
//GET route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
// POST route for handling the form submission
router.post('/signup', async (req, res) => {
    try {
        //extract form data from the request body
        const { id, fullname, email, password, gender, phone, address } = req.body;
        const hashedPassword = bcrypt_1.default.hashSync(password, 10);
        //perform signup logic i.e save user to a database
        const newUser = await User_1.default.create({
            id,
            fullname,
            email,
            password: hashedPassword,
            gender,
            phone,
            address,
        });
        //redirect to the home page after successful signup
        res.redirect('/login');
    }
    catch (error) {
        console.log('error during signup:', error);
        //redirect back to the signup page with an error message
        res.redirect('/signup');
    }
});
exports.default = router;

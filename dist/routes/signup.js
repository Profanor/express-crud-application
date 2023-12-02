"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_1 = __importDefault(require("../models/User"));
const router = express_1.default.Router();
//GET route for rendering the signup form
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up' });
});
// POST route for handling the form submission
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //extract form data from the request body
        const { fullname, email, password, gender, phone, address } = req.body;
        //perform signup logic i.e save user to a database
        const newUser = yield User_1.default.create({
            fullname,
            email,
            password,
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
}));
exports.default = router;

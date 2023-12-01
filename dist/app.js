"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const express_session_1 = __importDefault(require("express-session"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const http_errors_1 = __importDefault(require("http-errors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const database_1 = __importDefault(require("./database/database"));
const Product_1 = __importDefault(require("./models/Product"));
// Routes
const index_1 = __importDefault(require("./routes/index"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const users_1 = __importDefault(require("./routes/users"));
const login_1 = __importDefault(require("./routes/login"));
const signup_1 = __importDefault(require("./routes/signup"));
const app = (0, express_1.default)();
database_1.default
    .sync({ force: process.env.FORCE_SYNC === 'false' })
    .then(() => {
    console.log('Connection to the database has been established successfully.');
    // Add your data insertion code here
    return Product_1.default.create({
        id: 1,
        name: 'smart-watch',
        image: 'sample-image-url',
        brand: 'hryfine',
        category: 'Men accessories',
        description: 'a small portable watch',
        price: 19.99,
        countInStock: 10,
        rating: 4,
        numReviews: 15,
    });
})
    .then((newProduct) => {
    console.log('Sample product inserted successfully:', newProduct);
})
    .catch((error) => {
    console.error('Unable to connect to the database:', error);
});
const PORT = process.env.PORT || 3000; //reads and loads the port value from .env
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
// use the session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
// use your routes
app.use('/', index_1.default);
app.use('/authRoutes', authRoutes_1.default);
app.use('/users', users_1.default);
app.use('/', productRoutes_1.default);
app.use('/', login_1.default);
app.use('/', signup_1.default);
// catch 404 and forward to error handler
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;

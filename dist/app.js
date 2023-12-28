"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const path_1 = __importDefault(require("path"));
const express_session_1 = __importDefault(require("express-session"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const User_1 = __importDefault(require("./models/User"));
const Product_1 = __importDefault(require("./models/Product"));
const app = (0, express_1.default)();
User_1.default.sync({ alter: true })
    .then(() => {
    return Product_1.default.sync({ alter: true });
})
    .then(() => {
    console.log('Models synced successfully');
})
    .catch((error) => {
    console.error('Error syncing models:', error);
});
// use the session middleware
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
}));
// view engine setup
app.set('views', path_1.default.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
//other middleware 
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
// Routes
const index_1 = __importDefault(require("./routes/index"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const signup_1 = __importDefault(require("./routes/signup"));
const login_1 = __importDefault(require("./routes/login"));
const profile_1 = __importDefault(require("./routes/profile"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const logout_1 = __importDefault(require("./routes/logout"));
// use your routes
app.use('/', index_1.default);
app.use('/auth', authRoutes_1.default);
app.use('/', adminRoutes_1.default);
app.use('/users', userRoutes_1.default);
app.use('/products', productRoutes_1.default);
app.use('/', login_1.default);
app.use('/', logout_1.default);
app.use('/', signup_1.default);
app.use('/', profile_1.default);
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

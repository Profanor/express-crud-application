"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const authenticateUser = (req, res, next) => {
    if (req.session.user) {
        next();
    }
    else {
        res.render('login', { error: 'Unauthorized' });
    }
};
exports.authenticateUser = authenticateUser;

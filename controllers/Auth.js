const Auth = require('../models/User');
const jwt = require('jsonwebtoken')
const { errorHandler } = require('../helpers/dbHelperHandler');
const expressJwt = require('express-jwt')
require('dotenv').config();
exports.signup = (req, res) => {
    // console.log('req.body', req.body);
    const user = new Auth(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err)
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user })
    })
};

// sign in user
exports.signin = (req, res) => {
    // find the user based on mail
    const { email, password } = req.body;
    Auth.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({ err: "Auth with that email does not exist" });
        }
        // if user is found make sure the email and password match
        // create auth method in user model
        if (!user.authenticate(password)) {
            return res.status(401).json({ error: "Email and password do not match" });
        }

        // generate a signed token with user id and secret
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)

        // persist the token as 't' in cookie with expiry date
        res.cookie('token', token, { expire: new Date() + 9999 })

        // return response with user and toke to frontend user
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, email, name, role } })
    })
};

// signout user
exports.signout = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Signed out successfully" });
};

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"], // added later
    userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({ error: "Access Denied" });
    }
    next();
}
exports.isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({
            error: "Admin resource! Access denied"
        });
    }
    next();
}
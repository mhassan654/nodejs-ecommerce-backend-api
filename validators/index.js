// vaildate user signup
const { check, body, validationResult } = require('express-validator')
exports.userSignupValidator = (req, res, next) => {
    body("name", "Name is required").notEmpty();
    body("email", "Email must be a valid email")
        .matches(/.+\@.+\..+/)
        .withMessage("Email must contain @")
        .isLength({
            min: 4,
            max: 32
        });
    check("password", "Password is required").notEmpty()
    check("password")
        .isLength({
            min: 6
        })
        .withMessage("Password must contain at least 6 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number");
    const errors = validationResult(req);
    // console.log(req.body);
    if (!errors.isEmpty()) {
        // const extractedErrors = []
        const firstError = errors.array().map(error => error.message);

        return res.status(422).json({
            errors: firstError,
        })
    }
    next();
};
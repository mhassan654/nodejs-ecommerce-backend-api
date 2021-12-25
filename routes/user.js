const express = require('express');
const router = express.Router();
const {
    requireSignin,
    isAuth,
    isAdmin
} = require('../controllers/Auth')

const { userById } = require('../controllers/User');

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    });
});

router.param('userId', userById)

module.exports = router;
const express = require('express')
const router = express.Router();

const { signup, signin } = require('../controllers/User')
const { userSignupValidator } = require('../validators')

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);

module.exports = router;
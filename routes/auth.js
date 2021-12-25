const express = require('express')
const router = express.Router();

const {
    signup,
    signin,
    signout,
    requireSignin
} = require('../controllers/Auth')
const { userSignupValidator } = require('../validators')

router.post('/signup', userSignupValidator, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello',requireSignin,(req, res)=>{
    res.send('hello');
})

module.exports = router;
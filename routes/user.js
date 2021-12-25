const express = require('express')
const router = express.Router();

const { signup } = require('../controllers/User')

router.post('/signup', signup);

module.exports = router;
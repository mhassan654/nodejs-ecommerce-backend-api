const express = require('express')
const router = express.Router();

const {
    create,
    getProduct,
    getProducts
} = require('../controllers/Product');

const Product = require('../models/Product');


const { requireSignin, isAdmin, isAuth } = require('../controllers/Auth');
const advancedResults = require("../middleware/advancedResults");

router.
route('/')
    .get(advancedResults(Product), getProducts)
    .post(create);

router.
route('/:id')
    .get(getProduct);

module.exports = router;
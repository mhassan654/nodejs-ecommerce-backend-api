const formidable = require('formidable')
const lodash = require('lodash')
const fs = require('fs')

const Product = require('../models/Product')
const {errorHandler} = require("../helpers/dbHelperHandler");
const asyncHandler = require("../middleware/asyncHandler");
const ErrorResponse = require("../helpers/errorResponse");
// const {next} = require("lodash/seq");

exports.getProducts = asyncHandler(async(req, res, next)=>{
    res.status(200).json(res.advancedResults);
});

exports.getProduct = asyncHandler(async(req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(
            new ErrorResponse(`Product not found with id ${req.params.id}`, 500)
        );
    }
    res.status(200).json({
        success: true,
        data: product
    });

});

exports.read = (req, res)=>{
    req.product.photo = undefined;
    return res.isJSON(res.product)
}

exports.create = (req, res)=>{
    let form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req,
        (err, fields, files) => {

            if (err) {
                return res.status(400).json({
                    error: 'Image could not be uploaded'
                })
            }

            let product = new Product(fields)

            if (files.photo) {
                if (files.photo.size > 1000000) {
                    return res.status(400).json({
                        error: "Image should be less than 1mb in size"
                    });
                }
                product.photo.data = fs.readFileSync(files.photo.path)
                product.photo.contentType = files.photo.type;
            }

            product.save((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                res.json({result});
            })
        })
}
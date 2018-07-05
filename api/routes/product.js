
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const productSchema = require('../models/product')

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Product routing GET Request.'
    })
})

router.post('/', (req, res, next) => {
    // const product = {
    //     productName : req.body.name,
    //     productId : req.body.productID,
    //     price : req.body.price
    // }

    const productS = new productSchema({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })

    productS.save().then( result=> {
        console.log('save result ',result)
    }).catch(err => console.log('save error', err))

    res.status(200).json({
        message : 'Product routing POST Request.',
        productDetails : productS
    })
})

router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    console.log('productID', productID)
    productSchema.findById(productID)
    .exec()
    .then( result => {
        console.log('Find by product ID ', result);
        res.status(200).json(result)
    })
    .catch( err => {
        console.log('error to find product', err)
        res.status(500)
    })
})

router.patch('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    res.status(200).json({
        message : `patch api for  ${productID}`,
        id: productID
    })
})

router.delete('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    res.status(200).json({
        message : `delete api for ${productID}`,
        id: productID
    })
})

module.exports = router;
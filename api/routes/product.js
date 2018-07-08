
const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');

const productSchema = require('../models/product')

router.get('/', (req, res, next) => {
    productSchema.find()
    .select('name price _id')
    .exec()
    .then(result => {
        const doc = {
            count : result.length,
            product : result.map(p => {
                return {
                    name : p.name,
                    price : p.price,
                    _id : p._id,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/product/' + p._id 
                    }
                }
            })
        }
        res.status(200).json({
            message : "All product list",
            productList : doc
        })
    }).catch(err => {
        res.status(500).json({
            message : err
        })
    })
})

router.post('/', (req, res, next) => {
    const productS = new productSchema({
        _id : mongoose.Types.ObjectId(),
        name : req.body.name,
        price : req.body.price
    })

    productS.save()
    .then( result => {
        res.status(200).json({
            message : 'product added',
            productDetails : result
        })
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })

})

router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;

    productSchema.findById(productID)
    .exec()
    .then( result => {
        console.log('Find by product ID ', result);
        if(result){
            res.status(200).json(result)
        } else {
            res.status(404).json({
                message : `No Data found for ${productID}`
            })
        }
    })
    .catch( err => {
        console.log('error to find product', err)
        res.status(500).json({
            error: err
        })
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
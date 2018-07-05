
const express = require('express')
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Product routing GET Request.'
    })
})

router.post('/', (req, res, next) => {
    const product = {
        productName : req.body.name,
        productId : req.body.productID,
        price : req.body.price
    }
    res.status(200).json({
        message : 'Product routing POST Request.',
        productDetails : product
    })
})

router.get('/:productID', (req, res, next) => {
    const productID = req.params.productID;
    res.status(200).json({
        message : `get api for ${productID}`,
        id: productID
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
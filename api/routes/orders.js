const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Order get api'
    })
})

router.post('/', (req, res, next) => {
    const order  = {
        orderID : req.body.orderId,
        quantity : req.body.quantity
    }
    res.status(200).json({
        message : 'Order Created',
        order : order
    })
})

router.get('/:orderID', (req, res, next) => {
    const orderID = req.params.orderID;
    res.status(200).json({
        message : `Order get api ${orderID}`,
        orderID : orderID
    })
})

router.post('/:orderID', (req, res, next) => {
    const orderID = req.params.orderID;
    res.status(200).json({
        message : `Order POST api ${orderID}`,
        orderID : orderID
    })
})

router.delete('/:orderID', (req, res, next) => {
    const orderID = req.params.orderID;
    res.status(200).json({
        message : `Order DELETE api ${orderID}`,
        orderID : orderID
    })
})

module.exports = router;

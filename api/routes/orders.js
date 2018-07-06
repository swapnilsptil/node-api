const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const orderSchema = require('../models/order');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message : 'Order get api'
    })
})

router.post('/', (req, res, next) => {
    const order = new orderSchema({
        _id : mongoose.Types.ObjectId(),
        quantity : req.body.quantity,
        orderId : req.body.orderId
    })
    console.log('order received at server end', order);
    order.save().then(result => {    
        console.log('Order Placed..', result)
    }).catch(err => {
        console.log('Order not placed , ', err)
    })
    res.status(200).json({
        message: 'order placed',
        orderDetails : order
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

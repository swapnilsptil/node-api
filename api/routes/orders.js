const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const orderSchema = require('../models/order');

router.get('/', (req, res, next) => {
    orderSchema.find().exec()
    .then(result => {
        res.status(200).json({
            message : 'Retrived all data',
            orderList : result
        })
    })
    .catch( err => {
        res.status(202).json({
            message : err
        })
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

    orderSchema.findById(orderID).exec()
    .then(result => {
        console.log('Order search by ID : ', result)
        if(result){
            res.status(200).json({
                message : 'Order search Done',
                orderDetails : result
            })
        } else {
            res.status(404).json({
                message : `No data found for ${orderID}`
            })
        }
        
    }).catch(err => {
        res.status(500).json({
            message : err
        })
    })
})

router.delete('/:orderID', (req, res, next) => {
    const orderID = req.params.orderID;
    
    orderSchema.remove({_id : orderID}).exec()
    .then(result => {
        res.status(200).json({
            message : `Removed ${orderID} from database`
        })
    })
    .catch(err => {
        res.status(404).json({
            message : err
        })
    })

})

module.exports = router;

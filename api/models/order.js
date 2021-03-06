const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: String,
    quantity: Number
})

module.exports = mongoose.model('orderSchema', orderSchema);
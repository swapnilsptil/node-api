const express = require('express');

const app = express();

const productRouter = require('./api/routes/product');
const orderRouter = require('./api/routes/orders')

app.use('/product', productRouter);
app.use('/orders', orderRouter);

module.exports = app;
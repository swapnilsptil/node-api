const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const CORPOptions = require('./constants/CorpConstant');
const mongoose = require('mongoose');
// Middleware Functions for NODE file.
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(CORPOptions);

mongoose.connect('mongodb://swapnil:swapnil@node-api-practice-shard-00-00-wxin1.mongodb.net:27017,node-api-practice-shard-00-01-wxin1.mongodb.net:27017,node-api-practice-shard-00-02-wxin1.mongodb.net:27017/test?ssl=true&replicaSet=node-api-practice-shard-0&authSource=admin&retryWrites=true')

const productRouter = require('./api/routes/product');
const orderRouter = require('./api/routes/orders')

//routes to handle requests
app.use('/product', productRouter);
app.use('/orders', orderRouter);

app.use(morgan('dev'));

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        message : error.message
    })
})

module.exports = app;
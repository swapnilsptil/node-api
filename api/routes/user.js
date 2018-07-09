const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const user = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

Router.post('/signup', (req, res, next) => {
    console.log(req.body)
    user.find({email: req.body.email})
    .exec()
    .then( result => {
        if(result){
            if(result.length >= 1){
                res.status(422).json({
                    message : `User already exist with ${req.body.email}`
                })
            } else {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                debugger;
                if(err) {
                    return res.status(500).json({
                        message : err
                    })
                } else {
                    const userData = new user({
                        _id : mongoose.Types.ObjectId(),
                        email: req.body.email,
                        password : hash,
                        name : req.body.name,
                        flat : req.body.flat,
                        pincode : req.body.pincode,
                        building : req.body.building,
                        phonenumber : req.body.phonenumber
                    })
                    userData.save().then( result => {
                        res.status(200).json({
                            message : `user created successfully`
                        })                
                    }).catch(err => {
                        res.status(500).json({
                            message : err,
                            message1 : 'something is wrong'
                        })
                    })
                }
            })
            }
        }
    })
    .catch(err => {
        res.status(404).json({
            messsage : err
        })
    })
})

Router.post('/login', (req, res, next) => {
    user.find({email : req.body.email}).exec()
    .then( users => {
        if(users.length < 1){
            return res.status(401).json({
                message : 'Auth failed'
            })
        } else {
            bcrypt.compare(req.body.password, users[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        message : 'Auth failed'
                    })
                }
                if(result) {
                    const token = jwt.sign({
                        email : users[0].email,
                        password : users[0].password,
                    }, 'SWAPNIL', 
                    {
                        expiresIn : '1h'
                    })

                    return res.status(200).json({
                        message : 'Login Successfule',
                        userDetails : users[0],
                        token : token,
                        isLoggedIn: true
                    })
                }
                res.status(401).json({
                    message : 'Auth failed'
                })
            })
        }
    })
    .catch(err => {
        return res.status(500).json({
            message : 'error is : ' + err
        })
    })
})

Router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;
    user.remove({_id : id})
    .exec()
    .then(result => {
        res.status(200).json({
            message : `User deleted`
        })
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })
})

Router.get('/', (req, res, next) => {
    user.find()
    .exec()
    .then(result => {
        res.status(200).json({
            message : result
        })
    })
    .catch(err => {
        res.status(500).json({
            message : err
        })
    })
})

module.exports = Router;
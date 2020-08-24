const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

// Create new user
router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Email or Name already exists'
            });
        } else {
            bcrypt.hash(req.body.password, 10, (err, hash) =>{
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const user = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name: req.body.name,
                        email: req.body.email,
                        password:  hash
                    });
                    user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.status(201).json({
                            message: 'User created'
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        })
                    });
                }
            });
        }
    });
});

// Get all Users
router.get('/', (req, res, next) => {
    User.find()
    .select('name email password')
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            users: docs.map(doc => {
                return {
                    _id: doc._id,
                    name: doc.name,
                    email: doc.email,
                    password: doc.password,
                    url: {
                         type: 'GET',
                         url: 'http://localhost:3000/user/' + doc._id //nom du domaine
                    }
                }
            })
        }
        res.status(200).json(response)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
 });

// Get user by ID
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
    .select('name email password')
    .exec()
    .then(doc => {
        console.log('From database', doc);
        if (doc) {
            res.status(200).json({
                user: doc,
                request: {
                    type: 'GET',
                    description: 'GET_USER_BY_ID',
                    url: 'http://localhost:3000/user/' + doc._id 

                }
            });
        } else {
            res.status(404).json({message: 'No valid entry found for provided ID'});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

// Login
router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Email or password is wrong'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Email or password is wrong'
                });
            }
            if (result) {
                const token = jwt.sign(
                {
                    email: user[0].email,
                    userId: user[0]._id
                }, 
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Email or password is wrong'
            });
        })
    })
    .catch(err => {
        console/log(err);
        res.status(500).json({
            error: err
        });
    });
})

//Delete user by Id
router.delete('/:userId', (req, res, next) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
})
module.exports = router;
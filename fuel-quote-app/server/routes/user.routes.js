let mongoose = require('mongoose')
let express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../database/db')

let router = express.Router();
let user = require('../models/user-schema');

router.route('/create').post((req, res, next) => {
    user.findOne({ username: req.body.username }).then(user => {
        if (user) {
            return res.status(400).json({ username: "Username already exists" });
        } else {
            const newUser = new user({
                email: req.body.username,
                password: req.body.password
            });
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    user.create(newUser, (error, data) => {
                        if (error) {
                            return next(error)
                        } else {
                            console.log(data)
                            res.json(data)
                        }
                    })
                });
            });
        }
        })
/*
         user.create(req.body, (error, data) => {
             if (error) {
                 return next(error)
             } else {
                 console.log(data)
                 res.json(data)
             }
         })*/
});

router.route('/login').post((req,res) => {
   const username =  req.body.username;
   const password = req.body.password;

   //find user by username
    user.findOne({username}).then(user => {
        //check if user exists
        if (!user) {return res.status(404).json({usernamenotfound: "Username not found"});
        }
    })
    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            //user matched
            //create jwt payload
            const payload = {
                id: user._id,
                username: user.username
            };
            // Sign token
            jwt.sign(
                payload,
                keys.secretOrKey,
                {
                    expiresIn: 31556926 // 1 year in seconds
                },
                (err, token) => {
                    res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                }
            );
        } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
        }
    })
});

router.route('/').get((req, res, next) => {
    user.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/edit/:id').get((req, res, next) => {
    user.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

router.route('/update/:id').put((req, res, next) => {
    user.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            console.log(error)
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
});

router.route('/delete/:id').delete((req, res, next) => {
    user.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
});

module.exports = router;
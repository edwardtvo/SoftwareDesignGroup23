let mongoose = require('mongoose')
let express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../database/db')
const mongoDB = require('../mongoconnect');
const MongoClient = require('mongodb').MongoClient;



let router = express.Router();
require('../models/user-schema').registerModels();
// This is the right model because ^registerModels set it up for us.

const User = require('../models/user-schema');

function iterateFunc(doc) { console.log(JSON.stringify(doc, null, 4)); }
function errorFunc(error) { console.log(error); }

const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()
  .then(client => {
    const db = client.db("cluster0");
    const user = db.collection("user");
    const quotehistory = db.collection("quotehistory")
    console.log("/ / / MongoDB successfully connected! u w u / / /");

    /* https://stackoverflow.com/questions/28715859/mongodb-nodejs-converting-circular-structure */
    router.route('/').get((req, res, next) => {
        user.find({}).toArray(function(error, data) {
            if (error) throw error;
        
            res.send(data);
            console.log(data);
        });

        })
    
    /* profile management */
    router.route('/update').post((req, res, next) => {
        var filter = { username: req.body.username };
        user.findOneAndUpdate( filter, {
            $set:{
            fullname: req.body.fullname,
            address1: req.body.address1,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip}
        }, { strict: false }, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data)
                console.log('/ / / User updated successfully ! / / /')
            }
        })
    })

    /* registration */
    router.route('/create').post((req,res,next) => {
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
    
             user.create(req.body, (error, data) => {
                 if (error) {
                     return next(error)
                 } else {
                     console.log(data)
                     res.json(data)
                 }
             })
    })

    router.route('/quoteupdate').post((req,res,next) => {
        quotehistory.insertOne( {
            username: req.body.username,
            gallons_requested: req.body.gallons_requested,
            delivery_address: req.body.delivery_address,
            delivery_date: req.body.delivery_date,
            price_per_gallon: req.body.price_per_gallon,
            amount_due: req.body.amount_due
        }, { strict: false }, (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data)
                console.log('/ / / Quote updated successfully ! / / /')
            }
        })
    })


    })
  client.close();
  


/* router.route('/create').post((req, res, next) => {
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

         user.create(req.body, (error, data) => {
             if (error) {
                 return next(error)
             } else {
                 console.log(data)
                 res.json(data)
             }
         })
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

router.route('/update').post((req, res, next) => {
    var filter = { username: req.body.username };
    user.findOneAndUpdate( filter, {
        $set:{
        fullname: req.body.fullname,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip}
    }, { strict: false}, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data)
            console.log('User updated successfully !')
        }
    })
});

router.route('/createquote').post((req, res, next) => {
    user.findOneAndUpdate( {username: req.body.username }, 
            {  
            $push : {
                quoteInfo : { 
                    gallons_requested: req.body.gallons_requested,
                    delivery_date: req.body.delivery_date
                            }
                    }
        }, { useFindAndModify: true} , (error, data) => {
            if (error) {
                console.log(error);
                return next(error);
            } else {
                res.json(data);
                console.log('Quote history updated successfully !')
            }
    })
})

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
}) */

module.exports = router;

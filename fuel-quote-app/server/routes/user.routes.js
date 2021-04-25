let mongoose = require('mongoose')
let express = require('express')
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require('../database/db')
const mongoDB = require('../mongoconnect');
const MongoClient = require('mongodb').MongoClient;
const withAuth = require('./middleware');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;





let router = express.Router();
require('../models/user-schema').registerModels();
// This is the right model because ^registerModels set it up for us.


const secret = 'group23secret';
function iterateFunc(doc) { console.log(JSON.stringify(doc, null, 4)); }
function errorFunc(error) { console.log(error); }



const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(mongoDB_uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect()
  .then(client => {
    const db = client.db("cluster0");
    const user = db.collection("user");
    const quotehistory = db.collection("quotehistory")
    console.log("MongoDB successfully connected!");


    passport.use('local', new LocalStrategy(
        function(username, password, done) {
            user.findOne({ username: username }, (error, user) => {
                if (error) { return done(error); }
                if (!user) { 
                    console.log('Inside !user')
                    return done(null, false, { message: 'Incorrect username' })}

                bcrypt.compare(password, user.password, (err, data) => {
                        if (!data) {
                            console.log('Inside !data')
                            return done(null, false, { message: 'Incorrect password'})
                        } else {
                console.log(user);
                return done(null, user);
                        }
            })
        })
        }))

    

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
                console.log('User updated successfully !')
            }
        })
    })

    /* after auth sample route */
    /* router.get('/inside', withAuth, (req,res,next) => {
        res.send('Password is potato');
    })

    router.get('/checktoken', withAuth, async (req,res,next) => {
        await console.log('token in /checktoken');
        await console.log(req.cookies.token);
        res.sendStatus(200);
    })  */



    /* login */
    router.post('/passportlogin', (req,res,next) => {
        console.log('inside /passportlogin');
        
        
        passport.authenticate('local', function(err, user, info) {
            if (err) { console.log('inside error'); return next(err) }
            if (!user) { console.log('inside !user'); return res.status(500).json({message: 'User not found'}) }
            req.logIn(user, function(err) {
                console.log("inside login")
                console.log('User: ',user)
                if (err) {
                    console.log(err);
                    return res.status(500).json({message: "Can't logIn"})
                }
                
                    console.log('user is correct??')
                    console.log("req.user: ",req.user)
                    req.session.user = req.user;
                    console.log("req.session.passport.user:",req.session.passport.user)
                    res.status(200).json({ message: 'User authenticated!' })
                
                console.log("req.isAuthenticated(): ",req.isAuthenticated())
            
            })
            
            
            
        }) (req,res,next);

        
    });

   /*  router.post('/passportlogin/callback', (req,res,next) => {
        console.log("inside passportlogin/callback")
        passport.authenticate('local', function(err, user, info) {
            if (err) { console.log('inside error'); return next(err) }
            if (!user) { console.log('inside !user'); return res.status(500).json({message: 'User not found'}) }
            req.logIn(user, function(err) {
                console.log("inside callback logIn")
                if (err) {
                    console.log(err);
                    return res.status(500).json({message: "Can't logIn"})
                } else {
                    console.log('user is correct??')
                    res.status(200).json({ message: 'User authenticated!' })
                }
            })
            
            
            
        }) (req,res,next)
    }) */

    /* router.get('/current_user', (req, res) => {
        console.log('inside /current_user')
        console.log("req.session.passport.user: ")
        console.log(req.session.passport.user);
        res.send(req.session.passport.user);
    }) */

    /*router.post('/authenticate', async (req,res,next) => {
        const username = req.body.username;
        const password = req.body.password;

        user.findOne({ username: req.body.username }, (err, user) => {
            if (err) {
                console.error(err);
                res.status(500)
                .json({ error: '/// Internal error, please try again /// '});
            }
            else if (!user) {
                res.status(601)
                .json({ error: '/// Incorrect username or password ///' });
            }
            else {
                bcrypt.compare(req.body.password, user.password, (err, data) => {
                    if (err) {
                        res.status(500)
                        .json({ error: '/// Internal error, please try again ///'});
                    } else if (!data) {
                        res.status(401)
                        .json({ error: '/// Incorrect username or password ///'});
                    } else {
                        // Issue token 
                        const payload = { username };
                        const token = jwt.sign(payload, secret, {
                            expiresIn: '1h',
                        });
                        console.log('Token in user.routes: ');
                        console.log(JSON.stringify(token));
                        res.cookie('token', token, {httpOnly: true, secure: false });
                        res.sendStatus(200);
                    }
                }) 
            }
        })

    })*/

    /* registration */
    router.route('/create').post((req,res,next) => {
        const userExisted = false;
        user.findOne({ username: req.body.username }).then(user => {
            if (user) {
                userExisted = true;
            }
        });
            if (!userExisted) {
                let newUser = { username: req.body.username, password: req.body.password };
                /*bcrypt.hash(newUser.password, 10, function(err, hashedPassword) {
                    if (err) {
                        next(err);
                    }
                    else {
                        newUser.password = hashedPassword;
                        next();
                    }
                })*/
                bcrypt.genSalt(10)
                .then((salt) => {
                    console.log(`Salt: ${salt}`);
                    return bcrypt.hash(newUser.password, salt);
                }).then((hash) => {
                    console.log(`Hash: ${hash}`);
                    user.insertOne( {
                        username: newUser.username,
                        password: hash
                    }, {strict: false}, (error, data) => {
                        if (error) {
                            console.log(error);
                            return next(error);
                        } else {
                            res.json(data);
                            console.log("/// New user registered! ///")
                        }
    
                    });
                })

                console.log(newUser.password);

                /* user.insertOne( {
                    username: newUser.username,
                    password: 
                }, {strict: false}, (error, data) => {
                    if (error) {
                        console.log(error);
                        return next(error);
                    } else {
                        res.json(data);
                        console.log("/// New user registered! ///")
                    }

                }); */
            }
            else {
                console.log("ERROR: User already exists");
            };
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

    passport.serializeUser((user, done)=> {
        //console.log("inside serialize");
        done(null, user._id);
        //console.log("user._id = ",user._id);
    });

    passport.deserializeUser(function(_id, done) {
        console.log('inside deserialize');
        user.findById(_id, function(err, user) {
         done(err, {username: 'test', password: 'testpass'});
        });
      });



    });


   





  client.close();
module.exports = router;

  


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


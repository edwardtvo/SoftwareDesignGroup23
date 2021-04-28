let express = require('express')
const bcrypt = require("bcryptjs");
const MongoClient = require('mongodb').MongoClient;

let router = express.Router();
require('../models/user-schema').registerModels();
// This is the right model because ^registerModels set it up for us.

const mongoDB_uri = "mongodb+srv://sdgroup23username:sdgroup23pw@cluster0.4pi4i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(mongoDB_uri, {useNewUrlParser: true, useUnifiedTopology: true});
client.connect()
    .then(client => {
        const db = client.db("cluster0");
        const user = db.collection("user");
        const quotehistory = db.collection("quotehistory")
        console.log("MongoDB successfully connected!");

        /* https://stackoverflow.com/questions/28715859/mongodb-nodejs-converting-circular-structure */
        router.route('/').get((req, res, next) => {
            user.find({}).toArray(function (error, data) {
                if (error) throw error;
                res.send(data);
                //console.log(data);
            });

        })

        router.route('/history').get((req, res, next) => {
            quotehistory.find({}).toArray(function (error, data) {
                if (error) throw error;
                res.send(data);
                //console.log(data);
            });

        })

        /* profile management */
        router.route('/update').post((req, res, next) => {
            let filter = {username: req.body.cookie_username};
            console.log('req.body: ', req.body)
            user.findOneAndUpdate(filter, {
                $set: {
                    fullname: req.body.fullname,
                    address1: req.body.address1,
                    address2: req.body.address2,
                    city: req.body.city,
                    state: req.body.state,
                    zip: req.body.zip
                }
            }, {strict: true}, (error, data) => {
                if (error) {
                    res.status(500);
                    console.log(error);
                    return next(error);
                } else {
                    res.status(200).json(data)
                    console.log(`User ${req.body.username} updated successfully !`)
                }
            })
        })

        router.post('/history', (req, res, next) => {
            quotehistory.find({username: req.body.username}).limit(0).toArray((error, result) => {
                if (error) {
                    console.log(`Error trying to find user with username: ${req.body.username} quote history`);
                    res.status(500).json({error: `Error trying to find user with username: ${req.body.username} quote history`})
                } else {
                    console.log(`Quote history found for username: ${req.body.username}`);
                    res.status(200).json(result);
                }
            });


        })

        router.post('/current_user', (req, res) => {
            //console.log("req.body.username: ",req.body.username);

            if (req.body.username === '' || req.body.username === undefined) {
                console.log('Not logged in. req.body.username: ', req.body.username);
                res.status(404).json({error: `Not loggedin. req.body.username: ${req.body.username}`})
            } else {

                user.findOne({username: req.body.username}, (err, user) => {
                    if (err) {
                        console.log("Error inside /current_user route: ", err)
                        res.status(500).json({error: 'Internal error, please try again'})
                    } else if (!user) {
                        console.log("Why did you successfully log in? Who are you ", req.body.username, "?")
                        res.status(600).json({error: 'Illegal login; user not found in database'})
                    } else {
                        console.log('User ', req.body.username, ' information fetched successfully')
                        res.status(200).json(user)
                    }

                })
            }
        })

        router.post('/authenticate', async (req, res, next) => {
            const username = req.body.username;
            console.log('username in /authenticate route: ', username);

            user.findOne({username: req.body.username}, (err, user) => {
                if (err) {
                    console.error(err);
                    res.status(500)
                        .json({error: 'Internal error, please try again'});
                } else if (!user) {
                    res.status(601)
                        .json({error: 'No user with given username found in database'});
                } else {
                    bcrypt.compare(req.body.password, user.password, (err, data) => {
                        if (err) {
                            res.status(500)
                                .json({error: 'Internal error, please try again'});
                        } else if (!data) {
                            res.status(401)
                                .json({error: 'Incorrect password to given username'});
                        } else {
                            res.sendStatus(200);
                        }
                    })
                }
            })

        })

        /* registration */
        router.route('/create').post((req, res, next) => {
            user.findOne({username: req.body.username}).then(account => {
                if (account) {
                    console.log(`User ${req.body.username} existed!`)
                    res.status(500).json('USER_EXISTED')
                } else {
                    let newUser = {username: req.body.username, password: req.body.password};
                    bcrypt.genSalt(10)
                        .then((salt) => {
                            return bcrypt.hash(newUser.password, salt);
                        }).then((hash) => {
                        user.insertOne({
                            username: newUser.username,
                            password: hash
                        }, {strict: false}, (error, data) => {
                            if (error) {
                                console.log(error);
                                return next(error);
                            } else {
                                res.sendStatus(200)
                                console.log(`New user ${newUser.username} registered!`)
                            }

                        });
                    })

                    console.log(newUser.password);

                }

            })
        })

        router.route('/quoteupdate').post((req, res, next) => {
            quotehistory.insertOne({
                username: req.body.username,
                gallons_requested: req.body.gallons_requested,
                delivery_address: req.body.delivery_address,
                delivery_date: req.body.delivery_date,
                price_per_gallon: req.body.price_per_gallon,
                amount_due: req.body.amount_due
            }, {strict: false}, (error, data) => {
                if (error) {
                    console.log(error);
                    return next(error);
                } else {
                    res.status(200).json(data);
                    console.log('/ / / Quote updated successfully ! / / /')
                }
            })
        })
    });

client.close();
module.exports = router;

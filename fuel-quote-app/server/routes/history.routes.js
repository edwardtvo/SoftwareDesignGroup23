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
            quotehistory.find({}).toArray(function(error, data) {
                if (error) throw error;
                res.send(data);
                //console.log(data);
            });

        })

        /* profile management */


        /* registration */

/*
        router.route('/quotecreate').post((req,res,next) => {
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
*/

    })
client.close();

module.exports = router;

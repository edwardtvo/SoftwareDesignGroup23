const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// https://mongoosejs.com/docs/populate.html

let userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String
    },
    password: {
        type: String
    },
    full_name: {
        type: String
    },
    address1: {
        type: String
    },
    address2: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    quotes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Quote'
    }]
}, {
    collection: 'users'
});

let quoteSchema = new Schema({
        _id: mongoose.Schema.Types.ObjectId,
        requested_by: {
            type: mongoose.Schema.Types.ObjectId, ref: 'User'
        },
        gallons_requested: {
            type: Number
        },
        delivery_date: {
            type: Date
        },
        delivery_address: {
            type: String
        }
    },
    {
        collection: 'quotes'
    });

const User = mongoose.model('User', userSchema);
const Quote = mongoose.model('Quote', quoteSchema);
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
module.exports = mongoose.model('User', userSchema);
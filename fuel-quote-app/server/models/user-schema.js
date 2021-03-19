const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// https://mongoosejs.com/docs/populate.html

let quoteSchema = new Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId},
    gallons_requested: Number,
    delivery_date: {type: Date},
    delivery_address: {type: String}
}, {
    collection: 'quotes'
});
let userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
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
    quotes: [quoteSchema]
}, {
    collection: 'users'
});

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
module.exports = mongoose.model('User', userSchema);
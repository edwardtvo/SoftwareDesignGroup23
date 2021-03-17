import Quote from './quote-schema.js'

import mongoose from 'mongoose'
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
        type: mongoose.Schema.Types.ObjectId, ref: Quote
    }]
}, {
    collection: 'users'
});

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
export default mongoose.model('User', userSchema);
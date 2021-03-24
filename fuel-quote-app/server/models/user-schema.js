const mongoose = require('mongoose')
const Schema = mongoose.Schema;
// https://mongoosejs.com/docs/populate.html

let userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        validate: { validator: function (i) {
            const regex = /[a-zA-Z0-9.\-'_]{6,30}$/;
            return regex.test(i);
        }, message: 'Please provide a proper username with at least 6 characters' }
    },
    password: {
        type: String,
        required: true,
        message: 'Please provide a password'
    },
    fullname: {
        type: String,
        //required: true,
        validate: {
            validator: function (i) {
                const regex = /[A-Za-z0-9.\-'\s]{1,100}$/;
                return regex.test(i);
            }, message: 'Please enter a real full name'
        }
    },
    address1: {
        type: String,
        //required: true,
        validate: {
            validator: function (i) {
                const regex = /[A-Za-z0-9.\-',#\s]{1,150}$/;
                return regex.test(i);
            }, message: 'Address is required'
        }
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        //required: true,
        validate: {
            validator: function (i) {
                const regex = /[A-Za-z]{1,100}$/;
                return regex.test(i);
            }, message: 'City is required'
        }
    },
    state: {
        type: String,
        //required: true
    },
    zipcode: {
        type: String,
        //required: true,
        validate: {
            validator: function (i) {
                const regex = /[0-9]{5,9}$/;
                return regex.test(i);
            }, message: 'Please enter a valid zip code'
        }
    },
    quotes: [{
        gallons_requested: {type: Number},
        delivery_date: {type: Date}
    }]
}, {
    collection: 'users'
});

// https://www.sitepoint.com/understanding-module-exports-exports-node-js/
//module.exports = mongoose.model('User', userSchema);

exports.registerModels = function() {
    try {
        mongoose.model('user', userSchema);
    } catch (error) {
        console.log(error)
    }
}
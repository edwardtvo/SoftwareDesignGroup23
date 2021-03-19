const mongoose = require('mongoose');
let database = require('./database/db');
const Schema = mongoose.Schema;



mongoose.connect(database.db, {
    useNewUrlParser: true
}).then(() => {
        console.log('Database connected successfully !')
    },
    error => {
        console.log('Database could not be connected : ' + error)
    }
)

var usernameValidator = [
    { validator: function (i) {
        var regex = /[a-zA-Z0-9\.\-\'\_]{6,30}$/;
        return regex.test(i);
    }, message: 'Please provide a proper username with at least 6 characters' }

    /*{ validator: function(v, cb) {
        User.find({name: v}, function(err,docs){
           cb(docs.length == 0);
        });
      },
      message: 'User already exists!' } */

]


let userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        validate: usernameValidator
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
        validate: {
            validator: function (i) {
                var regex = /[A-Za-z0-9\.\-\'\s]{1,100}$/;
                return regex.test(i);
            }, message: 'Please enter a real full name'
        }
    },
    address1: {
        type: String,
        required: true,
        validate: {
            validator: function (i) {
                var regex = /[A-Za-z0-9\.\-\'\,#\s]{1,150}$/;
                return regex.test(i);
            }, message: 'Address is required'
        }
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true,
        validate: {
            validator: function (i) {
                var regex = /[A-Za-z]{1,100}$/;
                return regex.test(i);
            }, message: 'City is required'
        }
    },
    state: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true,
        validate: {
            validator: function (i) {
                var regex = /[0-9]{5,9}$/;
                return regex.test(i);
            }, message: 'Please enter a valid zip code'
        }
    },
      quoteInfo: [{
          gallons_requested: {type: Number},
          delivery_date: {type: Date}
      }]});

const User = mongoose.model('User', userSchema);

async function saveUser() {
    const newUser = new User({
        username: 'hello1',
        password: 'goodbye',
        fullname: 'Edward Vo',
        address1: '100 Street',
        address2: 'Apt 123',
        city: 'Houston',
        state: 'TX',
        zipcode: '123'

    })

    const result = await newUser.save();
    console.log(result);
}






saveUser();


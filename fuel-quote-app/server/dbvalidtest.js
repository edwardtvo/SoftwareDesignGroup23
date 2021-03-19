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

let userSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (i) {
                var regex = /[a-zA-Z0-9\.\-\'\_]{6,30}$/;
                return regex.test(i);
            }, message: 'Please provide a proper username with at least 6 characters'
        }
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
}, {
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

async function saveUser() {
    const newUser = new User({
        username: 'hello',
        password: 'goodbye'
    })

    const result = await newUser.save();
    console.log(result);
}




saveUser();



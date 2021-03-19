const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let historySchema = new Schema({
    //_id: {type: mongoose.Schema.Types.ObjectId},
    username: {
        type: String,
        //required: true,
        unique: true
    },
    gallons_requested: Number,
    delivery_address: {type: String},
    delivery_date: {type: Date},
    price_per_gallon: Number,
    amount_due: Number
}, {
    collection: 'history'
});

module.exports = mongoose.model('History', historySchema);
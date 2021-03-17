import mongoose from 'mongoose'
const Schema = mongoose.Schema;

let quoteSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    gallons_requested: {
        type: Number
    },
    delivery_date: {
        type: Date
    },
    delivery_address: {
        type: String
    }
}, {
    collection: 'quotes'
});

export default mongoose.model('Quote', quoteSchema);
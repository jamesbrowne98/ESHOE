const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shoeSchema = new Schema({
    name: { type: String, required: true },
    size: { type: Number, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Shoe', shoeSchema);

const mongoose = require('mongoose');

const shoeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Types.ObjectId,
    required: true
},
  name: String,
  size: [Number],
  price: Number
});

module.exports = mongoose.model('shoes', shoeSchema);

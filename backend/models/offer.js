const mongoose = require('mongoose');


const offerShema = mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  name: String,
  sold: Boolean,
  images: [String],
  description: String,
  price: Number,
  category: String,
  dateOfCreation: Date,
  locations: [String],
});


const Offer = mongoose.model('offers', offerShema);

module.exports = Offer; 
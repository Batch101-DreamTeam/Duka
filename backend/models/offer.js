const mongoose = require('mongoose');


const offerShema = mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sellerName: String,
  name: String,
  sold: Boolean,
  images: [String],
  description: String,
  price: Number,
  category: String,
  dateOfCreation: Date,
  locations: [String],
  category: [String],
  // cateories déja définies
});


const Offer = mongoose.model('offers', offerShema);

module.exports = Offer; 
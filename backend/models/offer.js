const mongoose = require('mongoose');

const offerShema = mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  sellerName: String,
  offerTitle: String,
  sold: Boolean,
  images: [String],
  description: String,
  price: Number,
  category: String,
  dateOfCreation: Date,
  locations: [String],
  //categories: [String],
  // categories déja définies
});


const Offer = mongoose.model('offers', offerShema);

module.exports = Offer; 
const mongoose  =  require('mongoose');


const offerShema =  mongoose.Schema  ({
      Seller :  { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
      Sold : Boolean,
      Images : [ String ],
      Description : String,
      Price : Number,
      DateOfCreation : Date,
      Locations : [String],
    });

    
const Offer = mongoose.model('offers', offerShema);

module.exports = offerShema; 
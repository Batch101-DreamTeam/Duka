const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    username: String,
    text: String,
    createdAt: Date
})


const ChatChannelShema = mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    offer: { type: mongoose.Schema.Types.ObjectId, ref: 'offers' },     //ajout pour recuperer offre dans messageBisScreen 
    messages: [messageSchema],
    dateOfCreation: Date,
    online: Boolean,
    name: String,
    rating: { sellerRating: Number, ownerRating: Number },
})

const ChatChannel = mongoose.model('ChatChannels', ChatChannelShema);

module.exports = ChatChannel;
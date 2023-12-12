const mongoose = require('mongoose');

// host et traveller sont des clés liées à pusher (système de chat)
// name concaténation des deux ID utilisateurs  unique 
const chatChannelShema = mongoose.Schema({
    host: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    // changer les noms host = seller  traveller = buyer 
    traveller: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages' }],
    dateOfCreation: Date,
    online: Boolean,
    name: String,
    rating: { sellerRating: Number, ownerRating: Number },
})

const chatChannel = mongoose.model('chatChannels', chatChannelShema);

module.exports = chatChannel;
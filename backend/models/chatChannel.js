const mongoose  =  require('mongoose');

// host et traveller sont des clés liées à pusher (système de chat)
// name concaténation des deux ID utilisateurs  unique 
const chatChannelShema = mongoose.Schema({
    Host: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    // changer les noms host = seller  traveller = buyer 
    Traveller: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    Messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages'}],
    DateOfCreation: Date,
    Online: Boolean,
    Name: String,
    rating: {sellerRating: Number, ownerRating: Number},
})

const chatChannel = mongoose.model('chatChannels', chatChannelShema);

module.exports = chatChannel;
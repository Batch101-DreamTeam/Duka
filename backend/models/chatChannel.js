const mongoose  =  require('mongoose');

//host et traveller sont des clés liées à pusher (système de chat)
const chatChannelShema =  mongoose.Schema({
    Host: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    Traveller: { type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    Messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'messages'}],
    DateOfCreation: Date,
    Online: Boolean,
    Name: String,
})

const chatChannel = mongoose.model('chatChannels', chatChannelShema);

module.exports = chatChannel;
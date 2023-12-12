const mongoose = require('mongoose');

const messageShema = mongoose.Schema({
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    Online: Boolean,
    MessageContent: String,
    DateOfCreation: Date
})

const Message = mongoose.model('messages', messageShema);

module.exports = Message;
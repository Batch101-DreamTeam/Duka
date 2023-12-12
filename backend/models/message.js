const mongoose = require('mongoose');

const messageShema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    online: Boolean,
    messageContent: String,
    dateOfCreation: Date
})

const Message = mongoose.model('messages', messageShema);

module.exports = Message;
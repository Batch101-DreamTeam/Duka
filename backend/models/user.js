const mongoose = require('mongoose');

//host et traveller sont des clés liées à pusher (système de chat)
const userShema = mongoose.Schema({
      username: String,
      isAdmin: Boolean,
      // defaullt false
      mail: String,
      // unique
      password: String,
      // chiffré 
      token: String,
      // clé Token à voir si on ne trouve pas une alt à jwt pr mobile  (token permanant) 
      avatarUrl: String,
      activeAccount: Boolean,
      favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offers' }],
      reputation: Boolean,
      // ou moyenne des notes
      conversations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'chatChannels' }],
      dateOfCreation: Date,
      location: [String]
});

const User = mongoose.model('users', userShema);

module.exports = User; 
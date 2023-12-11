const mongoose  =  require('mongoose');

//host et traveller sont des clés liées à pusher (système de chat)
const userShema =  mongoose.Schema({
      Username : String,
      IsAdmin: Boolean,
      Mail : String,
      Password : String,
      Token : String,
      // clé Token à voir si on ne trouve pas une alt à jwt pr mobile  
      AvatarUrl: String,   
      ActiveAccount: Boolean,
      Favorites: [ { type: mongoose.Schema.Types.ObjectId, ref: 'offers'}],
      Reputation: Boolean,
      // ou moyenne des notes
      Conversations: [ { type: mongoose.Schema.Types.ObjectId, ref: 'chatChannels'}],
      DateOfCreation : Date,
      Location: [String]
});

const User = mongoose.model('users', userShema);

module.exports = User; 
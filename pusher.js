pusher.trigger(  channelChatName  ,   RoleEvent  ,   {   message  :  messageContent   }  ) 
// publication d'un event dans un channelChat

pusher.trigger(  [channelName1, channelName2]  ,   Role  ,   {   message  :  messageContent   }  ) 

// publication d'un event dans 2 channelChat


pousseur.sendToUser(utilisateur,   roleEvent  ,   {   message  :  messageContent   }  ) 

// publication d'un event à un utilisateur validé par websocketId (autorisé par le channelChat)

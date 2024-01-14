var express = require('express');
var router = express.Router();

const Pusher = require('pusher');
const Offer = require("../models/offer");
const User = require('../models/user');
const ChatChannel = require('../models/ChatChannel');



const pusher = new Pusher({
  appId: process.env.PUSHER_APPID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});


// Join chat

router.put('/:chatname/:username', async (req, res) => {
  console.log('Join chat')
  await pusher.trigger(req.params.chatname, 'join', {
    username: req.params.username,
  });

  res.json({ result: true });
});

// Leave chat

router.delete('/:chatname/:username', async (req, res) => {
  console.log('Leave chat')
  await pusher.trigger(req.params.chatname, 'leave', {
    username: req.params.username,
  });

  res.json({ result: true });
});

// Send message

router.post('/', async (req, res) => {
  console.log('send message')
  const tokenBuyer = req.body.tokenBuyer;
  const tokenSeller = req.body.tokenSeller;



  const { idProduct, text, username, chatname, createdAt } = req.body;
  const alreadyFound = await ChatChannel.findOne({ name: chatname });
  await pusher.trigger(chatname, 'message', req.body);

  if (!alreadyFound) {
    let buyer = await User.findOne({ token: tokenBuyer })
    let seller = await User.findOne({ token: tokenSeller })
    // User.updateOne(

    //     { buyer: buyer._id },
    //     { $push: { conversations: { chatname } } }
    // ).exec();


    // User.updateOne(
    //     { seller: seller._id },
    //     { $push: { conversations: { chatname } } }
    // ).exec();


    const newChatChannel = new ChatChannel({
      name: chatname,
      buyer: buyer._id,
      seller: seller._id,
      offer: idProduct,
      dateOfCreation: createdAt,
      online: true,
      messages: {
        username: username,
        text: text,
        createdAt: createdAt,
      },


    })
    // User.updateOne(
    //   { username: buyer.username },
    //   {
    //     $push:
    //       { conversation: _id }
    //   }
    // )
    // User.updateOne(
    //   { username: seller.username },
    //   {
    //     $push:
    //       { conversation: _id }
    //   }
    // )
    newChatChannel.save().then((data) => {

      // console.log(seller.username)
      // console.log(buyer.username)
      // console.log(data._id)
      // const id = data._id;

      // console.log(buyer)
      // User.updateOne(
      //     { username: buyer.username },
      //     { $set: { conversations: { chatname } } }
      // )
      // User.updateOne(
      //     { username: seller.username },
      //     { $set: { conversations: { chatname } } }
      // )
      // User.updateOne(
      //     { _id: buyer._id },
      //     {
      //         $set:
      //         {
      //             conversations: chatname,

      //         }
      //     }
      // )
      // User.updateOne(
      //     { _id: seller._id },
      //     {
      //         $set:
      //         {
      //             conversations: chatname,

      //         }
      //     }
      // )
      // buyer = User.updateOne({
      //   token: tokenBuyer
      // }, { $set: { conversations: chatname } });
      // seller = User.updateOne({
      //   token: tokenSeller
      // }, { $set: { conversations: chatname } });
      // console.log(seller);

      console.log('Save new chat!');

    })

    // User.updateOne(
    //     { buyer: buyer._id },
    //     { $push: { conversations: { chatname } } }
    // ).exec();
    // User.updateOne(
    //     { seller: seller._id },
    //     { $push: { conversations: { chatname } } }
    // ).exec();

    res.json({ result: true });
  }
  else {
    ChatChannel.updateOne(
      { name: chatname },
      { $push: { messages: { username, text, createdAt } } }
    ).exec();
    res.status(400).json({ result: false, message: "chat existe!" })
    console.log('chat existe')
    return
  }
  ;


});

// display previous messages by chatname
router.get('/previousMessages/:chatname', async (req, res) => {

  ChatChannel.findOne({ name: req.params.chatname }).then((resp) => {
    //console.log(resp)
    if (resp) {
      res.json({
        result: true,
        messages: resp.messages,
      })
    } else {
      res.json({
        result: true,
        messages: [],
      })
    }
  });
})


//diplay list of message by idProduct
router.get('/messagesByProduct/:idProduct', async (req, res) => {

  const offerByMessage = await Offer.findOne({ _id: req.params.idProduct })
    .populate('_id');
  // console.log(offerByMessage)
  ChatChannel.find({ offer: req.params.idProduct }).then((resp) => {

    console.log(resp)
    if (resp) {
      res.json({
        result: true,
        messagesProduct: resp,
        product: offerByMessage

      })
    } else {
      res.json({
        result: false,

      })
    }
  });
})


module.exports = router;

var express = require('express');
var router = express.Router();

const Pusher = require('pusher');
// const Offer = require("../models/offer");
const User = require('../models/user')
const ChatChannel = require('../models/chatChannel')



const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});


// Join chat
router.put('/:chatname/:username', async (req, res) => {
    await pusher.trigger(req.params.chatname, 'join', {
        username: req.params.username,
    });

    res.json({ result: true });
});

// Leave chat
router.delete('/:chatname/:username', async (req, res) => {
    await pusher.trigger(req.params.chatname, 'leave', {
        username: req.params.username,
    });

    res.json({ result: true });
});

// Send message
router.post('/', async (req, res) => {
    const tokenBuyer = req.body.tokenBuyer;
    const tokenSeller = req.body.tokenSeller;


    const { text, username, chatname, createdAt } = req.body;
    const alreadyFound = await ChatChannel.findOne({ name: chatname });
    await pusher.trigger(chatname, 'message', req.body);

    const buyer = await User.findOne({ token: tokenBuyer })
        .populate('_id')


    const seller = await User.findOne({ token: tokenSeller })
        .populate('_id')

    if (!alreadyFound) {

        const newChatChannel = new ChatChannel({
            name: chatname,
            buyer: buyer._id,
            seller: seller._id,
            dateOfCreation: createdAt,
            online: true,
            messages: {
                username: username,
                text: text,
                createdAt: createdAt,
            },


        })
        newChatChannel.save().then(() => {
            console.log('Message saved!');
        });
        res.json({ result: true });
    }
    else {
        ChatChannel.updateOne(
            { name: chatname },
            { $push: { messages: { username, text, createdAt } } }
        ).exec();
        res.status(400).json({ result: false, message: "chat existe!" })
        return
    }
    ;


});

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

router.get('/allpreviousMessages/:token', async (req, res) => {
    const token = req.body.token;
    const message = await User.findOne({ token: token })
        .populate('_id')
    console.log(message)
    // ChatChannel.find({ name: req.params.conversation }).then((resp) => {
    //     //console.log(resp)
    //     if (resp) {
    //         res.json({
    //             result: true,
    //             messages: resp.messages,
    //         })
    //     } else {
    //         res.json({
    //             result: true,
    //             messages: [],
    //         })
    //     }
    // });
})

// route pour voir la liste de tous les messages reçus par un user

// router.get('/:token', async (req, res) => {
//     const token = req.body.token;
//     const buyer = await User.findOne({ token: token })
//         .populate('_id')
//     ChatChannel.find({ : req.params.chatname }).then((resp) => {
//         //console.log(resp)
//         if (resp) {
//             res.json({
//                 result: true,
//                 messages: resp.messages,
//             })
//         } else {
//             res.json({
//                 result: true,
//                 messages: [],
//             })
//         }
//     });
// })

// router.get(`/:token`, (req, res) => {
//     User.findOne({ token: req.params.token })
//         .populate({
//             path: 'chatChannels',
//             populate: [{ path: 'seller' }, { path: 'buyer' }],
//         })
//         .then((data) => {
//             if (data) {
//                 res.json({
//                     result: true,
//                     chats: data.chatChannels,
//                 });
//             } else {
//                 res.json({
//                     result: false,
//                     error: 'Aucun contact trouvé',
//                 });
//             }
//         });
// });

module.exports = router;

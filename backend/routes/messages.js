var express = require('express');
var router = express.Router();

const Pusher = require('pusher');
const Offer = require("../models/offer");
const User = require('../models/user')
const Message = require("../models/message");
const ChatChannel = require("../models/ChatChannel")



const pusher = new Pusher({
    appId: process.env.PUSHER_APPID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
});


// const pusher = new Pusher({
//     appId: '1725512',
//     key: '3295d486d5ad2af1a1af',
//     secret: '0b5b1433dbebe12b4bfe',
//     cluster: 'eu',
//     useTLS: false,
//     encryptionMasterKeyBase64: "DkiB1alywjEFoxRKaOeJKZzHSUFqU19TbuJ7Nj2Gl4k=",
// });

// console.log(pusher)


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
    const { text, username, chatname, createdAt } = req.body;
    await pusher.trigger(chatname, 'message', req.body);

    ChatChannel.updateOne(
        { name: chatname },
        { $push: { messages: { username, text, createdAt } } }
    ).exec();

    res.json({ result: true });
});

router.get('/previousMessages/:chatname', async (req, res) => {
    // console.log(chatname)
    ChatChannel.findOne({ name: req.params.chatname }).then((resp) => {
        console.log(resp)
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
//GET /:token - User's chats  
router.get(`/:token`, (req, res) => {
    User.findOne({ token: req.params.token })
        .populate({
            path: 'chatChannels',
            populate: [{ path: 'seller' }, { path: 'buyer' }],
        })
        .then((data) => {
            if (data) {
                res.json({
                    result: true,
                    chats: data.chatChannels,
                });
            } else {
                res.json({
                    result: false,
                    error: 'Aucun contact trouvé',
                });
            }
        });
});

module.exports = router;

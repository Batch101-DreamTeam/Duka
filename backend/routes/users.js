var express = require('express');
var router = express.Router();
const { checkBody } = require('./../modules/checkBody');
const User = require('./../models/user')
const uid2 = require('uid2');
const bcrypt = require('bcrypt');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/connexion', async (req, res, next) => {
  if (!checkBody(req.body, ['mail', 'password'])) { // liste des champs obligatoires (ajouter seller quand on aura des id utilisateurs)
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const alreadyFound = await User.findOne({ mail: req.body.mail })
  if (!alreadyFound) {
    res.status(400).json({ result: false, message: "no user found" })
    return
  }
  if (alreadyFound && bcrypt.compareSync(req.body.password, alreadyFound.password)) {
    // console.log(alreadyFound)
    res.status(200).json({
      result: true, data: {
        username: alreadyFound.username,
        mail: alreadyFound.mail,
        token: alreadyFound.token,
        avatar: alreadyFound.avatarUrl,
      }
    })
  }
  else {
    res.status(400).json({ result: false, message: "bad authentification" })
    return
  }

});


router.post('/inscription', async (req, res, next) => {
  if (!checkBody(req.body, ['username', 'mail', 'password'])) { // liste des champs obligatoires (ajouter seller quand on aura des id utilisateurs)
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  const alreadyFound = await User.findOne({ mail: req.body.mail })
  if (!alreadyFound) {
    const hash = bcrypt.hashSync('password', 10);
    const newUser = new User({
      token: uid2(32),
      username: req.body.username,
      password: hash,
      avatarUrl: "",
      activeAccount: true,
      mail: req.body.mail,
      isAdmin: false,
      favorites: [],
      reputation: true,
      conversations: [],
      dateOfCreation: new Date(),
      location: []
    });



    newUser.save()
      .then((data) => {
        res.status(200).json({
          result: true,
          data: newUser
        })

      })
  }
  else {
    res.status(400).json({
      result: false, message: "user already exists"
    })
    return
  }
});






module.exports = router;

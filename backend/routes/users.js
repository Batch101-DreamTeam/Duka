var express = require('express');
var router = express.Router();
const { checkBody } = require('./../modules/checkBody');
const User = require('./../models/user')
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// route get params req.params.token puis findOne ds dbb  pour choper id
// puis avec user.findOne choper infos affichee ds profil

//ROUTE POUR RECUPERER DEPUIS BACK LES INFOS DE PROFIL DANS LA BDD (nom, prenom, tel, photo, annonces favorites)

router.get('/getProfilInfos/:token', async (req, res) => {

  const potentielUser = await User.findOne({
    token: req.params.token
  });
  if (!potentielUser) {
    console.log(potentielUser)
    return
  }
  const potentielId = potentielUser._id
  //ajouter contact et description au modele users!
  User.findOne({ _id: potentielId }).then(data => {
    res.json({
      result: true,
      username: data.username,
      contact: data.contact,
      description: data.description,
      mail: data.mail,
      avatar: data.avatarUrl,
      location: data.location,
      favorites: data.favorites,

    });
  })
});


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
  //console.log(req.body.password)
  if (!alreadyFound) {
    res.status(400).json({ result: false, message: "no user found" })
    return
  }
  if (alreadyFound && bcrypt.compareSync(req.body.password, alreadyFound.password)) {
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
    const hash = bcrypt.hashSync(req.body.password, 10);
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


router.get('/:token', async (req, res, next) => {
  const argument = req.params.token;
  if (!argument) {
    res.status(400).json({ result: false, message: "wrong request" });
    return
  }
  else {
    const target = await User.findOne({ token: argument });
    if (!target) {
      res.status(400).json({ result: false, message: 'wrong token' })
      return
    }
    else {
      res.status(200).json({ result: true, target });
    }
  }
})



// Route permettant correspondant au bouton Enregistrer les modifications de profil et de mettre à jour la BDD

router.put('/modifyProfil/:idToken', async (req, res) => {
  const profilFields = req.params.idToken;
  if (!profilFields) {
      res.status(400).json({ result: false, message: "wrong request" })
      return
  } else {
      const targettedUser = await User.findOne({ token: profilFields })
      console.log(targettedUser)
      if (!targettedUser) {
          res.status(400).json({ result: false, message: "no user founded" })
          return
      }
      else {
          const profilDetails = {
            username: req.body.username,
            contact: req.body.contact,
            description: req.body.description,
            // mail: targettedUser.mail,
            // location: targettedUser.location,
            // favorites: targettedUser.favorites,
            // avatar: req.body.avatar,
          }
          const modifyUser = await User.findOneAndUpdate({ token: profilFields }, profilDetails, { new: true })
          res.status(200).json({ result: true, message: modifyUser })
      }
  }

}),

module.exports = router;

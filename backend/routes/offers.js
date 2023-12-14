var express = require('express');
var router = express.Router();
const User = require('./../models/user')
const Offer = require("../models/offer");
const { checkBody } = require('../modules/checkBody');
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

router.post('/addOffer', async (req, res) => {
    // verif de l'existence du produit dans la db
    console.log(req.body)
    if (!checkBody(req.body, ['offerTitle', 'description', 'price', 'locations', 'token'])) { // liste des champs obligatoires (ajouter seller quand on aura des id utilisateurs)
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    const potentielUser = await User.findOne({
        // username: req.body.seller,
        token: req.body.token
    });
    if (!potentielUser) {
        //console.log(potentielUser)
        return
    }
    const potentielId = potentielUser._id
    const sellerName = potentielUser.username
    Offer.findOne({ offerTitle: req.body.offerTitle }).then(data => { // seller: req.body.username  verification de si l'offre existe deja dans la bdd avec l'id du vendeur et le nom de l'offre
        console.log(data)
        if (data === null) {
            const newOffer = new Offer({
                sellerName,
                seller: potentielId,//pris dans la bdd
                sold: false,
                offerTitle: req.body.offerTitle,
                images: req.body.images,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                dateOfCreation: req.body.date, // la donnée sera donnée dans le front
                locations: req.body.location, // à récupérer sous forme de liste déroulante dans le front
            })
            newOffer.save()
                .then(offer => {
                    res.json({ result: true, offer })
                })
        } else {
            res.json({ result: false, error: 'Offer already exists' });
        }
    })
});


router.post('/upload', async (req, res) => {
    const photoPath = `./tmp/${uniqid()}.jpg`;
    console.log('req.files', req.files)
    const resultMove = await req.files.photoFromFront.mv(photoPath);
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);

    if (!resultMove) {
        res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false, error: resultMove });
    }
});

router.get('/:offerId', async (req, res, next) => {
    const argument = req.params.offerId;
    if (!argument) {
        res.status(400).json({ result: false, message: "wrong request" })
        return
    }
    else {
        const targettedOffer = await Offer.findOne({ _id: argument })
        if (!targettedOffer) {
            res.status(400).json({ result: false, message: "no offer founded" })
            return
        }
        else {
            res.status(200).json({ result: true, message: targettedOffer })
        }
    }
})



router.post('/search', async (req, res, next) => {
    const allOffers = await Offer.find({
        offerTitle: req.body.offerTitle,

    })
    if (!allOffers.length) {
        res.status(400).json({ result: false, message: 'no offers founded' })
        return
    }
    else {
        res.status(200).json({ result: true, allOffers })
    }
})
// trop de params pas définis :en pause

module.exports = router;
var express = require('express');
var router = express.Router();

const Offer = require("../models/offer");
const { checkBody } = require('../modules/checkBody');
const uniqid = require('uniqid');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

router.post('/addOffer', (req, res) => {
    if (!checkBody(req.body, ['name', 'description', 'price', 'locations'])) { // liste des champs obligatoires (ajouter seller quand on aura des id utilisateurs)
        res.json({ result: false, error: 'Missing or empty fields' });
        return;
    }
    Offer.findOne({ name: req.body.name }).then(data => { // seller: req.body.username  verification de si l'offre existe deja dans la bdd avec l'id du vendeur et le nom de l'offre
        if (data === null) {
            const newOffer = new Offer({
                seller: 'req.body.seller',//le req.body.seller sera  prit dans le reducer (id)
                sold: false,
                name: req.body.name,
                images: 'req.body.images',
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                dateOfCreation: req.body.date, //la donnée sera donnée dans le front
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
    console.log(req.files)
    const resultMove = await req.files.photoFromFront.mv(photoPath);
    const resultCloudinary = await cloudinary.uploader.upload(photoPath);

    fs.unlinkSync(photoPath);

    if (!resultMove) {
        res.json({ result: true, url: resultCloudinary.secure_url });
    } else {
        res.json({ result: false, error: resultMove });
    }

});


module.exports = router;
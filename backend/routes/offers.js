var express = require('express');
var router = express.Router();
const Offer = require("../models/offer");
const { checkBody } = require('../modules/checkBody');

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

module.exports = router;
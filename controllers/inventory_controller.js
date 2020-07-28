const router = require("express").Router();
const db = require("../models");

router.post('/', (req, res) => {
    if (!req.session.user) {
        res.redirect("/auth/login");
    } else {
        db.Inventory.findOne({
            where: {
                restaurantId: req.body.restaurantId,
                wineId: req.body.wineId
            }
        }).then((foundInventory) => {
            if (foundInventory) {
                res.send("inventory exists")
            }
            else {

                db.Inventory.create({
                    restaurantId: req.body.restaurantId,
                    wineId: req.body.wineId,
                    quantity: req.body.wineQuantity
                })
                    .then(inventoryData => {
                        res.json(inventoryData)
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).end()
                    })
            }
        })
    }
})

router.delete('/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect("/auth/login");
    } else {
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then(inventoryData => {
            res.json(inventoryData)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
})
router.put('/:id', (req, res) => {
    if (!req.session.user) {
        res.redirect("/auth/login");
    } else {
        db.Inventory.update({
            quantity: req.body.quantity
        }, {
            where: {
                id: req.params.id
            }
        }).then(inventoryData => {
            res.json(inventoryData)
        }).catch(err => {
            console.log(err);
            res.status(500).end()
        })
    }
});

//WE MIGHT NEED THESE LATER WHO KNOWS

//GET route for all inventory data
// router.get('/', (req, res) => {
//     db.Inventory.findAll({})
//     .then(inventoryData => {
//         res.json(inventoryData)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })

// router.get('/:id', (req, res) => {
//     db.Inventory.findOne({
//         where: {
//             id: req.params.id
//         }
//     }).then(inventoryData => {
//         res.json(inventoryData)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })

// router.get('/withdata/:wineId', (req, res) => {
//     db.Inventory.findAll({
//         where: {
//             wineId: req.params.wineId
//         },
//         include:[db.Restaurant, db.Wine]
//     }).then(inventoryData => {
//         res.json(inventoryData)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })

module.exports = router;
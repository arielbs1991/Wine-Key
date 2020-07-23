const router = require("express").Router();
const db = require("../models");

// router.get("/", function (req, res) {
//     res.redirect("/home");
// });
// // GET route for getting all of the wines
// router.get("/home", function (req, res) {
//     db.Wine.findAll()
//         .then(function (dbWine) {
//             console.log(dbWine);
//             const dbWineJson = dbWine.map(wine => wine.toJSON());
//             var hbsObject = { wine: dbWineJson };
//             return res.render("index", hbsObject);
//         }).catch(function (err) {
//             console.log(err);
//             res.status(500).end()
//         })
// });

router.get('/', (req, res) => {
    db.Wine.findAll({}).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.get("/ininventories", (req, res) => {
    db.Wine.findAll({
        include: [db.Inventory]
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.get("/withdata", (req, res) => {
    db.Wine.findAll({
        include: [db.Inventory]
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.post('/', (req, res) => {
    db.Wine.create({
        wineName: req.body.wineName,
        year: req.body.year,
        variety: req.body.variety,
        InventoryId: req.body.InventoryId,
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.get('/:id', (req, res) => {
    db.Wine.findOne({
        where: {
            id: req.params.id
        }
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.get('/:id/ininventory', (req, res) => {
    db.Wine.findOne({
        where: {
            id: req.params.id
        },
        include: [db.Inventory]
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.delete('/:id', (req, res) => {
    db.Wine.destroy({
        where: {
            id: req.params.id
        }
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.put('/:id', (req, res) => {
    db.Wine.update({
        wineName: req.body.wineName,
        year: req.body.year,
        variety: req.body.variety
    }, {
        where: {
            id: req.params.id
        }
    }).then(wineData => {
        res.json(wineData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
// router.put("/:id/claimWine",(req,res)=>{
//     db.Wine.update({
//         RestaurantId: req.body.RestaurantId
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(wineData => {
//         // res.json(wineData)
//         res.json({claimedBy:req.body.RestaurantId})
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })



module.exports = router;
const router = require("express").Router();
const db = require("../models");


router.get('/', (req, res) => {
    db.Inventory.findAll({}).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.get("/withrestaurants",(req, res) => {
    db.Inventory.findAll({
        include:[db.Restaurant]
    }).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.get("/withdata",(req, res) => {
    db.Inventory.findAll({
        include:[db.Restaurant]
    }).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.post('/', (req, res) => {
    db.Inventory.create({
        quantity: req.body.quantity,
        restaurantId: req.body.restaurantId,
        wineId: req.body.wineId
    }).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.get('/:id', (req, res) => {
    db.Inventory.findOne({
        where: {
            id: req.params.id
        }
    }).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})
router.get('/:id/withrestaurant', (req, res) => {
    db.Inventory.findOne({
        where: {
            id: req.params.id
        },
        include:[db.Restaurant]
    }).then(inventoryData => {
        res.json(inventoryData)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

router.delete('/:id', (req, res) => {
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
})
router.put('/:id', (req, res) => {
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
});



module.exports = router;
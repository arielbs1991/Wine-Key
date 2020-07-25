const router = require("express").Router();
const db = require("../models");

router.post('/', (req, res) => {
    db.Wine.create({
        wineName: req.body.wineName,
        year: req.body.wineYear
    })
        .then(inventoryData => {
            res.json(inventoryData)
        })

        .catch(err => {
            console.log(err);
            res.status(500).end()
        })
})

//WE MIGHT NEED THESE DOWN THE LINE DEPENDING ON MDP

// router.delete('/:id', (req, res) => {
//     db.Wine.destroy({
//         where: {
//             id: req.params.id
//         }
//     }).then(deleted => {
//         res.json(deleted)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })

// router.put('/:id', (req, res) => {
//     db.Wine.update({
//         wineName: req.body.wineName,
//         year: req.body.year,
//         variety: req.body.variety
//     }, {
//         where: {
//             id: req.params.id
//         }
//     }).then(wineData => {
//         res.json(wineData)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// })
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
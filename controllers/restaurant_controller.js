const router = require("express").Router();
const db = require("../models");

//getting all existing restaurants within DB

// router.get('/', (req, res) => {
//     db.Restaurant.findAll({
//         order: [
//             ['restaurantName']
//         ]
//     }).then(dbRestaurant => {
//         res.json(dbRestaurant)
//     }).catch(err => {
//         console.log(err);
//         res.status(500).end()
//     })
// });

router.get('/updaterestaurants', (req, res) => {
    db.Restaurant.findAll({
        order: [
            ['restaurantName']
        ]
    }).then(dbRestaurant => {
        const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
        var hbsObject = { restaurant: dbRestaurantJson };
        return res.render("updaterestaurant", hbsObject);
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

//creating a new restaurant

router.post('/', (req, res) => {
    db.Restaurant.create({
        restaurantName: req.body.restaurantName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address
    }).then(dbRestaurant => {
        res.json(dbRestaurant)
    }).catch(err => {
        console.log(err);
        res.status(500).end()
    })
})

//update restaurant details

router.put("/:id", function (req, res) {
  db.Restaurant.update({
    restaurantName: req.body.restaurantName,
    year: req.body.year,
    variety: req.body.variety
  },
    {
      where: {
        id: req.params.id
      }
    }).then(function (dbRestaurant) {
      console.log(dbRestaurant);
      location.reload();
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

//deleting an existing restaurant
//want to add an "are you sure you want to perform this action? Please enter id to delete this store from the database. This will delete the inventory and the data cannot be recovered." warning.
// router.delete("/restaurant/:id", function (req, res) {
//   db.Restaurant.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbRestaurant) {
//     console.log(dbRestaurant);
//     location.reload();
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).end()
//   })
// });

module.exports = router;

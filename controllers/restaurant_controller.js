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
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
  db.Restaurant.findAll({
    order: [
      ['restaurantName']
    ],
    include: [
      {
        model: db.Inventory,
        include: [db.Wine]
      }
    ]
  }).then(dbRestaurant => {
    db.Wine.findAll({
      order: [
        ['wineName'],
        ['year']
      ]
    })
      .then(dbWine => {
        const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
        const dbWineJson = dbWine.map(wine => wine.toJSON());
        var hbsObject = { restaurant: dbRestaurantJson, wine: dbWineJson };
        return res.render("updaterestaurant", hbsObject);
      }).catch(err => {
        console.log(err);
        res.status(500).end()
      })
  })
}
})

//creating a new restaurant

router.post('/', (req, res) => {
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
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
}
})

//update restaurant details

router.put('/storename/:id', (req, res) => {
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
  db.Restaurant.update({
    restaurantName: req.body.restaurantName
  },
    {
      where: {
        id: req.params.id
      }
    }).then(dbRestaurant => {
      console.log(dbRestaurant);
     res.json(dbRestaurant)
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
  }
});
router.put('/phone/:id', (req, res) => {
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
  db.Restaurant.update({
    phoneNumber: req.body.phoneNumber
  },
    {
      where: {
        id: req.params.id
      }
    }).then(dbRestaurant => {
      console.log(dbRestaurant);
     res.json(dbRestaurant)
    }).catch(err => {
      console.log(err);
      res.status(500).end()
    })
  }
});
router.put('/address/:id', function (req, res) {
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
  db.Restaurant.update({
    address: req.body.address
  },
    {
      where: {
        id: req.params.id
      }
    }).then(function (dbRestaurant) {
      console.log(dbRestaurant);
     res.json(dbRestaurant)
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
  }
});

//deleting an existing restaurant
//want to add an "are you sure you want to perform this action? Please enter id to delete this store from the database. This will delete the inventory and the data cannot be recovered." warning.
router.delete('/:id', function (req, res) {
  if(!req.session.user){
    res.redirect("/auth/login");
  } else{
  db.Restaurant.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbRestaurant) {
    console.log(dbRestaurant);
res.json(dbRestaurant)
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
}
});

module.exports = router;

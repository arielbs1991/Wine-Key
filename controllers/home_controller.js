const router = require("express").Router();
const db = require("../models");

router.get("/", function (req, res) {
  res.redirect("/home");
});

// GET route for getting all of the wines
router.get("/home", function (req, res) {
  db.Wine.findAll({
    order: [
      ['wineName'],
      ['year']
    ],
    include: [
      {
        model: db.Inventory,
        include: [db.Restaurant]
      }]
  })
    .then(function (dbWine) {
      db.Restaurant.findAll({
        order: [
          ['restaurantName']
        ]
      })
        .then(dbRestaurant => {
          const dbWineJson = dbWine.map(wine => wine.toJSON());
          const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
          var hbsObject = { wine: dbWineJson, restaurant: dbRestaurantJson };
          return res.render("index", hbsObject);
        }).catch(function (err) {
          console.log(err);
          res.status(500).end()
        })
    })
});

//GET route for all wines to display in wine catalog
router.get('/api/wines/winecatalog', (req, res) => {
  db.Wine.findAll({
    order: [
      ['wineName'],
      ['year']
    ]
  }).then(dbWine => {
    const dbWineJson = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson };
    return res.render("winecatalog", hbsObject);
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});

//GET route for all wines to display in wine catalog update page
router.get('/api/wines/updatewinecatalog', (req, res) => {
  db.Wine.findAll({
    order: [
      ['wineName'],
      ['year']
    ]
  }).then(dbWine => {
    const dbWineJson = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson };
    return res.render("updatewinecatalog", hbsObject);
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});

//GET route for displaying specific restaurant's inventory and info
router.get("/api/restaurants/:id", function (req, res) {
  db.Restaurant.findOne({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: db.Inventory,
        include: [db.Wine]
      }]
  }).then(dbRestaurant => {
    db.Wine.findAll({
      order: [
        ['wineName'],
        ['year']
      ]
    })
      .then(dbWine => {
        const dbRestaurantJson = dbRestaurant.toJSON();
        const dbWineJson = dbWine.map(wine => wine.toJSON());
        var hbsObject = { restaurant: dbRestaurantJson, wine: dbWineJson };
        return res.render("specificrestaurant", hbsObject);
      })
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});

//GET route for gathering all inventory, restaurant, and wine info by winename/searchedwine
router.get("/api/wines/:wineName", function (req, res) {
  db.Wine.findAll({
    where: {
      wineName: req.params.wineName
    },
    include: [{
      model: db.Inventory,
      include: [db.Restaurant, db.Wine]
    }]
  }).then(dbWine => {
    console.log(dbWine);
    const dbWineJson = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson, name: req.params.wineName };
    return res.render("searchedwine", hbsObject)
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});

module.exports = router;
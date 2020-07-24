const router = require("express").Router();
const db = require("../models");

router.get("/", function (req, res) {
  res.redirect("/home");
});
// GET route for getting all of the wines
router.get("/home", function (req, res) {
  db.Wine.findAll()
    .then(function (dbWine) {
      console.log(dbWine);
      const dbWineJson = dbWine.map(wine => wine.toJSON());
      var hbsObject = { wine: dbWineJson };
      return res.render("index", hbsObject);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

router.get('/api/wines/winecatalog', (req, res) => {
  db.Wine.findAll({}).then(dbWine => {
      // res.json(dbWine)
      const [dbWineJson] = dbWine.map(wine => wine.toJSON());
      var hbsObject = { wine: dbWineJson };
      console.log(dbWineJson);
      return res.render("winecatalog", dbWineJson);
  }).catch(err => {
      console.log(err);
      res.status(500).end()
  })
})

router.get("/api/restaurants/:id", function (req, res) {
  db.Restaurant.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {model: db.Inventory,
      include: [db.Wine]
    }
    ]
  }).then(function (dbRestaurant) {
    // console.log("found restaurant",dbRestaurant);
    const [dbRestaurantJson] = dbRestaurant.map(restaurant => restaurant.toJSON());
    var hbsObject = { restaurant: dbRestaurantJson };
    console.log(dbRestaurantJson);
    return res.render("specificrestaurant", dbRestaurantJson);
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});

// router.get("/searchedwine", function (req, res) {
//   db.Wine.findAll()
//     .then(function (dbWine) {
//       console.log(dbWine);
//       const dbWineJson = dbWine.map(wine => wine.toJSON());
//       var hbsObject = { wine: dbWineJson };
//       return res.render("searchedwine", hbsObject);
//     }).catch(function (err) {
//       console.log(err);
//       res.status(500).end()
//     })
// });

router.get("/api/wines/:wineName", function (req, res) {
  db.Wine.findAll({
    where: {
      wineName: req.params.wineName
    },
    include: [{
      model: db.Inventory,
      include: [
        db.Restaurant
      ]
    }]
  }).then(dbWine => {
    // res.json(dbWine)
    const dbWineJson = dbWine.map(wine => wine.toJSON());
      var hbsObject = { wine: dbWineJson };
    res.render("searchedwine", dbWineJson)
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
})

module.exports = router;
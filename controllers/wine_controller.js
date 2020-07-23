
var express = require("express");

var router = express.Router();

var db = require("../models");


router.get("/", function(req, res) {

  res.redirect("/wine");
});


// GET route for getting all of the wines
router.get("/wine", function (req, res) {
  db.Wine.findAll()
    .then(function (dbWine) {
      console.log(dbWine);
      const dbWineJson = dbWine.map(wine => wine.toJSON());
      var hbsObject = { wine: dbWineJson };
      return res.render("index",hbsObject);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

// Get route for retrieving a single Wine
router.get("/wine/:id", function (req, res) {
  db.Wine.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (dbWine) {
    console.log(dbWine);
    const dbWineJson = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson };
    return res.render("index", hbsObject);
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});

// Get route for returning wines of a specific restaurant
// router.get("/wine/restaurant/:restaurant", function (req, res) {
//   db.Wine.findAll({
//     where: {
//       restaurant: req.params.restaurant
//     }
//   }).then(function (dbWine) {
//     console.log(dbWine);
//     const dbWineJson = dbWine.map(wine => wine.toJSON());
//     var hbsObject = { wine: dbWineJson };
//     return res.render("index", hbsObject);
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).end()
//   })
// });

// Wine route for saving a new Wine
router.post("/wine/:id", function (req, res) {
  db.Wine.create({
    wineName: req.body.wineName,
    year: req.body.year,
    variety: req.body.variety
  }).then(function (dbWine) {
    console.log(dbWine);
    res.redirect("/");
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});

router.delete("/wine/:id", function (req, res) {
  db.Wine.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (dbWine) {
    console.log(dbWine);
    res.redirect("/");
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});


router.put("/api/wine/update/:id", function (req, res) {
  db.Wine.update({
    wineName: req.body.wineName,
    year: req.body.year,
    variety: req.body.variety
  },
    {
      where: {
        id: req.params.id
      }
    }).then(function (dbWine) {
      console.log(dbWine);
      res.redirect("/");
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

module.exports = router;

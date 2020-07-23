const router = require("express").Router();
const db = require("../models");

router.get("/", function(req, res) {
    res.redirect("/home");
  });
  // GET route for getting all of the wines
  router.get("/home", function (req, res) {
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

    module.exports = router;
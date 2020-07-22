var express = require("express");
var router = express.Router();
var db = require("../models/");
router.get("/", function(req, res) {
  res.redirect("/wine");
});
router.get("/wine", function(req, res) {
  db.Wine.findAll()
    .then(function(dbWine) {
      console.log(dbWine);
      const dbWinesJson = dbWine.map(wine=>wine.toJSON());
      var hbsObject = { wine: dbWinesJson };
      return res.render("index", hbsObject);
    });
});
// router.post("/wine/create", function(req, res) {
//   db.Wine.create({
//     wine_name: req.body.wine_name
//   }).then(function(dbWine) {
//       console.log(dbWine);
//       res.redirect("/");
//     });
// });
// router.put("/wine/update/:id", function(req, res) {
//   db.Wine.update({
//     devoured: true
//   },
//   {
//     where: {
//       id: req.params.id
//     }
//   }
//   ).then(function(dbWine) {
//     res.json("/");
//   });
// });
module.exports = router;
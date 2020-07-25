const router = require("express").Router();
const db = require("../models");

router.get("/", function (req, res) {
  res.redirect("/home");
});
// GET route for getting all of the wines
router.get("/home", function (req, res) {
  //for dropdown search later on
  // const wineArray = [];
  db.Wine.findAll()
    .then(function (dbWine) {
      // console.log(dbWine);
      const dbWineJson = dbWine.map(wine => wine.toJSON());
      var hbsObject = { wine: dbWineJson };
      // wineArray.push(dbWineJson);
      return res.render("index", hbsObject);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

//do we want to be able to see which restaurants have the wine from the catalog or no? I don't think we need to since we're returning the locations in the search function.
router.get('/api/wines/winecatalog', (req, res) => {
  db.Wine.findAll({}).then(dbWine => {
    // res.json(dbWine)
    const [dbWineJson] = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson };
    // console.log(dbWineJson);
    return res.render("winecatalog", dbWineJson);
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
})

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
    db.Wine.findAll({})
      .then(dbWine => {
        const dbRestaurantJson = dbRestaurant.toJSON();
        const dbWineJson = dbWine.map(wine => wine.toJSON());
        var hbsObject = { restaurant: dbRestaurantJson, wine:dbWineJson };
        // console.log(dbRestaurantJson);
        return res.render("specificrestaurant", hbsObject);
      })
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});

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
    // res.json(dbWine)
    console.log(dbWine);
    const dbWineJson = dbWine.map(wine => wine.toJSON());
    var hbsObject = { wine: dbWineJson, name: req.params.wineName};
    // res.json(hbsObject);
    return res.render("searchedwine", hbsObject)
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
});
//we were looking at this route, everything is working but table is not populating on searchedwine.handlebars, seems like a disconnect b/t this controller and the index ajax click function, also it's exactly the same as the above router query
// router.get("/api/wines/ininventories/:wineName", (req, res) => {
//   db.Wine.findAll({
//       where: {
//           wineName: req.body.wineName
//       },
//       include: [
//           {
//               model: db.Inventory,
//               include: [db.Restaurant]
//           }]
//   }).then(wineData => {
//       res.json(wineData)
//       res.render("searchedwine", wineData)
//   }).catch(err => {
//       console.log(err);
//       res.status(500).end()
//   })
// });

module.exports = router;
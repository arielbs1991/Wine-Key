const router = require("express").Router();
const db = require("../models");
  
// getting all existing restaurants within DB

router.get('/',(req,res)=>{
  db.Restaurant.findAll({
  }).then(restaurantData=>{
      res.json(restaurantData)
  }).catch(err=>{
      console.log(err);
      res.status(500).end()
  })
})

//creating a new restaurant

router.post('/',(req,res)=>{
  db.Restaurant.create({
      restaurantName:req.body.restaurantName,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address
  }).then(restaurantData=>{
      res.json(restaurantData)
  }).catch(err=>{
      console.log(err);
      res.status(500).end()
  })
})




// GET route for getting all of the restaurants
router.get("/restaurant", function (req, res) {
    var query = {};
    if (req.query.restaurant_id) {
        query.RestaurantId = req.query.restaurant_id;
    }
  db.Restaurant.findAll({
      where: query,
      include: [db.Restaurant]
  }).then(function (dbRestaurant) {
      console.log(dbRestaurant);
      const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
      var hbsObject = { restaurant: dbRestaurantJson };
      return res.render("index",hbsObject);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end()
    })
});

//handled in home_controller now
// Get route for retrieving a single Restaurant
// router.get("/:id", function (req, res) {
//   db.Restaurant.findOne({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbRestaurant) {
//     console.log(dbRestaurant);
//     const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
//     var hbsObject = { restaurant: dbRestaurantJson };
//     return res.render("specificrestaurant", hbsObject);
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).end()
//   })
// });

//function for creating a new restaurant
router.post("/api/restaurant", function (req, res) {
 db.Restaurant.create(req.body).then(function (dbRestaurant) {
    console.log(dbRestaurant);
    res.json(dbRestaurant);
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});

// // Get route for returning restaurants of a specific restaurant
// router.get("/restaurant/:id", function (req, res) {
//   db.Restaurant.findAll({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbRestaurant) {
//     // console.log("found restaurant",dbRestaurant);
//     const [dbRestaurantJson] = dbRestaurant.map(restaurant => restaurant.toJSON());
//     var hbsObject = { restaurant: dbRestaurantJson };
//     console.log(dbRestaurantJson);
//     return res.render("specificrestaurant", dbRestaurantJson);
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).end()
//   })
// });

// Restaurant route for saving a new Restaurant
router.post("/restaurant/:id", function (req, res) {
  db.Restaurant.create({
    restaurantName: req.body.restaurantName,
    year: req.body.year,
    variety: req.body.variety
  }).then(function (dbRestaurant) {
    console.log(dbRestaurant);
    res.redirect("/");
  }).catch(function (err) {
    console.log(err);
    res.status(500).end()
  })
});

// router.delete("/restaurant/:id", function (req, res) {
//   db.Restaurant.destroy({
//     where: {
//       id: req.params.id
//     }
//   }).then(function (dbRestaurant) {
//     console.log(dbRestaurant);
//     res.redirect("/");
//   }).catch(function (err) {
//     console.log(err);
//     res.status(500).end()
//   })
// });


// router.put("/api/restaurant/update/:id", function (req, res) {
//   db.Restaurant.update({
//     restaurantName: req.body.restaurantName,
//     year: req.body.year,
//     variety: req.body.variety
//   },
//     {
//       where: {
//         id: req.params.id
//       }
//     }).then(function (dbRestaurant) {
//       console.log(dbRestaurant);
//       res.redirect("/");
//     }).catch(function (err) {
//       console.log(err);
//       res.status(500).end()
//     })
// });

module.exports = router;

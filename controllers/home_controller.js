const router = require("express").Router();
const db = require("../models");

// router.get("/", function (req, res) {
//   res.redirect("/home");
// });

router.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    res.render("/home", req.session.user)
  }
});

// GET route for getting all of the wines and restaurants for homepage load
router.get("/home", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
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
      .then(dbWine => {
        db.Restaurant.findAll({
          order: [
            ['restaurantName']
          ]
        })

          .then(dbRestaurant => {
            const dbWineJson = dbWine.map(wine => wine.toJSON());
            const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
            const wineNames = dbWineJson.map(wineObj => {
              return wineObj.wineName;
            })
            const dbNoDupe = wineNames.filter((value, index) => wineNames.indexOf(value) !== index)
            console.log(dbWineJson, dbNoDupe)
            //create a variable to save first wineName, second var to save second wineName, foreach if wineone !== wineTwo push into array. And then map that array as a unique handlebars object


            var hbsObject = { wine: dbWineJson, restaurant: dbRestaurantJson, wineNames: dbNoDupe };
            return res.render("index", hbsObject);
          })
      }).catch(err => {
        console.log(err);
        res.status(500).end()
      })
  }
});

//Currently can't get navbar on specific restaurant page to dropdown list of restaurants WHILE having a specific restaurant grabbed by id shown with handlebars. Probably a question for instructors.

router.get("/api/restaurants/:id", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    db.Restaurant.findAll({
      order: [
        ['restaurantName']
      ],
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
          const dbWineJson = dbWine.map(wine => wine.toJSON());
          const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
          db.Restaurant.findOne({
            where: {
              id: req.params.id
            },
            include: [
              {
                model: db.Inventory,
                include: { model: db.Wine }
              }]
          }).then(oneRes => {
            const dbOneRes = oneRes.toJSON();
            var hbsObject = { restaurant: dbRestaurantJson, wine: dbWineJson, oneRestaurant: dbOneRes };
            return res.render("specificrestaurant", hbsObject);
          })
        }).catch(err => {
          console.log(err);
          res.status(500).end()
        })
    })
  }
})

//GET route for displaying specific restaurant's inventory and info

//While trying to get above code to work, I somehow screwed up the alphebetized display in the inventory.

router.get("/api/restaurants/:id", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
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
  }
});

//GET route for all wines to display in wine catalog and restaurant names for navbar
router.get('/api/wines/winecatalog', (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
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
      .then(dbWine => {
        db.Restaurant.findAll({
          order: [
            ['restaurantName']
          ]
        })
          .then(dbRestaurant => {
            const dbWineJson = dbWine.map(wine => wine.toJSON());
            const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
            var hbsObject = { wine: dbWineJson, restaurant: dbRestaurantJson };
            return res.render("winecatalog", hbsObject);
          }).catch(err => {
            console.log(err);
            res.status(500).end()
          })
      })
  }
});

//GET route for all wines to display in wine catalog update page and restaurants in navbar
router.get('/api/wines/updatewinecatalog', (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
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
      .then(dbWine => {
        db.Restaurant.findAll({
          order: [
            ['restaurantName']
          ]
        })
          .then(dbRestaurant => {
            const dbWineJson = dbWine.map(wine => wine.toJSON());
            const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
            var hbsObject = { wine: dbWineJson, restaurant: dbRestaurantJson };
            return res.render("updatewinecatalog", hbsObject);
          }).catch(err => {
            console.log(err);
            res.status(500).end()
          })
      })
  }
});

//GET route for gathering all inventory, restaurant, and wine info by winename/searchedwine
router.get("/api/wines/:wineName", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
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
  }


});

router.get("/api/myWine/all", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    db.Wine.findAll({
      order: [
        ['wineName'],
        ['year']
      ]
    })
      .then(dbWine => {
        const dbWineJson = dbWine.map(wine => wine.toJSON())
        const wineNames = dbWineJson.map(wineObj => {
          return wineObj.wineName;
        })
        const dbNoDupe = wineNames.filter((value, index) => wineNames.indexOf(value) !== index)
        res.json(dbNoDupe)
      })
      .catch(err => {
        console.log(err);
        res.status(500).end()
      })
  }
});
module.exports = router;
const router = require("express").Router();
const db = require("../models");

//GET route for Home page if logged in, else, redirects to login page
router.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    res.redirect("/home")
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
            const dbNoDupe = []
            wineNames.forEach((name) => {
              if (!dbNoDupe.includes(name)) {
                dbNoDupe.push(name);
              }
            })
            var hbsObject = { wine: dbWineJson, restaurant: dbRestaurantJson, wineNames: dbNoDupe };
            return res.render("index", hbsObject);
          })
      }).catch(err => {
        console.log(err);
        res.status(500).end()
      })
  }
});

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
          include: { model: db.Wine },
         
        }],
        order: [
          [db.Inventory, db.Wine, 'wineName', 'asc'],
          [db.Inventory, db.Wine, 'year', 'asc']
        ]
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
          console.log("dbwinejson from restaurant:id", dbWineJson);
          var hbsObject = { oneRestaurant: dbRestaurantJson, wine: dbWineJson };
          console.log("hbsobj", hbsObject.oneRestaurant);
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

router.get("/api/myWines/all", (req, res) => {
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
        const dbNoDupe = []
        wineNames.forEach((name) => {
          if (!dbNoDupe.includes(name)) {
            dbNoDupe.push(name);
          }
        })
        console.log(dbNoDupe);
        res.json(dbNoDupe)
      })
      .catch(err => {
        console.log(err);
        res.status(500).end()
      })
  }
});

router.get("/api/myRestaurants/all", (req, res) => {
  if (!req.session.user) {
    res.redirect("/auth/login");
  } else {
    db.Restaurant.findAll({
      order: [
        ['restaurantName']
      ]
    })
      .then(dbRestaurant => {
        const dbRestaurantJson = dbRestaurant.map(restaurant => restaurant.toJSON());
        antiDbRestaurantJson = dbRestaurantJson.reverse()
        res.json(antiDbRestaurantJson);
      })

      .catch(err => {
        console.log(err);
        res.status(500).end()
      })
  }
});


module.exports = router;
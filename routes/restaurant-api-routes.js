// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our Todo model
var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the Restaurants
  app.get("/api/restaurant", function (req, res) {
    db.Restaurant.findAll({
      include: [db.Wine]
    }).then(function (dbRestaurant) {
      res.json(dbRestaurant)
      }).catch(function (err) {
        console.log(err);
        res.status(500).end();
    })
    // Add sequelize code to find all Restaurants, and return them to the user with res.json
  });

  // Get route for retrieving a single Restaurant
  app.get("/api/restaurant/:id", function (req, res) {
    db.Restaurant.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Wine]
    }).then(function (dbRestaurant) {
      res.json(dbRestaurant)
      }).catch(function (err) {
        console.log(err);
        res.status(500).end();
    })
    // Add sequelize code to find a single Restaurant where the id is equal to req.params.id,
    // return the result to the user with res.json
  });
  // Wine route for saving a new Restaurant in Restaurant
  app.post("/api/restaurant", function (req, res) {
    db.Restaurant.create({
      restaurantName: req.body.restaurantName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    }).then(function (Restaurant) {
      res.json(Restaurant);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end();
    })
    // Add sequelize code for creating a Restaurant using req.body,
    // then return the result using res.json
  });
  // DELETE route for deleting Restaurants
  app.delete("/api/restaurant/:id", function (req, res) {
    db.Restaurant.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (Restaurant) {
      res.json(Restaurant);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end();
    })
    // Add sequelize code to delete a Restaurant where the id is equal to req.params.id, 
    // then return the result to the user using res.json
  });
  // PUT route for updating restaurants in Restaurant
  app.put("/api/restaurant", function (req, res) {
    db.Restaurant.update({
        restaurantName: req.body.restaurantName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    }).then(function(Restaurant) {
      res.json(Restaurant);
    }).catch(function(err) {
      console.log(err);
      res.status(500).end();
    })
    // Add code here to update a Restaurant using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
  });
};
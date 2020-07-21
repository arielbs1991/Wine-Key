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

// Get route for returning wines of a specific restaurant
app.get("/api/wines/restaurant/:restaurant", function (req, res) {
  db.Wine.findAll({
    where: {
      restaurant: req.params.restaurant
    }
  }).then(function (dbWine) {
    res.json(dbWine)
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  })
  // Add sequelize code to find all wines where the restaurant is equal to req.params.restaurant,
  // return the result to the user with res.json
});
// Get route for retrieving a single Wine
app.get("/api/wines/:id", function (req, res) {
  db.Wine.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (dbWine) {
    res.json(dbWine)
    }).catch(function (err) {
      console.log(err);
      res.status(500).end();
  })
  // Add sequelize code to find a single Wine where the id is equal to req.params.id,
  // return the result to the user with res.json
});
// Wine route for saving a new Wine
app.post("/api/wines", function (req, res) {
  db.Wine.create({
    title: req.body.title,
    body: req.body.body,
    restaurant: req.body.restaurant
  }).then(function (Wine) {
    res.json(Wine);
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  })
  // Add sequelize code for creating a Wine using req.body,
  // then return the result using res.json
});
// DELETE route for deleting wines
app.delete("/api/wines/:id", function (req, res) {
  db.Wine.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (Wine) {
    res.json(Wine);
  }).catch(function (err) {
    console.log(err);
    res.status(500).end();
  })
  // Add sequelize code to delete a Wine where the id is equal to req.params.id, 
  // then return the result to the user using res.json
});
// PUT route for updating wines
app.put("/api/wines", function (req, res) {
  db.Wine.update({
    title: req.body.title,
    body: req.body.body,
    restaurant: req.body.restaurant
  }).then(function(Wine) {
    res.json(Wine);
  }).catch(function(err) {
    console.log(err);
    res.status(500).end();
  })
  // Add code here to update a Wine using the values in req.body, where the id is equal to
  // req.body.id and return the result to the user using res.json
});
};
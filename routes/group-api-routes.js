// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************
// Dependencies
// =============================================================
// Requiring our Todo model ?????????????????????????????????????????????
var db = require("../models");
// Routes
// =============================================================
module.exports = function (app) {
  // GET route for getting all of the restaurants 
  app.get("/api/restaurants", function (req, res) {
    db.Restaurant.findAll({}).then(function (dbRestaurant) {
      res.json(dbRestaurant)
      }).catch(function (err) {
        console.log(err);
        res.status(500).end();
    })
    // Add sequelize code to find all wines, and return them to the user with res.json
  });
  
};
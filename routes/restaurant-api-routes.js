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
  // GET route for getting all of the Restaurants in Company
  app.get("/api/company", function (req, res) {
    db.Company.findAll({}).then(function (dbCompany) {
      res.json(dbCompany)
      }).catch(function (err) {
        console.log(err);
        res.status(500).end();
    })
    // Add sequelize code to find all Restaurants in Company, and return them to the user with res.json
  });

  // Get route for retrieving a single Restaurant
  app.get("/api/company/:id", function (req, res) {
    db.Company.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (dbCompany) {
      res.json(dbCompany)
      }).catch(function (err) {
        console.log(err);
        res.status(500).end();
    })
    // Add sequelize code to find a single Restaurant where the id is equal to req.params.id,
    // return the result to the user with res.json
  });
  // Wine route for saving a new Restaurant in Company
  app.post("/api/company", function (req, res) {
    db.Company.create({
      restaurantName: req.body.restaurantName,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
    }).then(function (Company) {
      res.json(Company);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end();
    })
    // Add sequelize code for creating a Company using req.body,
    // then return the result using res.json
  });
  // DELETE route for deleting restaurants in Company
  app.delete("/api/company/:id", function (req, res) {
    db.Company.destroy({
      where: {
        id: req.params.id
      }
    }).then(function (Company) {
      res.json(Company);
    }).catch(function (err) {
      console.log(err);
      res.status(500).end();
    })
    // Add sequelize code to delete a Company where the id is equal to req.params.id, 
    // then return the result to the user using res.json
  });
  // PUT route for updating restaurants in Company
  app.put("/api/company", function (req, res) {
    db.Company.update({
        restaurantName: req.body.restaurantName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
    }).then(function(Company) {
      res.json(Company);
    }).catch(function(err) {
      console.log(err);
      res.status(500).end();
    })
    // Add code here to update a Company using the values in req.body, where the id is equal to
    // req.body.id and return the result to the user using res.json
  });
};
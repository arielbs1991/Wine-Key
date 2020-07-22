// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // company route loads cms.html
  app.get("/company", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/company.html"));
  });

  // restaurant route loads blog.html
  app.get("/restaurant", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/restaurant.html"));
  });

};

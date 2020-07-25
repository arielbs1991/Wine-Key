var express = require("express");
var app = express();

var db = require("./models");


app.use(express.static("public"));


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// var routes = require("./controllers/wine_controller.js");

const inventoryRoutes = require("./controllers/inventory_controller.js");
app.use("/api/inventories", inventoryRoutes);
const wineRoutes = require("./controllers/wine_controller.js");
app.use("/api/wines", wineRoutes);
const restaurantRoutes = require("./controllers/restaurant_controller.js");
app.use("/api/restaurants", restaurantRoutes);
const homeRoutes = require("./controllers/home_controller.js");
app.use("/", homeRoutes);

var PORT = process.env.PORT || 3000;
//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force:false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

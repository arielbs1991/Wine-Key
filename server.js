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

// const restaurantRoutes = require("./controllers/restaurant.js");
// app.use("/api/restaurant", restaurantRoutes);

// const routes = require("./controllers/wine_controller.js");
// app.use(routes);
// var routes = require("./controllers/wine_controller.js");
// const inventoryRoutes = require("./controllers/inventory_controllers.js");
// app.use("/api/inventories", inventoryRoutes);
// const wineRoutes = require("./controllers/wine_controllers.js");
// app.use("/api/wines", wineRoutes);
// const wineRoutes = require("./controllers/wine_controllers.js");
// app.use("/api/wines", wineRoutes);

const restaurantRoutes = require("./controllers/restaurant.js");
app.use("/api/restaurant", restaurantRoutes);

var PORT = process.env.PORT || 3000;
//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force:false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

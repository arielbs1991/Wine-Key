const express = require("express");
const app = express();
const db = require("./models");
const exphbs = require("express-handlebars");
const session = require('express-session')

var PORT = process.env.PORT || 3000;

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: "keyboard cat",
  resave: false,
  saveUninitialized: true,
  cookie: {
      maxAge: 720000
  }
}))

app.use(express.static("public"));

const authRoutes = require("./controllers/auth_controller.js");
app.use("/auth", authRoutes);
const inventoryRoutes = require("./controllers/inventory_controller.js");
app.use("/api/inventories", inventoryRoutes);
const wineRoutes = require("./controllers/wine_controller.js");
app.use("/api/wines", wineRoutes);
const restaurantRoutes = require("./controllers/restaurant_controller.js");
app.use("/api/restaurants", restaurantRoutes);
const homeRoutes = require("./controllers/home_controller.js");
app.use("/", homeRoutes);

//TODO: once our db is where we want it, change to force:false
db.sequelize.sync({ force:true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

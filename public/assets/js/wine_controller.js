$(document).ready(function() {
    // Getting jQuery references to the wine body, title, form, and restaurant select
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var cmsForm = $("#cms");
    var restaurantSelect = $("#restaurant");
    // Adding an event listener for when the form is submitted
    $(cmsForm).on("submit", handleFormSubmit);
    // Gets the part of the url that comes after the "?" (which we have if we're updating a wine)
    var url = window.location.search;
    var wineId;
    var restaurantId;
    // Sets a flag for whether or not we're updating a wine to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the wine id from the url
    // In '?wine_id=1', wineId is 1
    if (url.indexOf("?wine_id=") !== -1) {
      wineId = url.split("=")[1];
      getWineData(wineId, "wine");
    }
    // Otherwise if we have an restaurant_id in our url, preset the restaurant select box to be our Restaurant
    else if (url.indexOf("?restaurant_id=") !== -1) {
      restaurantId = url.split("=")[1];
    }
  
    // Getting the restaurants, and their wines
    getRestaurants();
  
    // A function for handling what happens when the form to create a new wine is submitted
    function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the wine if we are missing a body, title, or restaurant
      if (!titleInput.val().trim() || !bodyInput.val().trim() || !restaurantSelect.val()) {
        return;
      }
      // Constructing a newWine object to hand to the database
      var newWine = {
        title: titleInput
          .val()
          .trim(),
        body: bodyInput
          .val()
          .trim(),
        RestaurantId: restaurantSelect.val()
      };
  
      // If we're updating a wine run updateWine to update a wine
      // Otherwise run submitWine to create a whole new wine
      if (updating) {
        newWine.id = wineId;
        updateWine(newWine);
      }
      else {
        submitWine(newWine);
      }
    }
  
    // Submits a new wine and brings user to wine page upon completion
    function submitWine(wine) {
      $.wine("/api/wines", wine, function() {
        window.location.href = "/wine";
      });
    }
  
    // Gets wine data for the current wine if we're editing, or if we're adding to an restaurant's existing wines
    function getWineData(id, type) {
      var queryUrl;
      switch (type) {
      case "wine":
        queryUrl = "/api/wines/" + id;
        break;
      case "restaurant":
        queryUrl = "/api/restaurants/" + id;
        break;
      default:
        return;
      }
      $.get(queryUrl, function(data) {
        if (data) {
          console.log(data.RestaurantId || data.id);
          // If this wine exists, prefill our cms forms with its data
          titleInput.val(data.title);
          bodyInput.val(data.body);
          restaurantId = data.RestaurantId || data.id;
          // If we have a wine with this id, set a flag for us to know to update the wine
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // A function to get Restaurants and then render our list of Restaurants
    function getRestaurants() {
      $.get("/api/restaurants", renderRestaurantList);
    }
    // Function to either render a list of restaurants, or if there are none, direct the user to the page
    // to create an restaurant first
    function renderRestaurantList(data) {
      if (!data.length) {
        window.location.href = "/restaurants";
      }
      $(".hidden").removeClass("hidden");
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createRestaurantRow(data[i]));
      }
      restaurantSelect.empty();
      console.log(rowsToAdd);
      console.log(restaurantSelect);
      restaurantSelect.append(rowsToAdd);
      restaurantSelect.val(restaurantId);
    }
  
    // Creates the restaurant options in the dropdown
    function createRestaurantRow(restaurant) {
      var listOption = $("<option>");
      listOption.attr("value", restaurant.id);
      listOption.text(restaurant.name);
      return listOption;
    }
  
    // Update a given wine, bring user to the wine page when done
    function updateWine(wine) {
      $.ajax({
        method: "PUT",
        url: "/api/wines",
        data: wine
      })
        .then(function() {
          window.location.href = "/wine";
        });
    }
  });
  
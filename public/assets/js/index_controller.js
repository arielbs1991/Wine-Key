$(document).ready(function() {
  /* global moment */

  // blogContainer holds all of our wine
  var blogContainer = $(".blog-container");
  var wineCategorySelect = $("#category");
  // Click events for the edit and delete buttons
  $(document).on("click", "button.delete", handleWineDelete);
  $(document).on("click", "button.edit", handleWineEdit);
  // Variable to hold our wine
  var wine;

  // The code below handles the case where we want to get blog wine for a specific Restaurant
  // Looks for a query param in the url for restaurant_id
  var url = window.location.search;
  var restaurantId;
  if (url.indexOf("?restaurant_id=") !== -1) {
    restaurantId = url.split("=")[1];
    getWine(restaurantId);
  }
  // If there's no restaurantId we just get all wine as usual
  else {
    getWine();
  }


  // This function grabs wine from the database and updates the view
  function getWine(restaurant) {
    restaurantId = restaurant || "";
    if (restaurantId) {
      restaurantId = "/?restaurant_id=" + restaurantId;
    }
    $.get("/api/wine" + restaurantId, function(data) {
      console.log("wine", data);
      wine = data;
      if (!wine || !wine.length) {
        displayEmpty(restaurant);
      }
      else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete wine
  function deleteWine(id) {
    $.ajax({
      method: "DELETE",
      url: "/api/wine/" + id
    })
      .then(function() {
        getWine(wineCategorySelect.val());
      });
  }

  // InitializeRows handles appending all of our constructed wine HTML inside blogContainer
  function initializeRows() {
    blogContainer.empty();
    var wineToAdd = [];
    for (var i = 0; i < wine.length; i++) {
      wineToAdd.push(createNewRow(wine[i]));
    }
    blogContainer.append(wineToAdd);
  }

  // This function constructs a wine's HTML
  function createNewRow(wine) {
    var formattedDate = new Date(wine.createdAt);
    formattedDate = moment(formattedDate).format("MMMM Do YYYY, h:mm:ss a");
    var newWineCard = $("<div>");
    newWineCard.addClass("card");
    var newWineCardHeading = $("<div>");
    newWineCardHeading.addClass("card-header");
    var deleteBtn = $("<button>");
    deleteBtn.text("x");
    deleteBtn.addClass("delete btn btn-danger");
    var editBtn = $("<button>");
    editBtn.text("EDIT");
    editBtn.addClass("edit btn btn-info");
    var newWineTitle = $("<h2>");
    var newWineDate = $("<small>");
    var newWineRestaurant = $("<h5>");
    newWineRestaurant.text("Written by: " + wine.Restaurant.name);
    newWineRestaurant.css({
      float: "right",
      color: "blue",
      "margin-top":
      "-10px"
    });
    var newWineCardBody = $("<div>");
    newWineCardBody.addClass("card-body");
    var newWineBody = $("<p>");
    newWineTitle.text(wine.title + " ");
    newWineBody.text(wine.body);
    newWineDate.text(formattedDate);
    newWineTitle.append(newWineDate);
    newWineCardHeading.append(deleteBtn);
    newWineCardHeading.append(editBtn);
    newWineCardHeading.append(newWineTitle);
    newWineCardHeading.append(newWineRestaurant);
    newWineCardBody.append(newWineBody);
    newWineCard.append(newWineCardHeading);
    newWineCard.append(newWineCardBody);
    newWineCard.data("wine", wine);
    return newWineCard;
  }

  // This function figures out which wine we want to delete and then calls deleteWine
  function handleWineDelete() {
    var currentWine = $(this)
      .parent()
      .parent()
      .data("wine");
    deleteWine(currentWine.id);
  }

  // This function figures out which wine we want to edit and takes it to the appropriate url
  function handleWineEdit() {
    var currentWine = $(this)
      .parent()
      .parent()
      .data("wine");
    window.location.href = "/cms?wine_id=" + currentWine.id;
  }

  // This function displays a message when there are no wine
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = "";
    if (id) {
      partial = " for Restaurant #" + id;
    }
    blogContainer.empty();
    var messageH2 = $("<h2>");
    messageH2.css({ "text-align": "center", "margin-top": "50px" });
    messageH2.html("No wine yet" + partial + ", navigate <a href='/cms" + query +
    "'>here</a> in order to get started.");
    blogContainer.append(messageH2);
  }

});
